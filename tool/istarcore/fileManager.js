/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
function saveSvg(paperId) {
    //access the SVG element and serialize it
    $('svg').attr('width', istar.paper.getArea().width);
    $('svg').attr('height', istar.paper.getArea().height);
    var text = (new XMLSerializer()).serializeToString(document.getElementById(paperId).childNodes[2]);
    $('svg').attr('width', '100%');
    $('svg').attr('height', '100%');

    return "data:image/svg+xml," + encodeURIComponent(text);
}

//Polyfill for when the browser does not support canvas.toBlob()
//From https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function () {

                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback(new Blob([arr], {type: type || 'image/png'}));

            });
        }
    });
}

function savePng(paperId, callback, filename, resolutionFactor, transparent) {
    //create a canvas, which is used to convert the SVG to png
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');

    //create a img (DOM element) with the SVG content from our paper. This element will later be inserted in the canvas for converting to PNG
    var imageElement = new Image();
    $('svg').attr('width', istar.paper.getArea().width);
    $('svg').attr('height', istar.paper.getArea().height);
    var text = (new XMLSerializer()).serializeToString(document.getElementById(paperId).childNodes[2]);
    $('svg').attr('width', '100%');
    $('svg').attr('height', '100%');
    imageElement.src = "data:image/svg+xml," + encodeURIComponent(text);

    imageElement.onload = function () {
        canvas.width = imageElement.width * resolutionFactor; //multiply the width for better resolution
        canvas.height = imageElement.height * resolutionFactor; //multiply the height for better resolution
        if ( !transparent ) {
            //fill the canvas with a color
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        }
        canvasContext.drawImage(imageElement, 0, 0, canvas.width, canvas.height);//insert the SVG image into the canvas. This does the actual rasterization of the image

        canvas.toBlob(function (blob) {
            callback(blob, filename + '.png');
        });

    };

}


function saveModel() {
    var diagram = {width: 1300, height: 1300};
    diagram.width = istar.paper.getArea().width;
    diagram.height = istar.paper.getArea().height;
    if (istar.graph.prop('name')) {
      diagram.name = istar.graph.prop('name');
    }
    var customPropertiesJSON = fileManager.getCustomPropertiesJSON(istar.graph);
    if (customPropertiesJSON) {
      diagram.customProperties = customPropertiesJSON;
    }

    var date = new Date().toGMTString();

    var modelJSON = {
        'actors': [],
        'orphans': [],
        'dependencies': [],
        'links': [],
        'display': {},
        'tool': 'pistar.2.0.0a',
        'istar': '2.0',
        'saveDate': date,
        'diagram': diagram
    };

    var toCollapse = [];
    var vertices = [];

    _.forEach(istar.graph.getElements(), function (element) {
        if (element.isKindOfActor()) {
            var actorJSON = fileManager.elementToJSON(element);

            //it is necessary to expand collapsed actors in order
            //to get proper sources and targets for any dependency links
            if (element.prop('collapsed')) {
                toCollapse.push(element);//stores the actor in order to collapse it again afterwards
                element.uncollapse();
            }

            if (element.prop('backgroundColor')) {
              modelJSON.display[element.id] = {backgroundColor: element.prop('backgroundColor')};
            }

            children = fileManager.childrenToJSON(element);
            $.extend(true, modelJSON.display, children.display);
            actorJSON.nodes = children.nodes;
            modelJSON.actors.push(actorJSON);
        }
        else if (element.isDependum()) {
            var dependency = fileManager.elementToJSON(element);
            dependency.source = istar.graph.getConnectedLinks(element, {inbound: true})[0].attributes.source.id;
            dependency.target = istar.graph.getConnectedLinks(element, {outbound: true})[0].attributes.target.id;

            // if (element.prop('backgroundColor')) {
            //   modelJSON.display[element.id] = {backgroundColor: element.prop('backgroundColor')};
            // }

            var display = {};
            var needToSaveDisplay = false;
            if (element.prop('backgroundColor')) {
                display.backgroundColor = element.prop('backgroundColor');
                needToSaveDisplay = true;
            }
            if (element.prop('size/width') !== element.prop('originalSize/width')) {
                display.width = element.prop('size/width');
                needToSaveDisplay = true;
            }
            if (element.prop('size/height') !== element.prop('originalSize/height')) {
                display.height = element.prop('size/height');
                needToSaveDisplay = true;
            }

            if (needToSaveDisplay === true) {
                modelJSON.display[[element.id]] = display;
            }

            modelJSON.dependencies.push(dependency);
        }
        else if (!element.attributes.parent) {
            var orphan = fileManager.elementToJSON(element);
            var display = {};
            var needToSaveDisplay = false;
            if (element.prop('backgroundColor')) {
                display.backgroundColor = element.prop('backgroundColor');
                needToSaveDisplay = true;
            }
            if (element.prop('size/width') !== element.prop('originalSize/width')) {
                display.width = element.prop('size/width');
                needToSaveDisplay = true;
            }
            if (element.prop('size/height') !== element.prop('originalSize/height')) {
                display.height = element.prop('size/height');
                needToSaveDisplay = true;
            }

            if (needToSaveDisplay === true) {
                modelJSON.display[[element.id]] = display;
            }

            modelJSON.orphans.push(orphan);
        }
    });
    _.forEach(istar.graph.getLinks(), function (link) {
        var linkJSON = fileManager.linkToJSON(link);
        if (link.isContributionLink()) {
            linkJSON.label = link.prop('value');//link.attributes.labels[0].attrs.text.text;
        }

        var vertices = link.get('vertices');
        if (vertices) {
            if (vertices.length > 0) {
                modelJSON.display[link.id] = {vertices: vertices};//add the vertices to the save file
            }
        }

        modelJSON.links.push(linkJSON);
    });

    _.forEach(toCollapse, function (actor) {
        modelJSON.display[actor.id] = {collapsed: true};//add the collapsing information to the save file
        actor.collapse();//collapses the actor, thus returning it to its original state
    });

    return fileManager.outputSavedModel(modelJSON);
}

function loadModel(inputRaw) {
    if (inputRaw) {
        this.changedModel = true;

        fileManager.invalidMessages = [];
        ui.clearDiagram();
        istar.graph.prop('name', '');
        istar.graph.prop('customProperties', '');
        istar.graph.prop('customProperties/Description', '');
        try {
            var inputModel = $.parseJSON(inputRaw);
        } catch (e) {
            // if failed to parse, consider that the input already is a JSON object
            var inputModel = inputRaw;
        }

        if (inputModel.diagram) {
            if (inputModel.diagram.width && inputModel.diagram.height) {
                istar.paper.setDimensions(inputModel.diagram.width, inputModel.diagram.height);
            }
            istar.graph.prop('name', inputModel.diagram.name);
            if (inputModel.diagram.customProperties) {
              istar.graph.prop('customProperties', inputModel.diagram.customProperties)
            }
        }

        var toCollapse = [];
        if (inputModel.actors) {
            //create actors and inner elements
            for (var i = 0; i < inputModel.actors.length; i++) {
                var actor = inputModel.actors[i];
                var parent = fileManager.addLoadedElement(actor, inputModel.display);
                for (var j = 0; j < actor.nodes.length; j++) {
                    var child = fileManager.addLoadedElement(actor.nodes[j], inputModel.display);
                    if (child) {
                        parent.embedNode(child);
                    }
                }
                if (inputModel.display && inputModel.display[actor.id]) {
                    if (inputModel.display[actor.id].collapsed) {
                        toCollapse.push(parent);
                    }
                    if (inputModel.display[actor.id].backgroundColor) {
                        ui.changeColorElement(inputModel.display[actor.id].backgroundColor, parent);
                    }
                }
            }

            //create dependencies
            for (i = 0; i < inputModel.dependencies.length; i++) {
                var element = inputModel.dependencies[i];
                var depender = istar.graph.getCell(element.source);
                var dependum = fileManager.addLoadedElement(element, inputModel.display);
                var dependee = istar.graph.getCell(element.target);

                isValid = istar.metamodel.dependencyLinks['DependencyLink'].isValid(depender, dependee);
                if (!isValid.isValid) {
                    this._processInvalidLink('DependencyLink', depender, dependee);
                }

                links = istar.addDependencyLink(depender, dependum, dependee);
                links[0].on('change:vertices', ui._toggleSmoothness);
                links[1].on('change:vertices', ui._toggleSmoothness);

                for (j = 0; j < inputModel.links.length; j++) {
                    linkJSON = inputModel.links[j];
                    if (linkJSON.target === element.id) {
                        if (inputModel.display && inputModel.display[linkJSON.id] && inputModel.display[linkJSON.id].vertices) {
                            links[0].set('vertices', inputModel.display[linkJSON.id].vertices);
                        }
                        if (linkJSON.name) {
                            links[0].prop('name', linkJSON.name);
                        }
                        if (linkJSON.customProperties) {
                            links[0].prop('customProperties', linkJSON.customProperties);
                        }
                    }
                    if (linkJSON.source === element.id) {
                        if (inputModel.display && inputModel.display[linkJSON.id] && inputModel.display[linkJSON.id].vertices) {
                            links[1].set('vertices', inputModel.display[linkJSON.id].vertices);
                        }
                        if (linkJSON.name) {
                            links[1].prop('name', linkJSON.name);
                        }
                        if (linkJSON.customProperties) {
                            links[1].prop('customProperties', linkJSON.customProperties);
                        }
                    }
                }

                if (ui) {
                    ui.setupDependencyRemoval(links);
                }

                dependum.prop('position/x', element.x);
                dependum.prop('position/y', element.y);



            }

            //create links
            for (i = 0; i < inputModel.links.length; i++) {
                var linkJSON = inputModel.links[i];
                if (! fileManager.isDependencyLink(linkJSON)) {
                    var newLink = fileManager.addLoadedLink(linkJSON);
                    if (inputModel.display && inputModel.display[linkJSON.id] && inputModel.display[linkJSON.id].vertices) {
                        newLink.set('vertices', inputModel.display[linkJSON.id].vertices);
                    }
                }
            }

            for (var i = 0; i < toCollapse.length; i++) {
                toCollapse[i].collapse();
            }
        }
        if (inputModel.orphans) {
            //create orphan elements
            _.forEach(inputModel.orphans, function (element) {
                var orphan = fileManager.addLoadedElement(element, inputModel.display);

            });
        }
    }
    if (_.size(fileManager.invalidMessages)>0) {
        istar.displayInvalidModelMessages(fileManager.invalidMessages);
    }
}


fileManager = {
    load: loadModel,
    invalidMessages: [],
    addLoadedElement: function (element, display) {
        if (element.id && element.type && element.x && element.y) {
            element.text = element.text || '';
            var type = element.type.split('.')[1];
            if (istar['add' + type]) {
                var position = {x: element.x, y: element.y};
                //obs: the id MUST be passed during creation, can't be changed later
                // console.log(element.text);
                var newElement = istar['add' + type](element.text, {id: element.id, position: position});

                if (element.customProperties) {
                    newElement.prop('customProperties', element.customProperties);
                }

                if (display && display[element.id]) {
                    size = {};
                    if (display[element.id].backgroundColor) {
                        ui.changeColorElement(display[element.id].backgroundColor, newElement);
                    }
                    if (display[element.id].width) {
                        size.width = display[element.id].width;
                    }
                    if (display[element.id].height) {
                        size.height = display[element.id].height;
                    }
                    if (size.width || size.height) {
                        size.width = size.width || newElement.prop('size/width');
                        size.height = size.height || newElement.prop('size/height');
                        newElement.resize(size.width, size.height);
                        newElement.updateLineBreak();
                    }
                }

                return newElement;
            }
            else {
                var errorMessage = 'Unknown element type: ' + element.type + '. Your model will not load properly';
                console.log(errorMessage);
                alert(errorMessage);
            }
        }
    },
    _processInvalidLink: function(typeName, source, target) {
        var parent = source.parent();
        var parentText = '';
        if (parent) {
            parentText = 'In ' + istar.graph.getCell(parent).prop('name') + ', ';
        }
        var message = parentText + typeName + ' from "' + source.prop('name') + '" to "' +
            target.prop('name') + '": ' + isValid.message;
        this.invalidMessages.push(message);
    },
    addLoadedLink: function (linkJSON) {
        if (linkJSON.id && linkJSON.type && linkJSON.source && linkJSON.target) {
            var typeNameWithoutPrefix = linkJSON.type.split('.')[1];
            if (istar['add' + typeNameWithoutPrefix]) {
                sourceObject = istar.graph.getCell(linkJSON.source);
                targetObject = istar.graph.getCell(linkJSON.target);
                if (_.includes(istar.metamodel.getNodeLinksNames(), typeNameWithoutPrefix)) {
                    isValid = istar.metamodel.nodeLinks[typeNameWithoutPrefix].isValid(sourceObject, targetObject);
                    if (!isValid.isValid) {
                        this._processInvalidLink(typeNameWithoutPrefix, sourceObject, targetObject);
                    }
                }
                else if (_.includes(istar.metamodel.getContainerLinksNames(), typeNameWithoutPrefix)) {
                    isValid = istar.metamodel.containerLinks[typeNameWithoutPrefix].isValid(sourceObject, targetObject);
                    if (!isValid.isValid) {
                        this._processInvalidLink(typeNameWithoutPrefix, sourceObject, targetObject);
                    }
                }

                var newLink = istar['add' + typeNameWithoutPrefix](sourceObject, targetObject, linkJSON.label);

                if (linkJSON.name) {
                    newLink.prop('name', linkJSON.name);
                }
                if (linkJSON.customProperties) {
                    newLink.prop('customProperties', linkJSON.customProperties);
                }
                if (typeNameWithoutPrefix === 'ContributionLink') {
                    newLink.on('change:vertices', ui._toggleSmoothness);
                }
                return newLink;
            }
            else {
                var errorMessage = 'Unknown link type: ' + linkJSON.type + '.';
                console.log(errorMessage);
                alert(errorMessage);
            }
        }
    },
    isDependencyLink: function (linkJSON) {
        var result = false;
        if (linkJSON.id && linkJSON.type) {
            var typeWithoutPrefix = linkJSON.type.split('.')[1];
            if (linkJSON.type === 'istar.DependencyLink') {
                result = true;
            }
        }
        return result;
    },
    elementToJSON: function (element) {
        var text = element.prop('name');
        var result = {
            'id': element.id,
            'text': text,
            'type': istar.metamodel.prefix + '.' + element.prop('type'),
            'x': element.prop('position/x'),
            'y': element.prop('position/y'),
        };

        var customPropertiesJSON = fileManager.getCustomPropertiesJSON(element);
        if (customPropertiesJSON) result.customProperties = customPropertiesJSON;

        return result;
    },
    getCustomPropertiesJSON: function (cell) {
        return cell.prop('customProperties');
    },
    childrenToJSON: function (element) {
        var result = {nodes: [], display: {}};

        _.forEach(element.getEmbeddedCells(), function (element) {
            if (element.isKindOfInnerElement()) {
                var node = fileManager.elementToJSON(element);
                var display = {};
                var needToSaveDisplay = false;
                if (element.prop('backgroundColor')) {
                    display.backgroundColor = element.prop('backgroundColor');
                    needToSaveDisplay = true;
                }
                if (element.prop('size/width') !== element.prop('originalSize/width')) {
                    display.width = element.prop('size/width');
                    needToSaveDisplay = true;
                }
                if (element.prop('size/height') !== element.prop('originalSize/height')) {
                    display.height = element.prop('size/height');
                    needToSaveDisplay = true;
                }

                if (needToSaveDisplay === true) {
                    result.display[[element.id]] = display;
                }
                result.nodes.push(node);
            }
        });

        return result;
    },
    linkToJSON: function (link) {
        result = {
            id: link.id,
            type: istar.metamodel.prefix + '.' + link.prop('type'),
            source: link.attributes.source.id,
            target: link.attributes.target.id,
        };
        if (link.prop('name')) {
            result.name = link.prop('name');
        }
        var customPropertiesJSON = fileManager.getCustomPropertiesJSON(link);
        if (customPropertiesJSON) result.customProperties = customPropertiesJSON;
        return result;
    },
    outputSavedModel: function (modelJson, newTab) {
        var stringifiedModel = JSON.stringify(modelJson, null, 2);
        if (newTab) {
            window.open("data:text/json;charset=utf-8," + encodeURI(stringifiedModel));//this open the content of the file in a new tab
        }
        console.log(stringifiedModel);

        return stringifiedModel;
    }
};
