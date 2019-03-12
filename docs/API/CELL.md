# Cell attributes

## .cid

## .id


# Cell methods

piStar adopts the nomenclature of JointJS, where a model (graph) contains elements and links. Element and Link are
subtypes of a generic Cell type.

## .attr(...)

## .clone(...) ???

## .embed(...)

## .findView(...)

## .getAncestors(...)

## .getEmbeddedCells(...)

## .getParentCell(...)

## .getBBox()

## .isCell()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns true if the object is a Cell.
- **Usage example:** This is useful when working with selected cells, since the i* graph (istar.graph) may be selected
by the user.
By checking with .isCell() (which returns false in this case), it is possible to know whether a Cell or the graph as a 
whole is selected.

## .isElement(), .isLink()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is an element or a link, respectively.
- **Usage example:** 

### .isEmbedded()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is embedded within *a* (any) Cell. Elements and
links within an actor boundary are embedded in that actor.
- **Usage example:**

### .isEmbeddedIn(element[, options])
- **Parameters:** a Element object (`element`). Optional options (`options`)
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is embedded within *a specific Cell* 
(`element`)
- **Usage example:**

## .parent()

## .position()


## .prop(propertyName)
- **Parameters:** 
- **Return:** 
- **Description:** 
- **Usage example:**

## .prop(propertyName, propertyValue)
- **Parameters:** 
- **Return:** 
- **Description:** 
- **Usage example:**

## .remove()

## .removeAttr(...)

## .removeProp(...)

## .resize(width, height)

## .setNodeLabel(value)

##. size()

## .toBack(), .toFront()

## .unembed(cell)

## .updateLineBreak()


##Auto-generated methods
The functions below are generated at runtime based on the metamodel files. If you change the metamodel, different 
functions will be available. For instance, if you replace Quality for Constraint in the metamodel, the .isConstraint()
function will be available whereas the .isQuality() function will no longer be avaliable.
  
### .isActor(), .isAgent(), .isRole()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is an actor, agent or role, respectively.
- **Usage example:** 
```
//Before running the code below, click on an actor of the model
ui.getSelectedCells()[0].isActor(); //returns true
ui.getSelectedCells()[0].isAgent(). //returns false
```

### .isContainer()/.isKindOfActor()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a type of container (actor, 
agent or role). isKindOfActor is an alias for the isContainer function
- **Usage example:** 
```
//Before running the line below, click on an *agent* of the model
ui.getSelectedCells()[0].isKindOfActor(); //returns true
//Before running the line below, click on a *goal* of the model
ui.getSelectedCells()[0].isKindOfActor(). //returns false
```

### .isGoal(), .isQuality(), .isResource(), .isTask()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a goal, quality, resource or task, 
respectively.
- **Usage example:**

### .isNode()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a type of node (goal, quality, resource 
or task).
- **Usage example:**

### .isIsALink(), .isParticipatesInLink()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is an IsALink or a ParticipatesInLink, 
respectively.
- **Usage example:**

### .isContainerLink()/.isActorLink()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a type of container link (IsALink 
or ParticipatesIn link). isActorLink is an alias for the isContainerLink function. Note that a dependency link returns
false
- **Usage example:** 

### .isDependencyLink()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a dependency link or not. Note that the
 dependum *is not* a dependency link
- **Usage example:**

### .isDependum()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a dependum or not.
- **Usage example:**

### .isAndRefinementLink(), .isContributionLink(), .isNeededByLink(), .isOrRefinementLink(), .isQualificationLink()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a and-refinement link, 
contribution link, needed-by link, or-refinement link, or qualification link, respectively.
- **Usage example:**

### .isNodeLink()
- **Parameters:** none
- **Return:** boolean
- **Description:** Returns a boolean value indicating whether the given Cell is a type of node link (AndRefinementLink,
ContributionLink, NeededByLink, OrRefinementLink, or QualificationLink).
- **Usage example:**