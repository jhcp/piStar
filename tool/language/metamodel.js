/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

/**
 * An object that defines the metamodel to be used.
 * By default, each Cell (Element or Link) is valid. However,
 *  you can define your own isValid functions to constrain the addition of elements in a model.
 *  For examples, see the nodeLink definitions;
 *
 * @typedef metamodel
 * @type {object}
 * @property {string} prefix
 * @property {string} version - written in the format 'a.b'
 * @property {object} containers
 * @property {object} nodes
 * @property {object} containerLinks
 * @property {object} dependencyLinks
 * @property {object} nodeLinks
 *
 * @type {metamodel}
 */
istar.metamodel = {
    /** A prefix to use when loading and saving the model */
    /** @type {string} */
    "prefix": "istar",

    /**
     * Identify the version of the metamodel
     * @example
     * version: '0.1'
     @type {string}
     */
    "version": "0.2",

    /** An object containing the definition of the shapes that are used in this metamodel
     *  You probably don't want to change this */
    /** @type {Object} */
    "shapesObject": joint.shapes.istar,

    //Add here the elements of your language that behave like actors, in the sense that they are containers
    // onto which inner elements (nodes) are added
    //Constraints for the validity of a Container type can be defined in the constraints file
    /** @type {Object} */
    "containers": {
        "Actor": { },
        "Agent": { },
        "Role": { }
    },

    //Add here the elements of your language that do not behave like actors, i.e., they are not containers;
    //If they can be added to containers (such as actors), 'canBeInnerElement' must be set to true (default value: false)
    //If they can be dependums in a dependency link, 'canBeDependum' must be set to true (default value: false)
    //If they can be added directly to the paper, without being part of a dependency link, "canBeOnPaper" (default value: false)
    //Further constraints can be defined in the constraints file
    /** @type {Object} */
    "nodes": {
        "Goal": {
            "canBeInnerElement": true,
            "canBeDependum": true,
            "canBeOnPaper": false
        },
        "Quality": {
            "canBeInnerElement": true,
            "canBeDependum": true,
            "canBeOnPaper": false
        },
        "Resource": {
            "canBeInnerElement": true,
            "canBeDependum": true,
            "canBeOnPaper": false
        },
        "Task": {
            "canBeInnerElement": true,
            "canBeDependum": true,
            "canBeOnPaper": false
        }
    },

    //Add here the links of your language that directly relate a container with another container
    //  (e.g., an Actor to another actor).
    //Constraints for the validity of a Link type can be defined in the constraints file
    /** @type {Object} */
    "containerLinks": {
        "IsALink": {
            "label": "is-a"
        },
        "ParticipatesInLink": {
            "label": "participates-in"
        }
    },

    //Add here the links of your language that *behave like* a Dependency link: they link a container with
    // another container while having a node in the middle
    //New types of dependency links are *NOT* created here.
    //Constraints for the validity of a Dependency link type can be defined in the constraints file
    "dependencyLinks": {
        "DependencyLink": { }
    },

    //Add here the links of your language that relate a node with another node
    //Constraints for the validity of a Link type can be defined in the constraints file
    /** @type {Object} */
    "nodeLinks": {
        "AndRefinementLink": { },
        "OrRefinementLink": { },
        "NeededByLink": {
            "tryReversedWhenAdding": true
        },
        "QualificationLink": {
            "tryReversedWhenAdding": true
        },
        "ContributionLink": {
            "changeableLabel": true,
            "possibleLabels": ["make", "help", "hurt", "break"]
        }
    }
};

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, joint:false, console:false, _:false */