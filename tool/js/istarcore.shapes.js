/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
joint.shapes.istar = {};

/*
* The Actor, Role, and Agent shapes are structured as follows:
	.element: the circle that represents the actor when collapsed
	text: the text inside the circle, usually representing the name of the actor
	.boundary: the container for the elements that go inside the actor

	Additionally, Agent and Role also contain a path that distinguishes then from the generic Actor element

	A rectangular boundary is used instead of the original circular boundary, to maximize the space available for drawing
*/

joint.shapes.istar.Actor = joint.dia.Element.extend({
    markup: '<g><rect class="boundary" /><circle class="element actorKindMain" /><path /><text/></g>',
    defaults: joint.util.deepSupplement({
        type: 'istar.Actor',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                transform: 'translate(-20, -20)',//displaces the circle a little bit
                r: 40,
                cx: 40,
                cy: 40,
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2
            },
            text: {
                'font-size': 12,
                text: 'Actor',
                'text-anchor': 'middle',
                ref: 'circle',//makes the position of the text relative to the circle
                'ref-x': 0.5,
                'ref-y': 0.5,
                'y-alignment': 'middle',
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif'
            },
            '.boundary': {
                width: 200, height: 120,
                rx: 100,
                ry: 40,
                fill: 'rgb(230,230,230)',
                stroke: 'black',
                'stroke-width': 2,
                'stroke-dasharray': '10,5,4,4'
            },
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.istar.Role = joint.dia.Element.extend({
    markup: '<g><rect class="boundary" /><circle class="element actorKindMain" /><path class="actorDecorator"/><text/></g>',
    defaults: joint.util.deepSupplement({
        type: 'istar.Role',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                transform: 'translate(-20, -20)',//displaces the circle a little bit
                r: 40,
                cx: 40,
                cy: 40,
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2
            },
            text: {
                'font-size': 12,
                text: 'Role',
                'text-anchor': 'middle',
                ref: 'circle',//makes the position of the text relative to the circle
                'ref-x': 0.5,
                'ref-y': 0.5,
                'y-alignment': 'middle',
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif'
            },
            '.boundary': {
                width: 200, height: 120,
                rx: 100,
                ry: 40,
                fill: 'rgb(230,230,230)',
                stroke: 'black',
                'stroke-width': 2,
                'stroke-dasharray': '10,5,4,4'
            },
            path: {
                d: 'm -11 45 q 30 15 62 0',
                stroke: 'black',
                'stroke-width': 1.5,
                fill: 'none'
            }
        }
    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.istar.Agent = joint.dia.Element.extend({
    markup: '<g><rect class="boundary"/><circle class="element actorKindMain"/><path class="actorDecorator"/><text/></g>',
    defaults: joint.util.deepSupplement({
        type: 'istar.Agent',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                transform: 'translate(-20, -20)',//displaces the circle a little bit
                r: 40,
                cx: 40,
                cy: 40,
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2
            },
            text: {
                'font-size': 12,
                text: 'Agent',
                'text-anchor': 'middle',
                ref: 'circle',//makes the position of the text relative to the circle
                'ref-x': 0.5,
                'ref-y': 0.5,
                'y-alignment': 'middle',
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif'
            },
            '.boundary': {
                width: 200, height: 120,
                rx: 100,
                ry: 40,
                fill: 'rgb(230,230,230)',
                stroke: 'black',
                'stroke-width': 2,
                'stroke-dasharray': '10,5,4,4'//'10,5'
            },
            path: {
                d: 'm -10 -5 60 0',
                stroke: 'black',
                'stroke-width': 1.5,
                fill: 'none'
            }
        }
    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.istar.Goal = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.Goal',
        size: {width: 90, height: 35},
        attrs: {
            rect: {
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2,
                width: 130,
                height: 30,
                rx: 20,
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            text: {
                text: 'Goal',
                'font-size': 12,
                'font-weight': 'bold'
            }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

joint.shapes.istar.Resource = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.Resource',
        size: {width: 90, height: 35},
        attrs: {
            rect: {
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2,
                width: 130,
                height: 30,
                rx: 0,
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            text: {
                text: 'Resource',
                'font-size': 12,
                'font-weight': 'bold'
            }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

joint.shapes.istar.Task = joint.shapes.basic.Polygon.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.Task',
        size: {width: 95, height: 36},
        attrs: {
            'polygon': {
                points: '0,18 15,0 115,0 130,18 115,36 15,36',
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2,
                width: 130,
                height: 36,
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            text: {
                text: 'Task',
                'font-size': 12,
                'font-weight': 'bold',
                'ref-dy': '-50%',
            }
        }
    }, joint.shapes.basic.Polygon.prototype.defaults)
});

joint.shapes.istar.Quality = joint.shapes.basic.Path.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.Quality',
        size: {width: 90, height: 55},
        attrs: {
            'path': {
                // d: 'M	60.637955,7.4642	C	78.155355,9.6684	90.633255,-3.23134	102.53066,2.6784	C	124.87208,13.5498	113.75096,46.4527	100.28066,50.4106	C	92.004155,53.319	86.320455,55.604	54.137855,48.232	47.392455,46.0003	25.872655,54.3119	18.673555,52.9463	C	9.072156,50.9809	6.491756,45.2693	3.744956,39.982	C	-2.561944,24.8554	1.171156,11.9381	11.726055,5.1964	22.280955,-1.54539	39.657655,-2.11156	60.637955,7.4642	Z',
                // d: 'M60.637955,-4.0358C78.155355,-1.8316,90.63325499999999,-14.73134,102.53066,-8.8216C124.87208,2.0497999999999994,113.75095999999999,34.95269999999999,100.28066,38.9106C92.004155,41.819,86.320455,44.104,54.137854999999995,36.732C47.392455,34.500299999999996,25.872654999999995,42.8119,18.673554999999993,41.4463C9.072156,39.4809,6.491756,33.7693,3.744956,28.482C-2.5619439999999996,13.3554,1.1711560000000003,0.4380999999999986,11.726055,-6.303600000000003C22.280955,-13.045390000000003,39.657655,-13.611560000000003,60.637955000000005,-4.035800000000004Z',
                d: 'm 60.637955,-4.0358 c 17.5174,2.2042 29.9953,-10.69554 41.892705,-4.7858 22.34142,10.8714 11.2203,43.7743 -2.25,47.7322 -8.276505,2.9084 -13.960205,5.1934 -46.142805,-2.1786 -6.7454,-2.2317 -28.2652,6.0799 -35.4643,4.7143 C 9.072156,39.4809 6.491756,33.7693 3.744956,28.482 c -6.3069,-15.1266 -2.5738,-28.0439 7.981099,-34.7856 10.5549,-6.74179 27.9316,-7.30796 48.9119,2.2678 z',
                // d: 'M ' + 0 + ' ' + 0 + ' a 26.1831 26.1831 0 0 1 25 -3 a 18.8816 18.8816 0 0 1 27 -5 a 15.2684 15.2684 0 0 1 17.4999 3.25 a 19.182 19.182 0 0 1 24 -5 a 11.2361 11.2361 0 0 1 14.5 6.5 a 7.5085 7.5085 0 0 1 7 9 a 6.51159 6.51159 0 0 1 2.5 9.99998 a 7.67717 7.67717 0 0 1 -9 9.5 a 18.0487 18.0487 0 0 1 -17.25 3.625 a 41.1115 41.1115 0 0 1 -50.25 4.25 a 20.8059 20.8059 0 0 1 -22.25 0.25 a 28.5345 28.5345 0 0 1 -19.75 -6 a 12.0307 12.0307 0 0 1 -2.75 -21.75 a 6.06009 6.06009 0 0 1 3.74945 -5.62563 Z', //cloud shape
                fill: 'rgb(205,254,205)',
                stroke: 'black',
                'stroke-width': 2,
                resetOffset: true,
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            text: {
                text: 'Quality',
                'font-size': 12,
                'font-weight': 'bold',
                'ref-y': '-65%',
                'y-alignment': 'middle'
            },
        }
    }, joint.shapes.basic.Path.prototype.defaults)
});

joint.shapes.istar.ParticipatesInLink = joint.dia.Link.define('istar.ParticipatesInLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
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
                'stroke-width': 20,
                'stroke-linecap': 'round'
            },
            label: {
                atConnectionRatio: 0.5,
                'font-weight': 400,
                'font-size': 13,
                text: 'participates-in',
                x: -40,
                y: 4,
                // textPath: {   /* used if we want the text to follow along the line */
                //     selector: 'line',
                //     startOffset: '50%'
                // },
            },
            'label-background': {
                atConnectionRatio: 0.5,
                'font-weight': 400,
                'font-size': 13,
                stroke: 'white',
                'stroke-width': '0.35em',
                text: 'participates=In',
                x: -40,
                y: 4,
                // textPath: {  /* used if we want the text to follow along the line */
                //     selector: 'line',
                //     startOffset: '50%'
                // },
            }
        },
        source: {selector: 'circle'},
        target: {selector: 'circle'}
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            },
            {
                tagName: 'text',
                selector: 'label-background'
            },
            {
                tagName: 'text',
                selector: 'label'
            }
        ]
    }
);

joint.shapes.istar.IsALink = joint.dia.Link.define('istar.IsALink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
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
                'stroke-width': 20,
                'stroke-linecap': 'round'
            },
            label: {
                atConnectionRatio: 0.5,
                'font-weight': 400,
                'font-size': 13,
                text: 'is-a',
                x: -20,
                y: 4,
            },
            'label-background': {
                atConnectionRatio: 0.5,
                'font-weight': 400,
                'font-size': 13,
                stroke: 'white',
                'stroke-width': '0.35em',
                text: 'is-a',
                x: -20,
                y: 4,
            }
        },
        source: {selector: 'circle'},
        target: {selector: 'circle'}
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            },
            {
                tagName: 'text',
                selector: 'label-background'
            },
            {
                tagName: 'text',
                selector: 'label'
            }
        ]
    }
);

joint.shapes.istar.DependencyLink = joint.dia.Link.define('istar.DependencyLink',
{
    attrs: {
        line: {
            connection: true,
            fill: 'none',
            stroke: 'black',
            'stroke-width': 1
        },
        'connection-wrap': {
            connection: true,
            fill: 'none',
            stroke: 'transparent',
            'stroke-width': 20,
            'stroke-linecap': 'round'
        },
        label: {
            atConnectionRatio: 0.5,
            d: 'm 0,-10 l 0,20 4,0 c 10,0, 10 -20, 0,-20 l -4,0',
            // d: 'm 0,-10 l 0,20 c 15,2, 15 -22, 0,-20',
            // d: 'm 0,-10 l 0,20 q 15 -10, 0,-20',
            fill: 'white',
            // fill: 'none',
            stroke: 'black',
            'stroke-width': 2,
        }
    },
    source: {selector: 'text'},
    target: {selector: 'text'}
},
{
    markup: [
        {
            tagName: 'path',
            selector: 'connection-wrap'
        },
        {
            tagName: 'path',
            selector: 'line'
        },
        {
            tagName: 'path',
            selector: 'label'
        }]
}
);

joint.shapes.istar.AndRefinementLink = joint.dia.Link.define('istar.AndRefinementLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                'targetMarker': {
                    'd': 'm 10,-6 l 0,12',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 20,
                'stroke-linecap': 'round'
            }
        }
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            }
        ]
    }
);

joint.shapes.istar.OrRefinementLink = joint.dia.Link.define('istar.OrRefinementLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 12,-6 l -12,6 12,6 z',
                     fill: 'black',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 20,
                'stroke-linecap': 'round'
            }
        }
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            }
        ]
    }
);

joint.shapes.istar.NeededByLink = joint.dia.Link.define('istar.NeededByLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                targetMarker: {
                    d:    'm 1, 0         a 4,4 0 1,0 8,0         a 4,4 0 1,0 -8,0',
                    // d: 'M cx - r, cy   a r,r 0 1,0 (r * 2),0   a r,r 0 1,0 -(r * 2),0', from https://codepen.io/jakob-e/pen/bgBegJ
                    fill: 'black',
                    stroke: 'black',
                    type: 'path', //using path instead of circle to correctly position the circle
                }
                // targetMarker: {
                //     r: 4,
                //     fill: 'black',
                //     stroke: 'black',
                //     'type': 'circle',
                //     x: -10,
                //     y: 10
                // }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 20,
                'stroke-linecap': 'round'
            }
        }
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            }
        ]
    }
);

joint.shapes.istar.ContributionLink = joint.dia.Link.define('istar.ContributionLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
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
                'stroke-width': 20,
                'stroke-linecap': 'round'
            }
        },
        labels: [
            {
                position: 0.4,
                attrs: {
                    text: {
                        'font-weight': 'bold',
                        'font-size': 12,
                        'font-family': 'sans-serif',
                    },
                    rect: {
                        fill: 'rgb(230,230,230)',
                    }
                }
            }
        ],
        source: {selector: 'circle'},
        target: {selector: 'circle'}
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            }
        ]
    }
);

joint.shapes.istar.QualificationLink = joint.dia.Link.define('istar.QualificationLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-dasharray': '10,5',
                'stroke-width': 1
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 20,
                'stroke-linecap': 'round'
            }
        }
    },
    {
        markup: [
            {
                tagName: 'path',
                selector: 'connection-wrap'
            },
            {
                tagName: 'path',
                selector: 'line'
            }
        ]
    }
);