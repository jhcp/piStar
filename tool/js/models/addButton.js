window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.AddButtonModel = Backbone.Model.extend({
    defaults: {
        name: '',
        label: '',
        tooltip: '',
        statusText: '',
        precondition: function () {
            return true;
        },
        action: 'view',
        active: false
    },
    act: function () {
        ui.clearSelection();

        this.set('active', true);
        ui.currentState = this.get('action');
        ui.currentAddingElement = this.get('name');
        ui.currentButton = this;
        if (ui.currentState === 'addActor') {
            $('#diagram').css('cursor', 'crosshair');
            $('#diagram g').css('cursor', 'no-drop');
            $('#diagram .actorKindMain').css('cursor', 'no-drop');
        }
        else {
            $('#diagram').css('cursor', 'no-drop');
            $('#diagram g').css('cursor', 'crosshair');
            $('#diagram .actorKindMain').css('cursor', 'crosshair');
        }
    },
    end: function () {
        this.set('active', false);
        //resets the values of the app variables

        ui.currentState = 'view';
        ui.currentAddingElement = 'none';
        if (ui.linkSource && ui.linkSource.unhighlight) ui.linkSource.unhighlight();
        ui.resetLinkSource();
        ui.resetLinkTarget();
        ui.currentButton = null;
        ui.changeStatus('');
        ui.resetPointerStyles();
    }

});