# CHANGING THE LANGUAGE
The tool runs on a iStar 2.0 metamodel defined in the tool/language folder.

# Metamodel

## Base Metamodel

The Base Metamodel, which is used for any language created with the piStar tool, is presented in the figure below.

Everything within the model (graph) is a Cell. A Cell can be either an Element or a Link. These three concepts, in 
yellow, come from the JointJS library.

<img src="http://yuml.me/diagram/scruffy;dir:LR/class/[Cell{bg:orange}]^-[Element{bg:orange}], [Cell]^-[Link{bg:orange}],                                               [Link]^-[NodeLink{bg:skyblue}], [Link]^-[ContainerLink{bg:skyblue}],                                               [Element]^-[Node{bg:skyblue}], [Element]^-[Container{bg:skyblue}],                                               [DependencyLink{bg:skyblue}]-dependee>[Element],[DependencyLink]-depender>[Element],[DependencyLink]++-dependum>[Node],[DependencyLink]++-2>[Link]"/>

The concepts in blue are specific to the piStar tool. An Element can be either a Container or a Node.
A Container is an element that *can* contain Nodes, such as actors and agents. A Container cannot contain another Container.
A Node is an element that *cannot* contain other elements, such as goals and tasks.

A Link can be either a ContainerLink or a NodeLink.
A ContainerLink is a Link that *directly* links a Container to another container.
Examples are IsALink and ParticipatesInLink.
A NodeLink is a Link that links a Node to another Node. Examples are AndRefinementLink and ContributionLink.

Additionally, the Base Metamodel also contains a DependencyLink.
A DependencyLink is composed of exactly 2 Links (depender link and dependee link),
as well as one Node (dependum). A DependencyLink links an Element (depender) to another Element (dependee).

## iStar 2.0 Metamodel

The iStar 2.0 Metamodel used in the standard distribution of the piStar tool is built on top of the Base Metamodel.

The figure below presents the iStar 2.0 Metamodel as defined by the piStar tool, but omitting the DependencyLink for simplicity. 
<img src="http://yuml.me/diagram/scruffy/class/[Cell{bg:orange}]^-[Element{bg:orange}], [Cell]^-[Link{bg:orange}],                                                [Link]^-[NodeLink{bg:skyblue}], [Link]^-[ContainerLink{bg:skyblue}],                                               [Element]^-[Node{bg:skyblue}], [Element]^-[Container{bg:skyblue}],                                                                                              [NodeLink]^-[QualificationLink],[NodeLink]^-[OrRefinementLink],[NodeLink]^-[NeededByLink],[NodeLink]^-[ContributionLink],[NodeLink]^-[AndRefinementLink],                                                                                              [ContainerLink]^-[ParticipatesInLink],[ContainerLink]^-[IsALink],                                               [Node]^-[Task],[Node]^-[Resource],[Node]^-[Quality],[Node]^-[Goal],                                               [Container]^-[Role],[Container]^-[Agent],[Container]^-[Actor]"/>

The iStar 2.0 Metamodel has three kinds of Container: Actor, Agent and Role.
It also features four kinds of Node: Goal, Quality, Resource and Task.

Regarding links, the iStar 2.0 metamodel has two kinds of ContainerLink (IsALink and ParticipatesInLink), 
as well as five kinds of NodeLink (AndRefinementLink, ContributionLink, NeededByLink, OrRefinementLink, 
QualificationLink).

The figure below represents the full iStar 2.0 Metamodel as defined by the piStar tool, including the DependencyLink.
<img src="http://yuml.me/diagram/scruffy/class/[Cell{bg:orange}]^-[Element{bg:orange}], [Cell]^-[Link{bg:orange}],                                                [Link]^-[NodeLink{bg:skyblue}], [Link]^-[ContainerLink{bg:skyblue}],                                               [Element]^-[Node{bg:skyblue}], [Element]^-[Container{bg:skyblue}],                                                                                              [NodeLink]^-[QualificationLink],[NodeLink]^-[OrRefinementLink],[NodeLink]^-[NeededByLink],[NodeLink]^-[ContributionLink],[NodeLink]^-[AndRefinementLink],                                                                                              [ContainerLink]^-[ParticipatesInLink],[ContainerLink]^-[IsALink],                                               [Node]^-[Task],[Node]^-[Resource],[Node]^-[Quality],[Node]^-[Goal],                                               [Container]^-[Role],[Container]^-[Agent],[Container]^-[Actor],[DependencyLink{bg:skyblue}]-dependee>[Element],[DependencyLink]-depender>[Element],[DependencyLink]++-dependum>[Node],[DependencyLink]++-2>[Link]"/>

## Extending the language

The metamodel files are processed when the piStar tool is loaded, generating at runtime the helper functions and 
UI components that are required. Any change in these files will be reflected when the app is reloaded; no compilation 
or build process is required.


### Elements and Links
The Elements and Links of the language are defined in tool/language/metamodel.js

That file contains a JSON object containing the Containers, Nodes, ContainerLinks and NodeLinks of the language. 
When you create an extensioni, the recommendation is to not remove any Element/Link of the language, just *add* new 
concepts. This is called a *conservative extension*.

#### Add Containers
The example below shows an excerpt of the code to add a new kind of Container (a Robot). With this change,
when the tool is reloaded it will contain an Add Robot button in the Add Actor... dropdown button. 
This new element will have a stereotype default shape, which can be customized (see section Shapes).
Additionally, you can define constraints for the inclusion of new elements (see section Constraints)

```
"containers": {
        "Actor": { },
        "Agent": { },
        "Role": { },
        "Robot": { }   /* this is the new line */
    },
```  

#### Add Nodes

#### Add ContainerLinks

#### Add NodeLinks

### Constraints
The constraints of the language are defined in tool/language/constraints.js

You can define constraints both for Elements and for Links. These constraints are checked when the Cells are created,
as well as on any other time when a verification is necessary (for instance, when changing the direction of a 
dependency link).

Constraints are created by defining a `isValid` function for the Cell in the Javascript code.
 If no `isValid` function is defined for a Cell
 then that Cell has no constraints.

The `isValid` function must return a result object, with two properties: `isValid` (boolean) which is the actual result of
the validation (true if valid, false if invalid); and `message` (String, optional), which is a message that explains
to the user why that Cell is invalid. The latter is optional.

#### Element Constraints
Element constraints are not very common. However, you can define constraints according to your needs.

The code below shows an example constraint for the Robot actor, preventing the user from adding more than one Robot
in the model.

```
todo
```
#### Link Constraints
Link constraints are essential to prevent the creation of invalid Links. Its `isValid` function receives two parameters:
the `source` object and the `target` object of the Link.

When you add new elements, you will probably need to change a link constraint in order to allow links with your
new element. For instance, if you want to allow Or-Refinement links from a MonitorTask to other elements, you will
need to change its is `isValid` function accordingly, as exemplified below.

```
if ( !(source.isTask() || source.isGoal() || source.isMonitorTask()) ) {
    isValid = false;
    result.message = 'the source of an OR-refinement link must be a Goal, a Task or a Monitor Task (iStar 2.0 Guide, Table 1)';
}
```

### Shapes

#### Container shapes

#### Node shapes

#### Link shapes

### UI 
