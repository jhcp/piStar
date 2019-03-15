/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

/* this function defines additional information that can be used in the UI, regarding elements and links of the metamodel
*
*  you can define the following attributes for elements (containers and nodes).
*  If these are not defined, default values based on the node name
*  are adopted.
*    - label (label for its add element button)
*    - tooltip (appears when the add element button is hovered)
*    - statusText (instructions that appear when the add element button is pressed)
*
* */
ui.setupMetamodelUI = function () {
    'use strict';

    if (istar.metamodel.nodes.Goal) {
        istar.metamodel.nodes.Goal.buttonStatusText = 'Adding <b>Goal</b>: Click on an actor/role/agent to add a Goal';
    }
    if (istar.metamodel.nodes.Quality) {
        istar.metamodel.nodes.Quality.buttonStatusText = 'Adding <b>Quality</b>: Click on an actor/role/agent to add a Quality';
    }
    if (istar.metamodel.nodes.Task) {
        istar.metamodel.nodes.Task.buttonStatusText = 'Adding <b>Task</b>: Click on an actor/role/agent to add a Task';
    }
    if (istar.metamodel.nodes.Resource) {
        istar.metamodel.nodes.Resource.buttonStatusText = 'Adding <b>Resource</b>: Click on an actor/role/agent to add a Resource';
    }

    if (istar.metamodel.containerLinks.IsALink) {
        istar.metamodel.containerLinks.IsALink.buttonLabel = 'Is A Link';
        istar.metamodel.containerLinks.IsALink.buttonTooltip = 'Add an Is-A link between an Actor and another Actor, or between a Role and another Role';
        istar.metamodel.containerLinks.IsALink.buttonStatusText = 'Adding <b>Is A</b> link: Click on the sub-actor/sub-role and then on the super-actor/super-role';
    }
    if (istar.metamodel.containerLinks.ParticipatesInLink) {
        istar.metamodel.containerLinks.ParticipatesInLink.buttonLabel = 'Participates-In link';
        istar.metamodel.containerLinks.ParticipatesInLink.buttonTooltip = 'Add a Participates-In link between any Actors, Roles, or Agents';
        istar.metamodel.containerLinks.ParticipatesInLink.buttonStatusText = 'Adding <b>Participates-In</b> link: click on the source, and then on the target';
    }

    if (istar.metamodel.nodeLinks.AndRefinementLink) {
        istar.metamodel.nodeLinks.AndRefinementLink.buttonLabel = 'And';
        istar.metamodel.nodeLinks.AndRefinementLink.buttonTooltip = 'Add And-Refinement link';
        istar.metamodel.nodeLinks.AndRefinementLink.buttonStatusText = 'Adding <b>And-Refinement</b> link: click first on the child, and then on the parent. It can only be applied to goals or tasks.';
    }
    if (istar.metamodel.nodeLinks.OrRefinementLink) {
        istar.metamodel.nodeLinks.OrRefinementLink.buttonLabel = 'Or';
        istar.metamodel.nodeLinks.OrRefinementLink.buttonTooltip = 'Add Or-Refinement link';
        istar.metamodel.nodeLinks.OrRefinementLink.buttonStatusText = 'Adding <b>Or-Refinement</b> link: click first on the child, and then on the parent. It can only be applied to goals or tasks.';
    }
    if (istar.metamodel.nodeLinks.NeededByLink) {
        istar.metamodel.nodeLinks.NeededByLink.buttonLabel = 'Needed-By';
        istar.metamodel.nodeLinks.NeededByLink.buttonTooltip = 'Add Needed-By link';
        istar.metamodel.nodeLinks.NeededByLink.buttonStatusText = 'Adding <b>Needed-By</b> link: click on the Resource that is needed and on the Task that needs it.';
    }
    if (istar.metamodel.nodeLinks.QualificationLink) {
        istar.metamodel.nodeLinks.QualificationLink.buttonLabel = 'Qualification';
        istar.metamodel.nodeLinks.QualificationLink.buttonTooltip = 'Add Qualification link';
        istar.metamodel.nodeLinks.QualificationLink.buttonStatusText = 'Adding <b>Qualification</b> link: click on the Quality and on the element it qualifies (Goal, Task or Resource).';
    }

    if (istar.metamodel.nodeLinks.ContributionLink) {
        istar.metamodel.nodeLinks.ContributionLink.buttonLabel = ['Contribution', 'Make (++)', 'Help (+)', 'Hurt (-)', 'Break (--)'];
        istar.metamodel.nodeLinks.ContributionLink.buttonTooltip = [
            'Add Contribution link (Make, Help, Hurt or Break',
            'Add a Make (++) Contribution link',
            'Add a Help (+) Contribution link',
            'Add a Hurt (-) Contribution link',
            'Add a Break (--) Contribution link'];
        istar.metamodel.nodeLinks.ContributionLink.buttonStatusText = [
            '',
            'Adding <b>Make (++) Contribution</b> link: click first on an element and then on the Quality it contributes to',
            'Adding <b>Help (+) Contribution</b> link: click first on an element and then on the Quality it contributes to',
            'Adding <b>Hurt (-) Contribution</b> link: click first on an element and then on the Quality it contributes to',
            'Adding <b>Break (--) Contribution</b> link: click first on an element and then on the Quality it contributes to'];
    }
}

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false */