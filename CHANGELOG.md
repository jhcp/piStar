# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [Release v2.0.0] - 2019-04-06

### Added
- UI Error messages when adding invalid links between nodes. E.g., when adding a contribution link
from a task to another task
- Automatically expand actor when adding an element inside a collapsed actor, in order to prevent the feeling
that the inserted element is outside the actor
- Now the user can set a name to the image file for saving
- Now the user can select whether to save PNG images with high resolution (default) or with original
 resolution (the same size as seen in the tool). There is also an option to have a transparent background or not
- Option to change the background color of individual elements
- Now every element that is added to the model comes with a "Description" property by default
- Now users are able to add custom data (custom properties) to the model itself, rather than just to its elements
- Now users are able to add custom data (custom properties) to links, rather than just elements
- Now users are able to change the type of a dependency (dependum)
- Now users are able to change the direction of a dependency (flip direction)
- Now users are able to change the value/label of a contribution link
- Straighten all links - option to remove every vertex of the model links, making them straight
- Nodes can now be resized
- Add UI button to delete element
- Additional iStar 2.0 language constraints enforced: "A single element can be AND-refined or OR-refined, but not both";
 "For a dependency, if a depender element x exists, then x cannot be refined or contributed to" 
- Add Bootbox dependency
- Add (invisible) plugins menu
- Enable users to delete all the vertices of a single link (button)
- Add large model example (Contextual Smart Home)
- Display warnings if loading invalid models
- Add stereotyped default shapes for metamodel elements that haven't had their shapes defined


### Changed
- Revamped UI, with collapsable toolbars menu on the top and collapsable panel on the left (for element/link specific content). This repositioning aims to address the complaint of having to scroll
up and down in order to use the tool functionalities. The collapsability allows to increase the diagram view when desired
- Elements can now be deleted with either the 'delete' or 'backspace' key, in order to make it easier for Mac users to
delete elements (in Mac OS the 'delete' key behaves as 'backspace')
- Changes have been made in the code to conform to [Google's HTML and CSS style guide](https://google.github.io/styleguide/htmlcssguide.html). Notably, HTML elements have been renamed
from CamelCase to snake-case. E.g.: addButton -> add-button
- jQuery (dependency) updated to v3.*
- JointJS (dependency) update to v2.2.0, along with its dependencies (BacjboneJS and lodash)
- when saving the model as a PNG image, now its background is transparent
- Links are now rounded by default when they have vertices.
Except for depedency links and contribution links, which are curved
- The shortcut to collapse/expand actors is now alt+click. The previous ctrl+click shortcut will be
eventually removed, considering that in the future ctrl may used for multiple selections.
- Extensive refactoring of folder structure, file naming and object naming to make the code easier to understand.
- Changed link deletion
- Refined visuals of links
- Update e-Commerce example to conform with newly enforced dependency constraints
- Added text to existing examples, with explicit permission from the original authors 
- All native javascript popup boxes (alert, confirm, prompt) replaced with Bootbox popups for more flexibility,
for cross-browser uniformity, and to preventing unintentionally removing the browser from fullscreen
- Now qualification and needed-by links can be added in any order (source and target automatically defined) 
- Other UI improvements
- Auto-increase paper not only to the right and bottom but also to the left and top

### Removed
- Aiming to save bandwidth, the following CSS styles that are not likely to be used in the context of this tool have
 been removed from our Bootstrap files: Print media styles, Code, Navbar, Breadcrumbs, Jumbotron, Media items, Carousel
- Aiming to save bandwidth, the following JS components that are not likely to be used in the context of this tool have
 been removed from our Bootstrap files: Carousel functionality, Scrollspy


## [Release v1.2.0] - 2018-03-20

### Added
- Responsive initial size of the drawing area, based on the windows' height
- Increase drawing area if there is an element beyond its right and bottom edges

### Changed
- Preventing unnecessary data on the JSON object when saving a file,
for the cases where vertices were added to a link but were later removed
- Now select element on pointerdown instead of on pointerup to increase perceived responsiveness

### Fix
- Issue #5: wrong origin of the model after save image

## [Release v1.1.0] - 2018-03-11
### Added
- Ability to save/load models with text containing non-native symbols, by encoding the content
- Save/load now saves/loads the information on whether a kind of actor was collapsed
- Save/load now saves/loads the vertices of links

### Changed
- Now the name of an element is a property of its own, instead of being stored just in the SVG (its view)
- Added change:selection events, allowing developers to react to it.
Documentation added accordingly (docs/EVENTS.md)
- Google Analytics tracking returns to the live version
- Changed in-tool examples. Added one showing every possible element and link.
Another one from the i* wiki: http://istar.rwth-aachen.de/tiki-index.php?page=Strategic+Rationale+Example+Model%3A+Buyer+Drive+E-Commerce+from+Yu01&structure=i%2A+Guide
- Now it is no longer possible to load a model by pasting its content in a textarea. This feature was removed because the load file feature was deemed sufficient and a better option


### Fixed
- Fixed error when pressing ctrl+click on a non-actor element
- Refactoring
- Performance enhacement related to the Properties Table View
- Workaround for the "exploding quality" bug: whenever a quality was renamed, its
view got wider and covered the name.
This bug is purely aesthetical.
The view got restored after any (de)selection event.
This is just a workaround, a proper fix is still needed
- Now it deletes the entire dependency link when deleting a depender or a dependee, preventing dangling dependums
- Prevent invalid property names: just a number; non-alphanumeric characters (except underscore _ ), empty
- Prevent error when submiting an empty value for the value of an element's name or a Custom Property
- Trim property values
- Fix bug when saving model with collapsed actors
- Changed the way examples are loaded, resulting in being easier to create
examples and complete functionality upon loading
(previously the links didn't get smooth)

## [Release v1.0.1] - 2018-03-05
### Added
- Changelog file

### Changed
- Update dependency (JointJS library): from 0.9.6 to 2.0.1
- Improved alignment of the 'D' symbol in a dependency link
- Improved fit-to-content feature when saving the model as image
  - Now it is also applied for the SVG file
  - Now it also trims empty space on the left and the top of the model
  - Now it is a bit tighter (less empty space)
- Google Analytics tracking removed from the live version
- Improved handling of element focus:
  - Rectangle around the element to indicate that it is selected
  - The 'delete element' button was removed, to prevent accidental deletes
  - Fixed some bugs that could cause (i) accidental delete and (ii) blocked UI when adding a link
  - The user can now de-select an element (ESC or click on empty space)
  - Auto-focus on an element when adding it
- Allow users to cancel an element/link insertion
  - Now the user can press ESC and cancel the action of adding an element or link. This is important since otherwise the UI could get blocked (for instance, if the user selected to add a link, clicked on the source, but didn't have an element to be the target)

### Fixed
- Fix limitation of 1.5mb for downloading PNG file on Chrome
- Fix incorrect behavior of changing focus when hovering over an actor
- Fix desync: when changing the label of a node through double click, the properties table wasn't updated

## [Release v1.0.0] - 2017-03-19
- First release
