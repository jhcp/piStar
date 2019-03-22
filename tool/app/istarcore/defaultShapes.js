/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

/* this file contains default shapes that are used when a Cell defined in the metamodel
   does not have a custom shape.
   DO NOT CHANGE THIS SHAPE to customize the visuals of your language. Instead,
   create new shapes in the tool/language/shapes.js file.
 */
joint.shapes.istar = {};

joint.shapes.istar.DefaultContainer = joint.dia.Element.extend({
    markup: '<g><rect class="boundary" /><circle class="element actorSymbol" /><path /><text class="stereotype"/><text class="content"/></g>',
    defaults: joint.util.deepSupplement({
        type: 'Container',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                cx: 40,
                cy: 40,
                fill: 'white',
                r: 40,
                stroke: 'black',
                'stroke-width': 2,
                'stroke-dasharray': '8, 4',
                transform: 'translate(-20, -20)',  //displaces the actual actor symbol a little bit
            },
            '.stereotype': {
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif',
                'font-size': 12,
                'font-style': 'italic',
                ref: '.content',//makes the position of the text relative to content label
                'ref-x': 0.5,
                'ref-y': -6,
                // text: '<<ElementType>>',
                'text-anchor': 'middle',
                'y-alignment': 'middle'
            },
            '.content': {
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif',
                'font-size': 12,
                'font-weight': 'bold',
                ref: '.element',//makes the position of the text relative to the actual actor symbol
                'ref-x': 0.5,
                'ref-y': 0.5,
                text: 'ElementType',
                'text-anchor': 'middle',
                'y-alignment': 'middle'
            },
            '.boundary': {
                fill: 'rgb(242,242,242)',
                height: 120,
                rx: 100,
                ry: 40,
                stroke: 'black',
                'stroke-dasharray': '10,5,4,4',
                'stroke-width': 2,
                width: 200
            },
        }
    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.istar.DefaultNode = joint.shapes.basic.Rect.extend({
    markup: '<g class="scalable"><rect class="element"/></g><text class="stereotype"/><text class="content"/>',
    defaults: joint.util.deepSupplement({
        size: {width: 90, height: 35},
        attrs: {
            '.element': {
                fill: 'rgb(255,255,255)',
                height: 30,
                rx: 0,
                stroke: 'black',
                'stroke-dasharray': '8, 4',
                'stroke-width': 2,
                'vector-effect': 'non-scaling-stroke', /* prevents stroke distortion when the element is resized */
                width: 130
            },
            '.stereotype': {
                'font-size': 12,
                'font-style': 'italic',
                'ref': '.element',
                'ref-y': '10',
                // 'text': '<<ElementType>>'
            },
            '.content': {
                'font-size': 12,
                'font-weight': 'bold',
                'ref': '.element',
                'ref-y': '5',
                'refY2': '0.5',
                text: 'ElementType'
            }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

joint.shapes.istar.DefaultContainerLink = joint.dia.Link.define('DefaultContainerLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-dasharray': '2,4',
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 10,-6 l -10,6 10,6',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            },
            label: {
                atConnectionRatio: 0.45,
                'font-size': 14,
                'font-weight': 400,
                text: '<<ContainerLinkType>>',
                x: -20,
                y: 4,
            },
            'label-background': {
                atConnectionRatio: 0.45,
                'font-size': 14,
                'font-weight': 400,
                stroke: 'white',
                'stroke-width': '0.35em',
                text: '<<ContainerLinkType>>',
                x: -20,
                y: 4,
            }
        },
        source: {selector: '.actorSymbol'},
        target: {selector: '.actorSymbol'}
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            },
            {
                selector: 'label-background',
                tagName: 'text'
            },
            {
                selector: 'label',
                tagName: 'text'
            }
        ]
    }
);

joint.shapes.istar.DefaultNodeLink = joint.dia.Link.define('DefaultNodeLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-dasharray': '2,4',
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 10,-6 l -10,6 10,6',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            },
            label: {
                atConnectionRatio: 0.45,
                'font-size': 14,
                'font-weight': 400,
                text: '<<NodeLinkType>>',
                x: -20,
                y: 4,
            },
            'label-background': {
                atConnectionRatio: 0.45,
                'font-size': 14,
                'font-weight': 400,
                stroke: 'rgb(242,242,242)',
                'stroke-width': '0.35em',
                text: '<<NodeLinkType>>',
                x: -20,
                y: 4,
            }
        },
        source: {selector: '.element'},
        target: {selector: '.element'}
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            },
            {
                selector: 'label-background',
                tagName: 'text'
            },
            {
                selector: 'label',
                tagName: 'text'
            }
        ]
    }
);