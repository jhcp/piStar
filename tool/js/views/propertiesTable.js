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
        if (this.model.isElement() || this.model.isLink()) {
            if (this.model.isKindOfActor()) {
                this.setupCollapseExpandButton();
            }
            else if (this.model.isDependum()) {
                this.setupChangeDirectionButton();
            }
            else if (this.model.isLink()) {
                this.setupClearVerticesButton();
            }

            this.setupDeleteButton();
        }
        this.setupOptionsPanel();

        if ($.trim($('#cell-actions').html())) {
            $('#sidepanel-title-actions').show();
        }
        else {
            $('#sidepanel-title-actions').hide();
        }

        return this;
    },

    renderElementName: function () {
        this.$table.find('tbody').html(this.template({
            propertyName: 'Name',
            propertyValue: this.model.prop('name'),
            dataType: 'text'
        }));
    },
    renderElementType: function () {
        if (this.model.prop('type')) {
            var propertyName = null;
            if (this.model.isDependum && this.model.isDependum()) {
                propertyName = 'type';
            }
            else if (this.model.isContributionLink && this.model.isContributionLink()) {
                propertyName = 'value';
            }
            if (propertyName) {
                this.$table.find('tbody').append(this.template({
                    propertyName: _.capitalize(propertyName),
                    propertyValue: this.model.prop(propertyName),
                    dataType: 'select'
                }));
            }
        }
    },
    setupElementNameEditing: function () {
        currentElementModel = this.model;
        this.$table.find('a').editable({
            showbuttons: 'bottom',
            success: function (response, newValue) {
                currentElementModel.prop('name', newValue);
                return {newValue: currentElementModel.prop('name')};
            }
        })
            .on('shown', ui.changeStateToEdit)
            .on('hidden', ui.changeStateToView);
    },
    setupElementTypeEditing: function () {
        if (this.model.isDependum && this.model.isDependum()) {
            var typeNames = [];
            var currentType = 0;
            var element = this.model;
            _.forEach(istar.metamodel.nodes, function(nodeType, index) {
                typeNames.push({value: index, text: nodeType.name});
                if (nodeType.name === element.prop('type')) {
                    currentType = index;
                }
            }, this);
            this.$table.find('a').editable({
                showbuttons: false,
                source: typeNames,
                success: function (response, newValue) {
                    var updatedElement = ui.getSelectedElement();
                    var newType = istar.metamodel.nodes[newValue].name;
                    updatedElement.prop('type', newType);
                    var newNode = istar.replaceNode(updatedElement, istar.metamodel.nodes[newValue].name)
                        .prop('isDependum', true);
                    ui.selectElement(newNode);
                    //update the line break on the element's label
                    newNode.updateLineBreak();
                },
                value: currentType
            })
                .on('shown', ui.changeStateToEdit)
                .on('hidden', ui.changeStateToView);
        }
        else if (this.model.isContributionLink && this.model.isContributionLink()) {
            var element = this.model;
            var contributionMetamodel = istar.metamodel.nodeLinks.ContributionLink;
            var valueNames = contributionMetamodel.possibleLabels;
            // var currentType = _.findIndex(valueNames, function(o) { return o === element.prop('value'); });
            this.$table.find('a').editable({
                showbuttons: false,
                source: valueNames,
                success: function (response, newValue) {
                    ui.getSelectedElement().prop('value', newValue);
                },
                value: element.prop('value')
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
                    if (existsPropertyWithSameNameInThisElement === undefined) {
                        newPropertyName = newPropertyName.replace(/\W/g, '');
                        isValidName = true;
                    }
                    else {
                        validityMessage = 'A property with this same name has already been defined; please try again with a different name';
                    }
                }
                else {
                    validityMessage = 'Sorry, the name of a property cannot be a number; please try again with a different name';
                }

                if (isValidName) {
                    ui.getSelectedElement().prop('customProperties/' + newPropertyName, '');
                }
                else {
                    ui.alert(validityMessage, 'Invalid property name');
                }
            }
        });
    },
    clearOptionsPanel: function () {
        $('#cell-actions').html('');
    },
    setupCollapseExpandButton: function () {
        $('#cell-actions').append(
            '<a id="collapse-expand-actor-button" class="btn btn-default btn-xs button-horizontal" title="Shortcut: alt+click the actor">Collapse/Expand</a><br>'
        );
        $('#collapse-expand-actor-button').click(function () {
            if (ui.getSelectedElement()) {
                ui.hideSelection();//remove the focus from the actor
                ui.getSelectedElement().toggleCollapse();
                ui.showSelection();//give the focus back to actor, now collapsed or expanded
            }
        });
    },
    setupChangeDirectionButton: function () {
        if (ui.getSelectedElement().remove) {
            $('#cell-actions').append(
                '<a id="flip-direction-button" class="btn btn-default btn-xs button-horizontal" title="Change the direction of the dependency">Flip direction</a><br>'
            );
            $('#flip-direction-button').click(function () {
                var dependum = ui.getSelectedElement();
                if (dependum) {
                    var connectedLinks = istar.graph.getConnectedLinks(dependum);

                    //first verify whether the flipped dependency would be valid
                    var source = connectedLinks[0].getSourceElement();
                    var target = connectedLinks[1].getTargetElement();
                    if (source === dependum) {
                        source = connectedLinks[1].getSourceElement();
                        target = connectedLinks[0].getTargetElement();
                    }
                    isValid = istar.metamodel.dependencyLinks['DependencyLink'].isValid(target, source);//check with flipped source/target
                    // isValid = istar.types['DependencyLink'].isValid(target, source);//check with flipped source/target

                    if (isValid.isValid) {
                        //If we change the source and target without removing the vertices, the math for creating
                        //the curves may throw exceptions. Thus, we store them in a temp variable, and then re-add
                        //them reversed.
                        //It is reversed because the direction has changed, thus the first vertex is now the last vertex,
                        //and so on.
                        var originalVertices = connectedLinks[0].vertices();
                        var originalSource = connectedLinks[0].prop('source/id');
                        connectedLinks[0].vertices([]);
                        connectedLinks[0].prop('source/id', connectedLinks[0].prop('target/id'));
                        connectedLinks[0].prop('target/id', originalSource);
                        if (istar.graph.getCell(originalSource).isKindOfActor()) {
                            connectedLinks[0].prop('target/selector', 'circle');
                        } else {
                            connectedLinks[0].prop('target/selector', 'text');
                        }
                        if (istar.graph.getCell(connectedLinks[0].prop('source/id')).isKindOfActor()) {
                            connectedLinks[0].prop('source/selector', 'circle');
                        } else {
                            connectedLinks[0].prop('source/selector', 'text');
                        }
                        connectedLinks[0].vertices(_.reverse(originalVertices));


                        originalVertices = connectedLinks[1].vertices();
                        connectedLinks[1].vertices([]);
                        originalSource = connectedLinks[1].prop('source/id');
                        connectedLinks[1].prop('source/id', connectedLinks[1].prop('target/id'));
                        connectedLinks[1].prop('target/id', originalSource);
                        if (istar.graph.getCell(originalSource).isKindOfActor()) {
                            connectedLinks[1].prop('target/selector', 'circle');
                        } else {
                            connectedLinks[1].prop('target/selector', 'text');
                        }
                        if (istar.graph.getCell(connectedLinks[1].prop('source/id')).isKindOfActor()) {
                            connectedLinks[1].prop('source/selector', 'circle');
                        } else {
                            connectedLinks[1].prop('source/selector', 'text');
                        }
                        connectedLinks[1].vertices(_.reverse(originalVertices));
                        ui.selectElement(dependum);
                    }
                    else {
                        ui.displayInvalidLinkMessage(isValid.message + '. Thus, this Dependency currently cannot be flipped');
                    }
                }
            });
        }
    },
    setupClearVerticesButton: function () {
        $('#cell-actions').append(
            '<a id="clear-vertices-button" class="btn btn-default btn-xs button-horizontal" ' +
            'title="This deletes all vertices in this link. To delete an individual vertex, double click the vertex.">Clear vertices</a><br>'
        );
        $('#clear-vertices-button').click(function () {
            if (ui.getSelectedElement()) {
                ui.getSelectedElement().vertices([]);
            }
        });
    },
    setupDeleteButton: function () {
        if (ui.getSelectedElement().remove) {
            $('#cell-actions').append(
                '<a id="delete-element-button" class="btn btn-default btn-xs button-horizontal" title="Shortcut: Delete key">Delete</a><br>'
            );
            $('#delete-element-button').click(function () {
                if (ui.getSelectedElement()) {
                    ui.getSelectedElement().remove();
                    ui.selectModel();
                }
            });
        }
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
                showbuttons: 'bottom',
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
