/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

ui.components = ui.components || {};  //prevents overriding the variable, while also preventing working with a null variable

ui.components.AddButtonDropdownView = Backbone.View.extend({
    tagName: 'span',
    className: 'add-dropdown-button',
    template: _.template($('#add-dropdown-button-template').html()),

    initialize: function () {
        if (!this.model.get('name')) {
            this.model.set('name', this.model.get('label'));
        }
        this.listenTo(this.model, 'change:active', this.highlight);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        $('#add-internal-cells-palette').append(this.$el);
        return this;
    },

    highlight: function (element) {
        this.$('button').toggleClass('buttonHighlight', element.get('active'));
        this.$('button').blur();
    }

});
