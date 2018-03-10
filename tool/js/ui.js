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
        unhideSelection: function() {
            if (this.selectedElement) {
                this.highlightFocus(istar.paper.findViewByModel(this.selectedElement));
            }
        }
    }
}();

//create the ADD buttons
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addActorDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Role',
        action: ui.STATE_ADD_ACTOR,
        tooltip: 'Add Role',
        statusText: 'Now click on an empty space in the diagram to add a Role'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addActorDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Agent',
        action: ui.STATE_ADD_ACTOR,
        tooltip: 'Add Agent',
        statusText: 'Now click on an empty space in the diagram to add an Agent'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addActorDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Actor',
        action: ui.STATE_ADD_ACTOR,
        tooltip: 'Add Actor',
        statusText: 'Now click on an empty space in the diagram to add an Actor'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addActorLinkDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Is A link',
        action: ui.STATE_ADD_LINK,
        name: 'IsALink',
        tooltip: 'Add an Is-A link between an Actor and another Actor, or between a Role and another Role',
        statusText: 'Adding Is-A link: click on the sub-element and then on the super-element.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addActorLinkDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Participates-In link',
        action: ui.STATE_ADD_LINK,
        name: 'ParticipatesInLink',
        tooltip: 'Add a Participates-In link between any Actors, Roles, or Agents',
        statusText: 'Adding Participates-In link: click on the source, and then on the target.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addDependencyDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Goal dependency',
        action: ui.STATE_ADD_LINK,
        name: 'GoalDependencyLink',
        tooltip: 'Add Goal Dependency link (including its dependum)',
        statusText: 'Goal Dependency link: click first on the depender, and then on the dependee.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addDependencyDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Quality dependency',
        action: ui.STATE_ADD_LINK,
        name: 'QualityDependencyLink',
        tooltip: 'Add Quality Dependency link (including its dependum)',
        statusText: 'Quality Dependency link: click first on the depender, and then on the dependee.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addDependencyDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Task dependency',
        action: ui.STATE_ADD_LINK,
        name: 'TaskDependencyLink',
        tooltip: 'Add Task Dependency link (including its dependum)',
        statusText: 'Task Dependency link: click first on the depender, and then on the dependee.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addDependencyDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Resource dependency',
        action: ui.STATE_ADD_LINK,
        name: 'ResourceDependencyLink',
        tooltip: 'Add Resource Dependency link (including its dependum)',
        statusText: 'Resource Dependency link: click first on the depender, and then on the dependee.'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Goal',
        action: ui.STATE_ADD_NODE,
        name: 'Goal',
        tooltip: 'Add Goal',
        statusText: 'Click on an actor/role/agent to add a Goal',
        precondition: function () {
            var valid = true;
            if (istar.isEmpty()) {
                alert('Sorry, you can only add goals on an actor/role/agent.');
                valid = false;
            }
            return valid;
        }
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Task',
        action: ui.STATE_ADD_NODE,
        tooltip: 'Add Task',
        statusText: 'Click on an actor/role/agent to add a Task'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Resource',
        action: ui.STATE_ADD_NODE,
        tooltip: 'Add Resource',
        statusText: 'Click on an actor/role/agent to add a Resource'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Quality',
        action: ui.STATE_ADD_NODE,
        name: 'Quality',
        tooltip: 'Add Quality',
        statusText: 'Click on an actor/role/agent to add a Quality'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'And-Refinement',
        action: ui.STATE_ADD_LINK,
        name: 'AndRefinementLink',
        tooltip: 'Add And-Refinement link',
        statusText: 'And-Refinement link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Or-Refinement',
        action: ui.STATE_ADD_LINK,
        name: 'OrRefinementLink',
        tooltip: 'Add Or-Refinement link',
        statusText: 'Or-Refinement link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Qualification',
        action: ui.STATE_ADD_LINK,
        name: 'QualificationLink',
        tooltip: 'Add Qualification link',
        statusText: 'Qualification link: click first on the Quality and then on the element it qualifies (Goal, Task or Resource).'
    })
}).render();
new uiC.AddButtonView({
    model: new uiC.AddButtonModel({
        label: 'Needed-By',
        action: ui.STATE_ADD_LINK,
        name: 'NeededByLink',
        tooltip: 'Add Needed-By link',
        statusText: 'Needed-By link: click first on the Resource and then on the Task that needs it.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addContributionDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Make (++)',
        action: ui.STATE_ADD_LINK,
        name: 'make',
        tooltip: 'Add Make (++) Contribution link',
        statusText: 'Make (++) Contribution link: click first on an element and then on the Quality it contributes to.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addContributionDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Help (+)',
        action: ui.STATE_ADD_LINK,
        name: 'help',
        tooltip: 'Add Help (+) Contribution link',
        statusText: 'Help (+) Contribution link: click first on an element and then on the Quality it contributes to.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addContributionDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Hurt (-)',
        action: ui.STATE_ADD_LINK,
        name: 'hurt',
        tooltip: 'Add Hurt (-) Contribution link',
        statusText: 'Hurt (-) Contribution link: click first on an element and then on the Quality it contributes to.'
    })
}).render();
new uiC.AddButtonDropdownItemView({
    attributes: {parent: '#addContributionDropdown'},
    model: new uiC.AddButtonModel({
        label: 'Break (--)',
        action: ui.STATE_ADD_LINK,
        name: 'break',
        tooltip: 'Add Break (--) Contribution link',
        statusText: 'Break (--) Contribution link: click first on an element and then on the Quality it contributes to.'
    })
}).render();

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
    cellView.highlight(null, {
        highlighter: ui.highlighter
    });
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
    istar.paper.on('cell:pointerup', function (cellView, evt, x, y) {
        if (evt.ctrlKey) {
            //collapse/uncollapse actors when ctrl-clicked
            if (cellView.model.isKindOfActor()) {
                ui.hideSelection();//remove the focus from the actor
                cellView.model.toggleCollapse();
                ui.unhideSelection();//give the focus back to actor, now collapsed or expanded
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
                if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|DependencyLink|make|help|hurt|break/)) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight({blur: 10, color: 'blue'});
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;

                        if (ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|make|help|hurt|break/)) {
                            if (ui.currentAddingElement === 'AndRefinementLink') istar.addAndRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                            else if (ui.currentAddingElement === 'OrRefinementLink') istar.addOrRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                            else if (ui.currentAddingElement === 'NeededByLink') istar.addNeededByLink(ui.linkSource.model, ui.linkTarget.model);
                            else if (ui.currentAddingElement === 'QualificationLink') istar.addQualificationLink(ui.linkSource.model, ui.linkTarget.model);
                            else if (ui.currentAddingElement.match(/make|help|hurt|break/i)) {
                                var newLink = istar.addContributionLink(ui.linkSource.model, ui.linkTarget.model, ui.currentAddingElement);
                                if (newLink) {
                                    newLink.on('change:vertices', ui._toggleSmoothness);//do some magic in order to prevent ugly links when there are no vertices
                                }
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
            if (!cellView.model.isLink()) {
                ui.selectElement(cellView.model, cellView);
            }
        }
    });

    istar.paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
        var newText;
        if (cellView.model.isLink()) {
            if (cellView.model.isContributionLink()) {
                newText = window.prompt('make, help, hurt, or break', cellView.model.getContributionType());
                if (newText !== null) {
                    cellView.model.setContributionType(newText);
                }
            }
        }
        else {
            oldText = cellView.model.prop('name');
            newText = window.prompt('Edit text:', oldText);
            if (newText !== null) {
                cellView.model.changeNodeContent(newText);
            }
        }
    });

    istar.paper.on('cell:contextmenu', function (cellView, evt, x, y) {
    });
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
            alert('Sorry, it is not possible to add a \'' + newLink +
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
        console.log('INVALID: you cannot create a dependency from an element to itself.');
        alert('INVALID: you cannot create a dependency from an element to itself.');
    }
    else if (source.isLink() || target.isLink()) {
        console.log('INVALID: you cannot create a dependency from/to another link.');
        alert('INVALID: you cannot create a dependency from/to another link.');
    }
    else if (source.isDependum() || target.isDependum()) {
        console.log('INVALID: you cannot create a dependency from/to a dependum.');
        alert('INVALID: you cannot create a dependency from/to a dependum.');
    }
    else if (sourceParentId === targetParentId) {
        console.log('INVALID: you cannot create a dependency with a single actor.');
        alert('INVALID: you cannot create a dependency with a single actor.');
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

    var svgData = saveSvg('diagram');
    $saveImage.html(createDownloadLink('goalModel.svg', '◀ SVG', svgData, 'download SVG (vectorial)'));
    $saveImage.append(document.createTextNode(' - '));

    savePng('diagram', addPngLink);

    $saveImage.show();

    //show the UI elements again
    $jointMarkers.show();
    ui.unhideSelection(ui.getSelectedElement());
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
                //if there is no file selected, load the model from the textArea
                fileManager.load($('#loadModelContent').val());


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
    $('#saveImage').hide();
    $('#saveModel').hide();
    $('#diagramWidthInput').val(istar.paper.getArea().width);
    $('#diagramHeightInput').val(istar.paper.getArea().height);
};

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
    if (vertices.length === 1) {
        link.set('smooth', true);
    }
    else if (vertices.length === 0) {
        link.set('smooth', false);
    }
};


$(document).ready(function () {
    $.fn.editable.defaults.mode = 'inline';//x-editable setting
});

function changeCustomPropertyValue(model, propertyName, propertyValue) {
    model.prop('customProperties/' + propertyName, propertyValue);
}

