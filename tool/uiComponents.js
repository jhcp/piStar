window.uiC = {};
uiC.ButtonModel = Backbone.Model.extend({
    defaults: {
            name: '',
            label: '',
            tooltip: '',
            statusText: '',
            precondition: function() {return true;},
            action: 'view',
            active: false
        },
    act: function () {
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
    end: function() {
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
    tagName     : 'span',
    className     : 'addButton',
    template     : _.template($('#addButtonTemplate').html()),

    events : {
        'mousedown button' : 'buttonClickHandler'//meaning: when its button is clicked, the buttonClickHandler is called
    },

    initialize : function(){
        if (! this.model.get('name')) {
            this.model.set('name', this.model.get('label'));
        }
        this.listenTo(this.model, 'change:active', this.highlight);
    },

    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        $('#addToolbarButtons').append(this.$el);
        return this;
    },

    buttonClickHandler: function(event){
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
    template     : _.template($('#addDropdownButtonTemplate').html()),

    events : {
        'mousedown' : 'buttonClickHandler'//meaning: when its button is clicked, the buttonClickHandler is called
    },

    initialize : function(){
        if (! this.model.get('name')) {
            this.model.set('name', this.model.get('label'));
        }
        this.listenTo(this.model, 'change:active', this.highlight);
    },

    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        $(this.attributes.parent).append(this.$el);
        return this;
    },

    buttonClickHandler: function(event){
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


uiC.CellTableView = Backbone.View.extend({
    template     : _.template($('#propertyTemplate').html()),

    initialize : function(){
        this.model.on('change', this.render, this);
    },

    render : function(){
        $('#propertyTable tbody').html(this.template({propertyName: 'Text', propertyValue: this.model.attr('text/text').replace(/(\r\n|\n|\r)/gm,' ')}));
        $('#propertyTable a').editable({
            success: function(response, newValue) {
                if (newValue) {
                    ui.currentElement.changeNodeContent(newValue);
                }
            }
        })
        .on('shown', ui.changeStateToEdit)
        .on('hidden', ui.changeStateToView);

        for( var propertyName in this.model.prop('customProperties') ) {
            $('#propertyTable tbody').append(this.template({'propertyName': propertyName, 'propertyValue': this.model.prop('customProperties/' + propertyName)}));
            $('#current'+propertyName).editable({
                    success: function(response, newValue) {
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
                if (! ui.currentElement.prop('customProperties/' + newPropertyName) ) {
                    ui.currentElement.prop('customProperties/' + newPropertyName, '');
                }
                else {
                    alert('ERROR: This property has been previously defined');
                }
            }
        });

        if (this.model.isKindOfActor()) {
            $('#cellButtons').append('<button type="button" id="collapseButton">Collapse/Expand</button>');
            $('#collapseButton').click(function () {
                if (ui.currentElement) ui.currentElement.toggleCollapse();
            });
        }
        return this;
    },

    buttonClickHandler: function(event){
        if (ui.currentButton) {
            ui.currentButton.end();
        }
        this.model.act();
    },

    highlight: function (element) {
        this.$('button').toggleClass('buttonHighlight', element.get('active'));
        //perhaps it's better to use 'changedAttributes', to prevent unnecessary updates
    }

});

$(document).ready(function() {
    $.fn.editable.defaults.mode = 'inline';//x-editable setting
});

function changeCustomPropertyValue(model, propertyName, propertyValue) {
    model.prop('customProperties/' + propertyName, propertyValue);
}
