#Events

## istar.paper

### change:selection
####Description
This event is triggered once when an element is selected. 
The callback function will receive an object of the form
```{selectedElement, selectedElementView}.``` 

This event is also triggered once when an element is deselected. 
The callback function will receive an object of the form: ```{deselectedElement, deselectedElementView}```. 

Please note that if the user changes the selection from an element to another one,
two events will be triggered: one for the desselection of the previously 
selected element
and one for the selection of the newly selected element. 
####Example
Prints a message when an elements is selected or deselected.
```
istar.paper.on('change:selection', function (selection) {
    if (selection.selectedElement) {
        console.log('The following element got selected: ' + selection.selectedElement.prop('name'));
    }
    else if (selection.deselectedElement) {
        console.log('The following element is no longer selected: ' + selection.deselectedElement.prop('name'));
    }
});
```