# piStar - online iStar modelling

 This is an open-source goal modelling tool. Its key distinguishing characteristics are:
  - it runs entirely on the browser, thus no installation needed
  - high visual fidelity (we want your diagrams to be pretty, even when printed)
  - supports the [iStar 2.0 standard](https://sites.google.com/site/istarlanguage/)

Currently, this tool is deployed at http://www.cin.ufpe.br/~jhcp/pistar/

Please check out our [requirements doc](docs/REQUIREMENTS.md), our [development instructions](docs/), and our [contributors list](CONTRIBUTORS.md). You can also see the [list of published work that has used this tool](RESEARCH.md).

For further information please contact jhcp at cin ufpe br

## A hackable tool
Feel like getting inside The Matrix? Open your browser's console (usualy ctrl+shift+c) and try one of these examples:

- Add new actors to the model:
```javascript
istar.addActor('Gary');
istar.addAgent('Quinn', {position: {x: 400, y:50}});
```

- Get the content of each element of the model:
```javascript
_.map(istar.getElements(), function(node) { return node.prop('name'); });
```

- Find out if the selected element is a goal (for this you first need to click on an element of the goal model):
```javascript
ui.getSelectedCells()[0].isGoal();
```

- Highlight every neighbor of the selected element (for this you first need to click on an element of the goal model):
```javascript
_.map(istar.graph.getNeighbors(ui.getSelectedCells()[0]), function(node) { istar.paper.findViewByModel(node).highlight(); });
```

## Licensing
This is open-source, you can fork and use it as you see fit. Push requests are very welcome, we will add you to our [contributors list](CONTRIBUTORS.md)!

Of course, the world is a better place when we work together to make it better. So, if you want to extend the tool with some functionality that you think will be useful to others, please get in touch so that we can make it available for everybody. In the future we plan to provide support for plugins, so stay tuned.

## Referencing
If you need to mention the piStar tool, please reference this publication: Pimentel, João and Castro, Jaelson. piStar Tool – A Pluggable Online Tool for Goal Modeling. 2018 IEEE 26th International Requirements Engineering Conference, pp. 498-499.

## Thanks!
 - Thank you very much, developers around the world whom created the awesome libraries we use. This project would be much much harder without them. Especially [JointJS](https://www.jointjs.com/) :heart:
 - Thank you thank you iStar 2.0 language commitee. For the language itself, and for your early support.
