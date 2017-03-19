/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
function saveSvg(paperId) {
	//access the SVG element and serialize it
	var text = (new XMLSerializer()).serializeToString(document.getElementById(paperId).childNodes[0]);

	return "data:image/svg+xml," + encodeURIComponent(text);
}


function savePng(paperId, callback) {
	var originalWidth = istar.paper.getArea().width;
	var originalHeight = istar.paper.getArea().height;
	istar.paper.fitToContent({padding: 40});
	//create a canvas, which is used to convert the SVG to png
	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');

	//create a img (DOM element) with the SVG content from our paper. This element will later be inserted in the canvas for converting to PNG
	var imageElement = new Image();
	var text = (new XMLSerializer()).serializeToString(document.getElementById(paperId).childNodes[0]);
	imageElement.src = "data:image/svg+xml," +encodeURIComponent(text);
	istar.paper.setDimensions(originalWidth, originalHeight);

	imageElement.onload = function() {
		canvas.width = imageElement.width*4; //multiply the width for better resolution
		canvas.height = imageElement.height*4; //multiply the height for better resolution
		//fill the canvas with a color. To create an image with transparent background, you just need to remove the 'fillRect' line
		canvasContext.fillStyle = 'white';
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.drawImage(imageElement, 0, 0, canvas.width, canvas.height);//insert the SVG image into the canvas. This does the actual rasterization of the image

		var png_dataurl = canvas.toDataURL("image/png");//get the canvas content as a PNG image
		callback(png_dataurl);
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
		'tool': 'pistar.1.0.0',
		"istar": "2.0",
	    "saveDate": date,
		'diagram': diagram};

	_.each(istar.graph.getElements(), function (element) {
		if (element.isKindOfActor()) {
			var actorJSON = fileManager.elementToJSON(element);
			var collapsed = element.prop("collapsed");
			if (collapsed) {
				element.uncollapse();
			}
			actorJSON.nodes = fileManager.childrenToJSON(element);
			modelJSON.actors.push(actorJSON);
			if (collapsed) {
				element.collapse();
			}
		}
		else if (element.isDependum()) {
			var dependency = fileManager.elementToJSON(element);
			dependency.source = istar.graph.getConnectedLinks(element, {inbound:true})[0].attributes.source.id;
			dependency.target = istar.graph.getConnectedLinks(element, {outbound:true})[0].attributes.target.id;
			modelJSON.dependencies.push(dependency);
		}
	});
	_.each(istar.graph.getLinks(), function (link) {
		var linkJSON = fileManager.linkToJSON(link);
		if (link.isContributionLink()) {
			linkJSON.label = link.attributes.labels[0].attrs.text.text;
		}
		modelJSON.links.push(linkJSON);
	});

	return fileManager.outputSavedModel(modelJSON);
}

function loadModel (inputRaw) {
	if (inputRaw) {
		this.changedModel = true;

		ui.clearDiagram();
		var inputModel = $.parseJSON(inputRaw);

		if ( inputModel.diagram) {
			if (inputModel.diagram.width && inputModel.diagram.height) {
				istar.paper.setDimensions(inputModel.diagram.width, inputModel.diagram.height);
			}
		}

		if ( inputModel.actors ) {
			//create actors and inner elements
			for (var i = 0; i < inputModel.actors.length; i++) {
				var actor = inputModel.actors[i];
				var parent = fileManager.addLoadedElement(actor);
				for (var j = 0; j < actor.nodes.length; j++) {
					var child = fileManager.addLoadedElement(actor.nodes[j]);
					if (child) parent.embedNode(child);
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

				dependum.prop('position/x', element.x);
				dependum.prop('position/y', element.y);
				// treat as dependum
			}

			//create links
			for (i = 0; i < inputModel.links.length; i++) {
				if (fileManager.isDependencyLink(inputModel.links[i])) {
					//fileManager.addDependencyLink(inputModel.links[i]);
				}
				else {
					fileManager.addLoadedLink(inputModel.links[i]);
				}
			}
		}
	}
}


fileManager = {
	load: loadModel,
	addLoadedElement: function (element) {
		if (element.id && element.text && element.type && element.x && element.y) {
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
		var text = element.attr('text/text');
		text = text.replace(/\n/g, ' ');
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
			//text: link.attr('text/text'),
		};
	},
	outputSavedModel: function (modelJson, newTab) {
		var stringifiedModel = JSON.stringify(modelJson, null, 2);
		if (newTab) {
			window.open("data:text/json;charset=utf-8," + escape(stringifiedModel));//this open the content of the file in a new tab
		}
		console.log(stringifiedModel);

		return stringifiedModel;
	}
};
