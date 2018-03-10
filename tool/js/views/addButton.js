window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.AddButtonView = Backbone.View.extend({
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
