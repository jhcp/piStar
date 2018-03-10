window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.createAddButtons = function() {
    //create the ADD buttons
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addActorDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Role',
            action: ui.STATE_ADD_ACTOR,
            tooltip: 'Add Role',
            statusText: 'Now click on an empty space in the diagram to add a Role'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addActorDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Agent',
            action: ui.STATE_ADD_ACTOR,
            tooltip: 'Add Agent',
            statusText: 'Now click on an empty space in the diagram to add an Agent'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addActorDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Actor',
            action: ui.STATE_ADD_ACTOR,
            tooltip: 'Add Actor',
            statusText: 'Now click on an empty space in the diagram to add an Actor'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addActorLinkDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Is A link',
            action: ui.STATE_ADD_LINK,
            name: 'IsALink',
            tooltip: 'Add an Is-A link between an Actor and another Actor, or between a Role and another Role',
            statusText: 'Adding Is-A link: click on the sub-element and then on the super-element.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addActorLinkDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Participates-In link',
            action: ui.STATE_ADD_LINK,
            name: 'ParticipatesInLink',
            tooltip: 'Add a Participates-In link between any Actors, Roles, or Agents',
            statusText: 'Adding Participates-In link: click on the source, and then on the target.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addDependencyDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Goal dependency',
            action: ui.STATE_ADD_LINK,
            name: 'GoalDependencyLink',
            tooltip: 'Add Goal Dependency link (including its dependum)',
            statusText: 'Goal Dependency link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addDependencyDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Quality dependency',
            action: ui.STATE_ADD_LINK,
            name: 'QualityDependencyLink',
            tooltip: 'Add Quality Dependency link (including its dependum)',
            statusText: 'Quality Dependency link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addDependencyDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Task dependency',
            action: ui.STATE_ADD_LINK,
            name: 'TaskDependencyLink',
            tooltip: 'Add Task Dependency link (including its dependum)',
            statusText: 'Task Dependency link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addDependencyDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Resource dependency',
            action: ui.STATE_ADD_LINK,
            name: 'ResourceDependencyLink',
            tooltip: 'Add Resource Dependency link (including its dependum)',
            statusText: 'Resource Dependency link: click first on the depender, and then on the dependee.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Goal',
            action: ui.STATE_ADD_NODE,
            name: 'Goal',
            tooltip: 'Add Goal',
            statusText: 'Click on an actor/role/agent to add a Goal',
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
            statusText: 'Click on an actor/role/agent to add a Task'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Resource',
            action: ui.STATE_ADD_NODE,
            tooltip: 'Add Resource',
            statusText: 'Click on an actor/role/agent to add a Resource'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Quality',
            action: ui.STATE_ADD_NODE,
            name: 'Quality',
            tooltip: 'Add Quality',
            statusText: 'Click on an actor/role/agent to add a Quality'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'And-Refinement',
            action: ui.STATE_ADD_LINK,
            name: 'AndRefinementLink',
            tooltip: 'Add And-Refinement link',
            statusText: 'And-Refinement link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Or-Refinement',
            action: ui.STATE_ADD_LINK,
            name: 'OrRefinementLink',
            tooltip: 'Add Or-Refinement link',
            statusText: 'Or-Refinement link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Qualification',
            action: ui.STATE_ADD_LINK,
            name: 'QualificationLink',
            tooltip: 'Add Qualification link',
            statusText: 'Qualification link: click first on the Quality and then on the element it qualifies (Goal, Task or Resource).'
        })
    }).render();
    new uiC.AddButtonView({
        model: new uiC.AddButtonModel({
            label: 'Needed-By',
            action: ui.STATE_ADD_LINK,
            name: 'NeededByLink',
            tooltip: 'Add Needed-By link',
            statusText: 'Needed-By link: click first on the Resource and then on the Task that needs it.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addContributionDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Make (++)',
            action: ui.STATE_ADD_LINK,
            name: 'make',
            tooltip: 'Add Make (++) Contribution link',
            statusText: 'Make (++) Contribution link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addContributionDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Help (+)',
            action: ui.STATE_ADD_LINK,
            name: 'help',
            tooltip: 'Add Help (+) Contribution link',
            statusText: 'Help (+) Contribution link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addContributionDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Hurt (-)',
            action: ui.STATE_ADD_LINK,
            name: 'hurt',
            tooltip: 'Add Hurt (-) Contribution link',
            statusText: 'Hurt (-) Contribution link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
    new uiC.AddButtonDropdownItemView({
        attributes: {parent: '#addContributionDropdown'},
        model: new uiC.AddButtonModel({
            label: 'Break (--)',
            action: ui.STATE_ADD_LINK,
            name: 'break',
            tooltip: 'Add Break (--) Contribution link',
            statusText: 'Break (--) Contribution link: click first on an element and then on the Quality it contributes to.'
        })
    }).render();
}