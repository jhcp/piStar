# Development information

This tool is architected to be easily extendable by developers. Thus, no knowledge of specific frameworks is required. You can hack your way with HTML and Javascript.

Nonetheless, the library used to handle the drawing of the model (JointJS) requires a few other libraries, hence feel free to use them as you see fit.

*Also check out additional development docs in this directory*

## Build instructions
No build required, you just need to clone this repository (or your own fork) and open tool/index.html on your browser.

## Dependencies
All dependencies are included in this project's repository, so that you can easily clone it and start hacking away. This also prevents conflicts with newer versions of those dependencies (which is very likely in the specific case of JointJS).

- **[JointJS](https://www.jointjs.com/)** - This is the library that handles most of the drawing of the goal model itself. It requires the following libraries:
  - [Backbone.js](http://backbonejs.org/)
  - [jQuery](https://jquery.com/)
  - [lodash](https://lodash.com/)
- **[X-editable](https://vitalets.github.io/x-editable/)** - This library is used to provide an easy, user-friendly way to edit content in the tool. It is used, for instance, in the Properties panel.
- **[Bootstrap 3](http://getbootstrap.com/)** - Because we want our tool to have an organized look-and-feel.
- **[Bootbox](http://bootboxjs.com/)** - Because we want uniform cross-browser dialogs. Also, native javascript popup boxes
remove the tool from fullscreen on some browsers, which is an undesired behavior. By using modals instead this issue is 
prevented.

## Static Analysis
In order to prevent some silly mistakes and improve browser compatibility, the source code of this project is checked with:
 - [JSHint](http://jshint.com/) .
 - [HTML validator](https://validator.w3.org/nu/) 
 - [CSS validator](https://jigsaw.w3.org/css-validator/)

HTML and CSS code adheres to [Google's HTML and CSS style guide](https://google.github.io/styleguide/htmlcssguide.html).
However, no automatic linter is used to check this adherence, sadly.

[Plato](https://github.com/es-analysis/plato) is used for further analysis of code quality.

## Documentation
Documentation for the istarcore library can be created automatically with [JSdocs](https://github.com/jsdoc3/jsdoc), based on comments inside the source code files.
The suggested documentation template is [MINAMI](https://github.com/Nijikokun/minami).

## Development
If you intend to fix a bug or make a small improvement the preferred way is to fork this repository's development branch, fix locally, and submit a pull request.

If you plan to do something bigger, it may be better to create plugin-like code, extending piStar (in the future we expect to provide proper plugin support).

### Plugin-like example:

plugin.js:
```javascript
//insert a new button in the tool's toolbar
$('#appToolbar').append(
    '<button type="button" id="exampleButton" title="Calculate the number of actors in the model"> Example button </button>'
);
//define the code to be executed when the button is clicked
$('#exampleButton').click(function () {
    myPlugin.countActors();
});
myPlugin = {
    countActors: function() {
        //the actual function that display the number of actors in the current model
        elements = istar.getElements();
        actors = _.filter(elements, function(element) { return element.isKindOfActor(); });
        alert('Number of actors (including agents and roles): ' + actors.length);
    }
};
```

*In case you are wondering, the dollar sign ($) symbol in the code above references jQuery, whereas the underscore (_) symbol comes from lodash. The same functionality could be implemented without these libraries as well.*

In order to "include" the plugin above, you can use a script tag in the index.html file:

```HTML
<!-- insert your plugin(s) here, after this line -->
<script src="plugin.js"></script>
```
