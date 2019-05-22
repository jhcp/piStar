/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

ui.components = ui.components || {};  //prevents overriding the variable, while also preventing working with a null variable

ui.components.createAddButtons = function() {
    'use strict';

    //create the ADD buttons

    //create Add <<Container>> buttons
    if (istar.metamodel.containers) {
        _.forEach(istar.metamodel.containers, function (elementType) {
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
    }
    else {
        $('#menu-dropdown-actors').hide();
    }

    //create Add <<ContainerLink>> buttons
    if (istar.metamodel.containerLinks) {
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
    }
    else {
        $('#menu-dropdown-actor-links').hide();
    }

    //create Add <<DependencyLink>> buttons
    var hasDependency = false;
    _.forEach(istar.metamodel.nodes, function(elementType) {
        if (elementType.canBeDependum ) {
            hasDependency = true;

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
    if (! hasDependency) {
        $('#menu-dropdown-dependency-links').hide();
    }


    //create Add <<Element>> buttons
    _.forEach(istar.metamodel.nodes, function(elementType) {
        if (elementType.canBeInnerElement || elementType.canBeOnPaper) {

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

    //create Add <<NodeLink>> buttons
    _.forEach(istar.metamodel.nodeLinks, function(linkType) {
        if (linkType.canBeManuallyAdded !== false) {
            if (linkType.changeableLabel) {
                //create a dropdown button and then create a dropdown item for each possible value of the label

                //if specific ui elements are not defined, use default ones
                var label = (linkType.buttonLabel && linkType.buttonLabel[0]) || linkType.name;
                var tooltip = (linkType.buttonTooltip && linkType.buttonTooltip[0]) || ('Add ' + linkType.name);
                var image = linkType.name;

                new ui.components.AddButtonDropdownView({
                    model: new ui.components.AddButtonModel({
                        buttonImage: image,
                        defaultButtonImage: 'DefaultContainerLink.svg',
                        label: label,
                        name: linkType.name,
                        tooltip: tooltip
                    })
                }).render();

                //create the dropdown items
                _.forEach(linkType.possibleLabels, function (linkValue, i) {
                    //if specific ui elements are not defined, use default ones
                    var index = i + 1;
                    var label = linkValue
                    if (linkType.buttonLabel && linkType.buttonLabel[index]) {
                        label = linkType.buttonLabel[index];
                    }
                    var tooltip = ('Add a ' + linkValue + ' ' + linkType.name);
                    if (linkType.buttonTooltip && linkType.buttonTooltip[index]) {
                        tooltip = linkType.buttonTooltip[index];
                    }
                    var statusText = 'Adding a <b>' + linkValue + ' ' + linkType.name + '</b>';
                    if (linkType.buttonStatusText && linkType.buttonStatusText[index]) {
                        statusText = linkType.buttonStatusText[index];
                    }
                    var image = linkType.name + '-' + linkValue;
                    if (linkType.buttonImage && linkType.buttonImage[index]) {
                        image = linkType.buttonImage[index];
                    }

                    new ui.components.AddButtonDropdownItemView({
                        attributes: {parent: '#add-' + linkType.name + '-dropdown'},
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
            } else {
                //if specific ui elements are not defined, use default ones
                var label = linkType.buttonLabel || linkType.name;
                var tooltip = linkType.buttonTooltip || ('Add ' + linkType.name);
                var statusText = linkType.buttonStatusText || ('Adding <b>' + linkType.name + '</b>');
                var image = linkType.name;

                new ui.components.AddButtonView({
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
            }
        }
    });

}

/*definition of globals to prevent undue JSHint warnings*/
/*globals console:false, istar:false, _:false, ui:false, uiC:false, $:false */