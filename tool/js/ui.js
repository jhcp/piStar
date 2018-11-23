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
    }
}();



ui.highlighter = {
    name: 'stroke',
    options: {
        padding: 7,
        rx: -5,
        ry: -5,
        attrs: {
            'stroke-width': 2,
            stroke: '#555555'
        }
    }
};
ui.highlightFocus = function (cellView) {
    if (cellView) {
        cellView.highlight(null, {
            highlighter: ui.highlighter
        });
    }
};

ui.unhighlightFocus = function (cellView) {
    if (cellView) {
        cellView.unhighlight(null, {
            highlighter: ui.highlighter
        });
    }
};
ui.defineInteractions = function () {
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
            $('#propertyTable').find('tbody').html('');
            $('#cellButtons').html('');
        }
    });

    istar.paper.on('blank:pointerdown', function (evt, x, y) {
        if (ui.getSelectedElement()) {
            ui.clearSelection();
        }
        if (ui.currentStateIsAddKindOfActor()) {
            ui.addElementOnPaper(x, y);
        }
    });

    istar.paper.on('cell:mouseover', function (cellView, evt, x, y) {
        //indicates that the mouse is over a given actor
        //.css() is used instead of .attr() because the latter is bugged with elements containing a path element
        color = 'rgb(63,72,204)';
        if (cellView.model.isKindOfActor()) {
            if (cellView.model.prop('collapsed')) {
                cellView.$('circle').css({stroke: color, 'stroke-width': '2'});
                cellView.$('.actorDecorator').css({stroke: color, 'stroke-width': '2'});
            }
            else {
                cellView.$('rect').css({stroke: color, 'stroke-width': '4'});
                cellView.$('circle').css({stroke: 'black', 'stroke-width': '3'});
            }
        }
        else {
            if (cellView.model.get('parent')) {
                parentView = istar.paper.findViewByModel(istar.graph.getCell(cellView.model.get('parent')));
                parentView.$('rect').css({stroke: color, 'stroke-width': '4'});
                parentView.$('circle').css({stroke: 'black', 'stroke-width': '3'});
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
    });
    istar.paper.on('cell:pointerup', function (cellView, evt, x, y) {
        if (evt.ctrlKey) {
            //collapse/uncollapse actors when ctrl-clicked
            if (cellView.model.isKindOfActor()) {
                ui.hideSelection();//remove the focus from the actor
                cellView.model.toggleCollapse();
                ui.showSelection();//give the focus back to actor, now collapsed or expanded
            }
        }
        if (ui.currentStateIsAddNode()) {
            ui.addElementOnActor(cellView, x - 50, y - 18);
        }
        else if (ui.currentStateIsAddLink()) {
            if (cellView.model.isKindOfActor()) {
                if (ui.currentAddingElement.match(/IsALink|ParticipatesInLink/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.addLinkBetweenActors(ui.currentAddingElement, cellView);
                    }
                }
                else if (ui.dependencyType.match(/DependencyLink/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;
                        addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
                        ui.linkSource.unhighlight();
                        ui.currentButton.end();
                    }
                }
            }
            else {
                if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|DependencyLink|ObstructsLink|make|help|hurt|break/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight({blur: 10, color: 'blue'});
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;

                        if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|ObstructsLink|make|help|hurt|break/)) {
                            var newLink = null;
                            var prettyLinkName = '';
                            if (ui.currentAddingElement === 'AndRefinementLink') {
                                newLink = istar.addAndRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                prettyLinkName = 'And-Refinement link';
                            }
                            else if (ui.currentAddingElement === 'OrRefinementLink') {
                                newLink = istar.addOrRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                prettyLinkName = 'Or-Refinement link';
                            }
                            else if (ui.currentAddingElement === 'NeededByLink') {
                                newLink = istar.addNeededByLink(ui.linkSource.model, ui.linkTarget.model);
                                prettyLinkName = 'Needed-By link';
                            }
                            else if (ui.currentAddingElement === 'QualificationLink') {
                                newLink = istar.addQualificationLink(ui.linkSource.model, ui.linkTarget.model);
                                prettyLinkName = 'Qualification link';
                            }
                            else if (ui.currentAddingElement === 'ObstructsLink') {
                                newLink = istar.addObstructsLink(ui.linkSource.model, ui.linkTarget.model, 'obstructs');
                                prettyLinkName = 'Obstructs link';
                                if (newLink) {
                                    newLink.on('change:vertices', ui._toggleSmoothness);//do some magic in order to prevent ugly links when there are no vertices
                                }
                            }
                            else if (ui.currentAddingElement.match(/make|help|hurt|break/i)) {
                                newLink = istar.addContributionLink(ui.linkSource.model, ui.linkTarget.model, ui.currentAddingElement);
                                prettyLinkName = 'Contribution link';
                                if (newLink) {
                                    newLink.on('change:vertices', ui._toggleSmoothness);//do some magic in order to prevent ugly links when there are no vertices
                                }
                            }
                            if (!newLink) {
                                alert('INVALID: the i* 2.0 syntax does not allow you to create a ' + prettyLinkName + ' between the selected elements');
                            }
                        }
                        else if (ui.dependencyType.match(/DependencyLink/)) {
                            addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
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
        }
    });

    istar.paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
        var newText;
        /*if (cellView.model.isLink()) {
            if (cellView.model.isContributionLink()) {
                newText = window.prompt('make, help, hurt, or break', cellView.model.getContributionType());
                if (newText !== null) {
                    cellView.model.setContributionType(newText);
                }
            }
        }
        else {*/
            oldText = cellView.model.prop('name');
            prefixPattern = new RegExp("<<(.*)>> ");
            oldTextPrefix = prefixPattern.exec(oldText);
            if (oldTextPrefix) {
              oldTextPrefix = oldTextPrefix[0];
            }
            oldTextWithoutPrefix = oldText.replace(prefixPattern, '');
// str.replace(/Hello/g, 'Hy');
            newText = window.prompt('Edit text:', oldTextWithoutPrefix);
            if (newText !== null) {
              size = 120;
              if (cellView.model.isGoal()) size = 110;
              if (cellView.model.isResource()) size = 140;
              oldTextPrefix = oldTextPrefix || '';
              cellView.model.changeNodeContent(oldTextPrefix + newText, {'breakWidth': size});
            }
      //  }
    });

    istar.paper.on('cell:contextmenu', function (cellView, evt, x, y) {
    });

    $.fn.editable.defaults.mode = 'inline';//x-editable setting
};

ui.addElementOnPaper = function (x, y) {
    try {
        newActor = istar['add' + ui.currentAddingElement](x, y);
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
        else {
            alert('INVALID: the i* 2.0 syntax does not allow you to to add a \'' + newLink +
                '\' link from a ' + ui.linkSource.model.get('type') + ' to a ' +
                ui.linkTarget.model.get('type'));
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.linkSource.unhighlight();
        ui.currentButton.end();
    }
};

function addDependency(source, dependencyType, target) {
    var sourceParentId;
    var targetParentId;
    if (source.isKindOfActor()) {
        sourceParentId = source.id;
    }
    else if (source.isKindOfInnerElement()) {
        sourceParentId = source.attributes.parent;
    }

    if (target.isKindOfActor()) {
        targetParentId = target.id;
    }
    else if (target.isKindOfInnerElement()) {
        targetParentId = target.attributes.parent;
    }

    if (source === target) {
        console.log('INVALID: the i* 2.0 syntax does not allow you to create a dependency from an element to itself.');
        alert('INVALID: the i* 2.0 syntax does not allow you to create a dependency from an element to itself.');
    }
    else if (source.isLink() || target.isLink()) {
        console.log('INVALID: the i* 2.0 syntax does not allow you to create a dependency from/to another link.');
        alert('INVALID: the i* 2.0 syntax does not allow you to create a dependency from/to another link.');
    }
    else if (source.isDependum() || target.isDependum()) {
        console.log('INVALID: the i* 2.0 syntax does not allow you to create a dependency from/to a dependum.');
        alert('INVALID: the i* 2.0 syntax does not allow you to create a dependency from/to a dependum.');
    }
    else if (sourceParentId === targetParentId) {
        console.log('INVALID: the i* 2.0 syntax does not allow you to create a dependency with a single actor.');
        alert('INVALID: the i* 2.0 syntax does not allow you to create a dependency with a single actor.');
    }
    else if (sourceParentId && targetParentId) {
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
        istar.rotateLabel(links[0]);
        istar.rotateLabel(links[1]);
        links[0].on('change:vertices', ui._toggleSmoothness);
        links[1].on('change:vertices', ui._toggleSmoothness);

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

        ui.selectElement(node);
    }
}

function addElementInPlace(clickedNode, callback, x, y) {
    ui.currentState = ui.STATE_VIEW;
    ui.resetAddingElement();
    //assigns the new node to the correct parent
    //if the user clicked on an actor kind, the parent is the clicked element itself (i.e., the actor)
    //otherwise, if the user clicked on another element (e.g., a goal), then the parent of the new element will be the same parent of the clicked element
    var node;
    content = '';
    if (clickedNode.isKindOfActor()) {
        node = callback(x, y);
        clickedNode.embedNode(node);
        if (node.isHazard()) {
          node.prop('name', '<<hazard>> ')
        }
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
ui.connectLinksToShape = function () {
    $('#modals *').css('cursor', 'wait');
    //do the processing after a small delay, in order to allow the browser to update the cursor icon
    setTimeout(function () {
        istar.paper.options.linkConnectionPoint = joint.util.shapePerimeterConnectionPoint;
        //this translation is just to force re-rendering of links
        _.each(istar.getElements(), function (e) {
            e.translate(1);
            e.translate(-1);
        });
        istar.paper.options.linkConnectionPoint = undefined;
        $('#modals *').css('cursor', 'auto');
    }, 100);
};

$('#saveImageButton').click(function () {
    var $jointMarkers = $('.marker-vertices, .link-tools, .marker-arrowheads, .remove-element');
    var $saveImage = $('#saveImage');

    //hide UI elements before saving
    $jointMarkers.hide();
    ui.hideSelection();

    var originalWidth = istar.paper.getArea().width;
    var originalHeight = istar.paper.getArea().height;
    istar.paper.fitToContent({padding: 20, allowNewOrigin: 'any'});

    var svgData = saveSvg('diagram');
    $saveImage.html(createDownloadLink('goalModel.svg', '◀ SVG', svgData, 'download SVG (vectorial)'));
    $saveImage.append(document.createTextNode(' - '));

    savePng('diagram', addPngLink);

    //restore the paper to its initial state
    istar.paper.setDimensions(originalWidth, originalHeight);
    istar.paper.translate(0,0);

    //show the UI elements back again
    $jointMarkers.show();
    $saveImage.show();
    ui.showSelection(ui.getSelectedElement());
});

function createDownloadLink(fileName, text, data, title) {
    var a = document.createElement('a');
    a.download = fileName;//name that will appear when saving the file
    a.title = title;
    a.href = data;

    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    return a;
}

function addPngLink(pngData) {
    var a = createDownloadLink('goalModel.png', 'PNG', pngData, 'download PNG');
    $('#saveImage').append(a);
}

$('#saveModelButton').click(function () {
    var model = saveModel();

    //workaround for jointjs bug: changing the path of a highlight when changing an attribute of a CellView
    ui.hideSelection();
    ui.showSelection();

    csvData = 'data:text/json;charset=utf-8,' + (encodeURI(model));
    a = createDownloadLink('goalModel.txt', '◀ File', csvData, 'download goal model');
    $('#saveModel').html(a).show();
});

$('#saveImage, a').click(function () {
    $('#saveImage').hide(200);
});

$('#saveModel, a').click(function () {
    $('#saveModel').hide(200);
});
$('#loadButton').click(function () {
    $(this).button('loading');
    //load the model with a small delay, giving time to the browser to display the 'loading' message
    setTimeout(function () {
        //call the actual loading
        try {
            var fileInput = $('#actualFileInput')[0];
            if (fileInput.files.length === 0) {
                alert('You must select a file to load');

                $('#loadModelModal').modal('hide');
                $('#loadButton').button('reset');
            }
            else {
                //else, load model from file
                var file = fileInput.files[0];
                if (file.type === 'text/plain') {
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        fileManager.load(e.target.result);

                        $('#loadModelModal').modal('hide');
                        $('#loadButton').button('reset');
                    };
                    fileReader.readAsText(file);
                }
                else {
                    alert('Sorry, this kind of file is not valid');
                    $('#loadButton').button('reset');
                    $('#loadModelModal').modal('hide');
                }
            }
        }
        catch (error) {
            $('#loadButton').button('reset');
            alert('Sorry, the input model is not valid.');
            console.log(error.stack);
        }
    }, 20);
});

ui.setupUi = function () {
    this.defineInteractions();
    uiC.createAddButtons();

    $('#saveImage').hide();
    $('#saveModel').hide();
    $('#diagramBoxOuter').height($(window).height());
};

$('#diagramOptionsModalButton').click(function () {
    $('#diagramWidthInput').val(istar.paper.getArea().width);
    $('#diagramHeightInput').val(istar.paper.getArea().height);
});
$('#diagramSizeButton').click(function () {
    istar.paper.setDimensions($('#diagramWidthInput').val(), $('#diagramHeightInput').val());
});

$('#whiteActorsButton').click(function () {
    ui.changeColorActorContainer('white');
});

$('#analyseModelButton').click(function () {
    var numberOfElements = 'Number of elements: ' + istar.getNumberOfElements();
    var numberOfLinks = 'Number of links: ' + istar.getNumberOfLinks();
    alert(numberOfElements + '\n' + numberOfLinks + '\n\n' + 'OBS: each dependency counts as two links - one from the depender to the dependum, and another from the dependum to the dependee.');
});

$('#preciseLinksButton').click(function () {
    ui.connectLinksToShape();
});

$('#clearButton').click(function () {
    var confirmed = confirm('Are you sure you want to delete every element of this model?');
    if (confirmed) {
        ui.clearDiagram();
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

$('#instructionsTitle').click(function () {
    $('#instructionsContent').toggle(300);
});
$('#instructionsContent').toggle(0);

ui.changeStatus = function (text) {
    $('#status').html(text);
};

$('#examplesArea').on('show.bs.collapse', function () {
    $('#examplesButton').addClass('active');
});
$('#examplesArea').on('hide.bs.collapse', function () {
    $('#examplesButton').removeClass('active');
});
$('#helpArea').on('show.bs.collapse', function () {
    $('#helpButton').addClass('active');
});
$('#helpArea').on('hide.bs.collapse', function () {
    $('#helpButton').removeClass('active');
});
$('#feedbackArea').on('show.bs.collapse', function () {
    $('#feedbackButton').addClass('active');
});
$('#feedbackArea').on('hide.bs.collapse', function () {
    $('#feedbackButton').removeClass('active');
});

$(document).keyup(function (e) {
    if (ui.getSelectedElement() !== null) {
        if (ui.currentStateIsView()) {
            if (e.which === 46) {  //delete
                ui.getSelectedElement().remove();
                ui.clearSelection();
            }
            if (e.which === 27) {  //esc
                ui.clearSelection();
            }
        }
    }
    if (ui.isCurrentlyAddingElement()) {
        if (e.which === 27) {  //esc
            ui.currentButton.end();
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
