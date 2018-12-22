window.uiC = window.uiC || {};  //prevents overriding the variable, while also preventing working with a null variable

uiC.PropertiesTableView = Backbone.View.extend({
    template: _.template($('#property-template').html()),

    initialize: function () {
        this.$table = $('#properties-table');

        this.listenTo(this.model, 'mouseup', this.render);
        this.listenTo(this.model, 'change:customProperties', this.render);
        this.listenTo(this.model, 'change:name', this.render);
    },

    render: function () {
        this.renderElementName();
        this.setupElementNameEditing();

        this.renderElementType();
        this.setupElementTypeEditing();

        for (var propertyName in this.model.prop('customProperties')) {
            this.renderCustomProperty(propertyName);
            this.setupCustomPropertyEditing(propertyName);
        }

        this.setupAddPropertyButton();

        this.clearOptionsPanel();
        if (this.model.isKindOfActor && this.model.isKindOfActor()) {
            this.setupCollapseExpandButton();
        }
        this.setupDeleteButton();
        this.setupOptionsPanel();

        return this;
    },

    renderElementName: function () {
        this.$table.find('tbody').html(this.template({
            propertyName: 'Name',
            propertyValue: this.model.prop('name'),
            dataType: 'textarea'
        }));
    },
    renderElementType: function () {
        if (this.model.prop('type')) {
            if (this.model.isDependum && this.model.isDependum()) {
                this.$table.find('tbody').append(this.template({
                    propertyName: 'Type',
                    propertyValue: this.model.prop('type'),
                    dataType: 'select'
                }));
            }
        }
    },
    setupElementNameEditing: function () {
        this.$table.find('a').editable({
            success: function (response, newValue) {
                var updatedElement = ui.getSelectedElement()
                if (updatedElement.changeNodeContent) {
                  //if it is a istar element
                  updatedElement.changeNodeContent(newValue);
                }
                else {
                  //if it is a istar model (graph)
                  updatedElement.prop('name', newValue);
                }

                return {newValue: updatedElement.prop('name')};
            },
            showbuttons: 'bottom'
        })
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);
    },
    setupElementTypeEditing: function () {
        if (this.model.isDependum && this.model.isDependum()) {
            typeNames = [];
            currentType = 0;
            _.each(istarcoreMetamodel.nodes, function(nodeType, index) {
                typeNames.push({value: index, text: nodeType.prefixedName});
                if (nodeType.prefixedName === this.model.prop('type')) {
                    currentType = index;
                }
            }, this);
            this.$table.find('a').editable({
                source: typeNames,
                value: currentType,
                success: function (response, newValue, c) {
                    updatedElement = ui.getSelectedElement();
                    newType = istarcoreMetamodel.nodes[newValue].prefixedName;
                    updatedElement.prop('type', newType);
                    newNode = istar.replaceNode(updatedElement, istarcoreMetamodel.nodes[newValue].prefixedName)
                        .prop('isDependum', true);
                    ui.selectElement(newNode);
                    //update the line break on the element's label
                    newNode.updateLineBreak();

                    return {newValue: newValue};
                },
                showbuttons: 'bottom'
            })
                .on('shown', ui.changeStateToEdit)
                .on('hidden', ui.changeStateToView);
        }
        // else {
        //     this.$table.find('a').editable({
        //         disabled: true,
        //     });
        // }
    },
    setupAddPropertyButton: function () {
        $('#add-property-button-area').html('<a href="#" id="add-property-button" class="property-add" data-type="text" data-pk="1"           data-name="name" data-title="Enter description" data-placeholder="ahhhh" title="Add a new property to this element">        <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>        Add Property</a>');
        // $('#add-property-button-area').html('<button type="button" id="addPropertyButton">Add Property</button>');
        // $('#cell-buttons').html('<button type="button" id="addPropertyButton">Add Property</button>');
        $('#add-property-button').click(function () {
            var newPropertyName = window.prompt('Name of the new custom property:', 'newProperty');
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
    clearOptionsPanel: function () {
        $('#cell-actions').html('');
    },
    setupCollapseExpandButton: function () {
        $('#cell-actions').append(
            '<a id="collapse-expand-actor-button" class="btn btn-default btn-xs button-horizontal" title="Shortcut: ctrl+click the actor">Collapse/Expand</a><br>'
        );
        $('#collapse-expand-actor-button').click(function () {
            if (ui.getSelectedElement()) {
                ui.hideSelection();//remove the focus from the actor
                ui.getSelectedElement().toggleCollapse();
                ui.showSelection();//give the focus back to actor, now collapsed or expanded
            }
        });
    },
    setupDeleteButton: function () {
        $('#cell-actions').append(
            '<a id="delete-element-button" class="btn btn-default btn-xs button-horizontal" title="Shortcut: Delete key">Delete</a><br>'
        );
        $('#delete-element-button').click(function () {
            if (ui.getSelectedElement()) {
                ui.getSelectedElement().remove();
                ui.selectModel();
            }
        });
    },
    setupOptionsPanel: function () {
      if (this.model.prop('backgroundColor')) {
        $('#single-element-color-picker').get(0).jscolor.fromString(this.model.prop('backgroundColor'));
      }
      else if (ui.getSelectedElement()){
        $('#single-element-color-picker').get(0).jscolor.fromString(ui.defaultElementBackgroundColor);
      }
    },
    renderCustomProperty: function (propertyName) {
        this.$table.find('tbody').append(this.template({
            propertyName: propertyName,
            propertyValue: this.model.prop('customProperties/' + propertyName),
            dataType: 'textarea'
        }));
    },
    setupCustomPropertyEditing: function (propertyName) {
        $('#current' + propertyName).editable({
                success: function (response, newValue) {
                    //update backbone model
                    var updatedElement = changeCustomPropertyValue(ui.getSelectedElement(), $(this).attr('data-name'), newValue);
                    return {newValue: updatedElement.prop('customProperties/' + propertyName)};
                },
                showbuttons: 'bottom'
            }
        )
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);
    },
});
