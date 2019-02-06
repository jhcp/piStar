window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.AddButtonModel = Backbone.Model.extend({
    defaults: {
        name: '',
        label: '',
        tooltip: '',
        statusText: '',
        defaultButtonImage: '',
        action: 'view',
        active: false
    },
    act: function () {
        'use strict';

        ui.selectModel();

        this.set('active', true);
        ui.currentState = this.get('action');
        ui.currentAddingElement = this.get('name');
        ui.currentButton = this;
        if (ui.currentState === 'addActor') {
            $('#diagram').css('cursor', 'crosshair');
            $('#diagram g').css('cursor', 'no-drop');
            $('#diagram .actorKindMain').css('cursor', 'no-drop');
        } else {
            if (this.get('action') === ui.STATE_ADD_NODE) {
                if (istar.metamodel.nodes[this.get('name')] && (istar.metamodel.nodes[this.get('name')].canBeOnCanvas)) {
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
        //resets the values of the app variables

        ui.currentState = 'view';
        ui.currentAddingElement = 'none';
        ui.dependencyType = 'none';
        if (ui.linkSource && ui.linkSource.unhighlight) ui.linkSource.unhighlight();
        ui.resetLinkSource();
        ui.resetLinkTarget();
        ui.currentButton = null;
        ui.changeStatus('');
        ui.resetPointerStyles();
    }

});

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false, console:false, $:false */