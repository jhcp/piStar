/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

istar.validateMetamodel = function (metamodel) {
    'use strict';
    //check against names starting with 'node' or 'link', to prevent from overriding
    //methods of the istar object.
    // _.forEach(metamodel.containers, function (element) {
    //     if (element.name && element.name.match(/^(node|link)/i)) {
    //         console.log('this metamodel is invalid. Please check the error message below.');
    //         throw new Error('Invalid container name in the metamodel: ' + element.name +
    //             '. Container names cannot start with "node" nor "link".');
    //     }
    // });
    // _.forEach(metamodel.nodes, function (element) {
    //     if (element.name.match(/^(node|link)/i)) {
    //         console.log('this metamodel is invalid. Please check the error message below.');
    //         throw new Error('Invalid node name in the metamodel: ' + element.name +
    //             '. Node names cannot start with "node" nor "link".');
    //     }
    // });
    // _.forEach(metamodel.containerLinks, function (element) {
    //     if (element.name.match(/^(node|link)/i)) {
    //         console.log('this metamodel is invalid. Please check the error message below.');
    //         throw new Error('Invalid container link name in the metamodel: ' + element.name +
    //             '. Container link names cannot start with "node" nor "link".');
    //     }
    // });
    // _.forEach(metamodel.nodeLinks, function (element) {
    //     if (element.name.match(/^(node|link)/i)) {
    //         console.log('this metamodel is invalid. Please check the error message below.');
    //         throw new Error('Invalid node link name in the metamodel: ' + element.name +
    //             '. Node link names cannot start with "node" nor "link".');
    //     }
    // });

    //check if the metamodel contains at least one kind of element (node or container)
    //if it doesnt them a model couldnt be created
    if ((!metamodel.containers || metamodel.containers.length === 0) &&
        (!metamodel.nodes || metamodel.nodes.length === 0)) {
        console.log('this metamodel is invalid. Please check the error message below.');
        throw new Error('Invalid metamodel. Metamodels must have at least one container or one node.');
    }
};

/*
    This function processes a given metamodel, stores the processed data on the istar global variable,
        and creates additional functions based on the metamodel

    It creates 'add' functions for each element of the metamodel
        For instance, if there is a node type named 'Person', an 'addPerson' function is created
*/
istar.setupMetamodel = function (metamodel) {
    'use strict';

    console.log('validating metamodel');
    istar.validateMetamodel(metamodel);
    console.log('metamodel is valid');

    createCellNames(metamodel);

    createHelperGetNamesFunctions(metamodel);
    setupCellsSpecificPrototypes(metamodel);
    setupCellsGeneralPrototypes(metamodel);

    console.log('end of metamodel setup');
    return metamodel;

    function createCellNames(metamodel) {
        //for each Cell Type in the metamodel, create an attribute with their name,
        //allowing to know the name of the Type from within its definition object
        var allCellTypes = _.concat(metamodel.containers, metamodel.nodes, metamodel.containerLinks,
            metamodel.dependencyLinks, metamodel.nodeLinks);
        _.forEach(allCellTypes, function (cellSupertype) {
            _.forEach(_.keys(cellSupertype), function (cellName) {
                cellSupertype[cellName].name = cellName;
            });
        });
    }

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
            attachShapeObject(cellType, metamodel, 'container');
            createIsCellFunctions(cellType);
            createAddElementFunction(cellType);
            istar.setup.createContainerFunctions(cellType.shapeObject.prototype);
        });
        _.forEach(metamodel.nodes, function (cellType) {
            attachShapeObject(cellType, metamodel, 'node');
            createIsCellFunctions(cellType);
            createAddElementFunction(cellType);
            setupNodeAttributesDefaultValues(cellType);
        });
        _.forEach(metamodel.containerLinks, function (cellType) {
            attachShapeObject(cellType, metamodel, 'containerLink');
            createIsCellFunctions(cellType);
            createAddContainerLinkFunction(cellType);
        });
        _.forEach(metamodel.dependencyLinks, function (cellType) {
            attachShapeObject(cellType, metamodel, 'dependencyLink');
            createIsCellFunctions(cellType);
        });
        _.forEach(metamodel.nodeLinks, function (cellType) {
            attachShapeObject(cellType, metamodel, 'nodeLink');
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
            if (!cellType.shapeObject) {
                //if no shape is defined, add a default shape, otherwise functions based on visual attributes will fail
                if (kindOfCell === 'node') {
                    cellType.shapeObject = joint.shapes.istar.DefaultNode;
                }
                else if (kindOfCell === 'container') {
                    cellType.shapeObject = joint.shapes.istar.DefaultContainer;
                }
                else if (kindOfCell === 'containerLink') {
                    cellType.shapeObject = joint.shapes.istar.DefaultContainerLink;
                }
                else {
                    cellType.shapeObject = joint.shapes.istar.DefaultNodeLink;
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
            // cellType.isValid = function () {return {isValid: true, message: ''};}; //uncomment to remove all constraints
        }
    }

    function createAddElementFunction (elementType) {
        //creates an 'add' function that can be used to create instances of this type
        //Example: if the cellType is Actor, an addActor() function will be created
        if (elementType.name) {
            istar['add' + elementType.name] = function (content, options) {
                return istar.base.addNode(elementType, content, options);
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
        joint.dia.Cell.prototype.isContainerLink = function () {
            return _.includes(metamodel.getContainerLinksNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isActorLink = joint.dia.Cell.prototype.isContainerLink;
        joint.dia.Cell.prototype.isNodeLink = function () {
            return _.includes(metamodel.getNodeLinksNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isNode = function () {
            return _.includes(metamodel.getInnerElementsNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isDependum = function () {
            //this function does not inform if this type can be dependum.
            // Instead, it informs whether this instance is an actual dependum in the present graph
            return this.prop('isDependum') || false;
        };
        joint.dia.Cell.prototype.isContainer = function () {
            return _.includes(metamodel.getContainersNames(), this.prop('type'));
        };
        joint.dia.Cell.prototype.isKindOfActor = joint.dia.Cell.prototype.isContainer;
        joint.dia.Cell.prototype.isCell = function () {
            return true;
        };
    }

    function setupNodeAttributesDefaultValues (elementType) {
        //canBeInnerElement default value: false
        //canBeDependum default value: false
        //canBeOnPaper default value: true

        if (elementType.canBeOnPaper === undefined) {
            elementType.canBeOnPaper = true;
        }
    }
};

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, joint:false, _:false, console:false */