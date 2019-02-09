# istarcore

This is the library created for and used by the piStar tool. It aims to provide basic and extendable, non-UI functionalities for any developer that wants to develop a javascript-based goal model tool, either on the browser or not. It may spin-off to its own project in the future.

You probably don't want to change the files in this folder and sub-folders, because they compose the core of the tool. You want to customize the tool, your best options are:
- to create an iStar extension, edit the files in the 'language' folder. Start with 'metamodel.js'
- to create additional functionalities (e.g., model transformation, metric calculation), create a plugin.

## Dependencies

This library depends on JointJS. JointJS depends on:
 - backbone
 - jquery
 - lodash
