/**
 * A class for representing the metamodel to be used.
 * @class
 */
var istarcoreMetamodel = {
    /** @type {string} */
    prefix: 'istar',
    /** @type {Object} */
    shapesObject: joint.shapes.istar,
    /**
     * describes the version of this metamodel
     * @example
     * version: '0.1'
     @type {string}
     */
    version: '0.1',

    //actor-like elements
    /** @type {Object[]} */
    containers: [
        {
            'name': 'Actor',
        },
        {
            'name': 'Agent',
        },
        {
            'name': 'Role',
        },
    ],
    //internal elements
    /** @type {Object[]} */
    nodes: [
        {
            'name': 'Goal',
        },
        {
            'name': 'Quality',
        },
        {
            'name': 'Task',
        },
        {
            'name': 'Resource',
        }
    ],
    //links between actor-like elements
    /** @type {Object[]} */
    containerLinks: [
        {
            'name': 'ParticipatesInLink',
            'isValid': function (source, target) {
                //istar 2.0: No restriction exists on the type of actors linked by this association
                var result = false;
                result = source.isKindOfActor() && target.isKindOfActor();
                // result = result && (source.get('type') == target.get('type'));
                result = result && (source != target);
                return result;
            },
            allowMultipleLinksBetweenTheSameElements: false //TODO
        },
        {
            'name': 'IsALink',
            'isValid': function (source, target) {
                //istar 2.0: Only roles can be specialized into roles, or general actors into general actors... Agents cannot be specialized via is-a,
                var result = false;
                result = source.isActor() && target.isActor();
                result = result || (source.isRole() && target.isRole());
                result = result && (source != target);
                return result;
            }
        },
    ],
    //links between internal elements
    /** @type {Object[]} */
    nodeLinks: [
        {
            'name': 'AndRefinementLink',
            'isValid': function (source, target) {
                //istar 2.0:
                //goal->goal; goal->task; task->task; task->goal
                //Refinement is an n-ary relationship relating one parent
                //to one or more children. An intentional element can be the parent
                //in at most one refinement relationship
                //...any kind of parent (goal or task)
                //A parent can only be AND-refined or OR-refined, not both simultaneously.

                var result = false;
                result = source.isTask() || source.isGoal();
                result = result && (target.isTask() || target.isGoal());
                result = result && (source != target);
                result = result && (source.attributes.parent === target.attributes.parent);
                return result;
            }
        },
        {
            'name': 'OrRefinementLink',
            'isValid': function (source, target) {
                //istar 2.0:
                //goal->goal; goal->task; task->task; task->goal
                //Refinement is an n-ary relationship relating one parent
                //to one or more children. An intentional element can be the parent
                //in at most one refinement relationship
                //...any kind of parent (goal or task)
                //A parent can only be AND-refined or OR-refined, not both simultaneously.

                var result = false;
                result = source.isTask() || source.isGoal();
                result = result && (target.isTask() || target.isGoal());
                result = result && (source != target);
                result = result && (source.attributes.parent === target.attributes.parent);
                return result;
            }
        },
        {
            'name': 'NeededByLink',
            'isValid': function (source, target) {
                //istar 2.0
                //resource->task
                //The NeededBy relationship links a task with a resource

                var result = false;
                result = source.isResource();
                result = result && target.isTask();
                // result = result && (source != target);
                result = result && (source.attributes.parent === target.attributes.parent);
                return result;
            }
        },
        {
            'name': 'ContributionLink',
            'isValid': function (source, target) {
                //istar 2.0
                //goal->quality; quality->quality; task->quality; resource->quality;

                //While the examples show contributions starting from goals
                // and tasks, it is also possible to initiate contributions
                //from resources and qualities.
                var result = false;
                result = source.isGoal() || source.isQuality() || source.isTask() || source.isResource();
                result = result && target.isQuality();
                result = result && (source != target);
                result = result && (source.attributes.parent === target.attributes.parent);
                return result;
            }
        },
        {
            'name': 'QualificationLink',
            'isValid': function (source, target) {
                //istar 2.0
                //quality->goal, quality->task, quality->resource
                //The qualfication relationship relates a quality to its
                //subject: a task, goal, or resource.

                var result = false;
                result = source.isQuality();
                result = result && (target.isGoal() || target.isTask() || target.isResource());
                // result = result && (source != target);
                result = result && (source.attributes.parent === target.attributes.parent);
                // alert('here');
                return result;
            }
        }
    ],
};
