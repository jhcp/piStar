/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
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

    function _setLinkLabel (value) {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        this.label(0, {attrs: {text: {text: '' + value + ''}}});
        return this;
    }

    //prototype functions
    function _setNodeLabel (content) {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        var breakWidth = 90;
        if (! this.isKindOfActor()) {
            breakWidth = this.getBBox().width;
        }
        else {
            //actors' width require a different approach, since the regular getBBox refers to the whole actor
            breakWidth = joint.util.getElementBBox($('#'+ this.findView(istar.paper).id +' .actorSymbol')).width;
        }

        content = $.trim(content) || '';
        content = joint.util.breakText(content, {width: breakWidth});//add the line breaks automatically

        this.attr('.content/text', content);//actually change the label
        return this;
    }

    function _updateLineBreak () {
        /* jshint validthis: true */
        /* this function is meant to be added to a prototype */

        this.setNodeLabel(this.prop('name'));
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
            this.attr('.boundary/display', 'block');//display the actor's boundary
            _.forEach(this.getEmbeddedCells(), function (innerElement) {
                innerElement.attr('./display', 'block');//display the actor's inner elements

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
            var childBbox = null;
            // in case we want to keep links inside the boundary
            // if (child.isLink()) {
            //     childBbox = istar.paper.findViewByModel(child).getBBox();
            // }
            // else {
            //     childBbox = child.getBBox();
            // }
            if (! child.isLink()) {
                childBbox = child.getBBox();
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
        graph: {},
        paper: {},
        setup: {
            setupModel: function (_graph) {
                var graph = _graph ? graph : createDefaultGraph();
                setupGraphProperties(graph);
                return graph;

                function createDefaultGraph() {
                    //a joint js graph contains all cells (elements and links) of the model
                    return (new joint.dia.Graph());
                }

                function setupGraphProperties(graph) {
                    //create a new JointJS Element to store custom data properties of the
                    // model as a whole
                    graph._modelProperties = (new joint.dia.Element()).prop('name', '');
                    //creates a shortcut for setting up model properties
                    graph.prop = graph._modelProperties.prop;

                    //create is... functions for the graph object
                    //they are useful because, since the model itself can be selected, these functions
                    //can help differentiate it from regular cells
                    graph.isCell = function () {
                        return false;
                    };
                    graph.isElement = function () {
                        return false;
                    };
                    graph.isLink = function () {
                        return false;
                    };
                }
            },
            setupDiagram: function (graph, _paper) {
                var paper = _paper ? paper : createDefaultPaper(graph);
                setupElementLabelFunctions();
                setupAutomaticContainerResizing(graph);
                return paper;

                function createDefaultPaper(graph) {
                    //a joint js paper is the view for a joint js graph
                    return new joint.dia.Paper({
                        el: $('#diagram'), /*DOM container of the SVG image*/
                        width: 2000,
                        height: 1300,
                        model: graph,
                        gridSize: 1,
                        defaultConnector: {
                            name: 'rounded',
                            args: {
                                radius: 10
                            }
                        }
                        // defaultRouter: {
                        //     name: 'metro',
                        //     args: {
                        //         padding: 10
                        //     }
                        // }
                        //,async: true,
                        //linkConnectionPoint: joint.util.shapePerimeterConnectionPoint, //connects links to the nodes' shape, rather than their bounding box. Big toll on performance
                    });
                }

                function setupElementLabelFunctions() {
                    joint.dia.Element.prototype.setNodeLabel = _setNodeLabel;
                    joint.dia.Element.prototype.updateLineBreak = _updateLineBreak;
                }

                function setupAutomaticContainerResizing(graph) {
                    //updates the size of a container boundary when its internal elements are moved
                    //based on JointJS' tutorial: http://jointjs.com/tutorial/hierarchy
                    graph.on('change:position change:size', function (cell, newPosition, opt) {

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
                            var parent = graph.getCell(parentId);
                            parent.updateBoundary();
                        }
                    });
                }
            },
            createContainerFunctions: function (prototype) {
                prototype.collapse = _collapse;
                prototype.uncollapse = _expand; /* @deprecated since version 2.0.0 - use 'expand' instead*/
                prototype.expand = _expand;
                prototype.toggleCollapse = _toggleCollapse;
                prototype.embedNode = _embedNode;
                prototype.updateBoundary = _updateActorBoundary;
            }
        },
        base: {
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

                if (newNode.attr('.stereotype')) {
                    if (! newNode.attr('.stereotype/text')) {
                        newNode.attr('.stereotype/text', '<<' + nodeType.name + '>>');
                    }
                }

                return newNode;
            },
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
        replaceNode: function (element, typeName) {
            var newNode = this.base.addNode(
                istar.metamodel.nodes[typeName],
                element.prop('name'),
                {
                    position: element.prop('position')
                });

            //copy the old node properties to the new node
            newNode.prop('originalSize', newNode.prop('size')); //stores the (default) initial size of the element
            if (element.prop('size') !== element.prop('originalSize')) {
                newNode.prop('size', element.prop('size')); //stores the initial size of the element
            }
            newNode.prop('customProperties', element.prop('customProperties'));
            if (element.getParentCell()) {
                element.getParentCell().embed(newNode);
            }
            //TODO copy style

            istar.graph.addCell(newNode);
            //update the line break on the element's label

            //change the dependency links from the old node to the new node
            var nodeId = element.prop('id');
            var connectedLinks = istar.graph.getConnectedLinks(element);
            _.forEach(connectedLinks, function (link) {
                if (link.prop('source/id') === nodeId) {
                    link.prop('source/id', newNode.prop('id'));
                }
                if (link.prop('target/id') === nodeId) {
                    link.prop('target/id', newNode.prop('id'));
                }
                // beginning of validation code for replacing inner elements
                // if (( ! link.isDependencyLink()) && ( ! newNode.isKindOfActor()) && ( ! newNode.isDependum())) {
                //     var sourceModel = istar.graph.getCell(link.prop('source/id'));
                //     var targetModel = istar.graph.getCell(link.prop('target/id'));
                //     console.log(targetModel);
                //     var isValid = istar.metamodel.nodeLinks[link.prop('type')].isValid(sourceModel, targetModel);
                //     console.log(isValid);
                // }
            });

            //remove the old node
            element.remove();

            return newNode;
        },
        /**
         * Adds a link between two containers.
         * @returns the new link
         * @param {object}  linkType    type definition of the link to be created
         * @param {Actor}   source      source of the link (the actual Cell, not just the id)
         * @param {Actor}   target      target of the link (the actual Cell, not just the id)
         */
        addLinkBetweenActors: function (linkType, source, target) {
            var hasShape = istar.metamodel.shapesObject[linkType.name];
            var link = new linkType.shapeObject({
                'source': {id: source.id},
                'target': {id: target.id}
            });
            link.prop('type', linkType.name);

            if (linkType.label) {
                link.attr('label/text', linkType.label);
                link.attr('label-background/text', linkType.label);
            }
            else if (! hasShape) {
                link.attr('label/text', '<<' + linkType.name + '>>');
                link.attr('label-background/text', '<<' + linkType.name + '>>');
            }

            istar.graph.addCell(link);
            return link;
        },
        addDependency: function (depender, dependum, dependee) {
            var shape = joint.shapes.istar.DependencyLink;
            var hasShape = true;
            if (!shape) {
                var shape = joint.shapes.istar.DependencyLink || joint.shapes.istar.DefaultContainerLink;
                hasShape = false;
            }
            var link1 = new shape({
                'source': {id: depender.id, selector: '.element'},
                'target': {id: dependum.id}
            });
            var link2 = new shape({
                'source': {id: dependum.id},
                'target': {id: dependee.id, selector: '.element'}
            });
            istar.graph.addCell(link1);
            istar.graph.addCell(link2);

            if (! hasShape) {
                link1.attr('label/text', '<<DependencyLink>>');
                link1.attr('label-background/text', '<<DependencyLink>>');
                link2.attr('label/text', '<<DependencyLink>>');
                link2.attr('label-background/text', '<<DependencyLink>>');
            }

            //stores a reference from one link to another, in order to be able so remove the other one if
            //any of them is removed, thus preventing dangling dependencies
            link1.prop('otherHalf', link2);
            link2.prop('otherHalf', link1);

            link1.prop('type', 'DependencyLink');
            link2.prop('type', 'DependencyLink');

            dependum.prop('isDependum', true);
            var dependumPosition = {
                x: ((depender.prop('position/x') + dependee.prop('position/x')) / 2),
                y: ((depender.prop('position/y') + dependee.prop('position/y')) / 2)
            };
            dependum.prop('position', dependumPosition);

            //move links to the back, so that they don't appear on top of the element's shape
            link1.toBack();
            link2.toBack();
            //move all the actors even further back, so that they don't impede the visualization of the dependency links
            _.forEach(istar.graph.getElements(), function (element) {
                if (element.isKindOfActor()) {
                    element.toBack();
                }
            });

            return [link1, link2];
        },
        addLinkBetweenNodes: function (linkType, source, target, value) {
            var hasShape = istar.metamodel.shapesObject[linkType.name];
            var link = new linkType.shapeObject({'source': {id: source.id}, 'target': {id: target.id}});
            link.prop('type', linkType.name);
            istar.graph.addCell(link);

            if (linkType.label) {
                link.attr('label/text', linkType.label);
                link.attr('label-background/text', linkType.label);
            }
            else if (! hasShape) {
                link.attr('label/text', '<<' + linkType.name + '>>');
                link.attr('label-background/text', '<<' + linkType.name + '>>');
            }

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
        },
        clearModel: function () {
            istar.graph.clear();
            istar.graph.prop('name', '');
            istar.graph.prop('customProperties', '');//delete all custom properties
            istar.graph.prop('customProperties/Description', '');//set back the 'Description' property
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
        isElementSourceOfType: function (element, typeName) {
            var currentLinksFromElement = istar.graph.getConnectedLinks(element);
            var isSourceOf = false;
            _.forEach(currentLinksFromElement, function (link) {
                isSourceOf = isSourceOf || ((link.getSourceElement() === element) && (link.prop('type') === typeName));
            });
            return isSourceOf;
        },
        isElementTargetOfType: function (element, typeName) {
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