window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.AddButtonDropdownItemView = Backbone.View.extend({
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
