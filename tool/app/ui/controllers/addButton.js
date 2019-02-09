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
        var image = elementType.name;

        new uiC.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-dropdown'},
            model: new uiC.AddButtonModel({
                action: ui.STATE_ADD_ACTOR,
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

        new uiC.AddButtonDropdownItemView({
            attributes: {parent: '#add-actor-link-dropdown'},
            model: new uiC.AddButtonModel({
                action: ui.STATE_ADD_LINK,
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

            new uiC.AddButtonDropdownItemView({
                attributes: {parent: '#add-dependency-dropdown'},
                model: new uiC.AddButtonModel({
                    action: ui.STATE_ADD_LINK,
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

            new uiC.AddButtonView({
                model: new uiC.AddButtonModel({
                    action: ui.STATE_ADD_NODE,
                    defaultButtonImage: 'DefaultNode.svg',
                    label: label,
                    name: elementType.name,
                    statusText: statusText,
                    tooltip: tooltip
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

    //create Add <<Contribution Link>> buttons
    var linkType = istar.metamodel.nodeLinks.ContributionLink;
    _.forEach(istar.metamodel.nodeLinks.ContributionLink.possibleLabels, function(linkValue, i) {
        //if specific ui elements are not defined, use default ones
        var label = linkValue
        if (linkType.buttonLabel) {
            label = linkType.buttonLabel[i];
        }
        var tooltip = ('Add a ' + linkValue + ' ' + linkType.name);
        if (linkType.buttonTooltip) {
            tooltip = linkType.buttonTooltip[i];
        }
        var statusText = 'Adding a <b>' + linkValue + ' ' + linkType.name + '</b>';
        if (linkType.buttonStatusText) {
            statusText = linkType.buttonStatusText[i];
        }
        var image = linkType.name + '-' + linkValue;
        if (linkType.buttonImage) {
            image = linkType.buttonImage[i];
        }

        new uiC.AddButtonDropdownItemView({
            attributes: {parent: '#add-contribution-link-dropdown'},
            model: new uiC.AddButtonModel({
                action: ui.STATE_ADD_LINK,
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