/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
 * https://github.com/jhcp/pistar
 */

var ui = function() {
    'use strict';

    var selectedElement = null;

    return {
        STATE_ADD_ACTOR: 'addActor',
        STATE_ADD_LINK: 'addLink',
        STATE_ADD_NODE: 'addNode',
        STATE_VIEW: 'view',

        currentButton: null, //the button that is currently selected
        currentState: 'view',
        currentAddingElement: 'none',
        linkSource: 'none',
        linkTarget: 'none',
        linkValue: 'none',
        dependencyType: 'none',
        selectedElement: null,
        defaultElementBackgroundColor: '#CCFACD',

        currentStateIsAddKindOfActor: function () {
            return this.currentState === this.STATE_ADD_ACTOR;
        },
        currentStateIsAddLink: function () {
            return this.currentState === this.STATE_ADD_LINK;
        },
        currentStateIsAddNode: function () {
            return this.currentState === this.STATE_ADD_NODE;
        },
        currentStateIsView: function () {
            return this.currentState === this.STATE_VIEW;
        },

        isCurrentlyAddingElement: function () {
            return this.currentAddingElement !== 'none';
        },
        isLinkSourceUndefined: function () {
            return this.linkSource === 'none';
        },
        isLinkTargetUndefined: function () {
            return this.linkTarget === 'none';
        },

        resetAddingElement: function () {
            this.currentAddingElement = 'none';
            return this;
        },
        resetLinkSource: function () {
            this.linkSource = 'none';
            return this;
        },
        resetLinkTarget: function () {
            this.linkTarget = 'none';
            return this;
        },
        getSelectedElement: function() {
            return this.selectedElement;
        },
        selectElement: function(element, elementView) {
            if (element) {
                var toTrigger = false;
                if (this.selectedElement && this.selectedElement !== element) {
                    this.clearSelection();
                }
                if (this.selectedElement !== element) {
                    //there is no need to trigger a change:selection event if the same element is being selected
                    toTrigger = true;
                }

                //actual selection change
                this.selectedElement = element;

                if (toTrigger) {
                    elementView = elementView || istar.paper.findViewByModel(element);
                    istar.paper.trigger('change:selection', {selectedElement: element, selectedElementView: elementView});
                }
                if (element.isElement()) {
                  $('#sidepanel-tab-style').show();
                }
                else {
                  $('#sidepanel-tab-style').hide();
                }
            }
        },
        deselectElement: function(element, elementView) {
            if (element) {
                elementView = elementView || istar.paper.findViewByModel(element);

                //actual selection change
                this.selectedElement = null;

                istar.paper.trigger('change:selection', {deselectedElement: element, deselectedElementView: elementView});
            }
        },
        clearSelection: function() {
            if (this.selectedElement) {
                var elementView = istar.paper.findViewByModel(this.selectedElement);
                this.deselectElement(this.selectedElement, elementView);
            }
        },
        selectModel: function() {
            if (this.selectedElement !== istar.graph) {
                this.clearSelection();
                this.selectedElement = istar.graph;
                istar.paper.trigger('change:selection', {selectedElement: istar.graph});

                //closes any color picker that may be open
                $('.jscolor').each(function () {
                    this.jscolor.hide();
                });

                $('#sidepanel-tab-style').hide();
                $('#sidepanel-tab-properties a').tab('show');
            }
        },
        hideSelection: function() {
            if (this.selectedElement) {
                this.unhighlightFocus(istar.paper.findViewByModel(this.selectedElement));
            }
        },
        showSelection: function() {
            if (this.selectedElement) {
                this.highlightFocus(istar.paper.findViewByModel(this.selectedElement));
            }
        }
    };
}();


ui.highlightFocus = function (cellView) {
    'use strict';

    if (cellView) {
        var elementBox = cellView.getBBox();

        //positioning and display of the selection box
        $('.element-selection').css({
            left: elementBox.x-3 + 'px',
            top: elementBox.y-3 + 'px',
            width: (elementBox.width + 6) + 'px',
            height: (elementBox.height + 6) + 'px'
        });
        $('.element-selection').show();

        //positioning and display  of the resizing handle, when applicable
        if (! cellView.model.isKindOfActor() && cellView.model.isElement()) {
            $('#resize-handle').css({left: elementBox.x - 4 + elementBox.width, top: elementBox.y - 4 + elementBox.height});
            $('#resize-handle').show();
        }

    }
};

ui.unhighlightFocus = function (cellView) {
    'use strict';

    $('#resize-handle').hide();
    $('.element-selection').hide();
};
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
                    //this if prevents updating the selection when the link is being translated along with its parent
                    ui.showSelection();
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
        ui.selectElement(linkView.model, linkView);
    });

    istar.paper.on('link:mouseleave', function(linkView) {
        linkView.hideTools();
        linkView.model.attr('connection-wrap/stroke', 'rgba(190, 190, 190, 0)');
    });

    istar.paper.on('change:selection', function(selection) {
        if (selection.selectedElement) {
            ui.table = new ui.components.PropertiesTableView({model: selection.selectedElement}).render();
            if (selection.selectedElementView) {
                ui.highlightFocus(selection.selectedElementView);
            }
        }
        else if (selection.deselectedElement){
            ui.unhighlightFocus(selection.deselectedElementView);
            ui.table.remove();
            $('#properties-table').find('tbody').html('');
            $('#cell-buttons').html('');
        }
    });

    istar.paper.on('blank:pointerdown', function (evt, x, y) {
        if (ui.getSelectedElement()) {
            ui.selectModel();
        }
        if (ui.currentStateIsAddKindOfActor()) {
            ui.addElementOnPaper({position: {x: x, y: y}});
        }
        if (ui.currentStateIsAddNode()) {
            ui.addElementOnPaper({position: {x: x, y: y}});
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
            if (cellView.model.isKindOfInnerElement()) {
                cellView.$('.element').css({fill: 'black'});
                cellView.$('.content').css({fill: 'white'});
                cellView.$('.stereotype').css({fill: 'white'});

                _.forEach(istar.graph.getNeighbors(cellView.model), function (cell) {
                    cell.findView(istar.paper).$('.element').css({fill: '#FABF6E'});
                });
            }

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
                if (cellView.model.isKindOfInnerElement()) {
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
            if (cellView.model.isKindOfInnerElement()) {

                cellView.$('.element').css({fill: ''});
                cellView.$('.content').css({fill: ''});
                cellView.$('.stereotype').css({fill: ''});
                _.forEach(istar.graph.getNeighbors(cellView.model), function (cell) {
                    cell.findView(istar.paper).$('.element').css({fill: ''});
                });
            }

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
                if (cellView.model.isKindOfInnerElement()) {
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
        if (ui.currentStateIsView()) {
            if (!cellView.model.isLink()) {
                ui.selectElement(cellView.model, cellView);
            }
        }
        if (ui.getSelectedElement().findView) {
            ui.hideSelection();
        }
    });
    istar.paper.on('cell:pointerup', function (cellView, evt, x, y) {
        if (evt.ctrlKey || evt.altKey) {
            //collapse/uncollapse actors when alt-clicked
            if (cellView.model.isKindOfActor()) {
                ui.hideSelection();//remove the focus from the actor
                cellView.model.toggleCollapse();
                ui.showSelection();//give the focus back to actor, now collapsed or expanded
            }
        }
        if (ui.currentStateIsAddNode()) {
            ui.addElementOnActor(cellView, {position: {x: x, y: y}});
            if (cellView.model.prop('collapsed')) {
                cellView.model.toggleCollapse();
            }
        }
        else if (ui.currentStateIsAddLink()) {
            var isContainerLink = _.includes(istar.metamodel.getContainerLinksNames(), ui.currentAddingElement);
            var isNodeLink = _.includes(istar.metamodel.getNodeLinksNames(), ui.currentAddingElement);
            var isDependencyLink = _.includes(ui.currentAddingElement, 'DependencyLink');

            if (cellView.model.isKindOfActor()) {
                if (isContainerLink) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;
                        var isValid = istar.metamodel.containerLinks[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                        if (isValid.isValid) {
                            ui.addLinkBetweenActors(ui.currentAddingElement, cellView);
                        }
                        else {
                            ui.displayInvalidLinkMessage(isValid.message);
                            ui.linkSource.unhighlight();
                            ui.currentButton.end();
                        }
                    }
                }
                else if (isDependencyLink) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;
                        var isValid = istar.metamodel.dependencyLinks['DependencyLink'].isValid(ui.linkSource.model, ui.linkTarget.model, ui.dependencyType);
                        if (isValid.isValid) {
                            ui.addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
                        }
                        else {
                            ui.displayInvalidLinkMessage(isValid.message);
                        }
                        ui.linkSource.unhighlight();
                        ui.currentButton.end();
                    }
                }
            }
            else {

                if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|DependencyLink/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight({blur: 10, color: 'blue'});
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;

                        if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink/)) {
                            var newLink = null;
                            var prettyLinkName = '';
                            if (ui.currentAddingElement === 'AndRefinementLink') {
                                var isValid = istar.metamodel.nodeLinks[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addAndRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                            }
                            else if (ui.currentAddingElement === 'OrRefinementLink') {
                                var isValid = istar.metamodel.nodeLinks[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addOrRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                            }
                            else if (ui.currentAddingElement === 'NeededByLink') {
                                // isValid = istar.metamodel.nodeLinks[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                // if (isValid.isValid) {
                                //     newLink = istar.addNeededByLink(ui.linkSource.model, ui.linkTarget.model);
                                // }

                                var temp = ui.linkSource;
                                var undoInversion = false;
                                if ((ui.linkSource.model.isTask()) && ui.linkTarget.model.isResource()) {
                                    ui.linkSource = ui.linkTarget;
                                    ui.linkTarget = temp;
                                    undoInversion = true;
                                }
                                var isValid = istar.metamodel.nodeLinks[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addNeededByLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                                if (undoInversion) {
                                    temp = ui.linkSource;
                                    ui.linkSource = ui.linkTarget;
                                    ui.linkTarget = temp;
                                }
                            }
                            else if (ui.currentAddingElement === 'QualificationLink') {
                                var temp = ui.linkSource;
                                var undoInversion = false;
                                if ((!ui.linkSource.model.isQuality()) && ui.linkTarget.model.isQuality()) {
                                    ui.linkSource = ui.linkTarget;
                                    ui.linkTarget = temp;
                                    undoInversion = true;
                                }
                                isValid = istar.metamodel.nodeLinks[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addQualificationLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                                if (undoInversion) {
                                    temp = ui.linkSource;
                                    ui.linkSource = ui.linkTarget;
                                    ui.linkTarget = temp;
                                }
                            }
                            else if (ui.currentAddingElement.match(/ContributionLink/i)) {
                                var isValid = istar.metamodel.nodeLinks['ContributionLink'].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addContributionLink(ui.linkSource.model, ui.linkTarget.model, ui.linkValue);
                                    if (newLink) {
                                        //do some magic in order to keep links straight when there are no vertices defined
                                        newLink.on('change:vertices', ui._toggleSmoothness);
                                    }
                                }
                            }
                            if (! isValid.isValid) {
                                ui.displayInvalidLinkMessage(isValid.message);
                            }
                        }
                        else if (ui.dependencyType.match(/DependencyLink/)) {
                            var isValid = istar.metamodel.dependencyLinks['DependencyLink'].isValid(ui.linkSource.model, ui.linkTarget.model);
                            if (isValid.isValid) {
                                ui.addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
                            }
                            else {
                                ui.displayInvalidLinkMessage(isValid.message);
                            }
                        }

                        ui.linkSource.unhighlight();
                        ui.currentButton.end();
                    }
                }
            }
        }
        else if (ui.currentStateIsView()) {
            //increase the drawing area if there is an element beyond its edges

            //get the Bounding Box from the view, which ignores hidden inner elements
            //In contrast, if we were to get the Bounding Box from the model, the dimensions would be
            //that of a expanded actor even if it were collapsed
            var cellBBox = cellView.getBBox();

            var paperWidth = istar.paper.getArea().width;

            //Round the numbers of the new dimension since:
            // a) Precision is not relevant here
            // b) Int numbers are easier for the user to handle (when manually changing the size)
            if (cellBBox.y + cellBBox.height > istar.paper.getArea().height ) {
                //if the element is beyond the right edge
                istar.paper.setDimensions(paperWidth, Math.round(cellBBox.y + cellBBox.height + 40));
            }
            if (cellBBox.x + cellBBox.width > paperWidth ) {
                //if the element is beyond the bottom edge
                istar.paper.setDimensions(Math.round(cellBBox.x + cellBBox.width + 40));
            }

            if (ui.getSelectedElement().findView) {
                ui.highlightFocus(ui.getSelectedElement().findView(istar.paper));
            }
        }
    });

    istar.paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
        if ( ! (evt.ctrlKey || evt.altKey) ) {
            var newText;
            if (cellView.model.isElement()) {
                ui.showSelection();

                //set a delay in order to give the browser time to actually show the selected element
                setTimeout(function () {
                    var oldText = cellView.model.prop('name');
                    newText = window.prompt('Edit text:', oldText);
                    if (newText !== null) {
                        cellView.model.prop('name', newText);
                    }
                }, 30);


            }
        }
    });

    istar.paper.on('cell:contextmenu', function (cellView, evt, x, y) {
        //highlight the contextual actions panel when users right clicks a Cell,
        // letting they know where to find such actions
        ui.selectElement(cellView.model);
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

ui.addElementOnPaper = function (options) {
    'use strict';

    try {
        var isValid = {isValid: false};
        if (ui.currentStateIsAddNode()) {
            if (istar.metamodel.nodes[ui.currentAddingElement]) {
                if (istar.metamodel.nodes[ui.currentAddingElement].canBeOnCanvas) {
                    isValid = istar.metamodel.nodes[ui.currentAddingElement].isValid();
                }
                else {
                    isValid = {
                        message: 'a ' + ui.currentAddingElement + ' cannot be added directly to the canvas, it must be added <b>inside</b> an Actor.'
                    };
                    if (istar.metamodel.nodes[ui.currentAddingElement].canBeDependum) {
                        isValid.message += '<br><br>If you are trying to add a dependency link, please try the "Dependency..." button';
                    }
                }
            }
        }
        else if (ui.currentStateIsAddKindOfActor()) {
            if (istar.metamodel.containers[ui.currentAddingElement]) {
                isValid = istar.metamodel.containers[ui.currentAddingElement].isValid();
            }
        }

        if (isValid.isValid) {
            var newActor = istar['add' + ui.currentAddingElement]('', options);
            newActor.prop('customProperties/Description', '');
            ui.selectElement(newActor);
        }
        else {
            ui.displayInvalidLinkMessage(isValid.message);
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.currentButton.end();
    }
};

ui.addElementOnActor = function (cellView, options) {
    'use strict';

    try {
        var isValid = {isValid: false};
        if (istar.metamodel.nodes[ui.currentAddingElement]) {
            if (istar.metamodel.nodes[ui.currentAddingElement].canBeInnerElement) {
                isValid = istar.metamodel.nodes[ui.currentAddingElement].isValid(cellView.model);
            }
            else {
                isValid = {
                    message: 'a ' + ui.currentAddingElement + ' cannot be added inside an actor'
                };
            }
        }

        if (isValid.isValid) {
            var element = ui.addElementInPlace(cellView.model, istar['add' + ui.currentAddingElement], options);
            element.prop('customProperties/Description', '');
            ui.selectElement(element);
        }
        else {
            ui.displayInvalidLinkMessage(isValid.message);
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.currentButton.end();
    }
};
ui.addLinkBetweenActors = function (newLink, targetCellView) {
    'use strict';

    try {
        ui.linkTarget = targetCellView;
        if (istar.metamodel.containerLinks[newLink].isValid(ui.linkSource.model, ui.linkTarget.model)) {
            istar['add' + ui.currentAddingElement](ui.linkSource.model, ui.linkTarget.model);
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.linkSource.unhighlight();
        ui.currentButton.end();
    }
};

ui.addDependency = function (source, dependencyType, target) {
    'use strict';

    var node = '';
    var position = {x: 10, y: 10};
    var text = 'Dependum';

    var dependumType = dependencyType.replace('DependencyLink', '');
    node = istar['add' + dependumType](text, position);

    var links = istar.addDependencyLink(source, node, target);
    links[0].on('change:vertices', ui._toggleSmoothness);
    links[1].on('change:vertices', ui._toggleSmoothness);

    ui.setupDependencyRemoval(links);

    node.prop('customProperties/Description', '');
    ui.selectElement(node);
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

ui.addElementInPlace = function (clickedNode, callback, options) {
    'use strict';

    ui.currentState = ui.STATE_VIEW;
    ui.resetAddingElement();
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
}


ui.changeColorActorContainer = function (color) {
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
        node.attr('circle', {fill: color});
        if (node.isKindOfInnerElement()) {
            node.attr('.element', {fill: color});
        }
    });
};
ui.changeColorElement = function (color, element) {
    'use strict';

    element = element || ui.getSelectedElement();
    ui.hideSelection();
    if (element.isKindOfActor()) {
        element.attr('.actorSymbol', {fill: color});
    }
    else {
        element.attr('.element', {fill: color});
    }
    if (color === ui.defaultElementBackgroundColor) {
        element.prop('backgroundColor', null);
    }
    else {
        element.prop('backgroundColor', color);
    }

    ui.showSelection();
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
        ui.selectModel();
    }, 100);
};

$('#input-file-format').change(function () {
    'use strict';

    if ($(this).val() === "PNG") {
        $('#save-png-options').removeClass('hidden');
    }
    else {
        $('#save-png-options').addClass('hidden');
    }

});

$('#modal-button-save-image').click(function () {
    'use strict';

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
        ui.showSelection(ui.getSelectedElement());

        $('body *').removeClass('waiting');
        $saveButton.button('reset');
        $saveButton.removeAttr('disabled');
        $('#modal-save-image').modal('hide');
    }, 100);

});

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
                    if (ui.getSelectedElement().findView) {
                        ui.unhighlightFocus(ui.getSelectedElement().findView(istar.paper));
                    }
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        ui.resetCellDisplayStates();
                        istar.fileManager.loadModel(e.target.result);//do the actual loading
                        ui.selectModel();//select the model (as a whole)

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

    ui.selectModel();

    function overrideIstarFunctions() {
        //extend original iStar functions with UI behavior
        var originalFunction = null;

        originalFunction = istar.clearModel;
        istar.clearModel = function() {
            originalFunction();
            ui.selectModel();
        };
    }
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
            if (ui.getSelectedElement().findView) {
                ui.unhighlightFocus(ui.getSelectedElement().findView(istar.paper));
            }
            ui.resetCellDisplayStates();
            istar.fileManager.loadModel(istar.examples[modelToLoad]);
            ui.selectModel();//select the model (as a whole)
            $('.modal *').removeClass('waiting');
            $('#modal-examples').modal('hide');
        }, 100);

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
            ui.changeStateToEdit();
        })
        .focusout(function () {
            ui.changeStateToView();
        });

};

$('#all-actor-boundary-color-picker').on('change', function () {
    'use strict';

    ui.changeColorActorContainer(this.value);
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

    if (confirm("ATTENTION! This action will remove all vertices you may have added to the links in this model. Are you sure you want to do this?")) {
        var selectedElement = ui.getSelectedElement();
        _.forEach(istar.getLinks(), function (link) {
            link.vertices([]);
        });

        //restore selection to the element that was selected (if any) when the action started
        ui.selectElement(selectedElement);
    }
});

// var hoverButtons = [];
//
// function createButtons() {
//     'use strict';
//
//     hoverButtons = [];
//
//     return this;
// }

ui.changeStatus = function (text) {
    'use strict';

    $('#status').html(text);
};

$(document).keyup(function (e) {
    'use strict';

    if (ui.getSelectedElement() !== null) {
        if (ui.currentStateIsView()) {
            if (e.which === 8 || e.which === 46) {
                // 8: backspace
                // 46: delete
                // The use of the 'backspace' key, in addition to the 'delete', key aims to improve support for Mac users,
                //    since in that system the key named 'delete' actually is a 'backspace' key
                ui.getSelectedElement().remove();
                ui.selectModel();
            }
            if (e.which === 27) {  //esc
                ui.selectModel();
            }
        }
    }
    if (ui.isCurrentlyAddingElement()) {
        if (e.which === 27) {  //esc
            ui.currentButton.end();
            ui.selectModel();
        }
    }
});

ui.changeStateToEdit = function () {
    'use strict';

    ui.currentState = 'edit';
    ui.resetPointerStyles();
};
ui.changeStateToView = function () {
    'use strict';

    ui.currentState = 'view';
};

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

    istar.paper.fitToContent({padding: 20, allowNewOrigin: 'any'});
});

$('#reset-all-colors-button').click(function () {
    'use strict';

    $('#all-actor-boundary-color-picker').get(0).jscolor.fromString('E6E6E6');
    ui.changeColorActorContainer('#E6E6E6');
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
    $('.element-selection').hide();

    ui.resizeElement = function (element, width, height) {
        element.resize(width, height);

        ui.highlightFocus(ui.getSelectedElement().findView(istar.paper));
        // $('.element-selection').css({
        //     width: (width + 6) + 'px',
        //     height: (height + 6) + 'px'
        // });
        // $('#resize-handle').css({
        //     left: viewBBox.x - 4 + width,
        //     top: viewBBox.y - 4 + height
        // });

        //update the line break on the element's label
        element.updateLineBreak();
    };

    ui.resizeHandlerOnMouseMove = function (e) {
        var viewBBox = ui.getSelectedElement().findView(istar.paper).getBBox();
        var diagramPosition = $('#out').position();

        var newWidth = e.pageX - viewBBox.x - diagramPosition.left + $('#out').scrollLeft();
        var newHeight = e.pageY - viewBBox.y - diagramPosition.top + $('#out').scrollTop();
        if (newWidth < 20) newWidth = 20;
        if (newHeight < 20) newHeight = 20;

        ui.resizeElement(ui.getSelectedElement(), newWidth, newHeight);
    };

    ui.stopResizeMouseEvents = function (e) {
        $(window).off('mousemove', ui.resizeHandlerOnMouseMove);
        $(window).off('mouseup', ui.stopResizeMouseEvents);
    };

    $('#resize-handle').mousedown(function (e) {
        e.preventDefault();
        $(window).mousemove(ui.resizeHandlerOnMouseMove);
        $(window).mouseup(ui.stopResizeMouseEvents);
    });
    $('#resize-handle').dblclick(function (e) {
        e.preventDefault();

        //restore element to a default size
        ui.resizeElement(
            ui.getSelectedElement(),
            ui.getSelectedElement().prop('originalSize/width'),
            ui.getSelectedElement().prop('originalSize/height')
        );
        if (ui.getSelectedElement().get('parent')) {
            istar.graph.getCell(ui.getSelectedElement().get('parent')).updateBoundary();
        }
    });
};

ui.alert = function (body, title) {
    'use strict';

    $('#body-alert-modal').html(body);
    if (title) {
        $('#label-alert-modal').html(title);
    }
    else {
        $('#label-alert-modal').html('alert');
    }
    $('#modal-alert').modal('show');
};
$('#modal-alert').on('shown.bs.modal', function () {
    'use strict';

    $('#close-button-alert-modal').focus();
});

ui.displayInvalidLinkMessage = function (message) {
    'use strict';

    if (message) {
        ui.alert('INVALID: Sorry, but ' + message, 'Invalid link');
    }
    else {
        ui.alert('INVALID: Sorry, but this link you are trying to create is invalid');
    }
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

    var confirmed = confirm('Are you sure you want to create a new model and delete the current model?');
    if (confirmed) {
        istar.clearModel();
    }
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

ui.states = {};
ui.states.cellDisplay = {
    dependencies: {
        DISPLAY: 0,
        PARTIAL: 1,
        FULL: 2,
        currentState: 0
    },
    contributionLinks: {
        DISPLAY: 0,
        PARTIAL: 1,
        FULL: 2,
        currentState: 0
    }
};

ui.resetCellDisplayStates = function () {
    'use strict';

    this.states.cellDisplay.dependencies.currentState = 0;
    this.states.cellDisplay.contributionLinks.currentState = 0;
}

$('#menu-button-toggle-dependencies-display').click(function () {
    'use strict';

    if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.DISPLAY) {
        ui.states.cellDisplay.dependencies.currentState = ui.states.cellDisplay.dependencies.PARTIAL;
        //links are darker than dependums. That's why its opacity is smaller
        ui.changeDependencyLinksOpacity(0.4, 0.1);
    }
    else if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.PARTIAL) {
        ui.states.cellDisplay.dependencies.currentState = ui.states.cellDisplay.dependencies.FULL;
        ui.changeDependencyLinksOpacity(0, 0);
        ui.selectModel();
    }
    else if (ui.states.cellDisplay.dependencies.currentState === ui.states.cellDisplay.dependencies.FULL) {
        ui.states.cellDisplay.dependencies.currentState = ui.states.cellDisplay.dependencies.DISPLAY;
        ui.changeDependencyLinksOpacity(1, 1);
    }
});

$('#menu-button-toggle-contributions-display').click(function () {
    'use strict';

    if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.DISPLAY) {
        ui.states.cellDisplay.contributionLinks.currentState = ui.states.cellDisplay.contributionLinks.PARTIAL;
        //links are darker than dependums. That's why its opacity is smaller
        ui.changeContributionLinksOpacity(0.3);
    }
    else if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.PARTIAL) {
        ui.states.cellDisplay.contributionLinks.currentState = ui.states.cellDisplay.contributionLinks.FULL;
        ui.changeContributionLinksOpacity(0);
        ui.selectModel();
    }
    else if (ui.states.cellDisplay.contributionLinks.currentState === ui.states.cellDisplay.contributionLinks.FULL) {
        ui.states.cellDisplay.contributionLinks.currentState = ui.states.cellDisplay.contributionLinks.DISPLAY;
        ui.changeContributionLinksOpacity(1);
    }
});

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, console:false, $:false, _:false, joint:false, uiC:false */