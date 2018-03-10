window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.PropertiesTableView = Backbone.View.extend({
    template: _.template($('#propertyTemplate').html()),

    initialize: function () {
        this.listenTo(this.model, 'mouseup', this.render);
        this.listenTo(this.model, 'change:customProperties', this.render);
        this.listenTo(this.model, 'change:name', this.render);
    },

    render: function () {
        this.renderElementName();
        this.setupElementNameEditing();

        for (var propertyName in this.model.prop('customProperties')) {
            this.renderCustomProperty(propertyName);
            this.setupCustomPropertyEditing(propertyName);
        }

        this.setupAddPropertyButton();

        if (this.model.isKindOfActor()) {
            this.setupCollapseExpandButton();
        }

        return this;
    },

    renderElementName: function () {
        $('#propertyTable tbody').html(this.template({
            propertyName: 'Name',
            propertyValue: this.model.prop('name')
        }));
    },
    setupElementNameEditing: function () {
        $('#propertyTable a').editable({
            success: function (response, newValue) {
                if (newValue) {
                    ui.getSelectedElement().changeNodeContent(newValue);
                }
            }
        })
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);
    },
    setupAddPropertyButton: function () {
        $('#cellButtons').html('<button type="button" id="addPropertyButton">Add Property</button>');
        $('#addPropertyButton').click(function () {
            var newPropertyName = window.prompt('Name of the new custom property', 'newProperty');
            if (newPropertyName) {
                var isValidName = false;
                var validityMessage = '';
                if (isNaN(newPropertyName)) {
                    var existsPropertyWithSameNameInThisElement = ui.getSelectedElement().prop('customProperties/' + newPropertyName);
                    if (!existsPropertyWithSameNameInThisElement) {
                        newPropertyName = newPropertyName.replace(/\W/g, '');
                        isValidName = true;
                    }
                    else {
                        validityMessage = 'A property with this same name has already been defined; please try again with a different name';
                    }
                }
                else {
                    validityMessage = 'Sorry, the property name cannot be a number; please try again with a different name';
                }

                if (isValidName) {
                    ui.getSelectedElement().prop('customProperties/' + newPropertyName, '');
                }
                else {
                    alert(validityMessage);
                }
            }
        });
    },
    setupCollapseExpandButton: function () {
        $('#cellButtons').append('<button type="button" id="collapseButton">Collapse/Expand</button>');
        $('#collapseButton').click(function () {
            if (ui.getSelectedElement()) {
                ui.hideSelection();//remove the focus from the actor
                ui.getSelectedElement().toggleCollapse();
                ui.showSelection();//give the focus back to actor, now collapsed or expanded
            }
        });
    },
    renderCustomProperty: function (propertyName) {
        $('#propertyTable tbody').append(this.template({
            'propertyName': propertyName,
            'propertyValue': this.model.prop('customProperties/' + propertyName)
        }));
    },
    setupCustomPropertyEditing: function (propertyName) {
        $('#current' + propertyName).editable({
                success: function (response, newValue) {
                    if (newValue) changeCustomPropertyValue(ui.getSelectedElement(), $(this).attr('data-name'), newValue); //update backbone model
                }
            }
        )
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);
    },
});
