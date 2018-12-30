/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */

// noinspection JSUnusedGlobalSymbols
var ui = function() {
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
        dependencyType: 'GoalDependencyLink',
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
                if (this.selectedElement && this.selectedElement != element) {
                    this.clearSelection();
                }
                if (this.selectedElement != element) {
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
                var elementView = elementView || istar.paper.findViewByModel(element);

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
            if (this.selectedElement != istar.graph) {
                this.clearSelection();
                this.selectedElement = istar.graph;
                istar.paper.trigger('change:selection', {selectedElement: istar.graph});

                //closes any color picker that may be open
                $('.jscolor').each(function () {
                    this.jscolor.hide();
                });

                $('#sidepanel-tab-style').hide();
                $('#sidepanel-tab-properties a').tab('show')
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
    if (cellView) {
        elementBox = cellView.getBBox();

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
    $('#resize-handle').hide();
    $('.element-selection').hide();
};
ui.defineInteractions = function () {
    istar.graph.on('add', function(cell) {
        if (cell.isLink()) {
            var verticesTool = new joint.linkTools.Vertices({snapRadius: 1});
            // var removeButton = new joint.linkTools.Remove();
            // var toolsView = new joint.dia.ToolsView({tools: [verticesTool, removeButton]});
            var toolsView = new joint.dia.ToolsView({tools: [verticesTool]});
            cell.findView(istar.paper).addTools(toolsView).hideTools();
            cell.on('change:vertices', function(linkModel) {
                ui.clearSelection();
                ui.selectElement(linkModel, linkModel.findView(istar.paper));
            });
        }
    });

    istar.paper.on('link:mouseenter', function(linkView) {
        linkView.showTools();
        linkView.model.attr('connection-wrap/strokeWidth', 20);
        linkView.model.attr('connection-wrap/stroke', 'lightgrey');
    });

    istar.paper.on('link:pointerup', function(linkView) {
        ui.selectElement(linkView.model, linkView);
    });

    istar.paper.on('link:mouseleave', function(linkView) {
        linkView.hideTools();
        linkView.model.attr('connection-wrap/stroke', 'transparent');
    });

    istar.graph.on('add', function(cell) {
        if (cell.isElement()) {
            cell.updateLineBreak = function() {
                this.changeNodeContent(this.prop('name'), {breakLine: true, breakWidth: this.findView(istar.paper).getBBox().width});
            };
        }
    });

    istar.paper.on('change:selection', function(selection) {
        if (selection.selectedElement) {
            ui.table = new uiC.PropertiesTableView({model: selection.selectedElement}).render();
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
            ui.addElementOnPaper(x, y);
        }
    });

    istar.paper.on('cell:mouseover', function (cellView, evt, x, y) {
        //indicates that the mouse is over a given actor
        //.css() is used instead of .attr() because the latter is bugged with elements containing a path element
        color = '#1C5052';
        if (cellView.model.isKindOfActor()) {
            if (cellView.model.prop('collapsed')) {
                cellView.$('circle').css({stroke: color, 'stroke-width': '3'});
                cellView.$('.actorDecorator').css({stroke: color, 'stroke-width': '2'});
            }
            else {
                cellView.$('rect').css({stroke: color, 'stroke-width': '4'});
                cellView.$('circle').css({stroke: color, 'stroke-width': '3'});
                cellView.$('.actorDecorator').css({stroke: color, 'stroke-width': '2'});
            }
        }
        else {
            if (cellView.model.get('parent')) {
                parentView = istar.paper.findViewByModel(istar.graph.getCell(cellView.model.get('parent')));
                parentView.$('rect').css({stroke: color, 'stroke-width': '4'});
                parentView.$('circle').css({stroke: color, 'stroke-width': '3'});
                parentView.$('.actorDecorator').css({stroke: color, 'stroke-width': '2'});
            }
        }
    });
    istar.paper.on('cell:mouseout', function (cellView, evt, x, y) {
        if (cellView.model.isKindOfActor()) {
            cellView.$('rect').css({stroke: 'black', 'stroke-width': '2'});
            cellView.$('circle').css({stroke: 'black', 'stroke-width': '2'});
            cellView.$('.actorDecorator').css({stroke: 'black', 'stroke-width': '2'});
        }
        else {
            if (cellView.model.get('parent')) {
                parentView = istar.paper.findViewByModel(istar.graph.getCell(cellView.model.get('parent')));
                parentView.$('rect').css({stroke: 'black', 'stroke-width': '2'});
                parentView.$('circle').css({stroke: 'black', 'stroke-width': '2'});
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
            ui.unhighlightFocus(ui.getSelectedElement().findView(istar.paper));
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
            ui.addElementOnActor(cellView, x - 50, y - 18);
            if (cellView.model.prop('collapsed')) {
                cellView.model.toggleCollapse();
            }
        }
        else if (ui.currentStateIsAddLink()) {
            if (cellView.model.isKindOfActor()) {
                if (ui.currentAddingElement.match(/IsALink|ParticipatesInLink/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;
                        isValid = istar.types[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                        if (isValid.isValid) {
                            // newLink = istar.addAndRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                            ui.addLinkBetweenActors(ui.currentAddingElement, cellView);
                        }
                        else {
                            ui.displayInvalidLinkMessage(isValid.message);
                            ui.linkSource.unhighlight();
                            ui.currentButton.end();
                        }
                    }
                }
                else if (ui.dependencyType.match(/DependencyLink/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;
                        isValid = istar.types['DependencyLink'].isValid(ui.linkSource.model, ui.linkTarget.model);
                        if (isValid.isValid) {
                            addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
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
                if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|DependencyLink|make|help|hurt|break/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight({blur: 10, color: 'blue'});
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;

                        if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|make|help|hurt|break/)) {
                            var newLink = null;
                            var prettyLinkName = '';
                            if (ui.currentAddingElement === 'AndRefinementLink') {
                                isValid = istar.types[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addAndRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                            }
                            else if (ui.currentAddingElement === 'OrRefinementLink') {
                                isValid = istar.types[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addOrRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                            }
                            else if (ui.currentAddingElement === 'NeededByLink') {
                                isValid = istar.types[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addNeededByLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                            }
                            else if (ui.currentAddingElement === 'QualificationLink') {
                                isValid = istar.types[ui.currentAddingElement].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addQualificationLink(ui.linkSource.model, ui.linkTarget.model);
                                }
                            }
                            else if (ui.currentAddingElement.match(/make|help|hurt|break/i)) {
                                isValid = istar.types['ContributionLink'].isValid(ui.linkSource.model, ui.linkTarget.model);
                                if (isValid.isValid) {
                                    newLink = istar.addContributionLink(ui.linkSource.model, ui.linkTarget.model, ui.currentAddingElement);
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
                            isValid = istar.types['DependencyLink'].isValid(ui.linkSource.model, ui.linkTarget.model);
                            if (isValid.isValid) {
                                addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
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
        var newText;
        if (cellView.model.isLink()) {
            // console.log(cellView.model);
            //   if (cellView.model.isContributionLink()) {
            //       newText = window.prompt('make, help, hurt, or break', cellView.model.attributes.labels[0].attrs.text.text);
            //       //newText = window.prompt('make, help, hurt, or break', cellView.model.getContributionType());
            //       if (newText !== null) {
            //           cellView.model.attributes.labels[0].attrs.text.text = newText;
            //           //cellView.model.setContributionType(newText);
            //       }
            //   }
        }
        else {
            oldText = cellView.model.prop('name');
            newText = window.prompt('Edit text:', oldText);
            if (newText !== null) {
                if (cellView.model.isKindOfActor()) {
                    cellView.model.changeNodeContent(newText);
                }
                else {
                    cellView.model.changeNodeContent(newText, {breakLine: true, breakWidth: cellView.getBBox().width});
                }
            }
        }
    });

    istar.paper.on('cell:contextmenu', function (cellView, evt, x, y) {
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

ui.addElementOnPaper = function (x, y) {
    try {
        newActor = istar['add' + ui.currentAddingElement](x, y);
        newActor.prop('customProperties/Description', '');
        ui.selectElement(newActor);
    } catch (e) {
        console.log(e);
    } finally {
        ui.currentButton.end();
    }
};

ui.addElementOnActor = function (cellView, x, y) {
    try {
        element = addElementInPlace(cellView.model, istar[istar.PREFIX_ADD + ui.currentAddingElement], x, y);
        element.prop('customProperties/Description', '');
        ui.selectElement(element);
    } catch (e) {
        console.log(e);
    } finally {
        ui.currentButton.end();
    }
};
ui.addLinkBetweenActors = function (newLink, targetCellView) {
    try {
        ui.linkTarget = targetCellView;
        if (istar.types[newLink].isValid(ui.linkSource.model, ui.linkTarget.model)) {
            istar[istar.PREFIX_ADD + ui.currentAddingElement](ui.linkSource.model, ui.linkTarget.model);
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.linkSource.unhighlight();
        ui.currentButton.end();
    }
};

function addDependency(source, dependencyType, target) {
    var node = '';
    var x = 10;
    var y = 10;
    var text = 'Dependum';
    if (dependencyType === 'QualityDependencyLink') {
        node = istar.addQuality(x, y, text);
    }
    else if (dependencyType === 'TaskDependencyLink') {
        node = istar.addTask(x, y, text);
    }
    else if (dependencyType === 'ResourceDependencyLink') {
        node = istar.addResource(x, y, text);
    } else {
        node = istar.addGoal(x, y, text);
    }
    links = istar.addDependencyLink(source, node, target);
    links[0].on('change:vertices', ui._toggleSmoothness);
    links[1].on('change:vertices', ui._toggleSmoothness);

    ui.setupDependencyRemoval(links);

    node.prop('customProperties/Description', '');
    ui.selectElement(node);
}

ui.setupDependencyRemoval = function (links) {
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

function addElementInPlace(clickedNode, callback, x, y) {
    ui.currentState = ui.STATE_VIEW;
    ui.resetAddingElement();
    //assigns the new node to the correct parent
    //if the user clicked on an actor kind, the parent is the clicked element itself (i.e., the actor)
    //otherwise, if the user clicked on another element (e.g., a goal), then the parent of the new element will be the same parent of the clicked element
    var node;
    if (clickedNode.isKindOfActor()) {
        node = callback(x, y);
        clickedNode.embedNode(node);
    }
    else {
        var parent = istar.graph.getCell(clickedNode.attributes.parent);
        if (parent && parent.isKindOfActor()) {
            node = callback(x, y);
            istar.graph.getCell(clickedNode.attributes.parent).embedNode(node);
        }
    }
    return node;
}


ui.changeColorActorContainer = function (color) {
    _.map(istar.getElements(), function (node) {
        if (node.isKindOfActor()) {
            node.attr('rect', {fill: color});
        }
    });
};
ui.changeColorElements = function (color) {
    _.map(istar.getElements(), function (node) {
        node.attr('circle', {fill: color});
        if (node.isKindOfInnerElement()) {
            node.attr('rect', {fill: color});
            node.attr('polygon', {fill: color});
            node.attr('path', {fill: color});
        }
    });
};
ui.changeColorElement = function (color, element) {
    element = element || ui.getSelectedElement();
    ui.hideSelection();
    if (element.isKindOfActor()) {
        element.attr('circle', {fill: color});
    }
    else {
        element.attr('rect', {fill: color});
        element.attr('polygon', {fill: color});
        element.attr('path', {fill: color});
    }
    if (color == ui.defaultElementBackgroundColor) {
        element.prop('backgroundColor', null);
    }
    else {
        element.prop('backgroundColor', color);
    }

    ui.showSelection();
};
ui.connectLinksToShape = function () {
    $('.menu-body *').addClass('waiting');
    //do the processing after a small delay, in order to allow the browser to update the cursor icon
    setTimeout(function () {
        istar.paper.options.linkConnectionPoint = joint.util.shapePerimeterConnectionPoint;
        //this translation is just to force re-rendering of links
        _.each(istar.getElements(), function (e) {
            e.translate(1);
            e.translate(-1);
        });
        istar.paper.options.linkConnectionPoint = undefined;
        $('.menu-body *').removeClass('waiting');
        ui.selectModel();
    }, 100);
};

$('#input-file-format').change(function () {
    if ($(this).val() === "PNG") {
        $('#save-png-options').removeClass('hidden');
    }
    else {
        $('#save-png-options').addClass('hidden');
    }

});

$('#modal-button-save-image').click(function () {
    $saveButton = $(this);

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
        filename = $('#input-filename').val() || 'goalModel';

        //Adjust the size of the model, to prevent empty spaces in the image
        var originalWidth = istar.paper.getArea().width;
        var originalHeight = istar.paper.getArea().height;
        istar.paper.fitToContent({padding: 10, allowNewOrigin: 'any'});

        if ($('#input-file-format').val() === "SVG") {
            var svgData = saveSvg('diagram');
            joint.util.downloadDataUri(svgData, filename + '.svg');
        }
        else {
            //save PNG
            resolutionFactor = 1;
            if ($('#modal-input-hi-res').prop('checked')) {
                resolutionFactor = 4;
            }
            savePng('diagram', joint.util.downloadBlob, filename, resolutionFactor, $('#modal-input-transparent-background').prop('checked'));
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
    var model = saveModel();
    csvData = 'data:text/json;charset=utf-8,' + (encodeURI(model));
    joint.util.downloadDataUri(csvData, 'goalModel.txt');
});

$('#modal-button-load-model').click(function () {
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
                        fileManager.load(e.target.result);//do the actual loading
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
    this.setupPluginMenu();

    this.defineInteractions();
    uiC.createAddButtons();

    $('#placeholder-save-model').hide();


    this.setupElementResizing();
    this.setupDiagramSizeInputs();
    this.setupLoadExampleButton();
    this.setupMainMenuInteraction();
    this.setupSidepanelInteraction();

    ui.selectModel();
};

ui.setupPluginMenu = function () {
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
    $('.modal-button-load-example').click(function () {
        $('.modal *').addClass('waiting');
        var modelToLoad = $(this).data('model');
        //do the processing after a small delay, in order to allow the browser to update the cursor icon
        setTimeout(function () {
            if (ui.getSelectedElement().findView) {
                ui.unhighlightFocus(ui.getSelectedElement().findView(istar.paper));
            }
            loadModel(istar.examples[modelToLoad]);
            ui.selectModel();//select the model (as a whole)
            $('.modal *').removeClass('waiting');
            $('#modal-examples').modal('hide');
        }, 100);

    });
};

ui.setupMainMenuInteraction = function () {
    // default menu to be displayed when the tool opens
    var currentMenuItem = $('#menu-item-add');

    // set up the click behavior for every menu-item
    $('.menu-items a').each(function () {
        $(this).click(function () {
            target = $('#' + $(this).data('toggle'));

            if (currentMenuItem === null) {
                //no menu is currently displayed, the clicked one will now be displayed
                currentMenuItem = $(this);
                $(this).addClass('active');

                target.css('display', 'none');
                target.removeClass('hidden');
                target.slideDown(200);

                $('#star').css("-transform","rotate(0deg)");
            }
            else if ($(this).attr('id') != currentMenuItem.attr('id')) {
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

};

$('#all-actor-boundary-color-picker').on('change', function () {
    ui.changeColorActorContainer(this.value);
});
$('#all-elements-color-picker').on('change', function () {
    ui.changeColorElements(this.value);
});

$('#single-element-color-picker').on('change', function () {
    ui.changeColorElement(this.value);
});

$('#menu-button-precise-links').click(function () {
    ui.connectLinksToShape();
});

$('#menu-button-toggle-fullscreen').click(function () {
    joint.util.toggleFullScreen();
});

$('#menu-button-straighten-links').click(function () {
    if (confirm("ATTENTION! This action will remove all vertices you may have added to the links in this model. Are you sure you want to do this?")) {
        _.forEach(istar.getLinks(), function (link) {
            link.vertices([]);
        })
    }
});

ui.clearDiagram = function () {
    istar.graph.clear();
};


var hoverButtons = [];

function createButtons() {
    hoverButtons = [];

    return this;
}

ui.changeStatus = function (text) {
    $('#status').html(text);
};

$(document).keyup(function (e) {
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
    ui.currentState = 'edit';
    ui.resetPointerStyles();
};
ui.changeStateToView = function () {
    ui.currentState = 'view';
};

ui.resetPointerStyles = function () {
    $diagram = $('#diagram');
    $diagram.css('cursor', 'auto');
    $diagram.find('g').css('cursor', 'move');
    $diagram.find('.actorKindMain').css('cursor', 'move');
    $('.link-tools g').css('cursor', 'pointer');
};

ui._toggleSmoothness = function (link, vertices, something) {
    if (vertices.length >= 1) {
        link.set('smooth', true);
    }
    else if (vertices.length === 0) {
        link.set('smooth', false);
    }
};


function changeCustomPropertyValue(model, propertyName, propertyValue) {
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
    istar.paper.fitToContent({padding: 20, allowNewOrigin: 'any'});
});

$('#reset-all-colors-button').click(function () {
    $('#all-actor-boundary-color-picker').get(0).jscolor.fromString('E6E6E6');
    ui.changeColorActorContainer('#E6E6E6');
    $('#all-elements-color-picker').get(0).jscolor.fromString(ui.defaultElementBackgroundColor);
    ui.changeColorElements(ui.defaultElementBackgroundColor);
});

$('#reset-element-color-button').click(function () {
    $('#single-element-color-picker').get(0).jscolor.fromString(ui.defaultElementBackgroundColor);
    ui.changeColorElement(ui.defaultElementBackgroundColor);
});

ui.setupSidepanelInteraction = function () {
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
        viewBBox = ui.getSelectedElement().findView(istar.paper).getBBox();
        diagramPosition = $('#out').position();

        var newWidth = e.pageX - viewBBox.x - diagramPosition.left + $('#out').scrollLeft();
        var newHeight = e.pageY - viewBBox.y - diagramPosition.top + $('#out').scrollTop();
        if (newWidth < 20) newWidth = 20;
        if (newHeight < 20) newHeight = 20;

        ui.resizeElement(ui.getSelectedElement(), newWidth, newHeight);
    };

    ui.stopResizeMouseEvents = function (e) {
        $(window).off('mousemove', ui.resizeHandlerOnMouseMove);
        $(window).off('mouseup', ui.stopResizeMouseEvents);
        if (ui.getSelectedElement().get('parent')) {
            istar.graph.getCell(ui.getSelectedElement().get('parent')).updateBoundary();
        }
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
    $('#close-button-alert-modal').focus()
});

ui.displayInvalidLinkMessage = function (message) {
    ui.alert('INVALID: Sorry, but ' + message, 'Invalid link');
};