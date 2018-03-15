#Events

## istar.graph

istar.graph is a collection containing every element in the i* model.
It may trigger two events: ```add``` and ```remove```.

Moreover, all the events that are triggered on an Element or Link is propagated to the istar.graph as well.

Note: istar.graph also triggers a ```change```, but it is not recommended to bind a behavior to it since
it is too fine-grained (e.g., dragging an element with the mouse will produce multiple change events, one for each
small movement of the mouse).

### add
####Description
This event is triggered once whenever a new Cell (Element or Link) is added to the graph (i* model).
The callback function receives an object which is the Backbone model of a Cell,
 which may be either an Element or a Link.
 
Whenever a dependency is added to the graph, three ```add``` events are triggered: 
- one for the dependum
- one for the link from the source to the dependum
- one  for the link from the dependum to the source

####Example
Prints some properties of the Cell (Element or Link) as they are added

```
istar.graph.on('add', function(cell) {
    console.log('A new ' + cell.prop('type') + ' was added to the graph:'); //The type of the added Cell
    console.log(cell.prop('id')); //its ID
    console.log('Is it a goal?   -> ', cell.isGoal()); //checks whether it is a goal
});
```


### remove
####Description
This event is triggered once whenever a Cell (Element or Link) is deleted from the graph (i* model).
The callback function receives an object which is the Backbone model of the Cell that has just been deleted.
A Cell may be either an Element or a Link.

Whenever an Element is deleted from the graph, any link connected to it is also removed, thus 
potentially triggering this event multiple times 
(once for the Element itself, and once for each connected link).

Whenever a dependency is deleted from the graph, three ```remove``` events are triggered: 
- one for the link from the source to the dependum
- one  for the link from the dependum to the source
- one for the dependum

Whenever some kind of actor (Actor/Agent/Role) is deleted from the graph, all its sub-elements (and their links)
are also deleted, thus potentially triggering this event multiple times.

####Example
Prints some properties of the Cell (Element or Link) as they are deleted from the graph.

```
istar.graph.on('remove', function(cell) {
    console.log('A ' + cell.prop('type') + ' has just been removed from the graph:'); //The type of the removed Cell
    console.log(cell.prop('id')); //its ID
});
```

## istar.paper

istar.paper is the View for istar.graph.

### change:selection
####Description
This event is triggered once when an element is selected. 
The callback function receives an object of the form
```{selectedElement, selectedElementView}.``` 

This event is also triggered once when an element is deselected. 
The callback function receives an object of the form: ```{deselectedElement, deselectedElementView}```. 

Please note that if the user changes the selection from an element to another one,
two events will be triggered: one for the desselection of the previously 
selected element
and one for the selection of the newly selected element. 
####Example
Prints a message when any element is selected or deselected.
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