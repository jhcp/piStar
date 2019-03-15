/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

ui.components = ui.components || {};  //prevents overriding the variable, while also preventing working with a null variable

ui.components.AddButtonModel = Backbone.Model.extend({
    defaults: {
        action: 'view',
        active: false,
        defaultButtonImage: '',
        label: '',
        name: '',
        statusText: '',
        tooltip: '',
        value: 'none'
    },
    act: function () {
        'use strict';

        ui.selectPaper();

        this.set('active', true);
        // ui.currentState = this.get('action');
        ui.states.editor.transitionTo(this.get('action'))
        ui.states.editor.ADDING.data.typeNameToAdd = this.get('name');
        ui.linkValue = this.get('value');
        ui.states.editor.ADDING.data.button = this;
        if (ui.states.editor.isAddingContainer()) {
            $('#diagram').css('cursor', 'crosshair');
            $('#diagram g').css('cursor', 'no-drop');
            $('#diagram .actorKindMain').css('cursor', 'no-drop');
        } else {
            if (this.get('action') === ui.states.editor.ADDING.ADD_NODE) {
                if (istar.metamodel.nodes[this.get('name')] && (istar.metamodel.nodes[this.get('name')].canBeOnPaper)) {
                    $('#diagram').css('cursor', 'crosshair');
                } else {
                    $('#diagram').css('cursor', 'no-drop');
                }
                if (istar.metamodel.nodes[this.get('name')] && (istar.metamodel.nodes[this.get('name')].canBeInnerElement)) {
                    $('#diagram g').css('cursor', 'crosshair');
                    $('#diagram .actorKindMain').css('cursor', 'crosshair');
                } else {
                    $('#diagram g').css('cursor', 'no-drop');
                    $('#diagram .actorKindMain').css('cursor', 'no-drop');
                }
            } else {
                $('#diagram').css('cursor', 'no-drop');
                $('#diagram g').css('cursor', 'crosshair');
                $('#diagram .actorKindMain').css('cursor', 'crosshair');
            }
        }
    },
    end: function () {
        'use strict';

        this.set('active', false);
        ui.states.editor.transitionTo(ui.states.editor.VIEWING);
    }

});

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false, uiC:false, console:false, $:false, Backbone: false */