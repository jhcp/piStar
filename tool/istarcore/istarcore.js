/*!
 * istarcore 0.1.0
 *
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 */

/**
 * Construct a new istar object.
 * This is the basic istar class.
 * this object contains the main functionalities for creating istar models
 *
 * @return A new istar object
 * @class istar
 */
var istar = function(){

    var _createDefaultGraph = function(){
        return new joint.dia.Graph();
    };
    var _createDefaultPaper = function(graph){
        return new joint.dia.Paper({
            el: $('#diagram'),
            // width: 1300,
            // height: 1300,
            width: ($('#diagram').width() - 22)*1.5,
            height: $('#diagram').height() * 2,
            model: graph,
            gridSize: 1,
            //async: true,
            //linkConnectionPoint: joint.util.shapePerimeterConnectionPoint, //connects links to the nodes' shape, rather than their bounding box. Big toll on performance
        });
    };
    var _createBasicPrototypeFunctions = function(){
        joint.dia.Element.prototype.changeNodeContent = _changeNodeContent;
        joint.dia.Cell.prototype.isDependum = function () {return this.get('isDependum');};
    };
    var _changeNodeContent = function (content, options) {
        "use strict";
        /* this function is meant to be added to a prototype */
        //default values for the options
        options = _.defaults(options || {}, {
            'breakLine': true,
            'breakWidth': 90
        });
        //add the line breaks automatically
        if ( options.breakLine && content ) {
            content = joint.util.breakText(content, { width: options.breakWidth });
        }

        this.attr('text/text', content);
        return this;
    };
    var _embedNode = function (node) {
        "use strict";
        if (node !== null) {
            this.embed(node);
            _updateActorBoundary(this);
        }

        return node;
    };
    var _collapse = function () {
        "use strict";
        var actor = this;//stores 'this' in a named variable so that it can be read by the anonymous function
        if (! this.prop('collapsed')) {
            this.attr('rect/display', 'none');//hide the actor's boundary
            _.each(this.getEmbeddedCells(), function(innerElement) {
                innerElement.attr('./display', 'none');//hide the actor's inner elements

                //update the dependency links
                var connectedLinks = istar.graph.getConnectedLinks(innerElement);
                if (connectedLinks) {
                    _.each(connectedLinks, function(connectedLink) {
                        if (connectedLink.attributes.type === (istar.linkTypes.dependency.name)) {

                            if(connectedLink.get('source').id === innerElement.id) {
                                connectedLink.prop('elementSource', innerElement.id);
                                connectedLink.set('source', {id: actor.id, selector:'circle'});
                            }
                            else if(connectedLink.get('target').id === innerElement.id) {
                                connectedLink.prop('elementTarget', innerElement.id);
                                connectedLink.set('target', {id: actor.id, selector:'circle'});
                            }
                            _updateLinkLabelRotation(connectedLink);
                        }
                    });
                }
            });
            this.prop('collapsed', true);
        }
    };
    var _uncollapse = function () {
        "use strict";
        var actor = this;//stores 'this' in a named variable so that it can be read by the anonymous function
        if (this.prop('collapsed')) {
            this.attr('rect/display', 'visible');//display the actor's boundary
            _.each(this.getEmbeddedCells(), function(innerElement) {
                innerElement.attr('./display', 'visible');//display the actor's inner elements

                //update the dependency links
                var connectedLinks = istar.graph.getConnectedLinks(actor);
                if (connectedLinks) {
                    _.each(connectedLinks, function(connectedLink) {
                        if (connectedLink.attributes.type === (istar.linkTypes.dependency.name)) {

                            if(connectedLink.get('source').id === actor.id) {
                                if (connectedLink.prop('elementSource')) {
                                    connectedLink.set('source', {id: istar.graph.getCell(connectedLink.prop('elementSource')).id, selector:'text'});
                                }
                            }
                            else if(connectedLink.get('target').id === actor.id) {
                                if (connectedLink.prop('elementTarget')) {
                                    connectedLink.set('target', {id: istar.graph.getCell(connectedLink.prop('elementTarget')).id, selector:'text'});
                                }
                            }
                            _updateLinkLabelRotation(connectedLink);
                        }
                    });
                }
            });
            this.prop('collapsed', false);
        }
    };
    var _toggleCollapse = function () {
        "use strict";
        if (this.prop('collapsed')) {
            this.uncollapse();
        }
        else {
            this.collapse();
        }
    };
    var _getNodeLinkLabel = function () {
        "use strict";
        return this.label(0).attrs.text.text;
    };
    _setNodeLinkLabel = function (value) {
        "use strict";
        this.label(0, {attrs: {text: {text: '' + value + ''}}});
        return this;//TODO
    };
    setNodeLinkLabel = function (link, value) {
        "use strict";
        link.label(0, {attrs: {text: {text: '' + value + ''}}});
        return link;
    };
    var _updateLinkLabelRotation = function (link) {
        "use strict";
        var source = istar.graph.getCell(link.attributes.source.id);
        var target = istar.graph.getCell(link.attributes.target.id);

        //calculates a new angle for the label, based on the x and y position of the elements
        var deltaX = (target.attributes.position.x - source.attributes.position.x);
        var deltaY = (target.attributes.position.y - source.attributes.position.y);
        var angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);
        if (link.isActorLink()) {
            if (angle > 90 || angle < -90) angle -= 180;//adjust the angle to prevent the text from being upside down
        }

        var yOffset = -8;
        if (link.attributes.type === V.sanitizeText(istar.linkTypes.dependency.name)) {
            yOffset=-11;
        }
        //apply the new angle

        link.attr({
            'text': {transform: 'rotate('+ angle + ') translate(0,' + yOffset + ')' },
            // 'text': {transform: 'rotate('+ angle + ') translate(0,-8)' },
            'rect': {transform: 'rotate('+ angle + ')' },
        });
    };

    var _updateActorBoundary = function (parent) {
        "use strict";
        //update the size of the (parent) actor's boundary based on its contents
        //based on a JointJS tutorial: http://www.jointjs.com/tutorial/hierarchy

        var parentBbox = parent.getBBox();

        if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
        if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));

        var originalPosition = parent.get('originalPosition');
        var originalSize = parent.get('originalSize');

        var newX = originalPosition.x;
        var newY = originalPosition.y;
        var newCornerX = originalPosition.x + originalSize.width;
        var newCornerY = originalPosition.y + originalSize.height;

        _.each(parent.getEmbeddedCells(), function(child) {
            if (! child.isLink()) {
                var childBbox = child.getBBox();

                if (childBbox.x < newX) { newX = childBbox.x; }
                if (childBbox.y < newY) { newY = childBbox.y; }
                if (childBbox.corner().x > newCornerX) { newCornerX = childBbox.corner().x; }
                if (childBbox.corner().y > newCornerY) { newCornerY = childBbox.corner().y; }
            }
        });

        // Note that we also pass a flag so that we know we shouldn't adjust the
        // `originalPosition` and `originalSize` in our handlers as a reaction
        // on the following `set()` call.
        parent.set({
            position: { x: newX, y: newY },
            size: { width: newCornerX - newX, height: newCornerY - newY }
        }, { skipParentHandler: true });
        parent.attr({
            rect: { width: newCornerX - newX + 10,
                    height: newCornerY - newY + 10,
                    }
        });
    };

    return {
        PREFIX_ADD:  'add', /*prefix to identify functions that add an element. Ex: addTask(...)*/
        PREFIX_IS:  'is',   /*prefix to identify functions that check if an element is of an certain kind. Ex: isTask(...)*/
        types: {},
        linkTypes: {
            'dependency': {
                'name': 'istar.DependencyLink',
                //'className': joint.shapes.istar.DependencyLink
            },
            'contribution': {
                'name': 'istar.ContributionLink',
                //'className': joint.shapes.istar.ContributionLink
            }
        },
        rotateLabel: _updateLinkLabelRotation,
        setupModel: function(graph) {
            "use strict";
            this.graph = graph ? graph : _createDefaultGraph();
            _createBasicPrototypeFunctions();
        },
        setupDiagram: function(paper) {
            "use strict";
            this.paper = paper ? paper : _createDefaultPaper(this.graph);

            this.setupLabelRotation(/DependencyLink|IsALink|ParticipatesInLink/);
            this.setupAutomaticContainerResizing();
        },
        setupLabelRotation: function(expressionWithRotatableLinksNames) {

            //updates the rotation of labels when an element is moved
            this.paper.on('cell:pointerup', function(cellView, evt, x, y) {
                var connectedLinks = istar.graph.getConnectedLinks(cellView.model);
                if (connectedLinks) {
                    _.each(connectedLinks, function(connectedLink) {
                        if ( connectedLink.attributes.type.match(expressionWithRotatableLinksNames) ) {
                            _updateLinkLabelRotation(connectedLink);
                        }
                    });
                }

            });
        },
        setupAutomaticContainerResizing: function() {
            //updates the size of an actor's boundary when its internal elements are moved
            //based on JointJS' tutorial: http://jointjs.com/tutorial/hierarchy
            this.graph.on('change:position', function(cell, newPosition, opt) {

                if (opt.skipParentHandler) return;

                if (cell.get('embeds') && cell.get('embeds').length) {
                    // If we're manipulating a parent element, let's store
                    // it's original position to a special property so that
                    // we can shrink the parent element back while manipulating
                    // its children.
                    cell.set('originalPosition', cell.get('position'));
                }

                var parentId = cell.get('parent');
                if (!parentId) return;
                var parent = istar.graph.getCell(parentId);
                _updateActorBoundary(parent);
            });
        },
        /**
         * Returns true if the model is empty (i.e. it does not contain any element).
         * @returns {boolean} isEmpty
         * @example
         *   if (istar.isEmpty()) {...}
         */
        isEmpty: function () {
            "use strict";
            return (_.size(istar.graph.getCells()) < 1);
        },

        /**
         * Returns the number of cells in the model (i.e. the number of elements plus the number of links).
         * @returns {number} number of cells (elements + links)
         * @example
         *   istar.getNumberOfCells();
         */
        getNumberOfCells: function () {
            "use strict";
            return _.size(istar.graph.getCells());
        },

        /**
         * Returns the number of elements (nodes) in the model. For instance, actors and tasks are elements
         * @returns {number} number of elements (nodes)
         * @example
         *   istar.getNumberOfElements();
         */
        getNumberOfElements: function () {
            "use strict";
            //note: the dependum also counts as an element
            return _.size(istar.graph.getElements());
        },

        /**
         * Returns the number of links (connections) in the model. For instance, refinements and contributions are links.
         * Please note that each depency has 2 links: one from the depender to the dependum, and other from the dependum
         * to the dependee.
         * @returns {number} number of links (connections)
         * @example
         *   istar.getNumberOfLinks();
         */
        getNumberOfLinks: function () {
            "use strict";
            //note: each dependency counts as two links: one from the depender to the dependum, and another from the dependum to the dependee
            return _.size(istar.graph.getLinks());
        },
        /**
         * Adds a new node to the model.
         * Instead of calling this function directly, this function is expected to be called
         * from a specialized 'add' function, such as addActor or addTask.<br />
         * Options object:<br />
         * breakLine: if true, breaks the line of the content automatically at breakWidth. <i>Default value: true</i>.<br />
         * breakWidth: width limit used for breaking lines. <i>Default value: 90</i>.
         * @returns the new node
         * @param {string} shape shape of the node to be created
         * @param {number} x    x position of the new node
         * @param {number} y    y position of the new node
         * @param [content]       content of the node
         * @param [options]       options of the new node
         */
        addNode: function (typeName, shape, x, y, content, options) {
            "use strict";
            if (! shape) {
                shape = joint.shapes.basic.Rect;//safeguard in case the library is being used without a visual representation
            }
            //options for addNode:

            //default values for the options
            options = _.defaults(options || {}, {
                'breakLine': true,
                'breakWidth': 90
            });
            //add the line breaks automatically
            if ( options.breakLine && content ) {
                content = joint.util.breakText(content, { width: options.breakWidth });
            }
            //create the node and add it to the graph
            var node;
            if (options.id) {
                node = new shape({
                    id: options.id,
                // var node = new istar.nodeTypes[shape].className({
                    position: { x: x, y: y },
                    attrs: {
                          text: { text: content }
                    }
                });
            }
            else {
                node = new shape({
                // var node = new istar.nodeTypes[shape].className({
                    position: { x: x, y: y },
                    attrs: {
                          text: { text: content }
                    }
                });
            }
            node.prop('type', typeName);
            istar.graph.addCell(node);
            return node;
        },
        /**
         * Adds a link between two actors.
         * @returns the new link
         * @param {Shape} shape     shape of the link
         * @param {Actor} source    source of the link
         * @param {Actor} target    target of the link
         */
        addLinkBetweenActors: function (linkName, shape, source, target) {
            "use strict";

            if (! shape) {
                shape = joint.dia.Link;//safeguard in case the library is being used without a visual representation
            }

            //prevent repeated links
            var currentLinksFromSource = istar.graph.getConnectedLinks(source);
            var isDuplicated = false;
            _.each(currentLinksFromSource, function(link) {
                isDuplicated = isDuplicated || link.getSourceElement() === target || link.getTargetElement() === target;
            });
            if ( ! isDuplicated) {
                var link = new shape({
                    'source': { id: source.id },
                    'target': { id: target.id }
                });

                link.prop('type', linkName);
                istar.graph.addCell(link);
                _updateLinkLabelRotation(link, source, target);
                return link;
            }
        },
        addOneSideOfDependencyLink: function (source, target) {
            "use strict";
            var link;
            if ( source.isKindOfActor() )
            {
                link = new joint.shapes.istar.DependencyLink({ 'source': { id: source.id, selector: 'circle' }, 'target': { id: target.id }    });
            }
            else {
                link = new joint.shapes.istar.DependencyLink({ 'source': { id: source.id }, 'target': { id: target.id }    });
            }

            istar.graph.addCell(link);
            _updateLinkLabelRotation(link, source, target);

            //move links to the back, so that they don't appear on top of the element's shape
            link.toBack();
            //move all the actors even further back, so that they don't impede the visualization of the dependency links
            var actors = _.filter(istar.graph.getElements(), function(element) {
                return element.isKindOfActor();
            });
            _.each(actors, function (actor) {
                actor.toBack();
            });
            return [link];
        },
        addDependencyLink: function (depender, dependum, dependee) {
            "use strict";
            //TODO prevent repeated links

            var link;
            if ( depender.isKindOfActor() )
            {
                link = new joint.shapes.istar.DependencyLink({ 'source': { id: depender.id, selector: 'circle' }, 'target': { id: dependum.id }    });
            }
            else {
                link = new joint.shapes.istar.DependencyLink({ 'source': { id: depender.id }, 'target': { id: dependum.id }    });
            }

            istar.graph.addCell(link);
            _updateLinkLabelRotation(link, depender, dependum);

            var link2;
            if ( dependee.isKindOfActor() ) {
                link2 = new joint.shapes.istar.DependencyLink({ 'source': { id: dependum.id }, 'target': { id: dependee.id, selector: 'circle' }    });
            }
            else {
                link2 = new joint.shapes.istar.DependencyLink({ 'source': { id: dependum.id }, 'target': { id: dependee.id }    });
            }
            istar.graph.addCell(link2);
            _updateLinkLabelRotation(link2, dependum, dependee);

            dependum.prop('isDependum', true);
            var dependumPosition = {x:50, y:50};
            dependumPosition.x = ( depender.prop('position/x') + dependee.prop('position/x') ) / 2;
            dependumPosition.y = ( depender.prop('position/y') + dependee.prop('position/y') ) / 2;
            dependum.prop('position', dependumPosition);

            //move links to the back, so that they don't appear on top of the element's shape
            link.toBack();
            link2.toBack();
            //move all the actors even further back, so that they don't impede the visualization of the dependency links
            var actors = _.filter(istar.graph.getElements(), function(element) {
                return element.isKindOfActor();
            });
            _.each(actors, function (actor) {
                actor.toBack();
            });
            return [link, link2];
        },
        addLinkBetweenNodes: function (linkName, shape, source, target, value) {
            "use strict";

            if (! shape) {
                shape = joint.dia.Link;//safeguard in case the library is being used without a visual representation
            }

            //prevent repeated links
            var currentLinksFromSource = istar.graph.getConnectedLinks(source);
            var isDuplicated = false;
            _.each(currentLinksFromSource, function(link) {
                isDuplicated = isDuplicated || link.getSourceElement() === target || link.getTargetElement() === target;
            });
            if ( ! isDuplicated) {
                var link = new shape({ 'source': { id: source.id }, 'target': { id: target.id } });
                if (value) setNodeLinkLabel(link, value);
                // if (value) link.setContributionType(value);
                istar.graph.addCell(link);
                //embeds the link on the (parent) actor of its source element, to facilitate collapse/uncollapse
                if (source.get('parent')) {
                    istar.graph.getCell(source.get('parent')).embed(link);
                }

                link.prop('type', linkName);
                return link;
            }
        },
        clearModel: function() {
            istar.graph.clear();
        },
        createContainerFunctions: function(prototype) {
            prototype.collapse = _collapse;
            prototype.uncollapse = _uncollapse;
            prototype.toggleCollapse = _toggleCollapse;
            prototype.embedNode = _embedNode;
        },
        createLabeledNodeLinkFunctions: function(prototype) {
            prototype.getContributionType = _getNodeLinkLabel;
            prototype.setContributionType = _setNodeLinkLabel;
        },
        createAddLinkBetweenActors: function(linkPrefixedName, linkName, shape) {
            this['add' + linkName] = function(source, target) {
                if ( istar.types[linkName].isValid(source, target) ) {
                    return istar.addLinkBetweenActors(linkPrefixedName, shape, source, target);
                }
            };
        },
        createAddLinkBetweenNodes: function(linkPrefixedName, linkName, shape) {
            this['add' + linkName] = function(source, target, label) {
                if ( istar.types[linkName].isValid(source, target) ) {
                    return istar.addLinkBetweenNodes(linkPrefixedName, shape, source, target, label);
                }
            };
        },
        embedNode: function(child, parent) {
            parent.embed(child);
        },
        getElements: function() {
            return this.graph.getElements();
        },
        getCells: function() {
            return this.graph.getCells();
        },
        getLinks: function() {
            return this.graph.getLinks();
        }

    };
}();
