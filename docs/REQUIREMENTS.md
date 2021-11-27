# Vision
**For** requirements engineering researchers and practitioners
**who** need to create and maintain i* models.

**The** piStar tool
**is** a modelling tool
**that** conforms to the iStar 2.0 standard. The models created with it present high visual fidelity, suitable for
including on requirements documents, scientific documents, and web-sites. It can be customized so that other 
researchers can adopt it as a basis for creating their specific-purpose tools. It contains custom attributes,
which help practitioners to specify their requirements. The tool runs on a web-browser without requiring 
additional installation.

**Unlike** existing tools,
**our product** has high visual fidelity and built-in extension functionalities, allowing researchers to create
a tool to support their own i* approach.   

# User Roles

## Modeler
Needs to create an i* 2.0 model.

### Novice modeler
Computer-savvy but not very familiar with i*. Forced to create i* models by a university professor. He is aware 
of i*'s key concepts, but will have many doubts when creating his models.

### Advanced modeler
Has created more than a handful of i* models, perhaps using some other tool. Is very busy and cannot be bothered
by technical issues. Wants to create models for illustrating scientific papers and also for teaching. 
Alternatively, she is designing a real system and needs to document its requirements.

## Researcher
Conducts i*-related research in an academic context. Has conceived a very nice proposal
(extension/method/transformation/etc.) and now needs to create i* models to be used as input. She also wants to 
provide tool support for her proposal, but is pressured to meet deadlines and can't afford to spend 
too much time in it. May not have been trained on modern web development technologies.

# Wireframe
![piStar's wireframe](images/wireframeOverview.png)

# User Stories

<details><summary>

**As a** modeler
**I want to** be able to undo my recent actions
**so that** I prevent accidental loss of data </summary>
- *Notes*:
  - Support undoing the deletion of cells (elements or links)
  - Reconsider supporting undoing other kinds of actions in future releases, depending on user feedback
  - Support ctrl+z or command+z
- *Tests*:
  - Try undoing before any change has been made to the diagram
  - Try undoing after multiple changes have been made
  - Try undoing after every change has already been undone
  - Try undoing after going throuh "File/New Model"
- *History*: Since v2.1.0
</details>


<details><summary>

**As a** modeler
**I want to** have the layout of my models automatically organized
**so that** I spend less time and effort organizing my model </summary>
- *Notes*:
  - Preserve the content within actors exactly the same as before
  - For future releases, consider including the option of automatically layouting the content within actors.
    This would be useful for programatically-generated diagrams.
- *Tests*:
  - Try on an empty diagram
  - Try with collapsed actors
  - Try with expanded actors
- *History*: Since v2.1.0
</details>

<details><summary>

**As a** modeler
**I want to** resize my elements
**so that** they better fit the size of its label </summary>
- *Notes*:
  - Due to technical difficulties, resizing the actors circle is not available. This
may be reconsidered in future releases
- *History*: Since v2.0.0
</details>

<details><summary>

**As a** modeler
**I want to** customize the look of my elements
**so that** I can differentiate some parts of my model </summary>
- *Notes*:
  - Change color
- *History*: Since v2.0.0
</details>


<details><summary>

**As a** modeler
**I want to** change the type of a given element or link
**so that** I can edit my model more easily</summary>
- *Notes*:
  - Change contribution links, between Make, Help, Hurt, and Break (according to the content of the metamodel)
  - Change dependums, between Goal dependency, Quality dependency, Task dependency,
    and Resource dependency (according to the content of the metamodel)
  - Change actors, between Actor, Agent, and Role (according to the content of the metamodel)
- *History*: Since v2.0.0. Updated on v2.1.0
</details>


<details><summary>

**As a** modeler
**I want to** flip the direction of a dependency link
**so that** I can edit my model more easily</summary>
- *Notes*:
  - Check validity before flipping: a refined element cannot be the Depender Element in
  a Dependency link (iStar 2.0 Guide, Page 14).
- *History*: Since v2.0.0
</details>

<details><summary>

**As a** modeler
**I want to** define custom properties for the model itself
**so that** I can provide additional information such as project name, project description, and company</summary>
- *Notes*:
  - do not allow blank spaces in the name of the property
- *History*: Since v2.0.0
</details>


<details><summary>

**As a** modeler
**I want to** use the tool in fullscreen
**so that** I have more space to edit my diagrams</summary>
- *Notes*:
  - do not allow blank spaces in the name of the property
- *History*: Since v2.0.0
</details>


<details><summary>
  
**As a** modeler 
**I want to** have the drawing area automatically enlarged if my elements don't fit in it
 **so that** I can create models as large as I need</summary>
- *Notes*:
  - Increase the drawing area to fit elements that are moved beyond the current drawing area
  - Increase the drawing area to fit new actors when they are added do the diagram
  - Increase the drawing area to fit a resized element when an element is resized
- *Tests*:
  - Try when moving expanded actor
  - Try when moving collapsed actor
  - Try when moving elements within an expanded actor
  - Try when moving dependums
  - Try when adding new actors, agents and roles
  - Try when resizing an element inside an actor
  - Try when resizing a dependum
  - Try in every direction (top, right, bottom, left)
- *History*: Since v1.2.0. Updated on v2.0.0. Updated on v2.1.0.
</details>


<details><summary>
  
**As a** modeler 
**I want to** save and load visual aspects of my model
**so that** I can reopen my diagram exactly as I left it</summary>
- *Notes*:
  - Vertices on links
  - Collapsed actors
  - Color of the elements
- *History*: Since v1.1.0. Updated on v2.0.0
</details>


<details><summary>
  
**As a** modeler from a non-english speaking country
**I want to** write content that contains non-english symbols
**so that** I can create a goal model in my native language</summary>
- *Notes*:
  - المتطلبات الهندسية (Arabic)
  - 需求工程 (Chinese)
  - 要求工学 (Japanese)
  - Açafrão (Portuguese)
  - разработка требований (Russian)
  - gereksinim mühendisliği (Turkish)
- *Tests*:
  - Try in elements' name
  - Try in the content of a custom property
  - Try in the name of a custom property
  - Try saving and loading the model
  - Try saving as image (PNG and SVG)
- *History*: Since v1.1.0
</details>


<details><summary>
  
**As a** modeler
**I want to** add elements in the model
**so that** I can create a goal model</summary>
- *Notes*:
  - Conform to i* 2.0 standard
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** delete elements from the model
**so that** I can create a goal model</summary>
- *Notes*:
  - delete associated links
  - delete the whole dependency if trying to delete a part of it
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** move elements in the model
**so that** I can create a goal model</summary>
- *Notes*:
  - update actor's boundary accordingly
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** change the name of elements in the model
**so that I** can create a goal model</summary>
- *Notes*:
  - allow duplicates
  - automatic linebreaks to fit the element's width
- *History*: Since v1.0.0. Updated on v2.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** delete all elements in the model at once
**so that I** can create a new goal model from scratch</summary>
- *Notes*:
  - ask user to confirm
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** collapse/expand actors in the model
  - **so that I** can create SD models with collapsed actors
  - **so that I** can create SR models</summary>
- *Notes*:
  - reposition dependency links
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** save models offline in my computer
  - **so that** I can reopen them later and continue editing
  - **so that** I can make backups
  - **so that** I can share them with other people
  - **so that** I can edit them with other tools</summary>
- *Notes*:
  - none
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** export a vectorial image from my models
  - **so that** I can edit them with image editing software
  - **so that** I can add them to my documents
  - **so that** I can share them with other people</summary>
- *Notes*:
  - none
- *Tests*:
  - See if they open correctly in Inkscape (open-source image creation software)
  - See if they open correctly when inserted in a Microsoft Word document
  - Try with a selected element
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
  **I want to** export a high-resolution rasterized image from my models
    - **so that** I can add them to my documents
    - **so that** I can share them with other people</summary>
- *Notes*:
  - none
- *Tests*:
  - Try with a selected element
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** be prevented from making mistakes regarding the syntax of iStar 2
**so that** I can create a valid goal model</summary>
- *Notes*:
  - Conform to i* 2.0 standard
  - Provide illustrated explanations of the mistakes
  - Exception: There should be no cyclic links. Rationale: technical difficulties
  - Exception: AND-refinement relations must contain at least two children. Rationale: The user needs to be able
    to create the *first* AND-refinement for a given parent. The tool should not prevent the creation of
    AND-refinements with only one child, since the second child would only get added afterwards.
- *History*: Since v1.0.0. Updated on v2.0.0
</details>

<details><summary>
  
**As a** modeler
**I want to** define custom properties for cells (elements or links) in the model
**so that I** can provide additional information such as rationale, author, and fit criterion</summary>
- *Notes*:
  - do not allow blank spaces in the name of the property
- *History*: Since v1.0.0. Updated on v2.0.0
</details>

<details><summary>
  
**As a** modeler 
**I want to** open model examples
- **so that** I can see what is possible to do with this
modeling language and tool
- **so that** I have a starting point to tinker-with in the tool</summary>
- *Notes*:
  - none
- *History*: Since v1.0.0
</details>

<details><summary>
  
**As a** modeler 
**I want to** change the size of the drawing area
 **so that** I can create models as large (or as small) as I need</summary>
- *Notes*:
  - Manually define width and height
- *History*: Since v1.0.0
</details>

## Backlog


<details><summary>
  
**As a** modeler 
**I want to** calculate metrics for my i* model 
 **so that** I can assess its quality</summary>
- *Notes*:
  - TBD
</details>

<details><summary>

**As a** modeler 
**I want to** add custom attributes to multiple elements at once
 **so that** I can save time when creating my models</summary>
- *Notes*:
  - TBD
</details>

<details><summary>

**As a** modeler 
**I want to** copy elements from my model
 **so that** TBD</summary>
- *Notes*:
  - TBD
</details>

<details><summary>

**As a** modeler 
**I want to** be able to delete custom properties
 **so that** I can remove data that is no longer needed </summary>
- *Notes*:
  - TBD
</details>

<details><summary>

**As a** modeler 
**I want to** be able to load language extensions at runtime
 **so that** I can document concepts that are not supported by the standard iStar 2.0 </summary>
- *Notes*:
  - TBD
</details>
