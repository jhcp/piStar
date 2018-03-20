# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [Release v1.2.0] - 2018-03-20

### Added
- Responsive initial size of the drawing area, based on the windows' height
- Increase drawing area if there is an element beyond its right and bottom edges

### Changed
- Preventing unnecessary data on the JSON object when saving a file, 
for the cases where vertices were added to a link but were later removed.
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
Documentation added accordingly (docs/EVENTS.md.
- Google Analytics tracking returns to the live version
- Changed in-tool examples. Added one showing every possible element and link.
Another one from the i* wiki: http://istar.rwth-aachen.de/tiki-index.php?page=Strategic+Rationale+Example+Model%3A+Buyer+Drive+E-Commerce+from+Yu01&structure=i%2A+Guide
- Now it is no longer possible to load a model by pasting its content in a textarea. This feature was removed because the load file feature was deemed sufficient and a better option. 


### Fixed
- Fixed error when pressing ctrl+click on a non-actor element
- Refactoring
- Performance enhacement related to the Properties Table View
- Workaround for the "exploding quality" bug: whenever a quality was renamed, its
view got wider and covered the name.
This bug is purely aesthetical.
The view got restored after any (de)selection event.
This is just a workaround, a proper fix is still needed.
- Now it deletes the entire dependency link when deleting a depender or a dependee, preventing dangling dependums
- Prevent invalid property names: just a number; non-alphanumeric characters (except underscore _), empty.
- Prevent error when submiting an empty value for the value of an element's name or a Custom Property.
- Trim property values.
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
  - Now the user can press ESC and cancel the action of adding an element or link. This is important since otherwise the UI could get blocked (for instance, if the user selected to add a link, clicked on the source, but didn't have an element to be the target).
  
### Fixed
- Fix limitation of 1.5mb for downloading PNG file on Chrome
- Fix incorrect behavior of changing focus when hovering over an actor
- Fix desync: when changing the label of a node through double click, the properties table wasn't updated

## [Release v1.0.0] - 2017-03-19
- First release