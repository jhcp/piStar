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
        size: { width: 200, height: 120 },
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
    markup: '<g><rect class="boundary" /><circle class="element actorKindMain" /><path /><text/></g>',
    defaults: joint.util.deepSupplement({
        type: 'istar.Role',
        size: { width: 200, height: 120 },
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
    markup: '<g><rect class="boundary"/><circle class="element actorKindMain"/><path /><text/></g>',
    defaults: joint.util.deepSupplement({
        type: 'istar.Agent',
        size: { width: 200, height: 120 },
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
		size: { width: 90, height: 35 },
        attrs: {
            rect: {
				fill: 'rgb(205,254,205)',
				stroke: 'black',
				'stroke-width': 2,
				width: 130,
				height: 30,
				rx:20
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
		size: { width: 90, height: 35 },
        attrs: {
            rect: {
				fill: 'rgb(205,254,205)',
				stroke: 'black',
				'stroke-width': 2,
				width: 130,
				height: 30,
				rx:0
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
        size: { width: 95, height: 36 },
        attrs: {
            'polygon': {
                points: '0,18 15,0 115,0 130,18 115,36 15,36',
                fill: 'rgb(205,254,205)',
				stroke: 'black',
				'stroke-width': 2,
				width:130,
				height: 36
            },
            text: {
                text: 'Task',
                'font-size': 12,
				'font-weight': 'bold',
                ref: 'polygon',
                'ref-x': 0.5,
                'ref-y': 0.5,
                'y-alignment': 'middle',
            }
        }
    }, joint.shapes.basic.Polygon.prototype.defaults)
});

joint.shapes.istar.Quality = joint.shapes.basic.Path.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.Quality',
        size: { width: 90, height: 55 },
        attrs: {
            'path': {
				d: 'm 60.637955,-4.0358 c 17.5174,2.2042 29.9953,-10.69554 41.892705,-4.7858 22.34142,10.8714 11.2203,43.7743 -2.25,47.7322 -8.276505,2.9084 -13.960205,5.1934 -46.142805,-2.1786 -6.7454,-2.2317 -28.2652,6.0799 -35.4643,4.7143 C 9.072156,39.4809 6.491756,33.7693 3.744956,28.482 c -6.3069,-15.1266 -2.5738,-28.0439 7.981099,-34.7856 10.5549,-6.74179 27.9316,-7.30796 48.9119,2.2678 z',
                //d: 'M ' + 0 + ' ' + 0 + ' a 26.1831 26.1831 0 0 1 25 -3 a 18.8816 18.8816 0 0 1 27 -5 a 15.2684 15.2684 0 0 1 17.4999 3.25 a 19.182 19.182 0 0 1 24 -5 a 11.2361 11.2361 0 0 1 14.5 6.5 a 7.5085 7.5085 0 0 1 7 9 a 6.51159 6.51159 0 0 1 2.5 9.99998 a 7.67717 7.67717 0 0 1 -9 9.5 a 18.0487 18.0487 0 0 1 -17.25 3.625 a 41.1115 41.1115 0 0 1 -50.25 4.25 a 20.8059 20.8059 0 0 1 -22.25 0.25 a 28.5345 28.5345 0 0 1 -19.75 -6 a 12.0307 12.0307 0 0 1 -2.75 -21.75 a 6.06009 6.06009 0 0 1 3.74945 -5.62563 Z', //cloud shape
                fill: 'rgb(205,254,205)',
				stroke: 'black',
				'stroke-width': 2,
            },
            text: {
                text: 'Quality',
                'font-size': 12,
				'font-weight': 'bold',
                ref: 'path',
                'ref-x': 0.5,
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
        }
    }, joint.shapes.basic.Path.prototype.defaults)
});

joint.shapes.istar.ParticipatesInLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.ParticipatesInLink',
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        attrs: {
			'.marker-target': {
				d: 'M 10 0 L 5 5 L 10 5 M 5 5 L 10 10',
				fill:'none',
				'stroke-width':1.2 }},
        labels: [
			{ position: 0.5,
				attrs: {
					text: {
						text: 'participates-in',
						'font-weight': 400,
                        'font-size': 14
					},
					rect: {
						fill: 'white' }
				}
			}
		],
		source: {selector: 'circle'},
		target: {selector: 'circle'},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});

joint.shapes.istar.IsALink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.IsALink',
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        attrs: {
			'.marker-target': {
				d: 'M 10 0 L 5 5 L 10 5 M 5 5 L 10 10',
				fill:'none',
				'stroke-width':1.2 }},
        labels: [
			{ position: 0.5,
				attrs: {
					text: {
						text: 'is-a',
						'font-weight': 400,
                        'font-size': 14
					},
					rect: {
						fill: 'white' }
				}
			}
		],
		source: {selector: 'circle'},
		target: {selector: 'circle'},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});

joint.shapes.istar.DependencyLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.DependencyLink',
		toolMarkup: '<g />',//prevents the tool options button from appearing in the saved image
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        labels: [
			{ 	position: 0.5,
				attrs: {
					text: {
						text: 'D',
						'stroke-width': 2,
						'font-size': 24,
						'font-family': 'sans-serif',
					},
					rect: {
						fill: 'none',
					}
				}
			}
		],
		//necessary in order to prevent filling the curves when saving the image
		attrs: {
			'.connection': { fill: 'none' },
			'.connection-wrap': { fill: 'none' }
		},
		source: {selector: 'text'},
		target: {selector: 'text'},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});

joint.shapes.istar.AndRefinementLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.AndRefinementLink',
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        attrs: {
			'.marker-target': {
				d: 'M 15 0 L 15 8 M 15 4 L 5 4 ',
				// d:    'M 15 0 L 15 20 M 15 10 L 0 10 ',
				// d: 'M 15 0 L 15 20 M 15 10 L 0 10 ',
				fill:'black',
				'stroke-width':1 },
			'.connection': { fill: 'none' },//necessary in order to prevent filling the curves when saving the image
			'.connection-wrap': { fill: 'none' }//necessary in order to prevent filling the curves when saving the image
		},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});
joint.shapes.istar.OrRefinementLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.OrRefinementLink',
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        attrs: {
			'.marker-target': {
				d: 'M 15 0 L 5 5 L 15 10 z',
				fill:'black',
				'stroke-width':2 },
			'.connection': { fill: 'none' },//necessary in order to prevent filling the curves when saving the image
			'.connection-wrap': { fill: 'none' }//necessary in order to prevent filling the curves when saving the image
		},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});

joint.shapes.istar.NeededByLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        markup: [
            '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
            '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>',
            '<circle class="marker-target" fill="black" stroke="black" r="4"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="labels"/>',
            '<g class="marker-vertices"/>',
            '<g class="link-tools"/>'
        ].join(''),
        type: 'istar.NeededByLink',
        labels: [
			{ 	position: 0.7,
				attrs: {
					rect: {
						fill: 'rgb(220,220,220)',
					}
				}
			}
		],
		attrs: {
			'.connection': { fill: 'none' },//necessary in order to prevent filling the curves when saving the image
			'.connection-wrap': { fill: 'none' }//necessary in order to prevent filling the curves when saving the image
		},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});
joint.shapes.istar.ContributionLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.ContributionLink',
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        labels: [
			{ 	position: 0.4,
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
		attrs: {
			'.marker-target': {
				d: 'M 15 0 L 5 5 L 15 5 M 5 5 L 15 10',
				fill:'none',
				'stroke-width':1.2 },
			'.connection': { fill: 'none' },//necessary in order to prevent filling the curves when saving the image
			'.connection-wrap': { fill: 'none' }//necessary in order to prevent filling the curves when saving the image
		},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});

joint.shapes.istar.QualificationLink = joint.dia.Link.extend({
    defaults: joint.util.deepSupplement({
        type: 'istar.QualificationLink',
		arrowheadMarkup: '<g />',//prevents the arrowhead from appearing in the saved image
        attrs: {
			'.connection': {
                'fill': 'none',
                'stroke-dasharray': '10,5'
            },//necessary in order to prevent filling the curves when saving the image
			'.connection-wrap': { fill: 'none' },//necessary in order to prevent filling the curves when saving the image

		},
        smooth: false
    }, joint.dia.Link.prototype.defaults)
});
