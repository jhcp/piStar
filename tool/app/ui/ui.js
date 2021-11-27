/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

var ui = function() {
    'use strict';

    var selectedCell = null;

    return {
        states: {
            editor: {
                current: 2,
                ADDING: {
                    ADD_CONTAINER: 101,
                    ADD_NODE: 102,
                    ADD_LINK: 103,
                    data: {
                        button: null, /* the 'add button' that is currently selected */
                        typeNameToAdd: null, /* the name of the type that is to be added */
                        linkSourceView: null,
                        linkTargetView: null,
                        linkValue: null,
                        isLinkSourceUndefined: function () {
                            return this.linkSourceView === null;
                        }
                    }
                },
                VIEWING: 2,
                EDITING_TEXT: 3,
                isAdding: function() {
                    return (this.current === this.ADDING.ADD_CONTAINER || this.current === this.ADDING.ADD_NODE || this.current === this.ADDING.ADD_LINK);
                },
                isAddingContainer: function () {
                    return this.current === this.ADDING.ADD_CONTAINER;
                },
                isAddingNode: function () {
                    return this.current === this.ADDING.ADD_NODE;
                },
                isAddingLink: function () {
                    return this.current === this.ADDING.ADD_LINK;
                },
                isViewing: function () {
                    return this.current === this.VIEWING;
                },
                isEditingText: function () {
                    return this.current === this.EDITING_TEXT;
                },
                transitionTo: function (targetState) {
                    if (this.isAdding()) {
                        //perform some cleanup in the UI when the transition is leaving the ADDING state
                        if (this.ADDING.data.linkSourceView && this.ADDING.data.linkSourceView.unhighlight) {
                            this.ADDING.data.linkSourceView.unhighlight();
                        }
                        ui.changeAddMenuStatus('');
                        ui.resetPointerStyles();

                        //reset the state variables
                        this.ADDING.data.button = null;
                        this.ADDING.data.typeNameToAdd = null;
                        this.ADDING.data.linkSourceView = null;
                        this.ADDING.data.linkTargetView = null;
                        this.ADDING.data.linkValue = null;
                    }

                    //actually change state
                    this.current = targetState;

                    //console.log('editor state changed to ' + targetState);
                }
            },
            cellDisplay: {
                dependencies: {
                    NORMAL: 0,
                    PARTIAL: 1,
                    HIDDEN: 2,
                    currentState: 0
                },
                contributionLinks: {
                    NORMAL: 0,
                    PARTIAL: 1,
                    HIDDEN: 2,
                    currentState: 0
                }
            }
        },

        defaultElementBackgroundColor: '#CCFACD',

        getSelectedCells: function() {
            return [this.selectedCell];
        },
        getSelectedCellsAmount: function() {
            if (! this.getSelectedCells()[0].isCell()) {
                //if the paper is selected
                return 0;
            }
            else {
                return _.size(this.getSelectedCells());
            }
        },
        selectCell: function(cell) {
            if (cell) {
                var toTrigger = false;
                if (this.selectedCell && this.selectedCell !== cell) {
                    this.deselectCell();
                }
                if (this.selectedCell !== cell) {
                    //there is no need to trigger a change:selection event if the same cell is being selected
                    toTrigger = true;
                }

                //actual selection change
                this.selectedCell = cell;

                if (toTrigger) {
                    istar.paper.trigger('change:selection', {selectedCell: cell});
                }
                if (cell.isElement()) {
                    $('#sidepanel-tab-style').show();
                }
                else {
                    $('#sidepanel-tab-style').hide();
                }
            }
        },
        deselectCell: function(_cell) {
            var cell = _cell || ui.selectedCell;
            if (cell) {
                //actual selection change
                this.selectedCell = null;

                istar.paper.trigger('change:selection', {deselectedCell: cell});
            }
        },
        selectPaper: function() {
            if (this.selectedCell !== istar.graph) {
                this.deselectCell();
                this.selectedCell = istar.graph;
                istar.paper.trigger('change:selection', {selectedCell: istar.graph});

                //closes any color picker that may be open
                $('.jscolor').each(function () {
                    this.jscolor.hide();
                });

                $('#sidepanel-tab-style').hide();
                $('#sidepanel-tab-properties a').tab('show');
            }
        },
        hideSelection: function() {
            $('#resize-handle').hide();
            $('.cell-selection').hide();
        },
        showSelection: function(_cell) {
            var cell = _cell || this.selectedCell;
            var cellView = istar.paper.findViewByModel(cell);
            if (cellView) {
                var cellBox = cellView.getBBox();

                //positioning and display of the selection box
                $('.cell-selection').css({
                    left: cellBox.x-6 + 'px',
                    top: cellBox.y-6 + 'px',
                    width: (cellBox.width + 12.5) + 'px',
                    height: (cellBox.height + 12) + 'px'
                });
                $('.cell-selection').show();

                //positioning and display of the resizing handle, when applicable
                if (cellView.model.isElement() && (! cellView.model.isKindOfActor()) ) {
                    $('#resize-handle').css({left: cellBox.x - 2 + cellBox.width, top: cellBox.y - 2 + cellBox.height});
                    $('#resize-handle').show();
                }

            }
        },
        collectActionData: function(a,b,c) {console.log(a,b,c); /* empty function added when deploying */ },
        collectErrorData: function() { /* empty function added when deploying */ }
    };
}();

ui.defineInteractions = function () {
    'use strict';

    //this redefinition was used, instead of on('remove'), because when the 'remove' event is triggered the
    //node has already been removed, thus it would be too late to know whom is the parent
    var originalRemove = joint.dia.Cell.prototype.remove;
    joint.dia.Cell.prototype.remove = function(opt) {
        var parent = this.get('parent');
        originalRemove.call(this, opt);
        if (parent) {
            istar.graph.getCell(parent).updateBoundary();
        }
    };

    istar.graph.on('add', function(cell) {
        if (cell.isElement()) {
            cell.on('change:name', function(node, newValue) {
                node.setNodeLabel(newValue);
            });
        }
        else if (cell.isLink()) {
            var verticesTool = new joint.linkTools.Vertices({snapRadius: 1});
            var toolsView = new joint.dia.ToolsView({tools: [verticesTool]});
            cell.findView(istar.paper).addTools(toolsView).hideTools();
            cell.on('change:vertices', function(linkModel, a, b) {
                if (! b.translateBy) {
                    //this 'if' prevents updating the selection when the link is being translated along with its parent
                    ui.showSelection();
                    ui.selectCell(linkModel);
                }
            });
        }
    });

    istar.paper.on('link:mouseenter', function(linkView) {
        //highlights a hovered link, which indicates to the user that it is interactive
        linkView.showTools();
        linkView.model.attr('connection-wrap/strokeWidth', 30);
        linkView.model.attr('connection-wrap/stroke', 'rgba(190, 190, 190, 1)');
    });

    istar.paper.on('link:pointerdblclick', function(linkView, a, b) {
        //hide link tools when a vertex is removed
        linkView.hideTools();
        linkView.model.attr('connection-wrap/stroke', 'transparent');
    });

    istar.paper.on('link:pointerup', function(linkView) {
        ui.selectCell(linkView.model, linkView);
    });

    istar.paper.on('link:mouseleave', function(linkView) {
        linkView.hideTools();
        linkView.model.attr('connection-wrap/stroke', 'rgba(190, 190, 190, 0)');
    });

    istar.paper.on('change:selection', function(selection) {
        if (selection.selectedCell) {
            ui.table = new ui.components.PropertiesTableView({model: selection.selectedCell}).render();
            if (selection.selectedCellView) {
                ui.showSelection(selection.selectedCell);
            }
        }
        else if (selection.deselectedCell){
            ui.hideSelection();
            ui.table.remove();
            $('#properties-table').find('tbody').html('');
            $('#cell-buttons').html('');
        }
    });

    istar.paper.on('blank:pointerdown', function (evt, x, y) {
        //programatically remove focus from any active input, since JointJS prevents this default behavior
        $('input:focus').blur();

        if (ui.getSelectedCells()) {
            ui.selectPaper();
        }
        if (ui.states.editor.isAddingContainer()) {
            ui.addElementOnPaper({position: {x: x, y: y}});
        }
        if (ui.states.editor.isAddingNode()) {
            //gets a default bbox (first node in the metamodel) to use as bbox for positioning the
            //element in the diagram
            var nodes = _.keys(istar.metamodel.nodes);
            var bbox = (new istar.metamodel.nodes[nodes[0]].shapeObject()).getBBox();
            ui.addElementOnPaper({position: {
                    x: x - bbox.width/2,
                    y: y - bbox.height/2
                }});
        }
    });

    istar.paper.on('cell:mouseover', function (cellView, evt, x, y) {
        //reacts when the mouse is over a given element
        //.css() is used instead of .attr() because the latter is bugged with elements containing a path element
        //moreover, .css() doesn't change the actual atrributes of the element, which prevents mistakenly saving
        //the wrong styles and also makes it easier to restore to its previous style on mouseout
        var containerHighlightStrokeColor = '#1C5052';

        //highlights a container when it is hovered
        if (cellView.model.isKindOfActor()) {
            cellView.$('.boundary').css({stroke: containerHighlightStrokeColor, 'stroke-width': '4', fill: '#ddd'});
            cellView.$('.actorSymbol').css({stroke: containerHighlightStrokeColor, 'stroke-width': '3'});
            cellView.$('.actorDecorator').css({stroke: containerHighlightStrokeColor, 'stroke-width': '2'});
        }
        else {
            //if a node inside a container is hovered, highlight the container
            if (cellView.model.get('parent')) {
                var parentView = istar.paper.findViewByModel(istar.graph.getCell(cellView.model.get('parent')));
                parentView.$('.boundary').css({stroke: containerHighlightStrokeColor, 'stroke-width': '4', fill: '#ddd'});
                parentView.$('.actorSymbol').css({stroke: containerHighlightStrokeColor, 'stroke-width': '3'});
                parentView.$('.actorDecorator').css({stroke: containerHighlightStrokeColor, 'stroke-width': '2'});
            }

            //highlight the hovered element and its neighbors
            // if (cellView.model.isNode()) {
            //     cellView.$('.element').css({fill: 'black'});
            //     cellView.$('.content').css({fill: 'white'});
            //     cellView.$('.stereotype').css({fill: 'white'});
            //
            //     _.forEach(istar.graph.getNeighbors(cellView.model), function (cell) {
            //         cell.findView(istar.paper).$('.element').css({fill: '#FABF6E'});
            //     });
            // }

            //if a dependum is partially hidden, display it and its links normally while hovered
            if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.PARTIAL && cellView.model.isDependum()) {
                //CSS opacity currently does not work for elements inside an SVG in Chrome
                //thus, model.attr() is used instead of view.css()
                cellView.model.prop('partiallyHiddenOpacity', cellView.model.attr('*/opacity'));
                cellView.model.attr('*/opacity', '1');
                _.forEach(istar.graph.getConnectedLinks(cellView.model), function (link) {
                    link.prop('partiallyHiddenOpacity', link.attr('*/opacity'));
                    link.attr('*/opacity', '1');
                });
            }

            //if contribution links are partially hidden, display the ones linked to this node normally while it is hovered
            if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.PARTIAL) {
                //Links are only restored when a connected element is hovered. When the link itself is hovered it is not restored due to flickering
                if (cellView.model.isNode()) {
                    _.forEach(istar.graph.getConnectedLinks(cellView.model), function (link) {
                        //CSS opacity currently does not work for elements inside an SVG in Chrome
                        //thus, model.attr() is used instead of view.css()
                        if (! link.isDependencyLink()) {
                            link.prop('partiallyHiddenOpacity', link.attr('path/opacity'));
                            link.attr('path/opacity', 1);
                            link.attr('.labels/opacity', 1);
                        }
                    });
                }
            }
        }
    });
    istar.paper.on('cell:mouseout', function (cellView, evt, x, y) {
        //by emptying the CSS style, the element returns to its SVG values, thus returning to its style prior to hovering
        if (cellView.model.isKindOfActor()) {
            cellView.$('.boundary').css({stroke: '', 'stroke-width': '', fill: ''});
            cellView.$('.actorSymbol').css({stroke: '', 'stroke-width': ''});
            cellView.$('.actorDecorator').css({stroke: '', 'stroke-width': ''});
        }
        else {
            if (cellView.model.get('parent')) {
                var parentView = istar.paper.findViewByModel(istar.graph.getCell(cellView.model.get('parent')));
                parentView.$('.boundary').css({stroke: '', 'stroke-width': '', fill: ''});
                parentView.$('.actorSymbol').css({stroke: '', 'stroke-width': ''});
            }

            //unhighlight the previously hovered element and its neighbors
            // if (cellView.model.isNode()) {
            //
            //     cellView.$('.element').css({fill: ''});
            //     cellView.$('.content').css({fill: ''});
            //     cellView.$('.stereotype').css({fill: ''});
            //     _.forEach(istar.graph.getNeighbors(cellView.model), function (cell) {
            //         cell.findView(istar.paper).$('.element').css({fill: ''});
            //     });
            // }

            //if the node is supposed to be partially hidden, hide it and its links again
            if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.PARTIAL && cellView.model.isDependum()) {
                //CSS opacity currently does not work for elements inside an SVG in Chrome
                //thus, model.attr() is used instead of view.css()
                cellView.model.attr('*/opacity', cellView.model.prop('partiallyHiddenOpacity'));
                _.forEach(istar.graph.getConnectedLinks(cellView.model), function (link) {
                    link.attr('*/opacity', link.prop('partiallyHiddenOpacity'));
                    link.prop('partiallyHiddenOpacity', null);
                });
                cellView.model.prop('partiallyHiddenOpacity', null);
            }

            //if contribution links are partially hidden, hide back the ones linked to this node
            if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.PARTIAL) {
                if (cellView.model.isNode()) {
                    _.forEach(istar.graph.getConnectedLinks(cellView.model), function (link) {
                        //CSS opacity currently does not work for elements inside an SVG in Chrome
                        //thus, model.attr() is used instead of view.css()
                        if (! link.isDependencyLink()) {
                            link.attr('path/opacity', link.prop('partiallyHiddenOpacity'));
                            link.attr('.labels/opacity', link.prop('partiallyHiddenOpacity'));
                            link.prop('partiallyHiddenOpacity', null);
                        }
                    });
                }
            }
        }
    });
    istar.paper.on('cell:pointerdown', function (cellView, evt, x, y) {
        if (! ui.states.editor.isAdding()) {
            if (!cellView.model.isLink()) {
                ui.selectCell(cellView.model, cellView);
            }

            //programatically remove focus from any active input, since JointJS prevents this default behavior
            $('input:focus').blur();
        }

        //prevents the selection to appear while the element is being moved
        if (ui.getSelectedCells()[0].isElement()) {
            ui.hideSelection();
        }
    });
    istar.paper.on('cell:pointerup', function (cellView, evt, x, y) {
        var currentAddingElement = ui.states.editor.ADDING.data.typeNameToAdd;

        if (ui.states.editor.isAddingNode()) {
            ui.addElementOnContainer(cellView, {position: {x: x, y: y}});

            //if adding a node to a collapsed container, expand the container. Otherwise it would look like
            //the node was added directly to the paper
            if (cellView.model.prop('collapsed')) {
                cellView.model.toggleCollapse();
            }
        }
        else if (ui.states.editor.isAddingLink()) {
            var isContainerLink = _.includes(istar.metamodel.getContainerLinksNames(), currentAddingElement);
            var isNodeLink = _.includes(istar.metamodel.getNodeLinksNames(), currentAddingElement);
            var isDependencyLink = _.includes(currentAddingElement, 'DependencyLink');

            if (isContainerLink) {
                if (cellView.model.isKindOfActor()) {
                    if (ui.states.editor.ADDING.data.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.states.editor.ADDING.data.linkSourceView = cellView;
                    } else {
                        ui.states.editor.ADDING.data.linkTargetView = cellView;
                        var isValid = istar.metamodel.containerLinks[currentAddingElement].isValid(ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model);
                        if (isValid.isValid) {
                            ui.addLinkBetweenContainers(currentAddingElement, cellView);
                        }
                        else {
                            ui.displayInvalidLinkMessage(isValid.message);
                            ui.states.editor.ADDING.data.linkSourceView.unhighlight();
                            ui.states.editor.ADDING.data.button.end();
                        }
                    }
                }
            }
            else {
                if (ui.states.editor.ADDING.data.isLinkSourceUndefined()) {
                    cellView.highlight();
                    ui.states.editor.ADDING.data.linkSourceView = cellView;
                } else {
                    ui.states.editor.ADDING.data.linkTargetView = cellView;

                    if (isDependencyLink) {
                        var isValid = istar.metamodel.dependencyLinks['DependencyLink'].isValid(ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model);
                        if (isValid.isValid) {
                            ui.addDependency(ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.typeNameToAdd, ui.states.editor.ADDING.data.linkTargetView.model);
                        }
                        // else {
                        //     ui.displayInvalidLinkMessage(isValid.message);
                        // }
                    }
                    if (isNodeLink) {
                        var newLink = null;
                        var prettyLinkName = '';
                        var isValid = istar.metamodel.nodeLinks[currentAddingElement].isValid(ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model);

                        if (istar.metamodel.nodeLinks[currentAddingElement].tryReversedWhenAdding) {
                            if (!isValid.isValid) {
                                //try with reversed source/targets
                                var isValidReversed = istar.metamodel.nodeLinks[currentAddingElement].isValid(ui.states.editor.ADDING.data.linkTargetView.model, ui.states.editor.ADDING.data.linkSourceView.model);
                                if (isValidReversed) {
                                    var tempSource = ui.states.editor.ADDING.data.linkSourceView;
                                    ui.states.editor.ADDING.data.linkSourceView = ui.states.editor.ADDING.data.linkTargetView;
                                    ui.states.editor.ADDING.data.linkTargetView = tempSource;
                                    isValid = isValidReversed;
                                }
                            }
                        }
                        if (isValid.isValid) {
                            //actually create the link
                            if (istar.metamodel.nodeLinks[currentAddingElement].changeableLabel) {
                                newLink = istar['add' + currentAddingElement](ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model, ui.linkValue);
                            }
                            else {
                                newLink = istar['add' + currentAddingElement](ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model);
                            }

                            //smoothness setup
                            if (newLink.attr('smooth')) {
                                //do some magic in order to make links smooth when there are vertices, but straight
                                //when there are no vertices defined
                                newLink.on('change:vertices', ui._toggleSmoothness);
                            }
                        }
                    }
                    if (! isValid.isValid) {
                        ui.displayInvalidLinkMessage(isValid.message);
                    }


                    ui.states.editor.ADDING.data.linkSourceView.unhighlight();
                    ui.states.editor.ADDING.data.linkTargetView.unhighlight();
                    ui.states.editor.ADDING.data.button.end();
                }
            }
        }
        else if (ui.states.editor.isViewing()) {
            //collapse/uncollapse actors when alt-clicked
            if (evt.ctrlKey || evt.altKey) {
                if (cellView.model.isKindOfActor()) {
                    ui.hideSelection();//remove the focus from the actor
                    cellView.model.toggleCollapse();
                    ui.showSelection();//give the focus back to actor, now collapsed or expanded
                }
            }

            istar.resizePaperBasedOnCell(cellView);

            ui.showSelection();
        }
    });

    istar.paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
        if ( ! (evt.ctrlKey || evt.altKey) ) {
            var newText;
            if (cellView.model.isElement()) {
                ui.showSelection();

                ui.prompt({
                    title: 'Edit name',
                    value: cellView.model.prop('name'),
                    callback: function (value) {
                        if (value !== null) {
                            cellView.model.prop('name', value);
                        }
                    }
                });
            }
        }
    });

    istar.paper.on('cell:contextmenu', function (cellView, evt, x, y) {
        //highlight the contextual actions panel when users right clicks a Cell,
        // letting they know where to find such actions
        ui.alert('Contextual actions can be found on the properties panel');
        ui.selectCell(cellView.model);
        ui.showSelection();
        $('#sidepanel-title-actions').addClass('flash-on');
        setTimeout(function () {
            $('#sidepanel-title-actions').removeClass('flash-on');
            $('#sidepanel-title-actions').addClass('flash-off');
            setTimeout(function () {
                $('#sidepanel-title-actions').removeClass('flash-off');
            }, 300);
        }, 50);
    });
};

istar.resizePaperBasedOnCell = function(cellView) {
    //increase the drawing area if there is an element beyond its edges
    //get the Bounding Box from the view, which ignores hidden inner elements
    //In contrast, if we were to get the Bounding Box from the model, the dimensions would be
    //that of a expanded actor even if it were collapsed
    var cellBBox = cellView.getBBox();

    var paperWidth = istar.paper.getArea().width;
    var paperHeight = istar.paper.getArea().height;

    //Round the numbers of the new dimension since:
    // a) Precision is not relevant here
    // b) Int numbers are easier for the user to handle (when manually changing the size)
    if (cellBBox.y + cellBBox.height > paperHeight ) {
        //if the element is beyond the bottom edge
        istar.paper.setDimensions(paperWidth, Math.round(cellBBox.y + cellBBox.height + 40));
    }
    if (cellBBox.x + cellBBox.width > paperWidth ) {
        //if the element is beyond the right edge
        istar.paper.setDimensions(Math.round(cellBBox.x + cellBBox.width + 40));
    }
    if (cellBBox.x < 0 ) {
        //if the element is beyond the left edge
        var delta = Math.round(40 - cellBBox.x);
        istar.paper.setDimensions(paperWidth + delta);
        istar.graph.translate(delta, 0);
    }
    if (cellBBox.y < 0 ) {
        //if the element is beyond the left edge
        var delta = Math.round(40 - cellBBox.y);
        istar.paper.setDimensions(paperWidth, paperHeight + delta);
        istar.graph.translate(0, delta);
    }
}

ui.addElementOnPaper = function (options) {
    'use strict';

    try {
        var currentAddingElement = ui.states.editor.ADDING.data.typeNameToAdd;
        var isValid = {isValid: false};
        if (ui.states.editor.isAddingNode()) {
            if (istar.metamodel.nodes[currentAddingElement]) {
                if (istar.metamodel.nodes[currentAddingElement].canBeOnPaper) {
                    isValid = istar.metamodel.nodes[currentAddingElement].isValid();
                }
                else {
                    isValid = {
                        message: 'a ' + currentAddingElement + ' cannot be added directly to the paper, it must be added <b>inside</b> an Actor.'
                    };
                    if (istar.metamodel.nodes[currentAddingElement].canBeDependum) {
                        isValid.message += '<br><br>If you are trying to add a dependency link, please try the "Dependency..." button';
                    }
                }
            }
        }
        else if (ui.states.editor.isAddingContainer()) {
            if (istar.metamodel.containers[currentAddingElement]) {
                isValid = istar.metamodel.containers[currentAddingElement].isValid();
            }
        }

        if (isValid.isValid) {
            var newActor = istar['add' + currentAddingElement]('', options);
            if (istar.metamodel.nodes[currentAddingElement] && istar.metamodel.nodes[currentAddingElement].customProperties) {
                newActor.prop('customProperties', istar.metamodel.nodes[currentAddingElement].customProperties);
            }
            else if (istar.metamodel.containers[currentAddingElement] && istar.metamodel.containers[currentAddingElement].customProperties) {
                newActor.prop('customProperties', istar.metamodel.containers[currentAddingElement].customProperties);
            }
            newActor.prop('customProperties/Description', '');
            istar.resizePaperBasedOnCell(newActor);
            ui.selectCell(newActor);
        }
        else {
            ui.displayInvalidLinkMessage(isValid.message);
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.states.editor.ADDING.data.button.end();
    }
};

ui.addElementOnContainer = function (cellView, options) {
    'use strict';

    try {
        var currentAddingElement = ui.states.editor.ADDING.data.typeNameToAdd;
        var isValid = {isValid: false};
        if (istar.metamodel.nodes[currentAddingElement]) {
            if (istar.metamodel.nodes[currentAddingElement].canBeInnerElement) {
                isValid = istar.metamodel.nodes[currentAddingElement].isValid(cellView.model);
            }
            else {
                isValid = {
                    message: 'a ' + currentAddingElement + ' cannot be added inside an actor'
                };
            }
        }

        if (isValid.isValid) {
            //centers the position
            var bbox = (new istar.metamodel.nodes[currentAddingElement].shapeObject()).getBBox();
            options.position.x -= bbox.width/2;
            options.position.y -= bbox.height/2;

            var element = ui.addNodeInPlace(cellView.model, istar['add' + currentAddingElement], options);

            if (istar.metamodel.nodes[currentAddingElement].customProperties) {
                element.prop('customProperties', istar.metamodel.nodes[currentAddingElement].customProperties);
            }
            element.prop('customProperties/Description', '');
            ui.selectCell(element);
        }
        else {
            ui.displayInvalidLinkMessage(isValid.message);
        }
    } catch (e) {
        console.log(e);
        ui.states.editor.transitionTo(ui.states.editor.VIEWING);
    }
};
ui.addLinkBetweenContainers = function (newLink, targetCellView) {
    'use strict';

    try {
        ui.states.editor.ADDING.data.linkTargetView = targetCellView;
        if (istar.metamodel.containerLinks[newLink].isValid(ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model)) {
            istar['add' + ui.states.editor.ADDING.data.typeNameToAdd](ui.states.editor.ADDING.data.linkSourceView.model, ui.states.editor.ADDING.data.linkTargetView.model);
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.states.editor.ADDING.data.linkSourceView.unhighlight();
        ui.states.editor.ADDING.data.button.end();
    }
};

ui.addDependency = function (source, dependencyType, target) {
    'use strict';

    var node = '';
    var position = {x: 10, y: 10};
    var text = 'Dependum';

    var dependumType = dependencyType.replace('DependencyLink', '');
    node = istar['add' + dependumType](text, position);

    var links = istar.addDependency(source, node, target);
    links[0].on('change:vertices', ui._toggleSmoothness);
    links[1].on('change:vertices', ui._toggleSmoothness);

    ui.setupDependencyRemoval(links);

    node.prop('customProperties/Description', '');
    ui.selectCell(node);
}

ui.setupDependencyRemoval = function (links) {
    'use strict';

    //ensure that the entire dependency (two links and dependum) are deleted
    //when any of its links is deleted
    //this is needed when a depender or dependee is deleted, so that
    //the dependency will not be left dangling in the diagram
    links[0].on('remove', function(){
        if (this.getSourceElement() && this.getSourceElement().isDependum()) {
            this.getSourceElement().remove({ disconnectLinks: true });
            this.prop('otherHalf').remove();
        }
        if (this.getTargetElement() && this.getTargetElement().isDependum()) {
            this.getTargetElement().remove({ disconnectLinks: true });
            this.prop('otherHalf').remove();
        }
    });
    links[1].on('remove', function(){
        if (this.getSourceElement() && this.getSourceElement().isDependum()) {
            this.getSourceElement().remove({ disconnectLinks: true });
            this.prop('otherHalf').remove();
        }
        if (this.getTargetElement() && this.getTargetElement().isDependum()) {
            this.getTargetElement().remove({ disconnectLinks: true });
            this.prop('otherHalf').remove();
        }
    });
};

ui.addNodeInPlace = function (clickedNode, callback, options) {
    'use strict';
    ui.states.editor.ADDING.data.button.end();

    //assigns the new node to the correct parent
    //if the user clicked on an actor kind, the parent is the clicked element itself (i.e., the actor)
    //otherwise, if the user clicked on another element (e.g., a goal), then the parent of the new element will be the same parent of the clicked element
    var node;
    if (clickedNode.isKindOfActor()) {
        node = callback('', options);
        clickedNode.embedNode(node);
    }
    else {
        var parent = istar.graph.getCell(clickedNode.attributes.parent);
        if (parent && parent.isKindOfActor()) {
            node = callback('', options);
            istar.graph.getCell(clickedNode.attributes.parent).embedNode(node);
        }
    }
    return node;
};


ui.changeColorBoundaries = function (color) {
    'use strict';

    _.map(istar.getElements(), function (node) {
        if (node.isKindOfActor()) {
            node.attr('.boundary', {fill: color});
        }
    });
};
ui.changeColorElements = function (color) {
    'use strict';

    _.map(istar.getElements(), function (node) {
        node.attr('.element/fill', color);
    });
};
ui.changeColorElement = function (color, element) {
    'use strict';

    element = element || ui.getSelectedCells()[0];
    element.attr('.element', {fill: color});

    //stores the color in a property for use when saving the model
    if (color === ui.defaultElementBackgroundColor) {
        element.prop('backgroundColor', null);
    }
    else {
        element.prop('backgroundColor', color);
    }
};
ui.connectLinksToShape = function () {
    'use strict';

    $('.menu-body *').addClass('waiting');
    //do the processing after a small delay, in order to allow the browser to update the cursor icon
    setTimeout(function () {
        istar.paper.options.linkConnectionPoint = joint.util.shapePerimeterConnectionPoint;
        //this translation is just to force re-rendering of links
        _.forEach(istar.getElements(), function (e) {
            e.translate(1);
            e.translate(-1);
        });
        istar.paper.options.linkConnectionPoint = undefined;
        $('.menu-body *').removeClass('waiting');
        ui.selectPaper();
    }, 100);
};

$('#menu-button-save-model').click(function () {
    'use strict';

    var model = istar.fileManager.saveModel();
    var csvData = 'data:text/json;charset=utf-8,' + (encodeURI(model));
    joint.util.downloadDataUri(csvData, 'goalModel.txt');
});

$('#modal-button-load-model').click(function () {
    'use strict';

    $(this).button('loading');
    //load the model with a small delay, giving time to the browser to display the 'loading' message
    setTimeout(function () {
        //call the actual loading
        try {
            var fileInput = $('#input-file-to-load')[0];
            if (fileInput.files.length === 0) {
                ui.alert('You must select a file to load', 'No file selected');

                $('#modal-load-model').modal('hide');
                $('#modal-button-load-model').button('reset');
            }
            else {
                //else, load model from file
                var file = fileInput.files[0];
                if (file.type === 'text/plain') {
                    if (ui.getSelectedCells()[0]) {
                        ui.hideSelection();
                    }
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        ui.resetCellDisplayStates();
                        istar.fileManager.loadModel(e.target.result);//do the actual loading
                        ui.selectPaper();//select the model (as a whole)

                        $('#modal-load-model').modal('hide');
                        $('#modal-button-load-model').button('reset');
                    };
                    fileReader.readAsText(file);

                }
                else {
                    ui.alert('Sorry, this kind of file is not valid', 'Error loading file');
                    $('#modal-button-load-model').button('reset');
                    $('#modal-load-model').modal('hide');
                }
            }
        }
        catch (error) {
            $('#modal-button-load-model').button('reset');
            ui.alert('Sorry, the input model is not valid.', 'Error loading file');
            console.log(error.stack);
        }
    }, 20);
});

ui.setupUi = function () {
    'use strict';

    overrideIstarFunctions();
    this.setupPluginMenu();
    this.setupMetamodelUI();
    this.defineInteractions();
    ui.components.createAddButtons();

    $('#placeholder-save-model').hide();

    this.setupElementResizing();
    this.setupDiagramSizeInputs();
    this.setupLoadExampleButton();
    this.setupMainMenuInteraction();
    this.setupSidepanelInteraction();
    this.setupSaveImageModal();

    ui.selectPaper();

    function overrideIstarFunctions() {
        //extend original iStar functions with UI behavior
        var originalFunction = null;

        originalFunction = istar.clearModel;
        istar.clearModel = function() {
            originalFunction();
            ui.selectPaper();
        };
    }
};

ui.setupSaveImageModal = function() {
    'use strict';

    //save model when Enter is pressed
    $('#modal-save-image-form').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#modal-button-save-image').click();
    });

    $('#input-file-format').change(function () {
        if ($(this).val() === "PNG") {
            $('#save-png-options').removeClass('hidden');
        }
        else {
            $('#save-png-options').addClass('hidden');
        }

    });

    $('#modal-button-save-image').click(function () {
        var $saveButton = $(this);

        //let the user know that sometinh is being done
        $('body *').addClass('waiting');
        $saveButton.button('preparing');//display status information in the save button
        $saveButton.attr('disabled', 'disabled');

        //optionally fix link gaps
        if ($('#modal-input-precise-links').prop('checked')) {
            //this is a time-consuming function. It checks every link connection and make it perfectly fit the
            //shape of the connected element
            ui.connectLinksToShape();
        }

        //hide UI elements before saving
        var $jointMarkers = $('.marker-vertices, .link-tools, .marker-arrowheads, .remove-element');
        $jointMarkers.hide();
        ui.hideSelection();

        //execute the actual saving only after some time has passed, allowing the browser to update the UI
        setTimeout(function () {
            $saveButton.button('save'); //display status information in the save button
            var filename = $('#input-filename').val() || 'goalModel';

            //Adjust the size of the model, to prevent empty spaces in the image
            var originalWidth = istar.paper.getArea().width;
            var originalHeight = istar.paper.getArea().height;
            istar.paper.fitToContent({padding: 10, allowNewOrigin: 'any'});

            if ($('#input-file-format').val() === "SVG") {
                var svgData = istar.fileManager.saveSvg(istar.paper);
                joint.util.downloadDataUri(svgData, filename + '.svg');
            }
            else {
                //save PNG
                var resolutionFactor = 1;
                if ($('#modal-input-hi-res').prop('checked')) {
                    resolutionFactor = 4;
                }
                istar.fileManager.savePng('diagram', joint.util.downloadBlob, filename, resolutionFactor, $('#modal-input-transparent-background').prop('checked'));
            }

            //restore the paper to its initial state
            istar.paper.setDimensions(originalWidth, originalHeight);
            istar.paper.translate(0,0);

            //show the UI elements back again
            $('.marker-vertices, .link-tools, .marker-arrowheads, .remove-element').show();
            ui.showSelection(ui.getSelectedCells()[0]);

            $('body *').removeClass('waiting');
            $saveButton.button('reset');
            $saveButton.removeAttr('disabled');
            $('#modal-save-image').modal('hide');
        }, 100);

    });
};

ui.setupPluginMenu = function () {
    'use strict';

    //listen for changes in the plugin menus, displaying it if some element is added to it
    var targetNode = document.getElementById('menu-plugin');
    var config = {childList: true, subtree: true }; // Options for the observer (which mutations to observe)
    var observer = new MutationObserver(function(mutationsList, observer) {
        $('#menu-item-plugin').show();
        $('#logo').html('piStar plugin');
        $('.menu-bar').addClass('plugged');
        $('.menu-item').addClass('plugged');
        observer.disconnect();//stop observing
    });
    observer.observe(targetNode, config);
};

ui.setupDiagramSizeInputs = function () {
    'use strict';

    //updates the initial values of the diagram's size inputs with the diagram's actual size
    $('#input-diagram-width').val(istar.paper.getArea().width);
    $('#input-diagram-height').val(istar.paper.getArea().height);

    //setup to update the inputs' values whenever the diagram's size is changed
    istar.paper.on('resize', function(width, height) {
        $('#input-diagram-width').val(width);
        $('#input-diagram-height').val(height);
    });

    //setup to update the diagram's size whenever the user leaves (focusout) the input fields or press enter
    $('#input-diagram-width, #input-diagram-height')
        .focusout(function () {
            istar.paper.setDimensions($('#input-diagram-width').val(), $('#input-diagram-height').val());
        })
        .keyup(function (e) {
            if (e.which === 13) {
                istar.paper.setDimensions($('#input-diagram-width').val(), $('#input-diagram-height').val());
                this.blur(); //remove focus from the input field
            }
        });
};

ui.setupLoadExampleButton = function () {
    'use strict';

    $('.modal-button-load-example').click(function () {
        $('.modal *').addClass('waiting');
        var modelToLoad = $(this).data('model');
        //do the processing after a small delay, in order to allow the browser to update the cursor icon
        setTimeout(function () {
            if (ui.getSelectedCells()[0]) {
                ui.hideSelection();
            }
            ui.resetCellDisplayStates();
            istar.fileManager.loadModel(istar.models[modelToLoad]);
            ui.selectPaper();//select the model (as a whole)
            $('.modal *').removeClass('waiting');
            $('#modal-examples').modal('hide');
        }, 100);

        ui.collectActionData('click', 'load example', modelToLoad);
    });
};

ui.setupMainMenuInteraction = function () {
    'use strict';

    // default menu to be displayed when the tool opens
    var currentMenuItem = $('#menu-item-add');

    // set up the click behavior for every menu-item
    $('.menu-items a').each(function () {
        $(this).click(function () {
            var target = $('#' + $(this).data('toggle'));

            if (currentMenuItem === null) {
                //no menu is currently displayed, the clicked one will now be displayed
                currentMenuItem = $(this);
                $(this).addClass('active');

                target.css('display', 'none');
                target.removeClass('hidden');
                target.slideDown(200);

                $('#star').css("-transform","rotate(0deg)");
            }
            else if ($(this).attr('id') !== currentMenuItem.attr('id')) {
                //some menu is already displayed, a different one will be displayed

                //deselect and hide the current menu
                $(currentMenuItem).removeClass('active');
                $('#' + $(currentMenuItem).data('toggle')).addClass('hidden');
                $('#' + $(currentMenuItem).data('toggle')).slideUp(0);

                currentMenuItem = $(this);

                //select and show the clicked menu
                currentMenuItem .addClass('active');
                target.removeClass('hidden');
                target.slideDown(0);

            }
            else {
                //some menu is already displayed, the menu will be hidden
                target.slideUp(200, function () {
                    //only deselect the menu after its body disappear,
                    //for smoother visual animation
                    $(currentMenuItem).removeClass('active');
                    currentMenuItem = null;
                });
                $('#star').css("-transform","rotate(-180deg)");
            }
        });
    });

    $('#' + currentMenuItem.data('toggle')).slideDown(0); //displays the default menu when the tool is loaded

    //change state when focusing on inputs, to prevent accidentally deleting model elements with backspace and del
    $('input')
        .focusin(function () {
            ui.states.editor.transitionTo(ui.states.editor.EDITING_TEXT);
        })
        .focusout(function () {
            ui.states.editor.transitionTo(ui.states.editor.VIEWING);
        });

};

$('#all-actor-boundary-color-picker').on('change', function () {
    'use strict';

    ui.changeColorBoundaries(this.value);
});
$('#all-elements-color-picker').on('change', function () {
    'use strict';

    ui.changeColorElements(this.value);
});

$('#single-element-color-picker').on('change', function () {
    'use strict';

    ui.changeColorElement(this.value);
});

$('#menu-button-precise-links').click(function () {
    'use strict';

    ui.connectLinksToShape();
});

$('#menu-button-toggle-fullscreen').click(function () {
    'use strict';

    joint.util.toggleFullScreen();
});

$('#menu-button-straighten-links').click(function () {
    'use strict';

    ui.confirm({
        message: 'ATTENTION! This action will remove all vertices you may have added to the links in this model. This' +
          ' action is irreversible. Are you sure you want to proceed?',
        callback: function (value) {
            if (value) {
                var selectedCell = ui.getSelectedCells()[0];
                _.forEach(istar.getLinks(), function (link) {
                    link.vertices([]);
                });

                //restore selection to the element that was selected (if any) when the action started
                ui.selectCell(selectedCell);
            }
        }
    });
});

$('#menu-button-auto-layout').click(function () {
    'use strict';

    ui.confirm({
        message: 'ATTENTION! This action will change the position of the actors, while also removing every vertex you' +
                 ' may have added to their links. This action is irreversible. Are you sure you want to proceed?',
        callback: function (value) {
            if (value) {
                var selectedCell = ui.getSelectedCells()[0] ? ui.getSelectedCells()[0] : null;
                ui.deselectCell(selectedCell);
                ui.hideSelection();

                istar.layout.updateLayout();

                //restore selection to the element that was selected (if any) when the action started
                ui.selectCell(selectedCell);
                ui.showSelection(selectedCell);
            }
        }
    });
});

ui.changeAddMenuStatus = function (text) {
    'use strict';

    $('#status').html(text);
};

ui.deleteCell = function (cellToDelete) {
    function getDependencyFromDependencyLink(link) {
        let dependum = null;
        if (link.getSourceElement() && link.getSourceElement().isDependum()) {
            dependum = link.getSourceElement();
        }
        else if (link.getTargetElement() && link.getTargetElement().isDependum()) {
            dependum = link.getTargetElement();
        }
        let links = [link, link.prop('otherHalf')];

        return {dependum: dependum, links: links};
    }

    function undoDeleteDependency(cell, links) {
        return function () {
            istar.graph.addCell(cell);
            istar.graph.addCell(links);

            for (let link of links) {
                if ('x' in link.prop('source')) {
                    link.prop('source', cell);
                }
                else if ('x' in link.prop('target')) {
                    link.prop('target', cell);
                }
                istar.paper.findViewByModel(link).hideTools(); // Hide the vertices' handles
            }
        }
    }

    if (cellToDelete.isDependum()) {
        istar.undoManager.addToHistory(
          undoDeleteDependency(cellToDelete, istar.graph.getConnectedLinks(cellToDelete))
        );
    }
    else if (cellToDelete.isDependencyLink()) {
        const {dependum, links} = getDependencyFromDependencyLink(cellToDelete);
        istar.undoManager.addToHistory(
          undoDeleteDependency(dependum, links)
        );
    }
    else if (cellToDelete.isContainerLink()) {
        istar.undoManager.addToHistory(
          function (link) {
              return function () {
                  istar.graph.addCell(link);
                  link.attr('connection-wrap/stroke', 'transparent');  // Hide the link highlight
              }
          }(cellToDelete)
        );
    }
    else if (cellToDelete.isContainer()) {
        let links = istar.graph.getConnectedLinks(cellToDelete);
        let dependencies = [];
        for (let link of links) {
            if (link.isDependencyLink()) {
                dependencies.push(getDependencyFromDependencyLink(link));
            }
        }
        links = _.filter(links, link => {return !link.isDependencyLink();});

        const children = cellToDelete.getEmbeddedCells();
        for (let child of children) {
            let nodeLinks = istar.graph.getConnectedLinks(child);
            for (let link of nodeLinks) {
                if (link.isDependencyLink()) {
                    dependencies.push(getDependencyFromDependencyLink(link));
                }
            }
        }

        istar.undoManager.addToHistory(
          function (cell, links, dependencies, children) {
              return function () {
                  istar.graph.addCell(cell);
                  istar.graph.addCell(links);

                  istar.graph.addCell(children);
                  for (let child of children) {
                      cell.embed(child);
                      if (child.isLink()) {
                          istar.paper.findViewByModel(child).hideTools(); // Hide the vertices' handles
                      }
                  }

                  for (let dependency of dependencies) {
                      undoDeleteDependency(dependency.dependum, dependency.links)();
                  }

                  cell.updateBoundary();
              }
          }(cellToDelete, links, dependencies, children)
        );
    }
    else if (cellToDelete.isNode()) {
        let nodeLinks = istar.graph.getConnectedLinks(cellToDelete);
        let dependencies = [];
        for (let link of nodeLinks) {
            if (link.isDependencyLink()) {
                dependencies.push(getDependencyFromDependencyLink(link));
            }
        }
        nodeLinks = _.filter(nodeLinks, link => {return !link.isDependencyLink();});

        istar.undoManager.addToHistory(
          function (cell, links, parentId, dependencies) {
              return function () {
                  istar.graph.addCell(cell);
                  istar.graph.addCell(links);

                  const parent = istar.graph.getCell(parentId);
                  parent.embed(cell);
                  parent.updateBoundary();

                  for (let link of links) {
                      parent.embed(link);
                      istar.paper.findViewByModel(link).hideTools(); // Hide the vertices' handles
                  }

                  for (let dependency of dependencies) {
                      undoDeleteDependency(dependency.dependum, dependency.links)();
                  }
              }
          }(cellToDelete, nodeLinks, cellToDelete.parent(), dependencies)
        );
    }
    else if (cellToDelete.isNodeLink()) {
        istar.undoManager.addToHistory(
          function (cell, parentId) {
              return function () {
                  istar.graph.addCell(cell);

                  const parent = istar.graph.getCell(parentId);
                  parent.embed(cell);

                  cell.attr('connection-wrap/stroke', 'transparent');  // Hide the link highlight
              }
          }(cellToDelete, cellToDelete.parent())
        );
    }
    ui.getSelectedCells()[0].remove();
    ui.selectPaper();
}
$(document).keyup(function (e) {
    'use strict';

    if (ui.states.editor.isViewing()) {
        if (ui.getSelectedCells()[0] !== null) {
            if (e.which === 8 || e.which === 46) {
                // 8: backspace
                // 46: delete
                // The use of the 'backspace' key, in addition to the 'delete', key aims to improve support for Mac users,
                //    since in that system the key named 'delete' actually is a 'backspace' key
                if (ui.getSelectedCells()[0].isKindOfActor) {
                    // If the selected cell does not have the isKindOfActor function, it means that it's not
                    // really a cell, but the diagram itself. Thus, only delete if it has this function.
                    if (ui.getSelectedCells()[0].isKindOfActor()) {
                        ui.confirm({
                            message: 'ATTENTION! Are you sure you want to delete this entire actor, along with its content?',
                            callback: function (value) {
                                if (value) {
                                    ui.deleteCell(ui.getSelectedCells()[0]);
                                }
                            }
                        });
                    } else {
                        ui.deleteCell(ui.getSelectedCells()[0]);
                    }
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.which === 90) {  //ctrl + z or command + z
                e.preventDefault();
                istar.undoManager.undo();
            }
        }
    }
    if (ui.states.editor.isAdding()) {
        if (e.which === 27) {  //esc
            ui.states.editor.ADDING.data.button.end();
            ui.selectPaper();
        }
    }
});

ui.resetPointerStyles = function () {
    'use strict';

    var $diagram = $('#diagram');
    $diagram.css('cursor', 'auto');
    $diagram.find('g').css('cursor', 'move');
    $diagram.find('.actorKindMain').css('cursor', 'move');
    $('.link-tools g').css('cursor', 'pointer');
};

ui._toggleSmoothness = function (link, vertices, something) {
    'use strict';

    if (vertices.length >= 1) {
        link.set('smooth', true);
    }
    else {
        link.set('smooth', false);
    }
};


ui.changeCustomPropertyValue = function (model, propertyName, propertyValue) {
    'use strict';

    if (propertyValue) {
        propertyValue = $.trim(propertyValue);
    }
    else {
        propertyValue = '';
    }
    model.prop('customProperties/' + propertyName, propertyValue);

    return model;
}






$('#fit-to-content-button').click(function () {
    'use strict';

    istar.paper.fitToContent({padding: 20, allowNewOrigin: 'any', minWidth: 150, minHeight: 150});

    // Update the positioning of the selection
    ui.hideSelection();
    ui.showSelection();
});

$('#reset-all-colors-button').click(function () {
    'use strict';

    $('#all-actor-boundary-color-picker').get(0).jscolor.fromString('E6E6E6');
    ui.changeColorBoundaries('#E6E6E6');
    $('#all-elements-color-picker').get(0).jscolor.fromString(ui.defaultElementBackgroundColor);
    ui.changeColorElements(ui.defaultElementBackgroundColor);
});

$('#reset-element-color-button').click(function () {
    'use strict';

    $('#single-element-color-picker').get(0).jscolor.fromString(ui.defaultElementBackgroundColor);
    ui.changeColorElement(ui.defaultElementBackgroundColor);
});

ui.setupSidepanelInteraction = function () {
    'use strict';

    var sidepanelSizes = ['size1', 'size2', 'size3'];
    var sidepanelCurrentSize = 1;
    ui.expandSidepanel = function () {
        if (sidepanelCurrentSize < (sidepanelSizes.length - 1)) {
            $('#sidepanel').removeClass(sidepanelSizes[sidepanelCurrentSize])
            sidepanelCurrentSize++;
            $('#sidepanel').addClass(sidepanelSizes[sidepanelCurrentSize])

            if (sidepanelCurrentSize === 1) {
                $('#sidepanel').removeClass('collapsed');
            }
            if (sidepanelCurrentSize === (sidepanelSizes.length - 1)) {
                $('#sidepanel').addClass('full');
            }
        }
    };
    ui.collapseSidepanel = function () {
        if (sidepanelCurrentSize > 0) {
            if (sidepanelCurrentSize === (sidepanelSizes.length - 1)) {
                $('#sidepanel').removeClass('full');
            }

            $('#sidepanel').removeClass(sidepanelSizes[sidepanelCurrentSize])
            sidepanelCurrentSize--;
            $('#sidepanel').addClass(sidepanelSizes[sidepanelCurrentSize])

            if (sidepanelCurrentSize === 0) {
                $('#sidepanel').addClass('collapsed');
            }
        }
    };
    $('.collapse-sidepanel-button').click(ui.collapseSidepanel);
    $('.expand-sidepanel-button').click(ui.expandSidepanel);

    $.fn.editable.defaults.mode = 'inline';//x-editable setting
};

ui.setupElementResizing = function () {
    'use strict';

    $('#resize-handle').hide();
    $('.cell-selection').hide();

    ui.resizeElement = function (element, width, height) {
        element.resize(width, height);

        ui.showSelection(ui.getSelectedCells()[0]);

        element.updateLineBreak();  // Update the line break on the element's label
    };

    ui.resizeHandlerOnMouseMove = function (e) {
        var viewBBox = ui.getSelectedCells()[0].findView(istar.paper).getBBox();
        var diagramPosition = $('#out').position();

        var newWidth = e.pageX - viewBBox.x - diagramPosition.left + $('#out').scrollLeft();
        var newHeight = e.pageY - viewBBox.y - diagramPosition.top + $('#out').scrollTop();
        if (newWidth < 20) newWidth = 20;
        if (newHeight < 20) newHeight = 20;

        ui.resizeElement(ui.getSelectedCells()[0], newWidth, newHeight);
    };

    ui.endResize = function (e) {
        istar.resizePaperBasedOnCell(ui.getSelectedCells()[0]);
        $(window).off('mousemove', ui.resizeHandlerOnMouseMove);
        $(window).off('mouseup', ui.endResize);
    };

    $('#resize-handle').mousedown(function (e) {
        e.preventDefault();
        $(window).mousemove(ui.resizeHandlerOnMouseMove);
        $(window).mouseup(ui.endResize);
    });
    $('#resize-handle').dblclick(function (e) {
        e.preventDefault();

        //restore element to a default size
        ui.resizeElement(
            ui.getSelectedCells()[0],
            ui.getSelectedCells()[0].prop('originalSize/width'),
            ui.getSelectedCells()[0].prop('originalSize/height')
        );
        if (ui.getSelectedCells()[0].get('parent')) {
            istar.graph.getCell(ui.getSelectedCells()[0].get('parent')).updateBoundary();
        }
    });
};

ui.alert = function (body, title) {
    'use strict';

    bootbox.alert({
        title: title,
        message: body
    });
};

ui.confirm = function (options) {
    'use strict';
    //change state to prevent accidental deletes
    ui.states.editor.transitionTo(ui.states.editor.EDITING_TEXT);

    var callback = options.callback;
    options.callback = function (value) {
        //change state back to VIEWING after the prompt is dismissed
        ui.states.editor.transitionTo(ui.states.editor.VIEWING);
        callback(value);
    };
    options.swapButtonOrder = true;
    bootbox.confirm(options);
    // .on('shown.bs.modal', function(e){
    //     Automatically select the content of the input, so that the user doesn't have to
    // $(this).find('input').select();
    // });
};

ui.prompt = function (options) {
    'use strict';
    //change state to prevent accidental deletes
    ui.states.editor.transitionTo(ui.states.editor.EDITING_TEXT);

    var callback = options.callback;
    options.callback = function (value) {
        //change state back to VIEWING after the prompt is dismissed
        ui.states.editor.transitionTo(ui.states.editor.VIEWING);
        callback(value);
    };
    options.swapButtonOrder = true;
    bootbox.prompt(options)
        .on('shown.bs.modal', function(e){
            //Automatically select the content of the input, so that the user doesn't have to
            $(this).find('input').select();
        });
};

ui.displayInvalidLinkMessage = function (message) {
    'use strict';

    if (message) {
        ui.alert('INVALID: Sorry, but ' + message, 'Invalid link');
    }
    else {
        ui.alert('INVALID: Sorry, but this link you are trying to create is invalid');
    }
    ui.collectErrorData('error');
};

ui.displayInvalidModelMessage = function (messages) {
    'use strict';

    if (messages) {
        var text = '<div class="alert alert-danger">Hello there! Previous versions of the piStar tool allowed the creation of models that break ' +
            'some rules of the <a href="https://sites.google.com/site/istarlanguage/" target="_blank">iStar 2.0 Language Guide</a>. Please address the issues listed below ' +
            'in order to ensure that your model will continue to open correctly in future versions of the tool.</div>';
        text += '<h4>Errors:</h4><ul>';

        _.forEach(messages, function (message) {
            text += '<li>' + message + '</li>';
            console.log('INVALID: ' + message);
        });
        text += '</ul>';
        ui.alert(text, 'Invalid model');
    }
};

//overrides istar.displayInvalidModelMessages, in order to display the messages in the user interface
istar.displayInvalidModelMessages = ui.displayInvalidModelMessage;

$('#menu-button-new-model').click(function () {
    'use strict';

    ui.confirm({
        message: 'Are you sure you want to create a new model and delete the current model? This action is irreversible.',
        callback: function (result) {
            if (result === true) {
                istar.clearModel();
            }
        }
    });
});

ui.changeDependencyLinksOpacity = function (dependumOpacity, linkOpacity) {
    'use strict';

    var dependencyCells = _.filter(istar.getCells(), function (cell) {
        return (cell.isDependum() || cell.isDependencyLink());
    });

    if (dependumOpacity === 1) {
        _.forEach(dependencyCells, function (cell) {
            cell.attr('*/display', 'visible');
        });
        setTimeout(function () {
            setDependenciesOpacity(dependencyCells, dependumOpacity, linkOpacity);
        }, 30);
    }
    else if (linkOpacity === 0) {
        setDependenciesOpacity(dependencyCells, dependumOpacity, linkOpacity);
        setTimeout(function () {
            _.forEach(dependencyCells, function (cell) {
                cell.attr('*/display', 'none');
            });
        }, 300);
    }
    else {
        setDependenciesOpacity(dependencyCells, dependumOpacity, linkOpacity);
    }

    function setDependenciesOpacity(dependencyCells, dependumOpacity, linkOpacity) {
        _.forEach(dependencyCells, function (cell) {
            if (cell.isDependum()) {
                cell.attr('*/opacity', dependumOpacity);
            }
            else {
                cell.attr('*/opacity', linkOpacity);
            }
        });
    }
};

ui.changeContributionLinksOpacity = function (linkOpacity) {
    'use strict';

    var contributionLinks = _.filter(istar.getLinks(), function (link) {
        return link.isContributionLink();
    });

    if (linkOpacity === 1) {
        _.forEach(contributionLinks, function (link) {
            link.attr('*/display', 'visible');
        });
        setTimeout(function () {
            setContributionsOpacity(contributionLinks, linkOpacity);
        }, 30);
    }
    else if (linkOpacity === 0) {
        setContributionsOpacity(contributionLinks, linkOpacity);
        setTimeout(function () {
            _.forEach(contributionLinks, function (link) {
                link.attr('*/display', 'none');
            });
        }, 300);
    }
    else {
        setContributionsOpacity(contributionLinks, linkOpacity);
    }

    function setContributionsOpacity(contributionLinks, linkOpacity) {
        _.forEach(contributionLinks, function (link) {
            // link.attr('line/opacity', linkOpacity);
            // link.attr('text/opacity', linkOpacity);
            link.attr('path/opacity', linkOpacity);
            link.attr('.labels/opacity', linkOpacity);
        });
    }
};

ui.resetCellDisplayStates = function () {
    'use strict';

    this.states.cellDisplay.dependencies.currentState = 0;
    this.states.cellDisplay.contributionLinks.currentState = 0;
}

$('#menu-button-toggle-dependencies-display').click(function () {
    'use strict';

    if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.NORMAL) {
        ui.states.cellDisplay.dependencies.currentState = ui.states.cellDisplay.dependencies.PARTIAL;
        //links are darker than dependums. That's why its opacity is smaller
        ui.changeDependencyLinksOpacity(0.4, 0.1);
    }
    else if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.PARTIAL) {
        ui.states.cellDisplay.dependencies.currentState = ui.states.cellDisplay.dependencies.HIDDEN;
        ui.changeDependencyLinksOpacity(0, 0);
        ui.selectPaper();
    }
    else if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.HIDDEN) {
        ui.states.cellDisplay.dependencies.currentState = ui.states.cellDisplay.dependencies.NORMAL;
        ui.changeDependencyLinksOpacity(1, 1);
    }
});

$('#menu-button-toggle-contributions-display').click(function () {
    'use strict';

    if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.NORMAL) {
        ui.states.cellDisplay.contributionLinks.currentState = ui.states.cellDisplay.contributionLinks.PARTIAL;
        //links are darker than dependums. That's why its opacity is smaller
        ui.changeContributionLinksOpacity(0.3);
    }
    else if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.PARTIAL) {
        ui.states.cellDisplay.contributionLinks.currentState = ui.states.cellDisplay.contributionLinks.HIDDEN;
        ui.changeContributionLinksOpacity(0);
        ui.selectPaper();
    }
    else if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.HIDDEN) {
        ui.states.cellDisplay.contributionLinks.currentState = ui.states.cellDisplay.contributionLinks.NORMAL;
        ui.changeContributionLinksOpacity(1);
    }
});

$('#menu-item-undo').click(function () {
    'use strict';

    istar.undoManager.undo();
});

// Prevent accidental undos. There's no need to use this button through the keyboard, since the user can use
// its shortcut instead
$('#menu-item-undo').focus(function (e) {this.blur()});

istar.undoManager.callback = function(empty) {
    'use strict';

    if (empty) {
        $('#menu-item-undo').addClass('inactive');
    }
    else {
        $('#menu-item-undo').removeClass('inactive');
    }
}

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, console:false, $:false, _:false, joint:false, uiC:false, bootbox:false */