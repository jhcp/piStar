window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.PropertiesTableView = Backbone.View.extend({
    template: _.template($('#propertyTemplate').html()),

    initialize: function () {
        this.$table = $('#propertyTable');

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
        else if (this.model.isGoal() || this.model.isResource() || this.model.isTask()) {
            this.setupSafetyToggle();
        }

        return this;
    },

    renderElementName: function () {
        this.$table.find('tbody').html(this.template({
            propertyName: 'Name',
            propertyValue: this.model.prop('name')
        }));
    },
    setupElementNameEditing: function () {
        this.$table.find('a').editable({
            success: function (response, newValue) {
                var updatedElement = ui.getSelectedElement().changeNodeContent(newValue);

                return {newValue: updatedElement.prop('name')};
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
    setupSafetyToggle: function () {
        $('#cellButtons').append('<button type="button" id="obstructButton">Toggle Safety</button>');

        $('#obstructButton').click(function () {
            element = ui.getSelectedElement();

            stereotypeSuffix = 'Goal';
            if (element.isTask()) stereotypeSuffix = 'Task';
            if (element.isResource()) stereotypeSuffix = 'Resource';
            stereotype = '<<safety' + stereotypeSuffix + '>> ';
            size = 120;
            if (element.isGoal()) size = 110;
            if (element.isResource()) size = 140;
            if (element) {
                var name = ui.getSelectedElement().prop('name');
                isSafety = element.prop('customProperties/isSafety');
                if (isSafety) {
                    element.attr('polygon', {fill: '#cdfecd'}); //tasks
                    element.attr('rect', {fill: '#cdfecd'}); //goals, resources
                    var newName = name.replace(stereotype, '');
                    element.changeNodeContent(newName, {'breakWidth': size});
                    element.prop('customProperties/isSafety', false);
                }
                else {
                    element.attr('polygon', {fill: '#ce8483'}); //tasks
                    element.attr('rect', {fill: '#ce8483'}); //goals, resources

                    var newName = stereotype + name;
                    element.changeNodeContent(newName, {'breakWidth': size});
                    element.prop('customProperties/isSafety', true);
                }
            }
        });
    },
    renderCustomProperty: function (propertyName) {
        this.$table.find('tbody').append(this.template({
            'propertyName': propertyName,
            'propertyValue': this.model.prop('customProperties/' + propertyName)
        }));
    },
    setupCustomPropertyEditing: function (propertyName) {
        $('#current' + propertyName).editable({
                success: function (response, newValue) {
                    //update backbone model
                    var updatedElement = changeCustomPropertyValue(ui.getSelectedElement(), $(this).attr('data-name'), newValue);
                    return {newValue: updatedElement.prop('customProperties/' + propertyName)};
                }
            }
        )
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);
    },
});
