/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

ui.components = ui.components || {};  //prevents overriding the variable, while also preventing working with a null variable

ui.components.AddButtonDropdownItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#add-dropdown-item-template').html()),

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
        // if (ui.states.editor.ADDING.data.button) {
        //     ui.states.editor.ADDING.data.button.end();
        // }
        this.model.act();
        ui.changeAddMenuStatus(this.model.get('statusText'));
    },

    highlight: function (element) {
        this.$('button').toggleClass('buttonHighlight', element.get('active'));
    }

});
