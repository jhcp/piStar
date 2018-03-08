window.uiC = {};
uiC.ButtonModel = Backbone.Model.extend({
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

uiC.ButtonView = Backbone.View.extend({
    tagName: 'span',
    className: 'addButton',
    template: _.template($('#addButtonTemplate').html()),

    events: {
        'mousedown button': 'buttonClickHandler'//meaning: when its button is clicked, the buttonClickHandler is called
    },

    initialize: function () {
        if (!this.model.get('name')) {
            this.model.set('name', this.model.get('label'));
        }
        this.listenTo(this.model, 'change:active', this.highlight);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        $('#addToolbarButtons').append(this.$el);
        return this;
    },

    buttonClickHandler: function (event) {
        if (ui.currentButton) {
            ui.currentButton.end();
        }
        if (this.model.get('precondition')()) {
            if (this.model.get('name') === 'DependencyLink') {
                var newType = window.prompt('Select type:\n  g for goal;\n  s for softgoal;\n  t for task;\n  r for resource.', 'g');
                if (newType !== null) {
                    ui.dependencyType = newType;
                }
            }
            this.model.act();
            ui.changeStatus(this.model.get('statusText'));
        }
    },

    highlight: function (element) {
        this.$('button').toggleClass('buttonHighlight', element.get('active'));
        this.$('button').blur();
    }

});

uiC.DropdownItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#addDropdownButtonTemplate').html()),

    events: {
        'mousedown': 'buttonClickHandler'//meaning: when its button is clicked, the buttonClickHandler is called
    },

    initialize: function () {
        if (!this.model.get('name')) {
            this.model.set('name', this.model.get('label'));
        }
        this.listenTo(this.model, 'change:active', this.highlight);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        $(this.attributes.parent).append(this.$el);
        return this;
    },

    buttonClickHandler: function (event) {
        if (ui.currentButton) {
            ui.currentButton.end();
        }
        ui.dependencyType = this.model.get('name');
        if (this.model.get('precondition')()) {

            this.model.act();
            ui.changeStatus(this.model.get('statusText'));
        }
    },

    highlight: function (element) {
        this.$('button').toggleClass('buttonHighlight', element.get('active'));
    }

});


$(document).ready(function () {
    $.fn.editable.defaults.mode = 'inline';//x-editable setting
});

function changeCustomPropertyValue(model, propertyName, propertyValue) {
    model.prop('customProperties/' + propertyName, propertyValue);
}
