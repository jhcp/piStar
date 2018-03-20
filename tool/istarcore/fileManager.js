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

function savePng(paperId, callback) {


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
        canvas.width = imageElement.width * 4; //multiply the width for better resolution
        canvas.height = imageElement.height * 4; //multiply the height for better resolution
        //fill the canvas with a color. To create an image with transparent background, you just need to remove the 'fillRect' line
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(imageElement, 0, 0, canvas.width, canvas.height);//insert the SVG image into the canvas. This does the actual rasterization of the image

        canvas.toBlob(function (blob) {
            var linkToDownload = URL.createObjectURL(blob);
            callback(linkToDownload);
        });

    };

}


function saveModel() {
    var diagram = {width: 1300, height: 1300};
    diagram.width = istar.paper.getArea().width;
    diagram.height = istar.paper.getArea().height;
    var date = new Date().toGMTString();

    var modelJSON = {
        'actors': [],
        'dependencies': [],
        'links': [],
        'display': {},
        'tool': 'pistar.1.2.0',
        'istar': '2.0',
        'saveDate': date,
        'diagram': diagram
    };

    var toCollapse = [];
    var vertices = [];

    _.each(istar.graph.getElements(), function (element) {
        if (element.isKindOfActor()) {
            var actorJSON = fileManager.elementToJSON(element);

            //it is necessary to expand collapsed actors in order
            //to get proper sources and targets for any dependency links
            if (element.prop('collapsed')) {
                toCollapse.push(element);//stores the actor in order to collapse it again afterwards
                element.uncollapse();
            }

            actorJSON.nodes = fileManager.childrenToJSON(element);
            modelJSON.actors.push(actorJSON);
        }
        else if (element.isDependum()) {
            var dependency = fileManager.elementToJSON(element);
            dependency.source = istar.graph.getConnectedLinks(element, {inbound: true})[0].attributes.source.id;
            dependency.target = istar.graph.getConnectedLinks(element, {outbound: true})[0].attributes.target.id;
            modelJSON.dependencies.push(dependency);
        }
    });
    _.each(istar.graph.getLinks(), function (link) {
        var linkJSON = fileManager.linkToJSON(link);
        if (link.isContributionLink()) {
            linkJSON.label = link.attributes.labels[0].attrs.text.text;
        }

        var vertices = link.get('vertices');
        if (vertices) {
            if (vertices.length > 0) {
                modelJSON.display[link.id] = {vertices: vertices};//add the vertices to the save file
            }
        }

        modelJSON.links.push(linkJSON);
    });

    _.each(toCollapse, function (actor) {
        modelJSON.display[actor.id] = {collapsed: true};//add the collapsing information to the save file
        actor.collapse();//collapses the actor, thus returning it to its original state
    });

    return fileManager.outputSavedModel(modelJSON);
}

function loadModel(inputRaw) {
    if (inputRaw) {
        this.changedModel = true;

        ui.clearDiagram();
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
        }

        var toCollapse = [];
        if (inputModel.actors) {
            //create actors and inner elements
            for (var i = 0; i < inputModel.actors.length; i++) {
                var actor = inputModel.actors[i];
                var parent = fileManager.addLoadedElement(actor);
                for (var j = 0; j < actor.nodes.length; j++) {
                    var child = fileManager.addLoadedElement(actor.nodes[j]);
                    if (child) parent.embedNode(child);
                }
                if (inputModel.display && inputModel.display[actor.id]) {
                    toCollapse.push(parent);
                }
            }

            //create dependencies
            for (i = 0; i < inputModel.dependencies.length; i++) {
                var element = inputModel.dependencies[i];
                var depender = istar.graph.getCell(element.source);
                var dependum = fileManager.addLoadedElement(element);
                var dependee = istar.graph.getCell(element.target);

                links = istar.addDependencyLink(depender, dependum, dependee);
                links[0].on('change:vertices', ui._toggleSmoothness);
                links[1].on('change:vertices', ui._toggleSmoothness);

                for (j = 0; j < inputModel.links.length; j++) {
                    linkJSON = inputModel.links[j];
                    if (linkJSON.target === element.id) {
                        if (inputModel.display && inputModel.display[linkJSON.id] && inputModel.display[linkJSON.id].vertices) {
                            links[0].set('vertices', inputModel.display[linkJSON.id].vertices);
                        }
                    }
                    if (linkJSON.source === element.id) {
                        if (inputModel.display && inputModel.display[linkJSON.id] && inputModel.display[linkJSON.id].vertices) {
                            links[1].set('vertices', inputModel.display[linkJSON.id].vertices);
                        }
                    }
                }

                dependum.prop('position/x', element.x);
                dependum.prop('position/y', element.y);
                // treat as dependum
            }

            //create links
            for (i = 0; i < inputModel.links.length; i++) {
                var linkJSON = inputModel.links[i];
                if (fileManager.isDependencyLink(linkJSON)) {
                    //fileManager.addDependencyLink(inputModel.links[i]);
                }
                else {
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
    }
}


fileManager = {
    load: loadModel,
    addLoadedElement: function (element) {
        if (element.id && element.type && element.x && element.y) {
            element.text = element.text || '';
            var type = element.type.split('.')[1];
            if (istar['add' + type]) {
                var newElement = istar['add' + type](element.x, element.y, element.text, {id: element.id});//obs: the id MUST be passed during creation, can't be changed later

                if (element.customProperties) {
                    newElement.prop('customProperties', element.customProperties);
                }
                return newElement;
            }
            else {
                var errorMessage = 'Unknown element type: ' + element.type + '.';
                console.log(errorMessage);
                alert(errorMessage);
            }
        }
    },
    addLoadedLink: function (linkJSON) {
        if (linkJSON.id && linkJSON.type && linkJSON.source && linkJSON.target) {
            var typeWithoutPrefix = linkJSON.type.split('.')[1];
            if (istar['add' + typeWithoutPrefix]) {
                sourceObject = istar.graph.getCell(linkJSON.source);
                targetObject = istar.graph.getCell(linkJSON.target);
                var newLink = istar['add' + typeWithoutPrefix](sourceObject, targetObject, linkJSON.label);

                if (linkJSON.customProperties) {
                    newLink.prop('customProperties', linkJSON.customProperties);
                }
                if (typeWithoutPrefix === 'ContributionLink') {
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
    addDependencyLink: function (linkJSON, dependum) {
        if (linkJSON.id && linkJSON.type && linkJSON.source && linkJSON.target) {
            var typeWithoutPrefix = linkJSON.type.split('.')[1];
            if (istar['add' + typeWithoutPrefix]) {
                sourceObject = istar.graph.getCell(linkJSON.source);
                targetObject = istar.graph.getCell(linkJSON.target);
                var newLink = istar.addDependencyLink(sourceObject, targetObject);
                if (linkJSON.customProperties) {
                    newLink.prop('customProperties', linkJSON.customProperties);
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
    addDependencyLink2: function (linkJSON) {
        if (linkJSON.id && linkJSON.type && linkJSON.source && linkJSON.target) {
            var typeWithoutPrefix = linkJSON.type.split('.')[1];
            if (istar['add' + typeWithoutPrefix]) {
                sourceObject = istar.graph.getCell(linkJSON.source);
                targetObject = istar.graph.getCell(linkJSON.target);
                var newLink = istar.addOneSideOfDependencyLink(sourceObject, targetObject);
                if (linkJSON.customProperties) {
                    newLink.prop('customProperties', linkJSON.customProperties);
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
    elementToJSON: function (element) {
        var text = element.prop('name');
        var result = {
            'id': element.id,
            'text': text,
            'type': element.prop('type'),
            'x': element.prop('position/x'),
            'y': element.prop('position/y'),
        };

        var customPropertiesJSON = fileManager.getCustomPropertiesJSON(element);
        if (customPropertiesJSON) result.customProperties = customPropertiesJSON;

        return result;
    },
    getCustomPropertiesJSON: function (element) {
        return element.prop('customProperties');
    },
    childrenToJSON: function (element) {
        var result = [];

        _.each(element.getEmbeddedCells(), function (element) {
            if (element.isKindOfInnerElement()) {
                var node = fileManager.elementToJSON(element);
                result.push(node);
            }
        });

        return result;
    },
    linkToJSON: function (link) {
        return {
            id: link.id,
            type: link.prop('type'),
            source: link.attributes.source.id,
            target: link.attributes.target.id,
        };
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
