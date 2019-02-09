/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
 * https://github.com/jhcp/pistar
 */

window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.createAddButtons = function() {
    'use strict';

    //create the ADD buttons

    //create Add <<Container>> buttons
    _.forEach(istar.metamodel.containers, function(elementType) {
        //if specific ui elements are not defined, use default ones
        var label = elementType.buttonLabel || elementType.name;
        var tooltip = elementType.buttonTooltip || ('Add ' + elementType.name);
        var statusText = elementType.buttonStatusText || ('Adding <b>' + elementType.name + '</b>: click on an empty space in the diagram to add a new ' + elementType.name);

        new uiC.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-dropdown'},
            model: new uiC.AddButtonModel({
                label: label,
                action: ui.STATE_ADD_ACTOR,
                name: elementType.name,
                tooltip: tooltip,
                statusText: statusText,
                defaultButtonImage: 'DefaultContainer.svg'
            })
        }).render();
    });

    //create Add <<Container Link>> buttons
    _.forEach(istar.metamodel.containerLinks, function(linkType) {
        //if specific ui elements are not defined, use default ones
        var label = linkType.buttonLabel || (linkType.name);
        var tooltip = linkType.buttonTooltip || ('Add a ' + linkType.name);
        var statusText = linkType.buttonStatusText || ('Adding a <b>' + linkType.name + '</b>');

        new uiC.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-link-dropdown'},
            model: new uiC.AddButtonModel({
                label: label,
                action: ui.STATE_ADD_LINK,
                name: linkType.name,
                tooltip: tooltip,
                statusText: statusText,
                defaultButtonImage: 'DefaultContainerLink.svg'
            })
        }).render();
        console.log($('#d-add-'+ linkType.name + '-img'));

    });

    //create Add <<Dependency>> buttons
    _.forEach(istar.metamodel.nodes, function(elementType) {
        if (elementType.canBeDependum ) {

            //if specific ui elements are not defined, use default ones
            var label = elementType.buttonLabel || (elementType.name + ' dependency');
            var tooltip = elementType.buttonTooltip || ('Add a ' + elementType.name + ' Dependency link (including its dependum)');
            var statusText = elementType.buttonStatusText || ('Adding <b>' + elementType.name + ' Dependency</b> link');

            new uiC.AddButtonDropdownItemView({
                attributes: {parent: '#add-dependency-dropdown'},
                model: new uiC.AddButtonModel({
                    label: label,
                    action: ui.STATE_ADD_LINK,
                    name: elementType.name + 'DependencyLink',
                    tooltip: tooltip,
                    statusText: statusText,
                    defaultButtonImage: 'DefaultDependencyLink.svg'
                })
            }).render();
        }
    });

    //create Add <<Element>> buttons
    _.forEach(istar.metamodel.nodes, function(elementType) {
        if (elementType.canBeInnerElement || elementType.canBeOnCanvas) {

            //if specific ui elements are not defined, use default ones
            var label = elementType.buttonLabel || elementType.name;
            var tooltip = elementType.buttonTooltip || ('Add ' + elementType.name);
            var statusText = elementType.buttonStatusText || ('Adding <b>' + elementType.name + '</b>');

            new uiC.AddButtonView({
                model: new uiC.AddButtonModel({
                    label: label,
                    action: ui.STATE_ADD_NODE,
                    name: elementType.name,
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
/*globals console:false, istar:false, _:false, ui:false, uiC:false, $:false */