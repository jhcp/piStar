/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
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
        istar.metamodel.nodes.Goal.statusText = 'Adding <b>Goal</b>: Click on an actor/role/agent to add a Goal';
    }
    if (istar.metamodel.nodes.Quality) {
        istar.metamodel.nodes.Quality.statusText = 'Adding <b>Quality</b>: Click on an actor/role/agent to add a Quality';
    }
    if (istar.metamodel.nodes.Task) {
        istar.metamodel.nodes.Task.statusText = 'Adding <b>Task</b>: Click on an actor/role/agent to add a Task';
    }
    if (istar.metamodel.nodes.Resource) {
        istar.metamodel.nodes.Resource.statusText = 'Adding <b>Resource</b>: Click on an actor/role/agent to add a Resource';
    }
}

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false */