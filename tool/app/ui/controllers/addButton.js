/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
 * https://github.com/jhcp/pistar
 */

ui.components = ui.components || {};  //prevents overriding the variable, while also preventing working with a null variable

ui.components.createAddButtons = function() {
    'use strict';

    //create the ADD buttons

    //create Add <<Container>> buttons
    _.forEach(istar.metamodel.containers, function(elementType) {
        //if specific ui elements are not defined, use default ones
        var label = elementType.buttonLabel || elementType.name;
        var tooltip = elementType.buttonTooltip || ('Add ' + elementType.name);
        var statusText = elementType.buttonStatusText || ('Adding <b>' + elementType.name + '</b>: click on an empty space in the diagram to add a new ' + elementType.name);
        var image = elementType.name;

        new ui.components.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-dropdown'},
            model: new ui.components.AddButtonModel({
                action: ui.states.editor.ADDING.ADD_CONTAINER,
                buttonImage: image,
                defaultButtonImage: 'DefaultContainer.svg',
                label: label,
                name: elementType.name,
                statusText: statusText,
                tooltip: tooltip
            })
        }).render();
    });

    //create Add <<Container Link>> buttons
    _.forEach(istar.metamodel.containerLinks, function(linkType) {
        //if specific ui elements are not defined, use default ones
        var label = linkType.buttonLabel || (linkType.name);
        var tooltip = linkType.buttonTooltip || ('Add a ' + linkType.name);
        var statusText = linkType.buttonStatusText || ('Adding a <b>' + linkType.name + '</b>');
        var image = linkType.name;

        new ui.components.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-link-dropdown'},
            model: new ui.components.AddButtonModel({
                action: ui.states.editor.ADDING.ADD_LINK,
                buttonImage: image,
                defaultButtonImage: 'DefaultContainerLink.svg',
                label: label,
                name: linkType.name,
                statusText: statusText,
                tooltip: tooltip
            })
        }).render();
    });

    //create Add <<Dependency>> buttons
    _.forEach(istar.metamodel.nodes, function(elementType) {
        if (elementType.canBeDependum ) {

            //if specific ui elements are not defined, use default ones
            var label = elementType.buttonLabel || (elementType.name + ' dependency');
            var tooltip = elementType.buttonTooltip || ('Add a ' + elementType.name + ' Dependency link (including its dependum)');
            var statusText = elementType.buttonStatusText || ('Adding <b>' + elementType.name + ' Dependency</b> link');
            var image = elementType.name + 'DependencyLink';

            new ui.components.AddButtonDropdownItemView({
                attributes: {parent: '#add-dependency-dropdown'},
                model: new ui.components.AddButtonModel({
                    action: ui.states.editor.ADDING.ADD_LINK,
                    buttonImage: image,
                    defaultButtonImage: 'DefaultDependencyLink.svg',
                    label: label,
                    name: elementType.name + 'DependencyLink',
                    statusText: statusText,
                    tooltip: tooltip
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

            new ui.components.AddButtonView({
                model: new ui.components.AddButtonModel({
                    action: ui.states.editor.ADDING.ADD_NODE,
                    defaultButtonImage: 'DefaultNode.svg',
                    label: label,
                    name: elementType.name,
                    statusText: statusText,
                    tooltip: tooltip
                })
            }).render();
        }
    });

    new ui.components.AddButtonView({
        model: new ui.components.AddButtonModel({
            label: 'And',
            action: ui.states.editor.ADDING.ADD_LINK,
            name: 'AndRefinementLink',
            tooltip: 'Add And-Refinement link',
            statusText: 'Adding <b>And-Refinement</b> link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
        })
    }).render();
    new ui.components.AddButtonView({
        model: new ui.components.AddButtonModel({
            label: 'Or',
            action: ui.states.editor.ADDING.ADD_LINK,
            name: 'OrRefinementLink',
            tooltip: 'Add Or-Refinement link',
            statusText: 'Adding <b>Or-Refinement</b> link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'
        })
    }).render();
    new ui.components.AddButtonView({
        model: new ui.components.AddButtonModel({
            label: 'Needed-By',
            action: ui.states.editor.ADDING.ADD_LINK,
            name: 'NeededByLink',
            tooltip: 'Add Needed-By link',
            statusText: 'Adding <b>Needed-By</b> link: click first on the Resource and then on the Task that needs it.'
        })
    }).render();
    new ui.components.AddButtonView({
        model: new ui.components.AddButtonModel({
            label: 'Qualification',
            action: ui.states.editor.ADDING.ADD_LINK,
            name: 'QualificationLink',
            tooltip: 'Add Qualification link',
            statusText: 'Adding <b>Qualification</b> link: click first on the Quality and then on the element it qualifies (Goal, Task or Resource).'
        })
    }).render();

    //create Add <<Contribution Link>> buttons
    var linkType = istar.metamodel.nodeLinks.ContributionLink;
    _.forEach(istar.metamodel.nodeLinks.ContributionLink.possibleLabels, function(linkValue, i) {
        //if specific ui elements are not defined, use default ones
        var label = linkValue
        if (linkType.buttonLabel && linkType.buttonLabel[i]) {
            label = linkType.buttonLabel[i];
        }
        var tooltip = ('Add a ' + linkValue + ' ' + linkType.name);
        if (linkType.buttonTooltip && linkType.buttonTooltip[i]) {
            tooltip = linkType.buttonTooltip[i];
        }
        var statusText = 'Adding a <b>' + linkValue + ' ' + linkType.name + '</b>';
        if (linkType.buttonStatusText && linkType.buttonStatusText[i]) {
            statusText = linkType.buttonStatusText[i];
        }
        var image = linkType.name + '-' + linkValue;
        if (linkType.buttonImage && linkType.buttonImage[i]) {
            image = linkType.buttonImage[i];
        }

        new ui.components.AddButtonDropdownItemView({
            attributes: {parent: '#add-contribution-link-dropdown'},
            model: new ui.components.AddButtonModel({
                action: ui.states.editor.ADDING.ADD_LINK,
                buttonImage: image,
                defaultButtonImage: 'DefaultContainerLink.svg',
                label: label,
                name: linkType.name,
                statusText: statusText,
                tooltip: tooltip,
                value: linkValue
            })
        }).render();
    });
}

/*definition of globals to prevent undue JSHint warnings*/
/*globals console:false, istar:false, _:false, ui:false, uiC:false, $:false */