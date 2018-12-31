/*
    This function processes a given metamodel, stores the processed data on the istar global variable,
        and creates additional functions based on the metamodel

    It creates 'add' functions for each element of the metamodel
        For instance, if there is a node type named 'Person', an 'addPerson' function is created
*/

istar.validateMetamodel = function (metamodel) {
    //check if every kind of element and link has a name.
    //also check against names starting with 'node' or 'link', to prevent from overriding
    //methods of the istar object.
    _.forEach(metamodel.containers, function (element) {
        if (!element.name) {
            throw new Error('Invalid container in the metamodel. Containers must have a "name".');
        }
        if (element.name.match(/^(node|link)/i)) {
            throw new Error('Invalid container name in the metamodel: ' + element.name +
                '. Container names cannot start with "node" nor "link".');
        }
    });
    _.forEach(metamodel.nodes, function (element) {
        if (!element.name) {
            throw new Error('Invalid node in the metamodel. Nodes must have a "name".');
        }
        if (element.name.match(/^(node|link)/i)) {
            throw new Error('Invalid node name in the metamodel: ' + element.name +
                '. Node names cannot start with "node" nor "link".');
        }
    });
    _.forEach(metamodel.containerLinks, function (element) {
        if (!element.name) {
            throw new Error('Invalid container link in the metamodel. Container links must have a "name".');
        }
        if (element.name.match(/^(node|link)/i)) {
            throw new Error('Invalid container link name in the metamodel: ' + element.name +
                '. Container link names cannot start with "node" nor "link".');
        }
    });
    _.forEach(metamodel.nodeLinks, function (element) {
        if (!element.name) {
            throw new Error('Invalid node link in the metamodel. Node links must have a "name".');
        }
        if (element.name.match(/^(node|link)/i)) {
            throw new Error('Invalid node link name in the metamodel: ' + element.name +
                '. Node link names cannot start with "node" nor "link".');
        }
    });
    //TODO find a way to prevent so much duplication on this validation

    //check if the metamodel contains at least one kind of element (node or container)
    //if it doesnt them a model couldnt be created
    if ((!metamodel.containers || metamodel.containers.length === 0) &&
        (!metamodel.nodes || metamodel.nodes.length === 0)) {
        throw new Error('Invalid metamodel. Metamodels must have at least one container or one node.');
    }
};

istar.setupMetamodel = function (metamodel) {
    console.log('validating metamodel');
    istar.validateMetamodel(metamodel);
    console.log('metamodel is valid');

    createHelperGetNamesFunctions(metamodel);
    setupCellsSpecificPrototypes(metamodel);
    setupCellsGeneralPrototypes(metamodel);

    console.log('end of metamodel setup');
    return metamodel;

    //declaration of locally-scoped functions
    function createHelperGetNamesFunctions(metamodel) {
        //create helper functions that return arrays containing the names of sets of cells in this metamodel
        var getName = function (cellDefinition) {
            return cellDefinition.name;
        };
        metamodel.getContainersNames = function () {
            return _.map(metamodel.containers, getName);
        };
        metamodel.getNodesNames = function () {
            return _.map(metamodel.nodes, getName);
        };
        metamodel.getInnerElementsNames = function () {
            return _.map(
                _.filter(metamodel.nodes, 'canBeInnerElement'),
                getName);
        };
        metamodel.getDependumsNames = function () {
            return _.map(
                _.filter(metamodel.nodes, 'canBeDependum'),
                getName);
        };
        metamodel.getContainerLinksNames = function () {
            return _.map(metamodel.containerLinks, getName);
        };
        metamodel.getDependencyLinksNames = function () {
            return _.map(metamodel.dependencyLinks, getName);
        };
        metamodel.getNodeLinksNames = function () {
            return _.map(metamodel.nodeLinks, getName);
        };
    }

    function setupCellsSpecificPrototypes(metamodel) {
        _.forEach(metamodel.containers, function (cellType) {
            attachShapeObject(cellType, metamodel, 'element');
            createIsCellFunctions(cellType);
            createAddElementFunction(cellType);
            istar.createContainerFunctions(cellType.shapeObject.prototype);
        });
        _.forEach(metamodel.nodes, function (cellType) {
            attachShapeObject(cellType, metamodel, 'element');
            createIsCellFunctions(cellType);
            createAddElementFunction(cellType);
        });
        _.forEach(metamodel.containerLinks, function (cellType) {
            attachShapeObject(cellType, metamodel);
            createIsCellFunctions(cellType);
            createAddContainerLinkFunction(cellType);
        });
        _.forEach(metamodel.dependencyLinks, function (cellType) {
            attachShapeObject(cellType, metamodel);
            createIsCellFunctions(cellType);
        });
        _.forEach(metamodel.nodeLinks, function (cellType) {
            attachShapeObject(cellType, metamodel);
            createIsCellFunctions(cellType);
            createAddNodeLinkFunction(cellType);
        });
    }

    function attachShapeObject(cellType, metamodel, kindOfCell) {
        //attach to the individual Cell Type definition the shape object that is used to create its view
        if (cellType.name) {
            if ((!cellType.shapeObject) && metamodel.shapesObject) {
                cellType.shapeObject = metamodel.shapesObject[cellType.name];
            }
            if ((!cellType.shapeObject) && !metamodel.shapesObject) {
                //if no shape is defined, add a default shape, otherwise functions based on visual attributes will fail
                if (kindOfCell === 'element') {
                    cellType.shapeObject = joint.shapes.basic.Rect;
                }
                else {
                    cellType.shapeObject = joint.dia.Link;
                }
            }
        }
    }

    function createIsCellFunctions(cellType) {
        if (cellType.name) {
            //creates an 'isX' function that can be used to check if a given node is of this type
            //Example: if the cellType is Actor, an isActor() function will be created
            joint.dia.Cell.prototype['is' + cellType.name] = function () {
                return this.prop('type') === cellType.name;
            };

            //if a 'isValid' function has not been defined, create a default
            //function that poses no constraint
            if (! cellType.isValid) {
                cellType.isValid = function () {return {isValid: true, message: ''};};
            }
            // cellType.isValid = function () {return {isValid: true, message: ''};}; //uncomment to remove constraints
        }
    }

    function createAddElementFunction (nodeType) {
        //creates an 'add' function that can be used to create instances of this type
        //Example: if the cellType is Actor, an addActor() function will be created
        if (nodeType.name) {
            istar['add' + nodeType.name] = function (content, options) {
                return istar.addNode(nodeType, content, options);
            };
        }
    }

    function createAddContainerLinkFunction (linkType) {
        istar['add' + linkType.name] = function (source, target) {
            if (istar.metamodel.containerLinks[linkType.name].isValid(source, target)) {
                return istar.addLinkBetweenActors(linkType, source, target);
            }
        };
    }

    function createAddNodeLinkFunction (linkType) {
        istar['add' + linkType.name] = function (source, target, label) {
            if (istar.metamodel.nodeLinks[linkType.name].isValid(source, target)) {
                return istar.addLinkBetweenNodes(linkType, source, target, label);
            }
        };
    }

    function setupCellsGeneralPrototypes(metamodel) {
        joint.dia.Cell.prototype.isActorLink = function () {
            return _.includes(metamodel.getContainerLinksNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isNodeLink = function () {
            return _.includes(metamodel.getNodeLinksNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isKindOfInnerElement = function () {
            return _.includes(metamodel.getInnerElementsNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isDependum = function () {
            //this function does not inform if this type can be dependum.
            // Instead, it informs whether this instance is an actual dependum in the present graph
            return this.get('isDependum') || false;
        };
        joint.dia.Cell.prototype.isKindOfActor = function () {
            return _.includes(metamodel.getContainersNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isCell = function () {
            return true;
        };
    }
};

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, joint:false, _:false */