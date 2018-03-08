window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.CellTableView = Backbone.View.extend({
    template: _.template($('#propertyTemplate').html()),
    propertyTemplate: _.template($('#propertyTemplate').html()),

    initialize: function () {
        this.listenTo(this.model, 'mouseup', this.render);
        this.listenTo(this.model, 'change:customProperties', this.render);
        this.listenTo(this.model, 'change:name', this.render);
    },

    render: function () {
        console.log('rendering table' + this.model.prop('name'));
        $('#propertyTable tbody').html(this.template({
            propertyName: 'Name',
            propertyValue: this.model.prop('name')
        }));
        $('#propertyTable a').editable({
            success: function (response, newValue) {
                if (newValue) {
                    ui.currentElement.changeNodeContent(newValue);
                }
            }
        })
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);

        for (var propertyName in this.model.prop('customProperties')) {
            $('#propertyTable tbody').append(this.template({
                'propertyName': propertyName,
                'propertyValue': this.model.prop('customProperties/' + propertyName)
            }));
            $('#current' + propertyName).editable({
                    success: function (response, newValue) {
                        if (newValue) changeCustomPropertyValue(ui.currentElement, $(this).attr('data-name'), newValue); //update backbone model
                    }
                }
            )
                .on('shown', ui.changeStateToEdit)
                .on('hidden', ui.changeStateToView);
        }
        $('#cellButtons').html('<button type="button" id="addPropertyButton">Add Property</button>');
        $('#addPropertyButton').click(function () {
            var newPropertyName = window.prompt('Name of the new custom property', 'newProperty');
            if (newPropertyName) {
                if (!ui.currentElement.prop('customProperties/' + newPropertyName)) {
                    ui.currentElement.prop('customProperties/' + newPropertyName, '');
                    //new uiC.CellTableView({model: ui.currentElement}).render();
                }
                else {
                    alert('ERROR: This property has been previously defined');
                }
            }
        });

        if (this.model.isKindOfActor()) {
            $('#cellButtons').append('<button type="button" id="collapseButton">Collapse/Expand</button>');
            $('#collapseButton').click(function () {
                if (ui.currentElement) {
                    ui.hideSelection();//remove the focus from the actor
                    ui.currentElement.toggleCollapse();
                    ui.unhideSelection();//give the focus back to actor, now collapsed or expanded
                }
            });
        }
        return this;
    },

    buttonClickHandler: function (event) {
        if (ui.currentButton) {
            ui.currentButton.end();
        }
        this.model.act();
    },

    highlight: function (element) {
        this.$('button').toggleClass('buttonHighlight', element.get('active'));
    }

});
