window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.createAddButtons = function() {
    //create the ADD buttons
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-actor-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Actor',
            action: ui.STATE_ADD_ACTOR,
            tooltip: 'Add Actor',
            statusText: 'Adding <b>Actor</b>: click on an empty space in the diagram to add a new Actor'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-actor-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Agent',
            action: ui.STATE_ADD_ACTOR,
            tooltip: 'Add Agent',
            statusText: 'Adding <b>Agent</b>: click on an empty space in the diagram to add a new Agent'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-actor-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Role',
            action: ui.STATE_ADD_ACTOR,
            tooltip: 'Add Role',
            statusText: 'Adding <b>Role</b>: click on an empty space in the diagram to add a new Role'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-actor-link-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Is A link',
            action: ui.STATE_ADD_LINK,
            name: 'IsALink',
            tooltip: 'Add an Is-A link between an Actor and another Actor, or between a Role and another Role',
            statusText: 'Adding <b>Is-A</b> link: click on the sub-actor/sub-role and then on the super-actor/super-role.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-actor-link-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Participates-In link',
            action: ui.STATE_ADD_LINK,
            name: 'ParticipatesInLink',
            tooltip: 'Add a Participates-In link between any Actors, Roles, or Agents',
            statusText: 'Adding <b>Participates-In</b> link: click on the source, and then on the target.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-dependency-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Goal dependency',
            action: ui.STATE_ADD_LINK,
            name: 'GoalDependencyLink',
            tooltip: 'Add a Goal Dependency link (including its dependum)',
            statusText: 'Adding <b>Goal Dependency</b> link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-dependency-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Quality dependency',
            action: ui.STATE_ADD_LINK,
            name: 'QualityDependencyLink',
            tooltip: 'Add a Quality Dependency link (including its dependum)',
            statusText: 'Adding <b>Quality Dependency</b> link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-dependency-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Resource dependency',
            action: ui.STATE_ADD_LINK,
            name: 'ResourceDependencyLink',
            tooltip: 'Add a Resource Dependency link (including its dependum)',
            statusText: 'Adding <b>Resource Dependency</b> link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-dependency-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Task dependency',
            action: ui.STATE_ADD_LINK,
            name: 'TaskDependencyLink',
            tooltip: 'Add a Task Dependency link (including its dependum)',
            statusText: 'Adding <b>Task Dependency</b> link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Goal',
            action: ui.STATE_ADD_NODE,
            name: 'Goal',
            tooltip: 'Add Goal',
            statusText: 'Adding <b>Goal</b>: Click on an actor/role/agent to add a Goal',
            precondition: function () {
                var valid = true;
                if (istar.isEmpty()) {
                    alert('Sorry, you can only add goals on an actor/role/agent.');
                    valid = false;
                }
                return valid;
            }
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Task',
            action: ui.STATE_ADD_NODE,
            tooltip: 'Add Task',
            statusText: 'Adding <b>Task</b>: Click on an actor/role/agent to add a Task'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Resource',
            action: ui.STATE_ADD_NODE,
            tooltip: 'Add Resource',
            statusText: 'Adding <b>Resource</b>: Click on an actor/role/agent to add a Resource'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Quality',
            action: ui.STATE_ADD_NODE,
            name: 'Quality',
            tooltip: 'Add Quality',
            statusText: 'Adding <b>Quality</b>: Click on an actor/role/agent to add a Quality'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'And',
            action: ui.STATE_ADD_LINK,
            name: 'AndRefinementLink',
            tooltip: 'Add And-Refinement link',
            statusText: 'Adding <b>And-Refinement</b> link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Or',
            action: ui.STATE_ADD_LINK,
            name: 'OrRefinementLink',
            tooltip: 'Add Or-Refinement link',
            statusText: 'Adding <b>Or-Refinement</b> link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Needed-By',
            action: ui.STATE_ADD_LINK,
            name: 'NeededByLink',
            tooltip: 'Add Needed-By link',
            statusText: 'Adding <b>Needed-By</b> link: click first on the Resource and then on the Task that needs it.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Qualification',
            action: ui.STATE_ADD_LINK,
            name: 'QualificationLink',
            tooltip: 'Add Qualification link',
            statusText: 'Adding <b>Qualification</b> link: click first on the Quality and then on the element it qualifies (Goal, Task or Resource).'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-contribution-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Make (++)',
            action: ui.STATE_ADD_LINK,
            name: 'make',
            tooltip: 'Add Make (++) Contribution link',
            statusText: 'Adding <b>Make (++) Contribution</b> link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-contribution-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Help (+)',
            action: ui.STATE_ADD_LINK,
            name: 'help',
            tooltip: 'Add Help (+) Contribution link',
            statusText: 'Adding <b>Help (+) Contribution</b> link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-contribution-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Hurt (-)',
            action: ui.STATE_ADD_LINK,
            name: 'hurt',
            tooltip: 'Add Hurt (-) Contribution link',
            statusText: 'Adding <b>Hurt (-) Contribution</b> link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#add-contribution-dropdown'},
        model: new uiC.AddButtonModel({
            label: 'Break (--)',
            action: ui.STATE_ADD_LINK,
            name: 'break',
            tooltip: 'Add Break (--) Contribution link',
            statusText: 'Adding <b>Break (--) Contribution</b> link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
}