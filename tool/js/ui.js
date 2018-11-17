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
    };
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
            $('#cell-buttons').html('');
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
        color = '#631919';
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
                cellView.model.changeNodeContent(newText);
            }
        }
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
    }, 100);
};

$('#input-file-format').change(function () {
    $('#placeholder-save-image').html('');
    if ($(this).val() === "PNG") {
      $('#modal-input-hi-res').parent().removeClass('hidden');
    }
    else {
      $('#modal-input-hi-res').parent().addClass('hidden');
    }

});

$('#modal-button-save-image').click(function () {
    $('body *').addClass('waiting');
    clickedButton = this;


    //pre-processment
    if ($('#modal-input-precise-links').prop(`checked`)) {
          $(clickedButton).button('preciselinks');
          ui.connectLinksToShape();
    }

    //saving
    setTimeout(function () {
      $(clickedButton).button('save');
      filename = $('#input-filename').val() || 'goalModel';
      var $jointMarkers = $('.marker-vertices, .link-tools, .marker-arrowheads, .remove-element');
      var $saveImage = $('#placeholder-save-image');

      //hide UI elements before saving
      $jointMarkers.hide();
      ui.hideSelection();

      var originalWidth = istar.paper.getArea().width;
      var originalHeight = istar.paper.getArea().height;
      istar.paper.fitToContent({padding: 20, allowNewOrigin: 'any'});

      if ($('#input-file-format').val() === "SVG") {
          var svgData = saveSvg('diagram');
          $saveImage.html(createDownloadLink(filename + '.svg', 'click here to save', svgData, 'download SVG (vectorial)'));
          $('#modal-button-save-image').button('reset');
          $('#placeholder-save-image > a').click(function () {
              $('#placeholder-save-image').hide(200);
          });
      }
      else {
          resolutionFactor = 1;
          if ($('#modal-input-hi-res').prop(`checked`)) {
            resolutionFactor = 4;
          }
          savePng('diagram', addPngLink, filename, resolutionFactor);
      }

      //restore the paper to its initial state
      istar.paper.setDimensions(originalWidth, originalHeight);
      istar.paper.translate(0,0);

      //show the UI elements back again
      $jointMarkers.show();
      $saveImage.show();
      ui.showSelection(ui.getSelectedElement());

      $('body *').removeClass('waiting');
    }, 100);

});

function createDownloadLink(fileName, text, data, title) {
    var a = document.createElement('a');
    a.download = fileName;//name that will appear when saving the file
    a.title = title;
    a.href = data;
    $(a).click(function () {
        $('#modal-save-image').modal('hide');
    });

    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    return a;
}

function addPngLink(pngData, filename) {
    var a = createDownloadLink(filename+'.png', 'click here to save', pngData, 'download PNG');
    $('#placeholder-save-image').html(a);
    $('#modal-button-save-image').button('reset');
    $('#placeholder-save-image > a').click(function () {
        $('#placeholder-save-image').hide(200);
    });
}

$('#menu-button-save-model').click(function () {
    var model = saveModel();

    //workaround for jointjs bug: changing the path of a highlight when changing an attribute of a CellView
    ui.hideSelection();
    ui.showSelection();

    csvData = 'data:text/json;charset=utf-8,' + (encodeURI(model));
    a = createDownloadLink('goalModel.txt', '◀ File', csvData, 'download goal model');
    $('#placeholder-save-model').html(a).show();
    $('#placeholder-save-model > a').click(function () {
        $('#placeholder-save-model').hide(200);
    });
});

$('#modal-button-load-model').click(function () {
    $(this).button('loading');
    //load the model with a small delay, giving time to the browser to display the 'loading' message
    setTimeout(function () {
        //call the actual loading
        try {
            var fileInput = $('#input-file-to-load')[0];
            if (fileInput.files.length === 0) {
                alert('You must select a file to load');

                $('#modal-load-model').modal('hide');
                $('#modal-button-load-model').button('reset');
            }
            else {
                //else, load model from file
                var file = fileInput.files[0];
                if (file.type === 'text/plain') {
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        fileManager.load(e.target.result);

                        $('#modal-load-model').modal('hide');
                        $('#modal-button-load-model').button('reset');
                    };
                    fileReader.readAsText(file);
                }
                else {
                    alert('Sorry, this kind of file is not valid');
                    $('#modal-button-load-model').button('reset');
                    $('#modal-load-model').modal('hide');
                }
            }
        }
        catch (error) {
            $('#modal-button-load-model').button('reset');
            alert('Sorry, the input model is not valid.');
            console.log(error.stack);
        }
    }, 20);
});

ui.setupUi = function () {
    this.defineInteractions();
    uiC.createAddButtons();

    $('#placeholder-save-image').hide();
    $('#placeholder-save-model').hide();


    this.setupDiagramSizeInputs();
    this.setupLoadModelButton();
    this.setupMainMenuInteraction();
    $('#diagram-box-outer').height($(window).height()+100);


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

ui.setupLoadModelButton = function () {
  $('.modal-button-load-example').click(function () {
      $('.modal *').addClass('waiting');
      var modelToLoad = $(this).data('model');
      //do the processing after a small delay, in order to allow the browser to update the cursor icon
      setTimeout(function () {
          loadModel(istar.examples[modelToLoad]);
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

$('#actorBoundaryColorPicker').on('change', function () {
    ui.changeColorActorContainer(this.value);
});
$('#elementsColorPicker').on('change', function () {
    ui.changeColorElements(this.value);
});

$('#analyseModelButton').click(function () {
    var numberOfElements = 'Number of elements: ' + istar.getNumberOfElements();
    var numberOfLinks = 'Number of links: ' + istar.getNumberOfLinks();
    alert(numberOfElements + '\n' + numberOfLinks + '\n\n' + 'OBS: each dependency counts as two links - one from the depender to the dependum, and another from the dependum to the dependee.');
});

$('#menu-button-precise-links').click(function () {
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

$(document).keyup(function (e) {
    if (ui.getSelectedElement() !== null) {
        if (ui.currentStateIsView()) {
            if (e.which === 8 || e.which === 46) {
                // 8: backspace
                // 46: delete
                // The use of the 'backspace' key, in addition to the 'delete', key aims to improve support for Mac users,
                //    since in that system the key named 'delete' actually is a 'backspace' key
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






$('#fitToContentButton').click(function () {
    istar.paper.fitToContent({padding: 20, allowNewOrigin: 'any'});
});
$('#resetColorsButton').click(function () {
    $('#actorBoundaryColorPicker').get(0).jscolor.fromString('E6E6E6');
    ui.changeColorActorContainer('#E6E6E6');
    $('#elementsColorPicker').get(0).jscolor.fromString('CCFACD');
    ui.changeColorElements('#CCFACD');
});
