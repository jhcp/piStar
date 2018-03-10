# Vision
**For** requirements engineering researchers and practitioners
**who** need to create and maintain i* models.

**The** piStar tool
**is** a modelling tool
**that** conforms to the iStar 2 standard. The models created with it present high visual fidelity, suitable for including on requirements documents, scientific documents, and web-sites. It can be customized so that other researchers can adopt it as a basis for creating their specific-purpose tools. It contains custom attributes, which help practitioners to specify their requirements. The tool runs on a web-browser without requiring additional installation.

**Unlike** existing tools,
**our product** has high visual fidelity and built-in extension functionalities, allowing researchers to create a tool to support their own i* approach.   


# User Stories

## Unreleased

<details><summary>
  
**As a** modeler from a non-english speaking country
**I want to** write content that contains non-english symbols
**so that** I can create a goal model in my native language</summary>
- Examples:
  - المتطلبات الهندسية (Arabic)
  - 需求工程 (Chinese)
  - 要求工学 (Japanese)
  - Açafrão (Portuguese)
  - разработка требований (Russian)
  - ihtiyaç mühendisliği (Turkish)
- Tests:
  - Try in elements' name
  - Try in the content of a custom property
  - Try in the name of a custom property  
</details>


## Release 1.0.0
- [X] **As a** modeler
**I want to** add elements in the model
**so that** I can create a goal model

- [X] **As a** modeler
**I want to** delete elements from the model
**so that** I can create a goal model

- [X] **As a** modeler
**I want to** move elements in the model
**so that** I can create a goal model

- [X] **As a** modeler
**I want to** change the name of elements in the model
**so that I** can create a goal model

- [X] **As a** modeler
**I want to** delete all elements in the model at once
**so that I** can create a new goal model from scratch

- [X] **As a** modeler
**I want to** collapse/uncollapse actors in the model
  - **so that I** can create SD models
  - **so that I** can create SR models with collapsed actors

- [X] **As a** modeler
**I want to** save models offline in my computer
  - **so that** I can reopen them later and continue editing
  - **so that** I can make backups
  - **so that** I can share them with other people
  - **so that** I can edit them with other tools

- [X] **As a** modeler
  **I want to** export a vectorial image from my models
    - **so that** I can edit them with image editing software
    - **so that** I can add them to my documents
    - **so that** I can share them with other people

- [X] **As a** modeler
  **I want to** export a high-resolution rasterized image from my models
    - **so that** I can add them to my documents
    - **so that** I can share them with other people

- [X] **As a** modeler
**I want to** be prevented from making mistakes regarding the syntax of iStar 2
**so that** I can create a valid goal model

- [X] **As a** modeler
**I want to** define custom attributes for elements in the model
**so that I** can provide additional information such as rationale, author, and fit criterion



## Backlog


<details><summary>
  
**As a** modeler 
**I want to** change the type of a dependency link
**so that** I can edit my model more easily</summary>
- Additional information:
  - Change between Goal dependency, Quality dependency, Task dependency,
  and Resource dependency

</details>

<details><summary>
  
**As a** modeler 
**I want to** change the type of a contribution link
**so that** I can edit my model more easily</summary>
- Additional information:
  - Change between Make, Help, Hurt, and Break

</details>

<details><summary>
  
**As a** modeler 
**I want to** flip the direction of a dependency link
**so that** I can edit my model more easily</summary>

</details>

<details><summary>
  
**As a** modeler 
**I want to** save and load visual aspects of my model
**so that** I can reopen my diagram exactly as I left it</summary>
- Additional information:
  - Vertexes on links
  - Collapsed actors
</details>

<details><summary>
  
**As a** modeler 
**I want to** define custom properties for the model itself 
 **so that** I can provide additional information such as project name, project description, and company</summary>
TBD
</details>