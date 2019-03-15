/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

/**
 * An object that defines the constrains of the metamodel to be used.
 * By default, each Cell (Element or Link) is valid. However,
 *  you can define your own isValid functions to constrain the addition of elements in a model.
 *  For examples, see the nodeLink definitions;
 *
 * @typedef metamodel
 * @type {object}
 * @property {object} containers
 * @property {object} nodes
 * @property {object} containerLinks
 * @property {object} dependencyLinks
 * @property {object} nodeLinks
 *
 * @type {metamodel}
 */

//CONTAINER
//Constraints for the addition of a Container type can be defined through a optional 'isValid' function
//      it must return a object in the format {message, isValid}, where
//      message is an optional string that explains the error to the user (if any)
//      isValid is a boolean that should be true if the addition is valid
//      if unspecified, it will always be valid to add that container

//NODES
//Some constraints can be defined in the metamodel itself
//Further constraints can be defined through a optional 'isValid' function
//      this function may receive as argument the container (parent) that it is going to be added to
//      it must return a object in the format {message, isValid}, where
//      message is an optional string that explains the error to the user (if any)
//      isValid is a boolean that should be true if the addition is valid
//      this function (isValid) does not apply to dependency links
//      if unspecified, it will always be valid to add that node


istar.metamodel.containerLinks.IsALink.isValid = function (source, target) {
    'use strict';

    // role->role; actor->actor;
    // - Only roles can be specialized into roles, or general actors into general actors (page 6)
    // - There should be no is-a cycles (page 14) (ignored)
    // - A pair of actors can be linked by at most one actor link: it is not possible to
    //   connect two actors via both is-a and participates-in (page 14)

    var result = {};
    var isValid = true;
    if ( isValid && (source.get('type') !== target.get('type')) ) {
        isValid = false;
        result.message = 'the source and target of Is-A links must be of the same type - Actor and Actor, or Role and Role (iStar 2.0 Guide, Page 6).' +
            '<br><br><img src="language/images/errors/isATypes.svg" alt="You cannot add make an Is-A link from a type to a different type"/>';
    }
    if ( ! (source.isActor() || source.isRole()) ) {
        isValid = false;
        result.message = 'the source of Is-A links must be a Role or a general Actor (iStar 2.0 Guide, Page 6).' +
            '<br><br><img src="language/images/errors/isATypes.svg" alt="Is-A links must originate from a general Actor or a Role"/>';
    }
    if ( isValid && ! (target.isActor() || target.isRole()) ) {
        isValid = false;
        result.message = 'the target of Is-A links must be a Role or a general Actor (iStar 2.0 Guide, Page 6).' +
            '<br><br><img src="language/images/errors/isATypes.svg" alt="Is-A links must target a general Actor or a Role"/>';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make Is-A links from an actor onto itself.' +
            '<br><br><img src="language/images/errors/isASelfLink.svg" alt="No self-links allowed"/>';
    }
    if ( isValid && istar.isThereLinkBetween(source, target)) {
        isValid = false;
        result.message = 'there can only be one Actor link between the same two actors (iStar 2.0 Guide, Page 14).' +
            '<br><br><img src="language/images/errors/isAMultipleLinks.svg" alt="You cannot add multiple Is-A links to the same two actors"/>';
    }

    result.isValid = isValid;
    return result;
};

istar.metamodel.containerLinks.ParticipatesInLink.isValid = function (source, target) {
    'use strict';

    // actor->actor; actor->role; actor->agent;
    // role->actor; role->role; role->agent;
    // agent->actor; agent->role; agent->agent;
    // - represents any kind of association, other than generalization /
    //   specialization, between two actors. No restriction exists on the type of actors
    //   linked by this association (page 6)
    // - Every actor can participate-in multiple other actors (page 6)
    // - There should be no participates-in cycles (page 14) (ignored)
    // - A pair of actors can be linked by at most one actor link: it is not possible to
    //   connect two actors via both is-a and participates-in (page 14)

    var result = {};
    var isValid = true;
    if ( ! source.isKindOfActor() ) {
        isValid = false;
        result.message = 'the source of a Participates-In link must be some kind of actor (iStar 2.0 Guide, Page 6)';
    }
    if ( isValid && ! target.isKindOfActor() ) {
        isValid = false;
        result.message = 'the target of a Participates-In link must be some kind of actor (iStar 2.0 Guide, Page 6)';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make a Participates-In link from an actor onto itself.' +
            '<br><br><img src="language/images/errors/participatesInSelfLink.svg" alt="No self-links allowed"/>';
    }
    if ( isValid && istar.isThereLinkBetween(source, target)) {
        isValid = false;
        result.message = 'there can only be one Actor link between the same two actors (iStar 2.0 Guide, Page 14).' +
            '<br><br><img src="language/images/errors/participatesInMultipleLinks.svg" alt="You cannot add multiple Participates-In links to the same two actors"/>';
    }

    result.isValid = isValid;
    return result;
};

istar.metamodel.dependencyLinks.DependencyLink.isValid = function (source, target, dependumTypeName) {
    'use strict';

    //istar 2.0:
    //- When a depender depends on the dependee for its dependerElmt, the depender
    //  cannot or chooses not to satisfy/perform/have the dependerElmt on its own.
    //  Thus, the dependerElmt cannot be refined or contributed to (page 9)
    //- Dependency relationships should not share the same dependum, as each dependum is
    //  a conceptually different element (page 9)

    var result = {};
    var isValid = true;

    //identify who is the actor - the elements themselves, or their parents
    var sourceParentId;
    var targetParentId;
    if (source.isKindOfActor()) {
        sourceParentId = source.id;
    } else if (source.isNode()) {
        sourceParentId = source.attributes.parent;
    }

    if (target.isKindOfActor()) {
        targetParentId = target.id;
    } else if (target.isNode()) {
        targetParentId = target.attributes.parent;
    }

    if (source.isLink()) {
        isValid = false;
        result.message = 'the source of a Dependency link cannot be a link';
    }
    if (isValid && target.isLink()) {
        isValid = false;
        result.message = 'the target of a Dependency link cannot be a link';
    }
    if (isValid && (source === target)) {
        isValid = false;
        result.message = 'a Dependency link cannot link an element onto itself';
    }
    if (isValid && source.isDependum()) {
        isValid = false;
        result.message = 'a Dependency link cannot start from a dependum';
    }
    if (isValid && target.isDependum()) {
        isValid = false;
        result.message = 'a Dependency link cannot end in a dependum';
    }
    if (isValid && sourceParentId === targetParentId) {
        isValid = false;
        result.message = 'a Dependency link must involve two different actors (iStar 2.0 Guide, Page 14)';
    }
    if (isValid && (istar.isElementTargetOfType(source, 'OrRefinementLink') || istar.isElementTargetOfType(source, 'AndRefinementLink'))) {
        isValid = false;
        result.message = 'a refined element cannot be the Depender Element in a Dependency link (iStar 2.0 Guide, Page 14)' +
            '. Instead, you can try to add the Dependency originating from a child, as shown in the example below.' +
            '<br><br><img src="language/images/errors/dependerElementRefined.svg" alt="You cannot add a dependency from a element that is already refined"/>';
    }
    if (isValid && istar.isElementTargetOfType(source, 'ContributionLink')) {
        isValid = false;
        result.message = 'a contributed element cannot be the Depender Element in a Dependency link (iStar 2.0 Guide, Page 14)' +
            '. Instead, you can try to add the Dependency originating from a child, as shown in the example below.' +
            '<br><br><img src="language/images/errors/dependerElementContributedTo.svg" alt="You cannot add a dependency from a element that is the target of a Contribution link"/>';
    }

    result.isValid = isValid;
    return result;
};

istar.metamodel.nodeLinks.AndRefinementLink.isValid = function (source, target) {
    'use strict';

    //istar 2.0:
    //- goal->goal; goal->task; task->task; task->goal (table 1)
    //- ...the fulfillment of all the n children (n ≥ 2)(page 10) (ignored)
    //- A parent can only be AND-refined or OR-refined, not both simultaneously (page 10)
    // - The relationships between intentional elements (contributesTo, qualifies, neededBy, refines)
    //  apply only to elements that are wanted by the same actor (page 14)
    //- For a dependency, if a dependerElmt x exists, then x cannot be refined or
    //   contributed to (page 14)
    //- The refinement relationship should not lead to refinement cycles
    //  (e.g., G ORrefined to G1 and G1 OR-refined to G, G OR-refined to G, etc.) (page 14)  (ignored)

    var result = {};
    var isValid = true;
    if ( !(source.isTask() || source.isGoal()) ) {
        isValid = false;
        result.message = 'the source of an AND-refinement link must be a Goal or a Task (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && !(target.isTask() || target.isGoal()) ) {
        isValid = false;
        result.message = 'the target of an AND-refinement link must be a Goal or a Task (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make an AND-refinement link from an element onto itself';
    }
    if ( isValid && (source.isDependum() || target.isDependum()) ) {
        isValid = false;
        result.message = 'you cannot make an AND-refinement link with a dependum (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && (source.attributes.parent !== target.attributes.parent) ) {
        isValid = false;
        result.message = 'the source and target of an AND-refinement link must pertain to the same actor (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && istar.isThereLinkBetween(source, target)) {
        isValid = false;
        result.message = 'there can only be one refinement link between the same two elements' +
            '<br><br><img src="language/images/errors/duplicatedRefinement.svg" alt="You cannot have duplicated links"/>';
    }
    if ( isValid && istar.isElementSourceOfType(target, 'DependencyLink')) {
        isValid = false;
        result.message = 'you cannot refine a Depender Element; that is, an element that is the source of a Dependency (iStar 2.0 Guide, Page 14)' +
            '. Instead, you can try to move the dependency to the sub-element, as shown in the example below.' +
            '<br><br><img src="language/images/errors/refinementToDependerELement.svg" alt="You cannot add a Refinement link targeting a Depender Element"/>';
    }
    if ( isValid && istar.isElementTargetOfType(target, 'OrRefinementLink')) {
        isValid = false;
        result.message = 'you cannot mix AND-refinements with OR-refinements targeting the same element ' +
            '(iStar 2.0 Guide, Page 10).<br><br>' +
            '<img src="language/images/errors/mixAndAndOr.svg" alt="An element may be AND-refined or OR-refined, but not both"/>';
    }

    result.isValid = isValid;
    return result;
};

istar.metamodel.nodeLinks.OrRefinementLink.isValid = function (source, target) {
    'use strict';

    //istar 2.0:
    //goal->goal; goal->task; task->task; task->goal (table 1)
    //- A parent can only be AND-refined or OR-refined, not both simultaneously (page 10)
    //- The relationships between intentional elements (contributesTo, qualifies, neededBy, refines)
    //  apply only to elements that are wanted by the same actor (page 14)
    //- For a dependency, if a dependerElmt x exists, then x cannot be refined or
    //   contributed to (page 14)
    //- The refinement relationship should not lead to refinement cycles
    //  (e.g., G OR-refined to G1 and G1 OR-refined to G, G OR-refined to G, etc.) (page 14) (ignored)

    var result = {};
    var isValid = true;
    if ( !(source.isTask() || source.isGoal()) ) {
        isValid = false;
        result.message = 'the source of an OR-refinement link must be a Goal or a Task (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && !(target.isTask() || target.isGoal()) ) {
        isValid = false;
        result.message = 'the target of an OR-refinement link must be a Goal or a Task (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make an OR-refinement link from an element onto itself';
    }
    if ( isValid && (source.isDependum() || target.isDependum()) ) {
        isValid = false;
        result.message = 'you cannot make an OR-refinement link with a dependum (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && (source.attributes.parent !== target.attributes.parent) ) {
        isValid = false;
        result.message = 'the source and target of an OR-refinement link must pertain to the same actor (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && istar.isThereLinkBetween(source, target)) {
        isValid = false;
        result.message = 'there can only be one refinement link between the same two elements' +
            '<br><br><img src="language/images/errors/duplicatedRefinement.svg" alt="You cannot have duplicated links"/>';
    }
    if ( isValid && istar.isElementSourceOfType(target, 'DependencyLink')) {
        isValid = false;
        result.message = 'you cannot refine a Depender Element; that is, an element that is the source of a Dependency (iStar 2.0 Guide, Page 14)' +
            '. Instead, you can try to move the dependency to the sub-element, as shown in the example below.' +
            '<br><br><img src="language/images/errors/refinementToDependerELement.svg" alt="You cannot add a Refinement link targeting a Depender Element"/>';
    }
    if ( isValid && istar.isElementTargetOfType(target, 'AndRefinementLink')) {
        isValid = false;
        result.message = 'you cannot mix OR-refinements with AND-refinements targeting the same element ' +
            '(iStar 2.0 Guide, Page 10).<br><br>' +
            '<img src="language/images/errors/mixAndAndOr.svg" alt="An element may be AND-refined or OR-refined, but not both"/>';
    }

    result.isValid = isValid;
    return result;
};

istar.metamodel.nodeLinks.NeededByLink.isValid = function (source, target) {
    'use strict';

    //istar 2.0
    //resource->task (table 1)
    //The NeededBy relationship links a task with a resource (page 11)
    //- The relationships between intentional elements (contributesTo, qualifies, neededBy, refines)
    //  apply only to elements that are wanted by the same actor (page 14)

    var result = {};
    var isValid = true;
    if ( !source.isResource() ) {
        isValid = false;
        result.message = 'the source of a Needed-By link must be a Resource (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && !target.isTask() ) {
        isValid = false;
        result.message = 'the target of a Needed-By link must be a Task (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make a Needed-By link from an element onto itself';
    }
    if ( isValid && (source.isDependum() || target.isDependum()) ) {
        isValid = false;
        result.message = 'you cannot make a Needed-By link with a dependum (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && (source.attributes.parent !== target.attributes.parent) ) {
        isValid = false;
        result.message = 'the source and target of a Needed-By link must pertain to the same actor (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && istar.isThereLinkBetween(source, target)) {
        isValid = false;
        result.message = 'there can only be one Needed-By link between the same two elements' +
            '<br><br><img src="language/images/errors/duplicatedNeededBy.svg" alt="you cannot have duplicated Needed-By links"/>';
    }
    result.isValid = isValid;
    return result;
};

istar.metamodel.nodeLinks.ContributionLink.isValid = function (source, target) {
    'use strict';

    //istar 2.0
    //goal->quality; quality->quality; task->quality; resource->quality (table 1)
    //- While the examples show contributions starting from goals
    //  and tasks, it is also possible to initiate contributions
    //  from resources and qualities (page 11)
    //- The relationships between intentional elements (contributesTo, qualifies, neededBy, refines)
    //  apply only to elements that are wanted by the same actor (page 14)
    //– An intentional element and a quality can be linked by either a contributesTo
    //  relationship or a qualifies relationship, but not by both (page 15)
    //– It is not possible for a quality to contribute to itself (page 15)

    var result = {};
    var isValid = true;
    if ( !(source.isGoal() || source.isQuality() || source.isTask() || source.isResource()) ) {
        isValid = false;
        result.message = 'the source of a Contribution link must be a Goal, a Quality, a Task or a Resource (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && !(target.isQuality()) ) {
        isValid = false;
        result.message = 'the target of a Contribution link must be a Quality (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make a Contribution link from an element onto itself (iStar 2.0 Guide, Page 15)';
    }
    if ( isValid && (source.isDependum() || target.isDependum()) ) {
        isValid = false;
        result.message = 'you cannot make a Contribution link with a dependum (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && (source.attributes.parent !== target.attributes.parent) ) {
        isValid = false;
        result.message = 'the source and target of an a Contribution link must pertain to the same actor (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && istar.isThereLinkBetween(source, target, 'ContributionLink')) {
        isValid = false;
        result.message = 'there can only be one Contribution link between the same two elements' +
            '<br><br><img src="language/images/errors/duplicatedContributions.svg" alt="you cannot have duplicated Contribution links"/>';
    }
    if ( isValid && istar.isThereLinkBetween(source, target, 'QualificationLink')) {
        isValid = false;
        result.message = 'you cannot have Contribution and Qualification links between the same two elements (iStar 2.0 Guide, Page 15)';
    }
    if ( isValid && istar.isElementSourceOfType(target, 'DependencyLink')) {
        isValid = false;
        result.message = 'you cannot contribute to a Depender Element; that is, an element that is the source of a Dependency (iStar 2.0 Guide, Page 14)' +
            '. Instead, you can try to move the dependency to the sub-quality, as shown in the example below.' +
            '<br><br><img src="language/images/errors/contributionToDependerELement.svg" alt="You cannot add a Contribution link to a Depender Element"/>';
    }

    result.isValid = isValid;
    return result;
};

istar.metamodel.nodeLinks.QualificationLink.isValid = function (source, target) {
    'use strict';

    //istar 2.0
    //quality->goal, quality->task, quality->resource (table 1)
    //The qualification relationship relates a quality to its
    //subject: a task, goal, or resource.
    //- The relationships between intentional elements (contributesTo, qualifies, neededBy, refines)
    //  apply only to elements that are wanted by the same actor (page 14)
    //– An intentional element and a quality can be linked by either a contributesTo
    //  relationship or a qualifies relationship, but not by both (page 15)

    var result = {};
    var isValid = true;
    if ( !(source.isQuality()) ) {
        isValid = false;
        result.message = 'the source of a Qualification link must be a Quality (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && !(target.isGoal() || target.isTask() || target.isResource()) ) {
        isValid = false;
        result.message = 'the target of a Qualification link must be a Goal, a Task or a Resource (iStar 2.0 Guide, Table 1)';
    }
    if ( isValid && (source === target) ) {
        isValid = false;
        result.message = 'you cannot make a Qualification link from an element onto itself';
    }
    if ( isValid && (source.isDependum() || target.isDependum()) ) {
        isValid = false;
        result.message = 'you cannot make a Qualification link with a dependum (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && (source.attributes.parent !== target.attributes.parent) ) {
        isValid = false;
        result.message = 'the source and target of an a Qualification link must pertain to the same actor (iStar 2.0 Guide, Page 14)';
    }
    if ( isValid && istar.isThereLinkBetween(source, target, 'QualificationLink')) {
        isValid = false;
        result.message = 'there can only be one Qualification link between the same two elements';
    }
    if ( isValid && istar.isThereLinkBetween(source, target, 'ContributionLink')) {
        isValid = false;
        result.message = 'you cannot have Qualification and Contribution links between the same two elements (iStar 2.0 Guide, Page 15)';
    }

    result.isValid = isValid;
    return result;
};

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, joint:false, console:false, _:false */