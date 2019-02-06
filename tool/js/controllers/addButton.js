window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.createAddButtons = function() {
    'use strict';

    //create the ADD buttons

    //create Add <<Container>> buttons
    _.forEach(istar.metamodel.getContainersNames(), function(containerTypeName) {
        //if specific ui elements are not defined, use default ones
        var label = istar.metamodel.containers[containerTypeName].label || containerTypeName;
        var tooltip = istar.metamodel.containers[containerTypeName].tooltip || ('Add ' + containerTypeName);
        var statusText = istar.metamodel.containers[containerTypeName].statusText || ('Adding <b>' + containerTypeName + '</b>: click on an empty space in the diagram to add a new ' + containerTypeName);

        new uiC.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-dropdown'},
            model: new uiC.AddButtonModel({
                label: label,
                action: ui.STATE_ADD_ACTOR,
                name: containerTypeName,
                tooltip: tooltip,
                statusText: statusText,
                defaultButtonImage: 'DefaultContainer.svg'
            })
        }).render();
    });

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

    //create Add <<Dependency>> buttons
    _.forEach(istar.metamodel.getNodesNames(), function(nodeTypeName) {
        if (istar.metamodel.nodes[nodeTypeName].canBeDependum ) {

            //if specific ui elements are not defined, use default ones
            var label = istar.metamodel.nodes[nodeTypeName].label || (nodeTypeName + ' dependency');
            var tooltip = istar.metamodel.nodes[nodeTypeName].tooltip || ('Add a ' + nodeTypeName + ' Dependency link (including its dependum)');
            var statusText = istar.metamodel.nodes[nodeTypeName].statusText || ('Adding <b>' + nodeTypeName + ' Dependency</b> link');

            new uiC.AddButtonDropdownItemView({
                attributes: {parent: '#add-dependency-dropdown'},
                model: new uiC.AddButtonModel({
                    label: label,
                    action: ui.STATE_ADD_LINK,
                    name: nodeTypeName + 'DependencyLink',
                    tooltip: tooltip,
                    statusText: statusText,
                    defaultButtonImage: 'DefaultDependencyLink.svg'
                })
            }).render();
        }

    });

    //create Add <<Element>> buttons
    _.forEach(istar.metamodel.getNodesNames(), function(nodeTypeName) {
        if (istar.metamodel.nodes[nodeTypeName].canBeInnerElement || istar.metamodel.nodes[nodeTypeName].canBeOnCanvas) {

            //if specific ui elements are not defined, use default ones
            var label = istar.metamodel.nodes[nodeTypeName].label || nodeTypeName;
            var tooltip = istar.metamodel.nodes[nodeTypeName].tooltip || ('Add ' + nodeTypeName);
            var statusText = istar.metamodel.nodes[nodeTypeName].statusText || ('Adding <b>' + nodeTypeName + '</b>');

            new uiC.AddButtonView({
                model: new uiC.AddButtonModel({
                    label: label,
                    action: ui.STATE_ADD_NODE,
                    name: nodeTypeName,
                    tooltip: tooltip,
                    statusText: statusText,
                    defaultButtonImage: 'DefaultNode.svg'
                })
            }).render();
        }
    });

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

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, _:false, ui:false, uiC:false */