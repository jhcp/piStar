/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
 * https://github.com/jhcp/pistar
 */

/**
 * Construct a new istar object.
 * This is the basic istar class.
 * this object contains the main functionalities for creating istar models
 *
 * @return {object} A new istar object
 * @class istar
 */
var istar = function () {
    'use strict';

    //private functions

    function _createDefaultGraph  () {
        //a joint js graph contains all cells (elements and links) of the model
        var graph = new joint.dia.Graph();

        //create a new JointJS Cell to store custom data properties of the
        // model as a whole
        graph._modelProperties = (new joint.dia.Element()).prop('name', '');
        //creates a shortcut for setting up model properties
        graph.prop = graph._modelProperties.prop;

        //create is... functions
        //they are useful because, since the model itself can be selected, these functions
        //can help differentiate it from regular cells
        graph.isCell = function() {return false;};
        graph.isElement = function(){return false;};
        graph.isLink = function(){return false;};

        return graph;
    }

    function _createDefaultPaper (graph) {
        //a joint js paper is the view for a joint js graph
        return new joint.dia.Paper({
            el: $('#diagram'), /*DOM container of the SVG image*/
            width: 2000,
            height: 1300,
            model: graph,
            gridSize: 1,
            linkPinning: false, /*prevents connecting a link to a point outside of an element*/
            defaultConnector: {
                name: 'rounded',
                args: {
                    radius: 10
                }
            }
            //async: true,
            //linkConnectionPoint: joint.util.shapePerimeterConnectionPoint, //connects links to the nodes' shape, rather than their bounding box. Big toll on performance
        });
    }

    function _createBasicPrototypeFunctions  () {
        joint.dia.Element.prototype.setNodeLabel = _setNodeLabel;
        joint.dia.Element.prototype.updateLineBreak = _updateLineBreak;
    }

    function _setNodeLabel (content) {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        //a default width value for kindOfActor elements, since the BBox refers to the whole element (including its boundary)
        var breakWidth = 90;
        if (! this.isKindOfActor()) {
            breakWidth = this.findView(istar.paper).getBBox().width;
        }

        content = $.trim(content) || '';
        content = joint.util.breakText(content, {width: breakWidth});//add the line breaks automatically

        this.attr('text/text', content);//actually change the label
        return this;
    }

    function _updateLineBreak () {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        this.setNodeLabel(this.prop('name'), {breakLine: true, breakWidth: this.findView(istar.paper).getBBox().width});
    }

    function _embedNode (node) {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        if (node !== null) {
            this.embed(node);
            this.updateBoundary();
        }

        return node;
    }

    function _collapse () {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        var actor = this;//stores 'this' in a named variable so that it can be read by the anonymous function
        if (!this.prop('collapsed')) {
            this.attr('.boundary/display', 'none');//hide the actor's boundary
            _.forEach(this.getEmbeddedCells(), function (innerElement) {
                innerElement.attr('./display', 'none');//hide the actor's inner elements

                //retarget the dependency links, from inner elements to the actor itself
                var connectedLinks = istar.graph.getConnectedLinks(innerElement);
                if (connectedLinks) {
                    _.forEach(connectedLinks, function (connectedLink) {
                        if (connectedLink.isDependencyLink() ) {
                            if (connectedLink.get('source').id === innerElement.id) {
                                connectedLink.prop('elementSource', innerElement.id);
                                connectedLink.set('source', {id: actor.id, selector: '.element'});
                            }
                            else if (connectedLink.get('target').id === innerElement.id) {
                                connectedLink.prop('elementTarget', innerElement.id);
                                connectedLink.set('target', {id: actor.id, selector: '.element'});
                            }
                        }
                    });
                }
            });
            this.prop('collapsed', true);
        }
    }

    function _expand () {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        var actor = this;//stores 'this' in a named variable so that it can be read by the anonymous function
        if (this.prop('collapsed')) {
            this.attr('.boundary/display', 'visible');//display the actor's boundary
            _.forEach(this.getEmbeddedCells(), function (innerElement) {
                innerElement.attr('./display', 'visible');//display the actor's inner elements

                //retarget the dependency links, from the actor to the original inner elements (when applicable)
                var connectedLinks = istar.graph.getConnectedLinks(actor);
                if (connectedLinks) {
                    _.forEach(connectedLinks, function (connectedLink) {
                        if (connectedLink.isDependencyLink() ) {
                            if (connectedLink.get('source').id === actor.id) {
                                if (connectedLink.prop('elementSource')) {
                                    connectedLink.set('source', {
                                        id: istar.graph.getCell(connectedLink.prop('elementSource')).id,
                                        selector: 'text'
                                    });
                                }
                            }
                            else if (connectedLink.get('target').id === actor.id) {
                                if (connectedLink.prop('elementTarget')) {
                                    connectedLink.set('target', {
                                        id: istar.graph.getCell(connectedLink.prop('elementTarget')).id,
                                        selector: 'text'
                                    });
                                }
                            }
                        }
                    });
                }
            });
            this.prop('collapsed', false);
        }
    }

    function _toggleCollapse () {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        if (this.prop('collapsed')) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }

    function _setLinkLabel (value) {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        this.label(0, {attrs: {text: {text: '' + value + ''}}});
        return this;
    }

    function _updateActorBoundary () {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        //update the size of the (parent) actor's boundary based on its contents
        //based on a JointJS tutorial: http://www.jointjs.com/tutorial/hierarchy

        if (!this.get('originalPosition')) {
            this.set('originalPosition', this.get('position'));
        }
        if (!this.get('originalSize')) {
            this.set('originalSize', this.get('size'));
        }

        var originalPosition = this.get('originalPosition');
        var originalSize = this.get('originalSize');

        var newX = originalPosition.x;
        var newY = originalPosition.y;
        var newCornerX = originalPosition.x + originalSize.width;
        var newCornerY = originalPosition.y + originalSize.height;

        _.forEach(this.getEmbeddedCells(), function (child) {
            if (!child.isLink()) {
                var childBbox = child.getBBox();

                if (childBbox.x < newX) {
                    newX = childBbox.x;
                }
                if (childBbox.y < newY) {
                    newY = childBbox.y;
                }
                if (childBbox.corner().x > newCornerX) {
                    newCornerX = childBbox.corner().x;
                }
                if (childBbox.corner().y > newCornerY) {
                    newCornerY = childBbox.corner().y;
                }
            }
        });

        // Note that we also pass a flag so that we know we shouldn't adjust the
        // `originalPosition` and `originalSize` in our handlers as a reaction
        // on the following `set()` call.
        this.set({
            position: {x: newX, y: newY},
            size: {width: newCornerX - newX, height: newCornerY - newY}
        }, {skipParentHandler: true});

        if (this.attr('.boundary/width')) {
            this.attr({
                '.boundary': {
                    width: newCornerX - newX + 10,
                    height: newCornerY - newY + 10
                }
            });
        }
        else if (this.attr('.boundary/r')) {
            //tempative handling of circular boundaries
            var largerDimension = (newCornerX - newX) >  (newCornerY - newY) ? (newCornerX - newX) : (newCornerY - newY);
            this.attr({
                '.boundary': {
                    cx: largerDimension/2,
                    cy: largerDimension/2,
                    r: largerDimension/2
                }
            });
        }
    }

    //public attributes and functions
    return {
        metamodel: {},
        setupModel: function (graph) {
            this.graph = graph ? graph : _createDefaultGraph();
            _createBasicPrototypeFunctions();
        },
        setupDiagram: function (paper) {
            this.paper = paper ? paper : _createDefaultPaper(this.graph);

            this.setupAutomaticContainerResizing();
        },
        setupAutomaticContainerResizing: function () {
            //updates the size of an actor's boundary when its internal elements are moved
            //based on JointJS' tutorial: http://jointjs.com/tutorial/hierarchy
            this.graph.on('change:position', function (cell, newPosition, opt) {

                if (opt.skipParentHandler) {
                    return;
                }

                if (cell.get('embeds') && cell.get('embeds').length) {
                    // If we're manipulating a parent element, let's store
                    // it's original position to a special property so that
                    // we can shrink the parent element back while manipulating
                    // its children.
                    cell.set('originalPosition', cell.get('position'));
                }

                var parentId = cell.get('parent');
                if (parentId) {
                    var parent = istar.graph.getCell(parentId);
                    parent.updateBoundary();
                }
            });
        },
        displayInvalidModelMessages: function(messages) {
            messages = messages || [];
            _.forEach(messages, function(message) {
                console.log('INVALID: ' + message);
            });
        },
        /**
         * Returns true if the model is empty (i.e. it does not contain any element).
         * @returns {boolean} isEmpty
         * @example
         *   if (istar.isEmpty()) {...}
         */
        isEmpty: function () {
            return (_.size(istar.graph.getCells()) < 1);
        },

        /**
         * Returns the number of cells in the model (i.e. the number of elements plus the number of links).
         * @returns {number} number of cells (elements + links)
         * @example
         *   istar.getNumberOfCells();
         */
        getNumberOfCells: function () {
            return _.size(istar.graph.getCells());
        },

        /**
         * Returns the number of elements (nodes) in the model. For instance, actors and tasks are elements
         * @returns {number} number of elements (nodes)
         * @example
         *   istar.getNumberOfElements();
         */
        getNumberOfElements: function () {
            //note: the dependum also counts as an element
            return _.size(istar.graph.getElements());
        },

        /**
         * Returns the number of links (connections) in the model. For instance, refinements and contributions are links.
         * Please note that each dependency has 2 links: one from the depender to the dependum, and other from the dependum
         * to the dependee.
         * @returns {number} number of links (connections)
         * @example
         *   istar.getNumberOfLinks();
         */
        getNumberOfLinks: function () {
            //note: each dependency counts as two links: one from the depender to the dependum, and another from the dependum to the dependee
            return _.size(istar.graph.getLinks());
        },
        /**
         * Adds a new node to the model.
         * Instead of calling this function directly, this function is expected to be called
         * from a specialized 'add' function, such as addActor or addTask.<br />
         * @returns the new node
         * @param {object}  nodeType    type definition of the node to be created
         * @param {string}  content     content of the node
         * @param {object}  options     {id, position: {x, y}}
         */
        addNode: function (nodeType, content, options) {
            var newNode = new nodeType.shapeObject(options);
            //add to the graph before changing properties, so that eventual UI event listeners can start acting at once
            istar.graph.addCell(newNode);

            newNode.prop('name', content || nodeType.name);
            newNode.prop('type', nodeType.name);
            //stores the initial size of the element in order to later be able to restore it to its initial size
            newNode.prop('originalSize', newNode.prop('size'));

            return newNode;
        },
        replaceNode: function (element, typeName) {
            var shape = istar.metamodel.nodes[typeName].shapeObject;

            //create the node and add it to the graph
            var node = new shape({
                position: element.prop('position')
            });
            node.prop('type', typeName);

            //copy the old node properties to the new node
            node.prop('name', element.prop('name'));
            node.attr('text/text', element.prop('name'));
            node.prop('originalSize', node.prop('size')); //stores the initial size of the element
            if (element.prop('size') !== element.prop('originalSize')) {
                node.prop('size', element.prop('size')); //stores the initial size of the element
            }
            node.prop('customProperties', element.prop('customProperties'));
            //TODO copy style

            istar.graph.addCell(node);

            //change the dependency links from the old node to the new node
            var nodeId = element.prop('id');
            var connectedLinks = istar.graph.getConnectedLinks(element);
            if (connectedLinks[0].prop('source/id') === nodeId) {
                connectedLinks[0].prop('source/id', node.prop('id'));
            }
            if (connectedLinks[1].prop('source/id') === nodeId) {
                connectedLinks[1].prop('source/id', node.prop('id'));
            }
            if (connectedLinks[0].prop('target/id') === nodeId) {
                connectedLinks[0].prop('target/id', node.prop('id'));
            }
            if (connectedLinks[1].prop('target/id') === nodeId) {
                connectedLinks[1].prop('target/id', node.prop('id'));
            }

            //remove the old node
            element.remove();

            return node;
        },
        /**
         * Adds a link between two actors.
         * @returns the new link
         * @param {object}  linkType    type definition of the link to be created
         * @param {Actor}   source      source of the link (the actual Cell, not just the id)
         * @param {Actor}   target      target of the link (the actual Cell, not just the id)
         */
        addLinkBetweenActors: function (linkType, source, target) {

            //prevent repeated links
            if (!this.isThereLinkBetween(source, target)) {
                var link = new linkType.shapeObject({
                    'source': {id: source.id},
                    'target': {id: target.id}
                });
                link.prop('type', linkType.name);

                istar.graph.addCell(link);
                return link;
            }
        },
        addOneSideOfDependencyLink: function (source, target) {
            var link;
            if (source.isKindOfActor()) {
                link = new joint.shapes.istar.DependencyLink({
                    'source': {id: source.id, selector: '.element'},
                    'target': {id: target.id}
                });
            }
            else {
                link = new joint.shapes.istar.DependencyLink({'source': {id: source.id}, 'target': {id: target.id}});
            }
            link.prop('type', 'DependencyLink');

            istar.graph.addCell(link);

            //move links to the back, so that they don't appear on top of the element's shape
            link.toBack();
            //move all the actors even further back, so that they don't impede the visualization of the dependency links
            var actors = _.filter(istar.graph.getElements(), function (element) {
                return element.isKindOfActor();
            });
            _.forEach(actors, function (actor) {
                actor.toBack();
            });
            return [link];
        },
        addDependencyLink: function (depender, dependum, dependee) {
            //TODO prevent repeated links

            var link1;
            if (depender.isKindOfActor()) {
                link1 = new joint.shapes.istar.DependencyLink({
                    'source': {id: depender.id, selector: '.element'},
                    'target': {id: dependum.id}
                });
            }
            else {
                link1 = new joint.shapes.istar.DependencyLink({
                    'source': {id: depender.id},
                    'target': {id: dependum.id}
                });
            }
            istar.graph.addCell(link1);

            var link2;
            if (dependee.isKindOfActor()) {
                link2 = new joint.shapes.istar.DependencyLink({
                    'source': {id: dependum.id},
                    'target': {id: dependee.id, selector: '.element'}
                });
            }
            else {
                link2 = new joint.shapes.istar.DependencyLink({
                    'source': {id: dependum.id},
                    'target': {id: dependee.id}
                });
            }
            istar.graph.addCell(link2);

            //make a reference from one link to another, in order to be able so remove the other one if
            //one of them is removed
            link1.prop('otherHalf', link2);
            link2.prop('otherHalf', link1);

            link1.prop('type', 'DependencyLink');
            link2.prop('type', 'DependencyLink');

            dependum.prop('isDependum', true);
            var dependumPosition = {x: 50, y: 50};
            dependumPosition.x = (depender.prop('position/x') + dependee.prop('position/x')) / 2;
            dependumPosition.y = (depender.prop('position/y') + dependee.prop('position/y')) / 2;
            dependum.prop('position', dependumPosition);

            //move links to the back, so that they don't appear on top of the element's shape
            link1.toBack();
            link2.toBack();
            //move all the actors even further back, so that they don't impede the visualization of the dependency links
            var actors = _.filter(istar.graph.getElements(), function (element) {
                return element.isKindOfActor();
            });
            _.forEach(actors, function (actor) {
                actor.toBack();
            });
            return [link1, link2];
        },
        addLinkBetweenNodes: function (linkType, source, target, value) {
            //prevent repeated links
            var currentLinksFromSource = istar.graph.getConnectedLinks(source);
            var isDuplicated = false;
            _.forEach(currentLinksFromSource, function (link) {
                isDuplicated = isDuplicated || link.getSourceElement() === target || link.getTargetElement() === target;
            });
            if (!isDuplicated) {
                var link = new linkType.shapeObject({'source': {id: source.id}, 'target': {id: target.id}});
                link.prop('type', linkType.name);
                istar.graph.addCell(link);
                //embeds the link on the (parent) actor of its source element, to facilitate collapse/expand
                if (source.get('parent')) {
                    istar.graph.getCell(source.get('parent')).embed(link);
                }

                if (linkType.changeableLabel) {
                    link.setContributionType = _setLinkLabel;
                    link.on('change:value', function(link, newValue) {
                        link.setContributionType(newValue);
                    });
                }
                if (value) {
                    link.prop('value', value);
                }

                return link;
            }
        },
        clearModel: function () {
            istar.graph.clear();
        },
        createContainerFunctions: function (prototype) {
            prototype.collapse = _collapse;
            prototype.uncollapse = _expand; /* @deprecated since version 2.0.0 - use 'expand' instead*/
            prototype.expand = _expand;
            prototype.toggleCollapse = _toggleCollapse;
            prototype.embedNode = _embedNode;
            prototype.updateBoundary = _updateActorBoundary;
        },
        embedNode: function (child, parent) {
            parent.embed(child);
        },
        getElements: function () {
            return this.graph.getElements();
        },
        getCells: function () {
            return this.graph.getCells();
        },
        getLinks: function () {
            return this.graph.getLinks();
        },
        isSourceOf: function (element, typeName) {
            var currentLinksFromElement = istar.graph.getConnectedLinks(element);
            var isSourceOf = false;
            _.forEach(currentLinksFromElement, function (link) {
                isSourceOf = isSourceOf || ((link.getSourceElement() === element) && (link.prop('type') === typeName));
            });
            return isSourceOf;
        },
        isTargetOf: function (element, typeName) {
            var currentLinksFromElement = istar.graph.getConnectedLinks(element);
            var isTargetOf = false;
            _.forEach(currentLinksFromElement, function (link) {
                isTargetOf = isTargetOf || ((link.getTargetElement() === element) && (link.prop('type') === typeName));
            });
            return isTargetOf;
        },
        isThereLinkBetween: function (source, target, typeName) {
            //check for existing links between two elements
            //useful for preventing duplicated links
            //returns true if there is already at least one link between source and target
            var currentLinksFromSource = istar.graph.getConnectedLinks(source);
            var isDuplicated = false;
            if (typeName) {
                _.forEach(currentLinksFromSource, function (link) {
                    isDuplicated = isDuplicated || (link.prop('type') === typeName && (link.getSourceElement() ===
                        target || link.getTargetElement() === target) );
                });
            }
            else {
                _.forEach(currentLinksFromSource, function (link) {
                    isDuplicated = isDuplicated || link.getSourceElement() === target || link.getTargetElement() === target;
                });
            }
            return isDuplicated;
        }

    };
}();

/*definition of globals to prevent undue JSHint warnings*/
/*globals joint:false, $:false, _:false, ui:false, console:false */