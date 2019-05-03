''/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

istar.models = istar.models || {};  //prevents overriding the variable, while also preventing working with a null variable

istar.models.processModelParameter = function () {
    "use strict";

    var modelId = this.getAllUrlParams().m || 'pistarWelcome';
    if (! istar.models[modelId]) {
        alert('Sorry, we do not have this model: ' + modelId);
        modelId = 'pistarWelcome';
    }

    return istar.models[modelId];
};

istar.models.getAllUrlParams = function () {
    "use strict";
    //this function was adapted from the following tutorial:
    // https://www.sitepoint.com/get-url-parameters-with-javascript/

    // get query string from the window

    var queryString = window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            // paramName = paramName.toLowerCase();
            // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            // if (paramName.match(/\[(\d+)?\]$/)) {
            //
            //     // create key if it doesn't exist
            //     var key = paramName.replace(/\[(\d+)?\]/, '');
            //     if (!obj[key]) obj[key] = [];
            //
            //     // if it's an indexed array e.g. colors[2]
            //     if (paramName.match(/\[\d+\]$/)) {
            //         // get the index value and add the entry at the appropriate position
            //         var index = /\[(\d+)\]/.exec(paramName)[1];
            //         obj[key][index] = paramValue;
            //     } else {
            //         // otherwise add the value to the end of the array
            //         obj[key].push(paramValue);
            //     }
            // } else {
            // we're dealing with a string
            if (!obj[paramName]) {
                // if it doesn't exist, create property
                obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                // if property does exist and it's a string, convert it to an array
                obj[paramName] = [obj[paramName]];
                obj[paramName].push(paramValue);
            } else {
                // otherwise add the property
                obj[paramName].push(paramValue);
            }
            // }
        }
    }

    return obj;
};

istar.models.loadPistarWelcome = function () {
    istar.fileManager.loadModel(this.pistarWelcome);
};

// istar.models.experimentExample = function () {
//     console.log('Go drink some water, this will take a while');
//     var actor = istar.addActor(23, 23, 'Actor');
//     for (var i = 1; i <= 40; i++) {
//         for (var j = 0; j < 25; j++) {
//             var kindOfElement = istar.models.util.randomIntegerFromMinToMax(0, 4);
//             var x = 10 + i * 30;
//             var y = 10 + j * 30;
//             var name = 'element ' + (j * 40 + i);
//             var priority = istar.models.util.randomIntegerFromMinToMax(1, 101);
//
//             var creationFunction = istar.addGoal;
//             if (kindOfElement === 1) creationFunction = istar.addQuality;
//             else if (kindOfElement === 2) creationFunction = istar.addTask;
//             else if (kindOfElement === 3) creationFunction = istar.addResource;
//             var newElement = creationFunction(x, y, name);
//             newElement.prop('customProperties/Priority', priority);
//             actor.embedNode(newElement);
//         }
//         console.log(i + '/40 completed');
//     }
// };
//
// istar.models.util = {};
// istar.models.util.randomIntegerFromMinToMax = function (min, max) {
//     //min (included)
//     //max (excluded)
//     return Math.floor(Math.random() * (max - min)) + min;
// };


istar.models.pistarWelcome = {
    "actors": [
        {
            "id": "3589ee55-603d-41ee-8bf1-2b2a54498def",
            "text": "Researcher",
            "type": "istar.Actor",
            "x": 49,
            "y": 41,
            "customProperties": {
                "Description": "I am a Requirements Engineering researcher. You too?"
            },
            "nodes": [
                {
                    "id": "71c7aeb6-fb99-40a1-bcd1-5a29e5b45252",
                    "text": "i* models created",
                    "type": "istar.Goal",
                    "x": 249,
                    "y": 87,
                    "customProperties": {
                        "Description": "This tool supports the i* 2.0 version (iStar 2.0)"
                    }
                },
                {
                    "id": "8d716a61-1ca4-44f4-934c-26166ea44d11",
                    "text": "Use piStar",
                    "type": "istar.Task",
                    "x": 172,
                    "y": 161,
                    "customProperties": {
                        "Description": "You can use it for free, without worrying about installations"
                    }
                },
                {
                    "id": "e159ce92-b29d-4fdc-a533-ee1e904f9f57",
                    "text": "Good Quality",
                    "type": "istar.Quality",
                    "x": 126,
                    "y": 61,
                    "customProperties": {
                        "Description": "By Good Quality we mean good *visual* quality:\n - no visual artefacts due to compression or rescaling;\n - aesthetically similar to the diagrams from the i* Wiki guides"
                    }
                }
            ]
        },
        {
            "id": "dbe6cf9f-877d-4600-bac9-8f7bbde93426",
            "text": "piStar tool team",
            "type": "istar.Agent",
            "x": 426,
            "y": 201,
            "nodes": [
                {
                    "id": "61eb4e04-b5f0-4a7d-aea1-22651e470867",
                    "text": "Continuous Improvement",
                    "type": "istar.Quality",
                    "x": 638,
                    "y": 211,
                    "customProperties": {
                        "Description": "Because we all know there is much to be improved in this tool =)\n\nBtw, help us improve it by sending your feedback through the Help menu"
                    }
                },
                {
                    "id": "f69a3c4b-4d40-488d-a54a-a0e38453f077",
                    "text": "Add properties to the diagram",
                    "type": "istar.Task",
                    "x": 844,
                    "y": 311,
                    "customProperties": {
                        "Description": "Now you can add custom properties not only to your elements, but also to your diagram as a whole! For instance, you can give it a name, record the authors' names, provide a link for further information, provide a brief description of the project, and so on.",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "1f011a05-50ff-47b4-bdf6-e6c9227eef70",
                    "text": "Change the color of elements",
                    "type": "istar.Task",
                    "x": 433,
                    "y": 414,
                    "customProperties": {
                        "Description": "Now you can change the color of elements, but use this with CAUTION! because the readers of your model may not be able to guess the meaning of each color. Plus, too many colors will make it messy.",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "5562be02-998b-4a7b-8bb9-355d84b3c06b",
                    "text": "Change the size of elements",
                    "type": "istar.Task",
                    "x": 427,
                    "y": 514,
                    "customProperties": {
                        "Description": "Now you can change the size of elements of the model. You just need to drag the handle in the bottom-right corner of the selected element",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "17acd322-9d37-496e-b6d5-c69c497502db",
                    "text": "Improved UI",
                    "type": "istar.Resource",
                    "x": 490,
                    "y": 305,
                    "customProperties": {
                        "Description": "This new User Interface has been designed not only to improve usability, but also to accommodate new functionalities that are coming in the near future",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "f9035e8c-0294-44a8-a93e-85a349d2f21a",
                    "text": "Change the type of dependums",
                    "type": "istar.Task",
                    "x": 568,
                    "y": 465,
                    "customProperties": {
                        "Description": "Now you can change the type of dependum elements. Select the dependum and then change its type in the Properties sidepanel",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "2697c4ac-6868-42ff-9d1d-b819000f909e",
                    "text": "Improved visuals for links",
                    "type": "istar.Resource",
                    "x": 725,
                    "y": 490,
                    "customProperties": {
                        "Description": "Improved shape and rotation for the 'D' in dependency links, as well as for the arrows in actor links, or-refinement links, and contribution links",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "d481f512-6836-4e17-ba29-0192cb0c8ad8",
                    "text": "Add properties to links",
                    "type": "istar.Task",
                    "x": 825,
                    "y": 515,
                    "customProperties": {
                        "Description": "Now you can add custom properties not only to your elements, but also to your links! For instance, you can provide a rationale for the link, define context annotations, specify numerical values for contributions, etc.",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "63f3b48a-0088-4aa3-9f63-5354efefc78b",
                    "text": "Change the value of contribution links",
                    "type": "istar.Task",
                    "x": 864,
                    "y": 465,
                    "customProperties": {
                        "Description": "Now you can change the value of contribution links (Make, Help, Hurt or Break). Select the link and then change its type in the Properties sidepanel",
                        "Since": "Version 2.0.0"
                    }
                },
                {
                    "id": "98275a4b-510e-4016-b985-6a25ca69079b",
                    "text": "Stricter adherence to the language guide",
                    "type": "istar.Resource",
                    "x": 650,
                    "y": 405,
                    "customProperties": {
                        "Description": "Previous versions of the tool allowed the creation of some invalid links:\n - mix of and/or refinements with the same target\n - refinement/contribution to depender elements\n\nThese links are no longer allowed, respecting the constraints defined in the iStar 2.0 Language Guide. The warning messages were improved, now they are much more specific.\n\nThe following links are still allowed:\n - Cyclic links\n - And-refinement with a single child",
                        "Warning": "For the purpose of compatibility, it is still possible to load models containing these invalid links. Users are advised to correct any invalid links present in their models as soon as possible"
                    }
                },
                {
                    "id": "ab99b45b-ee62-4a1c-9d4d-1312dbfd3d7d",
                    "text": "Elements modifiable",
                    "type": "istar.Goal",
                    "x": 551,
                    "y": 357,
                    "customProperties": {
                        "Description": "Be able to modify existing elements"
                    }
                },
                {
                    "id": "3696a947-a1cd-42b1-8804-794bd01aa0f9",
                    "text": "Improved Links",
                    "type": "istar.Quality",
                    "x": 752,
                    "y": 343,
                    "customProperties": {
                        "Description": ""
                    }
                }
            ]
        }
    ],
    "dependencies": [
        {
            "id": "2083cdfc-21c9-4a25-9a70-e65934cd588d",
            "text": "The piStar tool",
            "type": "istar.Resource",
            "x": 253,
            "y": 273,
            "customProperties": {
                "Cost": "$0.00"
            },
            "source": "8d716a61-1ca4-44f4-934c-26166ea44d11",
            "target": "dbe6cf9f-877d-4600-bac9-8f7bbde93426"
        }
    ],
    "links": [
        {
            "id": "3b572289-bb0f-4e7e-8b01-aa40e34ca306",
            "type": "istar.DependencyLink",
            "source": "8d716a61-1ca4-44f4-934c-26166ea44d11",
            "target": "2083cdfc-21c9-4a25-9a70-e65934cd588d"
        },
        {
            "id": "6dd4f5f6-a66d-45f1-b688-b6a216e5739b",
            "type": "istar.DependencyLink",
            "source": "2083cdfc-21c9-4a25-9a70-e65934cd588d",
            "target": "dbe6cf9f-877d-4600-bac9-8f7bbde93426"
        },
        {
            "id": "a3ece632-030b-4588-a7fa-077e84ed3e44",
            "type": "istar.AndRefinementLink",
            "source": "8d716a61-1ca4-44f4-934c-26166ea44d11",
            "target": "71c7aeb6-fb99-40a1-bcd1-5a29e5b45252"
        },
        {
            "id": "30d2ec84-6fac-419f-83ee-d26c2352820d",
            "type": "istar.ContributionLink",
            "source": "8d716a61-1ca4-44f4-934c-26166ea44d11",
            "target": "e159ce92-b29d-4fdc-a533-ee1e904f9f57",
            "label": "help"
        },
        {
            "id": "3e7c6e16-c2d0-46a2-82c6-0190f15a11e1",
            "type": "istar.ContributionLink",
            "source": "f69a3c4b-4d40-488d-a54a-a0e38453f077",
            "target": "61eb4e04-b5f0-4a7d-aea1-22651e470867",
            "label": "help"
        },
        {
            "id": "b3f49535-95da-41fc-ac88-f65a945ab3e7",
            "type": "istar.ContributionLink",
            "source": "17acd322-9d37-496e-b6d5-c69c497502db",
            "target": "61eb4e04-b5f0-4a7d-aea1-22651e470867",
            "label": "make"
        },
        {
            "id": "8db02be3-764c-49eb-a742-3729841d4ec7",
            "type": "istar.ContributionLink",
            "source": "98275a4b-510e-4016-b985-6a25ca69079b",
            "target": "61eb4e04-b5f0-4a7d-aea1-22651e470867",
            "label": "help"
        },
        {
            "id": "9fab6d1a-6445-49ef-873e-caa049e306ae",
            "type": "istar.OrRefinementLink",
            "source": "1f011a05-50ff-47b4-bdf6-e6c9227eef70",
            "target": "ab99b45b-ee62-4a1c-9d4d-1312dbfd3d7d"
        },
        {
            "id": "95a46d95-c6bd-4079-ada3-dfbd650f3fc6",
            "type": "istar.OrRefinementLink",
            "source": "5562be02-998b-4a7b-8bb9-355d84b3c06b",
            "target": "ab99b45b-ee62-4a1c-9d4d-1312dbfd3d7d"
        },
        {
            "id": "d36eb6f5-2f2e-4f42-b4f6-bce5d2f5b1d3",
            "type": "istar.OrRefinementLink",
            "source": "f9035e8c-0294-44a8-a93e-85a349d2f21a",
            "target": "ab99b45b-ee62-4a1c-9d4d-1312dbfd3d7d"
        },
        {
            "id": "d8569d6b-f285-43a8-a902-44ac50e4d868",
            "type": "istar.ContributionLink",
            "source": "ab99b45b-ee62-4a1c-9d4d-1312dbfd3d7d",
            "target": "61eb4e04-b5f0-4a7d-aea1-22651e470867",
            "label": "help"
        },
        {
            "id": "2bd7545b-760e-4b22-96b6-a5a25aaeb6b8",
            "type": "istar.ContributionLink",
            "source": "d481f512-6836-4e17-ba29-0192cb0c8ad8",
            "target": "3696a947-a1cd-42b1-8804-794bd01aa0f9",
            "label": "help"
        },
        {
            "id": "94e0fa33-a213-4109-87bb-85630708f6c9",
            "type": "istar.ContributionLink",
            "source": "2697c4ac-6868-42ff-9d1d-b819000f909e",
            "target": "3696a947-a1cd-42b1-8804-794bd01aa0f9",
            "label": "help"
        },
        {
            "id": "b4b9cbd7-ee9b-48c0-b98f-b172ba6fb2c6",
            "type": "istar.ContributionLink",
            "source": "63f3b48a-0088-4aa3-9f63-5354efefc78b",
            "target": "3696a947-a1cd-42b1-8804-794bd01aa0f9",
            "label": "help"
        },
        {
            "id": "c09955af-ecde-4a66-88a2-7c881f6cab64",
            "type": "istar.ContributionLink",
            "source": "3696a947-a1cd-42b1-8804-794bd01aa0f9",
            "target": "61eb4e04-b5f0-4a7d-aea1-22651e470867",
            "label": "help"
        }
    ],
    "display": {
        "f69a3c4b-4d40-488d-a54a-a0e38453f077": {
            "width": 100.609375,
            "height": 37.078125
        },
        "1f011a05-50ff-47b4-bdf6-e6c9227eef70": {
            "backgroundColor": "#FAE573",
            "width": 114.609375,
            "height": 37.078125
        },
        "5562be02-998b-4a7b-8bb9-355d84b3c06b": {
            "width": 179.609375,
            "height": 31.078125
        },
        "63f3b48a-0088-4aa3-9f63-5354efefc78b": {
            "width": 140.609375,
            "height": 34.078125
        },
        "98275a4b-510e-4016-b985-6a25ca69079b": {
            "width": 111.609375,
            "height": 49.078125
        },
        "3b572289-bb0f-4e7e-8b01-aa40e34ca306": {
            "vertices": [
                {
                    "x": 228,
                    "y": 270
                }
            ]
        },
        "6dd4f5f6-a66d-45f1-b688-b6a216e5739b": {
            "vertices": [
                {
                    "x": 332,
                    "y": 257
                },
                {
                    "x": 344,
                    "y": 231
                }
            ]
        },
        "30d2ec84-6fac-419f-83ee-d26c2352820d": {
            "vertices": [
                {
                    "x": 112,
                    "y": 138
                }
            ]
        }
    },
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Mon, 31 Dec 2018 17:53:41 GMT",
    "diagram": {
        "width": 2000,
        "height": 1300,
        "name": "Welcome Model",
        "customProperties": {
            "Description": "Welcome to the piStar tool! This model describe some of the recent improvements in the tool.\n\nFor help using this tool, please check the Help menu above"
        }
    }
};

istar.models.travelReimbursement = {
    "actors": [
        {
            "id": "830b5ef8-0f41-4a17-ba2a-ba4a8f4e799b",
            "text": "Student",
            "type": "istar.Role",
            "x": 244,
            "y": 29,
            "nodes": [
                {
                    "id": "8f5b5975-10bc-44b5-92b2-c53e2394b2c9",
                    "text": "Travel organized",
                    "type": "istar.Goal",
                    "x": 598,
                    "y": 29
                },
                {
                    "id": "d7350e31-1d29-46b0-bce5-e191189720cd",
                    "text": "Authorization obtained",
                    "type": "istar.Goal",
                    "x": 394,
                    "y": 91
                },
                {
                    "id": "c3f53c8d-b421-4c60-8dbf-03b07978295b",
                    "text": "Request prepared",
                    "type": "istar.Goal",
                    "x": 321,
                    "y": 160
                },
                {
                    "id": "4e767af4-fd1e-4e3e-8a82-3740521e576a",
                    "text": "Authorization signed",
                    "type": "istar.Goal",
                    "x": 491,
                    "y": 145
                },
                {
                    "id": "191249f9-d249-47db-b5f2-c09449307eb4",
                    "text": "Fill in paper form",
                    "type": "istar.Task",
                    "x": 244,
                    "y": 229
                },
                {
                    "id": "9bb7e927-3dee-4485-8fda-01954d324c88",
                    "text": "Fill in online form",
                    "type": "istar.Task",
                    "x": 356,
                    "y": 267
                },
                {
                    "id": "0055d468-1097-43b2-95bf-1781730b1985",
                    "text": "No errors",
                    "type": "istar.Quality",
                    "x": 276,
                    "y": 378
                },
                {
                    "id": "37b28c3f-7554-4c62-91cd-44cac0873977",
                    "text": "Supervisor authorizes",
                    "type": "istar.Task",
                    "x": 431,
                    "y": 215
                },
                {
                    "id": "102cbb1c-5600-4058-bed9-cc9e1ad1d9e9",
                    "text": "Head-of-dept authorizes",
                    "type": "istar.Task",
                    "x": 546,
                    "y": 251
                },
                {
                    "id": "0afa08e3-2306-40c8-9d40-2c144b748664",
                    "text": "Quick booking",
                    "type": "istar.Quality",
                    "x": 423,
                    "y": 388
                },
                {
                    "id": "16d9b9bf-fdef-4832-8f7d-8dcb42513371",
                    "text": "Trip booked",
                    "type": "istar.Goal",
                    "x": 741,
                    "y": 184
                },
                {
                    "id": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d",
                    "text": "Trip parts booked",
                    "type": "istar.Goal",
                    "x": 678,
                    "y": 261
                },
                {
                    "id": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
                    "text": "Bundle booked",
                    "type": "istar.Task",
                    "x": 855,
                    "y": 281
                },
                {
                    "id": "f34b98b9-6cba-4410-8a49-451e00049e43",
                    "text": "Tickets booked",
                    "type": "istar.Goal",
                    "x": 634,
                    "y": 342
                },
                {
                    "id": "94b43d28-480c-4a22-92ed-c8ba69a1d111",
                    "text": "Accommodation booked",
                    "type": "istar.Goal",
                    "x": 796,
                    "y": 331
                },
                {
                    "id": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
                    "text": "Agency buys tickets",
                    "type": "istar.Task",
                    "x": 592,
                    "y": 436
                },
                {
                    "id": "11d870d2-7987-45c9-a36a-7b177219ae50",
                    "text": "Self-book tickets",
                    "type": "istar.Task",
                    "x": 709,
                    "y": 406
                },
                {
                    "id": "89643e71-e10f-4474-9ac6-3ddd413bfda8",
                    "text": "Conference hotel booked",
                    "type": "istar.Goal",
                    "x": 811,
                    "y": 415
                },
                {
                    "id": "b73684df-4238-47d2-ae5a-e9d88df9559a",
                    "text": "Budget hotel booked",
                    "type": "istar.Goal",
                    "x": 1033,
                    "y": 357
                },
                {
                    "id": "1747e206-fa35-4229-b4be-67b3893e84d1",
                    "text": "Buy tickets",
                    "type": "istar.Task",
                    "x": 631,
                    "y": 504
                },
                {
                    "id": "49da8a06-b243-4c6e-9c50-dded496bec94",
                    "text": "Pay for tickets",
                    "type": "istar.Task",
                    "x": 758,
                    "y": 498
                },
                {
                    "id": "8a867e08-5a70-4816-ab02-1d84cf1b79dd",
                    "text": "Credit card",
                    "type": "istar.Resource",
                    "x": 667,
                    "y": 555
                },
                {
                    "id": "13efea03-96a0-4162-b89e-f46efc9a96c4",
                    "text": "Buy through booking.com",
                    "type": "istar.Task",
                    "x": 975,
                    "y": 432
                },
                {
                    "id": "59d154e2-8af7-48da-9f55-195ffebab399",
                    "text": "Buy through hotel website",
                    "type": "istar.Task",
                    "x": 1042,
                    "y": 478
                },
                {
                    "id": "c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397",
                    "text": "Comfort",
                    "type": "istar.Quality",
                    "x": 485,
                    "y": 580
                },
                {
                    "id": "685e4589-9717-487f-aa94-2eab2f7c5b46",
                    "text": "Minimal own payments",
                    "type": "istar.Quality",
                    "x": 911,
                    "y": 596
                }
            ]
        },
        {
            "id": "9ebf064b-88e2-48e0-9a63-7adda0ae89d0",
            "text": "Univ. trip mgmt IS",
            "type": "istar.Agent",
            "x": 187,
            "y": 784,
            "nodes": [
                {
                    "id": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472",
                    "text": "Process form",
                    "type": "istar.Task",
                    "x": 271,
                    "y": 816
                },
                {
                    "id": "7897dbdc-5dd5-4332-9e31-cac22e01f1e1",
                    "text": "Details validated",
                    "type": "istar.Goal",
                    "x": 195,
                    "y": 882
                },
                {
                    "id": "609eedc5-29e7-4360-b9ad-5ca23076033c",
                    "text": "Request authorization",
                    "type": "istar.Task",
                    "x": 235,
                    "y": 925
                },
                {
                    "id": "334c70d0-7786-4dda-8340-aa63c921bc03",
                    "text": "Notify applicant",
                    "type": "istar.Task",
                    "x": 321,
                    "y": 882
                }
            ]
        },
        {
            "id": "c7b6f310-8fab-4181-8323-a4190cd35c26",
            "text": "PhD student",
            "type": "istar.Role",
            "x": 105,
            "y": 67,
            "nodes": []
        },
        {
            "id": "77f4dfe4-1af2-4271-bbfa-0f5892cad0e4",
            "text": "Mike White",
            "type": "istar.Agent",
            "x": 141,
            "y": 297,
            "nodes": []
        },
        {
            "id": "a0b5233e-414b-4c96-b87c-45d3167c1ea6",
            "text": "Univ. of Wonder-Land",
            "type": "istar.Agent",
            "x": 131,
            "y": 534,
            "nodes": []
        },
        {
            "id": "3c57900f-ba6a-4277-ba86-a688b23628a8",
            "text": "Travel agency",
            "type": "istar.Actor",
            "x": 1211,
            "y": 689,
            "nodes": [
                {
                    "id": "9544119c-dd79-417e-8a19-6f67455d784b",
                    "text": "Book bundle via expedia",
                    "type": "istar.Task",
                    "x": 1275,
                    "y": 731
                }
            ]
        }
    ],
    "dependencies": [
        {
            "id": "fe9bc590-394b-4585-be24-66419eb353b9",
            "text": "Online form processed",
            "type": "istar.Goal",
            "x": 389,
            "y": 674,
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "dc25d9f6-7aea-46fd-8b59-1e317f5017f1",
            "text": "Trip bundle booked",
            "type": "istar.Goal",
            "x": 1193,
            "y": 315,
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "9544119c-dd79-417e-8a19-6f67455d784b"
        },
        {
            "id": "f26ec7d2-3133-42b0-b54c-2b4695e9ee1b",
            "text": "Buy flight tickets",
            "type": "istar.Task",
            "x": 707,
            "y": 800,
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "3c57900f-ba6a-4277-ba86-a688b23628a8"
        }
    ],
    "links": [
        {
            "id": "22dac746-8ee9-4ff1-90ef-4d5d1cdc1b2a",
            "type": "istar.DependencyLink",
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "fe9bc590-394b-4585-be24-66419eb353b9"
        },
        {
            "id": "01b316e0-829c-4288-8310-2e4948df389b",
            "type": "istar.DependencyLink",
            "source": "fe9bc590-394b-4585-be24-66419eb353b9",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "0895db0b-da58-4519-a7a9-a81ce56f75cb",
            "type": "istar.DependencyLink",
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "dc25d9f6-7aea-46fd-8b59-1e317f5017f1"
        },
        {
            "id": "2f03872a-f320-4884-90c0-5dd365964873",
            "type": "istar.DependencyLink",
            "source": "dc25d9f6-7aea-46fd-8b59-1e317f5017f1",
            "target": "9544119c-dd79-417e-8a19-6f67455d784b"
        },
        {
            "id": "dc86b2fc-4192-4725-b30d-2958c46dada6",
            "type": "istar.DependencyLink",
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "f26ec7d2-3133-42b0-b54c-2b4695e9ee1b"
        },
        {
            "id": "24c5690f-4b42-4884-b540-afb37cf30c6c",
            "type": "istar.DependencyLink",
            "source": "f26ec7d2-3133-42b0-b54c-2b4695e9ee1b",
            "target": "3c57900f-ba6a-4277-ba86-a688b23628a8"
        },
        {
            "id": "933bf752-403a-4625-9216-980d6134e824",
            "type": "istar.AndRefinementLink",
            "source": "7897dbdc-5dd5-4332-9e31-cac22e01f1e1",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "b6f44d15-563d-4b1c-99cc-355ab6f49691",
            "type": "istar.AndRefinementLink",
            "source": "609eedc5-29e7-4360-b9ad-5ca23076033c",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "e341c73c-1840-4794-a4ab-aa173c394bb1",
            "type": "istar.AndRefinementLink",
            "source": "334c70d0-7786-4dda-8340-aa63c921bc03",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "b834eaf2-8b25-4b35-9589-5c6257c0896e",
            "type": "istar.IsALink",
            "source": "c7b6f310-8fab-4181-8323-a4190cd35c26",
            "target": "830b5ef8-0f41-4a17-ba2a-ba4a8f4e799b"
        },
        {
            "id": "8e18dc9a-9c83-4024-98d0-81f810c2c8dd",
            "type": "istar.ParticipatesInLink",
            "source": "77f4dfe4-1af2-4271-bbfa-0f5892cad0e4",
            "target": "c7b6f310-8fab-4181-8323-a4190cd35c26"
        },
        {
            "id": "60d2a322-dc93-4bcd-98f4-1f22842fdc43",
            "type": "istar.AndRefinementLink",
            "source": "d7350e31-1d29-46b0-bce5-e191189720cd",
            "target": "8f5b5975-10bc-44b5-92b2-c53e2394b2c9"
        },
        {
            "id": "311e7939-1fda-49f2-9e6a-4930380f0817",
            "type": "istar.AndRefinementLink",
            "source": "c3f53c8d-b421-4c60-8dbf-03b07978295b",
            "target": "d7350e31-1d29-46b0-bce5-e191189720cd"
        },
        {
            "id": "c9e13288-79d1-43a3-9ad1-20da47731a27",
            "type": "istar.AndRefinementLink",
            "source": "4e767af4-fd1e-4e3e-8a82-3740521e576a",
            "target": "d7350e31-1d29-46b0-bce5-e191189720cd"
        },
        {
            "id": "e808d70e-b972-46e0-ae6f-bbbcca9b60a3",
            "type": "istar.OrRefinementLink",
            "source": "191249f9-d249-47db-b5f2-c09449307eb4",
            "target": "c3f53c8d-b421-4c60-8dbf-03b07978295b"
        },
        {
            "id": "5e9fb272-fc73-4a52-889b-c4c3017783e4",
            "type": "istar.OrRefinementLink",
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "c3f53c8d-b421-4c60-8dbf-03b07978295b"
        },
        {
            "id": "f47c5009-2e5c-41e4-81ab-e4a1a800a404",
            "type": "istar.QualificationLink",
            "source": "0055d468-1097-43b2-95bf-1781730b1985",
            "target": "c3f53c8d-b421-4c60-8dbf-03b07978295b"
        },
        {
            "id": "d071e095-737f-4269-9fc4-fbb05ffc563a",
            "type": "istar.OrRefinementLink",
            "source": "37b28c3f-7554-4c62-91cd-44cac0873977",
            "target": "4e767af4-fd1e-4e3e-8a82-3740521e576a"
        },
        {
            "id": "f42a938f-428b-495f-aec1-3edb951312c8",
            "type": "istar.OrRefinementLink",
            "source": "102cbb1c-5600-4058-bed9-cc9e1ad1d9e9",
            "target": "4e767af4-fd1e-4e3e-8a82-3740521e576a"
        },
        {
            "id": "d69e7872-d9b2-4f19-8a08-c86817c24811",
            "type": "istar.ContributionLink",
            "source": "191249f9-d249-47db-b5f2-c09449307eb4",
            "target": "0055d468-1097-43b2-95bf-1781730b1985",
            "label": "hurt"
        },
        {
            "id": "9fab10bc-0903-421c-9bbb-bb4622c94ff0",
            "type": "istar.ContributionLink",
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "0055d468-1097-43b2-95bf-1781730b1985",
            "label": "help"
        },
        {
            "id": "a7730aaa-68fe-4760-b36b-1153504f8283",
            "type": "istar.ContributionLink",
            "source": "37b28c3f-7554-4c62-91cd-44cac0873977",
            "target": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "label": "help"
        },
        {
            "id": "9f3e0bb7-6ae7-4cd9-bbec-80ca7eee342e",
            "type": "istar.ContributionLink",
            "source": "102cbb1c-5600-4058-bed9-cc9e1ad1d9e9",
            "target": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "label": "break"
        },
        {
            "id": "5e8dd76c-34ba-49af-8b8d-4cfac6e2aacb",
            "type": "istar.AndRefinementLink",
            "source": "16d9b9bf-fdef-4832-8f7d-8dcb42513371",
            "target": "8f5b5975-10bc-44b5-92b2-c53e2394b2c9"
        },
        {
            "id": "4d0aabb8-96a5-4964-a777-021241dbc464",
            "type": "istar.OrRefinementLink",
            "source": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d",
            "target": "16d9b9bf-fdef-4832-8f7d-8dcb42513371"
        },
        {
            "id": "078a7367-7b42-4015-a239-ebc388e3db99",
            "type": "istar.OrRefinementLink",
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "16d9b9bf-fdef-4832-8f7d-8dcb42513371"
        },
        {
            "id": "3b03d5e9-6d9c-4e7b-92e7-74a395db65ef",
            "type": "istar.AndRefinementLink",
            "source": "f34b98b9-6cba-4410-8a49-451e00049e43",
            "target": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d"
        },
        {
            "id": "c8241e9f-242b-4b90-a134-601ad498420c",
            "type": "istar.AndRefinementLink",
            "source": "94b43d28-480c-4a22-92ed-c8ba69a1d111",
            "target": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d"
        },
        {
            "id": "2d3d2252-e074-49ae-8896-c1e838aa9673",
            "type": "istar.OrRefinementLink",
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "f34b98b9-6cba-4410-8a49-451e00049e43"
        },
        {
            "id": "1c0ac449-4e4a-4477-9b99-767670553c78",
            "type": "istar.OrRefinementLink",
            "source": "11d870d2-7987-45c9-a36a-7b177219ae50",
            "target": "f34b98b9-6cba-4410-8a49-451e00049e43"
        },
        {
            "id": "dda09e92-4419-4d64-8e3e-a3df77c44ea3",
            "type": "istar.OrRefinementLink",
            "source": "89643e71-e10f-4474-9ac6-3ddd413bfda8",
            "target": "94b43d28-480c-4a22-92ed-c8ba69a1d111"
        },
        {
            "id": "5790eee4-96fe-44f4-8e14-3b8a548c5ef6",
            "type": "istar.OrRefinementLink",
            "source": "b73684df-4238-47d2-ae5a-e9d88df9559a",
            "target": "94b43d28-480c-4a22-92ed-c8ba69a1d111"
        },
        {
            "id": "55f74dce-18ba-4da3-bc8a-aa48fd030633",
            "type": "istar.AndRefinementLink",
            "source": "1747e206-fa35-4229-b4be-67b3893e84d1",
            "target": "11d870d2-7987-45c9-a36a-7b177219ae50"
        },
        {
            "id": "f60694e4-2436-4c76-becf-c230044bf824",
            "type": "istar.AndRefinementLink",
            "source": "49da8a06-b243-4c6e-9c50-dded496bec94",
            "target": "11d870d2-7987-45c9-a36a-7b177219ae50"
        },
        {
            "id": "d5ff1904-a9c6-4fba-ae3b-cb1e58102ad6",
            "type": "istar.NeededByLink",
            "source": "8a867e08-5a70-4816-ab02-1d84cf1b79dd",
            "target": "49da8a06-b243-4c6e-9c50-dded496bec94"
        },
        {
            "id": "1c8fb2a5-ca39-40a3-bf75-dcfe04a51c6e",
            "type": "istar.OrRefinementLink",
            "source": "13efea03-96a0-4162-b89e-f46efc9a96c4",
            "target": "b73684df-4238-47d2-ae5a-e9d88df9559a"
        },
        {
            "id": "47c531d5-eff8-4025-9fbb-af7e758182b9",
            "type": "istar.OrRefinementLink",
            "source": "59d154e2-8af7-48da-9f55-195ffebab399",
            "target": "b73684df-4238-47d2-ae5a-e9d88df9559a"
        },
        {
            "id": "489260e4-8a1d-4e8f-b946-dd8c67aaf92c",
            "type": "istar.ParticipatesInLink",
            "source": "9ebf064b-88e2-48e0-9a63-7adda0ae89d0",
            "target": "a0b5233e-414b-4c96-b87c-45d3167c1ea6"
        },
        {
            "id": "36cdaa76-28b6-457f-9f03-7b9185d85ee2",
            "type": "istar.QualificationLink",
            "source": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "target": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d"
        },
        {
            "id": "7bc925d9-fdc1-4afb-b8e0-d402184dd0d2",
            "type": "istar.ContributionLink",
            "source": "11d870d2-7987-45c9-a36a-7b177219ae50",
            "target": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "label": "help"
        },
        {
            "id": "f124046f-e621-4b59-949a-847c52114e88",
            "type": "istar.ContributionLink",
            "source": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "target": "c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397",
            "label": "help"
        },
        {
            "id": "c940a867-1f23-4f37-a98f-93a6c28327aa",
            "type": "istar.ContributionLink",
            "source": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "target": "c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397",
            "label": "help"
        },
        {
            "id": "89ddd15c-f07b-4ff3-8d7e-8e83541d0aca",
            "type": "istar.ContributionLink",
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "label": "help"
        },
        {
            "id": "3a60b84d-43e4-4dd6-81b5-8b589fbae657",
            "type": "istar.ContributionLink",
            "source": "11d870d2-7987-45c9-a36a-7b177219ae50",
            "target": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "label": "hurt"
        },
        {
            "id": "ff6113f0-5ccf-4f10-9481-2db77e5d708b",
            "type": "istar.ContributionLink",
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "label": "make"
        }
    ],
    "display": {
        "94b43d28-480c-4a22-92ed-c8ba69a1d111": {
            "width": 103.578125,
            "height": 37.265625
        },
        "22dac746-8ee9-4ff1-90ef-4d5d1cdc1b2a": {
            "vertices": [
                {
                    "x": 427,
                    "y": 573
                }
            ]
        },
        "01b316e0-829c-4288-8310-2e4948df389b": {
            "vertices": [
                {
                    "x": 402,
                    "y": 765
                }
            ]
        },
        "0895db0b-da58-4519-a7a9-a81ce56f75cb": {
            "vertices": [
                {
                    "x": 1115,
                    "y": 282
                }
            ]
        },
        "2f03872a-f320-4884-90c0-5dd365964873": {
            "vertices": [
                {
                    "x": 1295,
                    "y": 445
                },
                {
                    "x": 1328,
                    "y": 613
                }
            ]
        },
        "dc86b2fc-4192-4725-b30d-2958c46dada6": {
            "vertices": [
                {
                    "x": 595,
                    "y": 555
                },
                {
                    "x": 628,
                    "y": 714
                },
                {
                    "x": 750,
                    "y": 795
                }
            ]
        },
        "24c5690f-4b42-4884-b540-afb37cf30c6c": {
            "vertices": [
                {
                    "x": 940,
                    "y": 829
                },
                {
                    "x": 1100,
                    "y": 789
                }
            ]
        },
        "d69e7872-d9b2-4f19-8a08-c86817c24811": {
            "vertices": [
                {
                    "x": 287,
                    "y": 328
                }
            ]
        },
        "9fab10bc-0903-421c-9bbb-bb4622c94ff0": {
            "vertices": [
                {
                    "x": 367,
                    "y": 358
                }
            ]
        },
        "a7730aaa-68fe-4760-b36b-1153504f8283": {
            "vertices": [
                {
                    "x": 458,
                    "y": 330
                }
            ]
        },
        "9f3e0bb7-6ae7-4cd9-bbec-80ca7eee342e": {
            "vertices": [
                {
                    "x": 504,
                    "y": 332
                }
            ]
        },
        "7bc925d9-fdc1-4afb-b8e0-d402184dd0d2": {
            "vertices": [
                {
                    "x": 595,
                    "y": 387
                }
            ]
        },
        "f124046f-e621-4b59-949a-847c52114e88": {
            "vertices": [
                {
                    "x": 482,
                    "y": 521
                }
            ]
        },
        "c940a867-1f23-4f37-a98f-93a6c28327aa": {
            "vertices": [
                {
                    "x": 737,
                    "y": 649
                }
            ]
        },
        "89ddd15c-f07b-4ff3-8d7e-8e83541d0aca": {
            "vertices": [
                {
                    "x": 620,
                    "y": 558
                },
                {
                    "x": 696,
                    "y": 624
                }
            ]
        },
        "3a60b84d-43e4-4dd6-81b5-8b589fbae657": {
            "vertices": [
                {
                    "x": 877,
                    "y": 502
                }
            ]
        },
        "ff6113f0-5ccf-4f10-9481-2db77e5d708b": {
            "vertices": [
                {
                    "x": 952,
                    "y": 388
                },
                {
                    "x": 966,
                    "y": 511
                }
            ]
        },
        "c7b6f310-8fab-4181-8323-a4190cd35c26": {
            "collapsed": true
        },
        "77f4dfe4-1af2-4271-bbfa-0f5892cad0e4": {
            "collapsed": true
        },
        "a0b5233e-414b-4c96-b87c-45d3167c1ea6": {
            "collapsed": true
        }
    },
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Thu, 27 Dec 2018 23:42:17 GMT",
    "diagram": {
        "width": 1500,
        "height": 1100,
        "name": "University travel reimbursement",
        "customProperties": {
            "Description": "Students must organize their travel (e.g., to conferences) and have several goals to achieve, and options to achieve them. To achieve their goals, students rely on other parties such as a Travel Agency and the university’s trip management information system.",
            "Origin": "This is the example presented in the iStar 2.0 Language Guide, which can be accessed through the Help menu"
        }
    }
};

istar.models.smartHome = {
    "actors": [
        {
            "id": "0c7fe3d8-ed88-4bc1-8464-80c769a1b97f",
            "text": "Smart home system",
            "type": "istar.Actor",
            "x": 329,
            "y": 35,
            "customProperties": {
                "Description": ""
            },
            "nodes": [
                {
                    "id": "0f052835-9f3f-491a-a3f0-c70d2001fca5",
                    "text": "Temperature be managed",
                    "type": "istar.Goal",
                    "x": 588,
                    "y": 131,
                    "customProperties": {
                        "Description": "",
                        "Context": "There is someone at the smart home"
                    }
                },
                {
                    "id": "3b1813ea-e6b1-40ec-a11d-49cda0c82324",
                    "text": "Reliability",
                    "type": "istar.Quality",
                    "x": 883,
                    "y": 43,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "b76387a2-ca54-468d-88d1-45227b47ff83",
                    "text": "Energy spent wisely",
                    "type": "istar.Quality",
                    "x": 453,
                    "y": 35,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "834513e9-a5d2-43fa-ae24-3c57f645064a",
                    "text": "Adaptability",
                    "type": "istar.Quality",
                    "x": 1018,
                    "y": 78,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "4692dc12-801f-4174-9afa-8e710f4d722f",
                    "text": "Prevent failures",
                    "type": "istar.Task",
                    "x": 1180,
                    "y": 101,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "e8239026-4607-4acc-a4ed-a771d72fbcbc",
                    "text": "Select best behaviour according to the environment",
                    "type": "istar.Task",
                    "x": 1143,
                    "y": 174,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "490feaca-a7f4-470f-a2db-d5c8073f5f56",
                    "text": "Control windows",
                    "type": "istar.Task",
                    "x": 476,
                    "y": 204,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "3eb43835-be08-42fb-9158-0e1c45d66bbb",
                    "text": "Control fan",
                    "type": "istar.Task",
                    "x": 674,
                    "y": 220,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "e54e1fd2-9c11-4097-b296-35dd65763bda",
                    "text": "Control heating device",
                    "type": "istar.Task",
                    "x": 811,
                    "y": 173,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "bab3e64d-95c4-4e60-b105-8fa38aad0093",
                    "text": "Open window",
                    "type": "istar.Task",
                    "x": 440,
                    "y": 296,
                    "customProperties": {
                        "Description": "",
                        "Context": ""
                    }
                },
                {
                    "id": "b2e93b23-d7f1-48f2-be68-dafef2f9bade",
                    "text": "Close window",
                    "type": "istar.Task",
                    "x": 549,
                    "y": 306,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "5e0579a1-57d6-4de1-ad56-0d7810a5b52d",
                    "text": "Turn on fan",
                    "type": "istar.Task",
                    "x": 651,
                    "y": 302,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "9ddc02f7-59a9-4565-9721-6e60dc66f10c",
                    "text": "Turn off fan",
                    "type": "istar.Task",
                    "x": 747,
                    "y": 352,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "623862d4-6b91-4278-83bf-342e66ef3bda",
                    "text": "Turn on heating device",
                    "type": "istar.Task",
                    "x": 813,
                    "y": 280,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "9d534e15-95a0-44ea-a1b4-8bab3b1fd6c4",
                    "text": "Turn off heating device",
                    "type": "istar.Task",
                    "x": 901,
                    "y": 227,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "add6b9fe-6314-4eab-bb22-61d5717c54ce",
                    "text": "Manage lights",
                    "type": "istar.Task",
                    "x": 1079,
                    "y": 322,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "65524a26-5718-499e-a023-14066a7725d9",
                    "text": "Lights be managed",
                    "type": "istar.Goal",
                    "x": 1008,
                    "y": 249,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "0d89c849-6ee1-4b96-9102-103edf016542",
                    "text": "Select lights policy",
                    "type": "istar.Task",
                    "x": 883,
                    "y": 343,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "ee6f36f2-01db-485d-a304-20f41f90d33b",
                    "text": "Occupancy simulation",
                    "type": "istar.Task",
                    "x": 815,
                    "y": 419,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "93365266-ac6f-48ba-9c2d-c1f110ebb5dc",
                    "text": "Lights on by occupancy",
                    "type": "istar.Task",
                    "x": 910,
                    "y": 429,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "83005b8f-bfe4-4378-995b-78407139c97f",
                    "text": "Control lights",
                    "type": "istar.Task",
                    "x": 1070,
                    "y": 390,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "e3beae74-b939-47d8-89fb-2ed6d446a2e8",
                    "text": "Turn on light",
                    "type": "istar.Task",
                    "x": 1014,
                    "y": 455,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "e1943868-5e88-41f4-9368-f10e48a360ca",
                    "text": "Turn off light",
                    "type": "istar.Task",
                    "x": 1156,
                    "y": 452,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "36f19256-e85f-48c8-a2b1-6b5c68760f93",
                    "text": "Safety",
                    "type": "istar.Quality",
                    "x": 612,
                    "y": 340,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "39e3358a-79c9-4a82-93c9-bc77d26c6610",
                    "text": "Manage fire incident",
                    "type": "istar.Task",
                    "x": 605,
                    "y": 442,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "0e54535c-be18-4ee6-a347-40f0261a6b50",
                    "text": "Control gas valves",
                    "type": "istar.Task",
                    "x": 410,
                    "y": 366,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "62659e86-92a5-4d32-842a-8a44a4646c6d",
                    "text": "Open gas valves",
                    "type": "istar.Task",
                    "x": 368,
                    "y": 482,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "b9db7012-9e2d-4e85-8beb-ad3e93dc312a",
                    "text": "Close gas valves",
                    "type": "istar.Task",
                    "x": 453,
                    "y": 525,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "d8c3d54b-d979-4872-a435-847c5fc11d89",
                    "text": "Unlock doors",
                    "type": "istar.Task",
                    "x": 583,
                    "y": 656,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "2946613f-b8aa-4d2d-afe0-e1a5ee8bea9d",
                    "text": "Lock doors",
                    "type": "istar.Task",
                    "x": 470,
                    "y": 684,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "632c6d4f-632d-4d45-b4a2-5764744184ef",
                    "text": "Control doors lock",
                    "type": "istar.Task",
                    "x": 465,
                    "y": 590,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "9452a1a3-07dc-49a1-9534-3883aea9d55f",
                    "text": "Control power outlet",
                    "type": "istar.Task",
                    "x": 695,
                    "y": 546,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "ca7c6b8c-e155-4c8f-a8d0-ce86cc1c1a02",
                    "text": "Deactivate power outlet",
                    "type": "istar.Task",
                    "x": 673,
                    "y": 631,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "47a0c4b6-9844-4ff3-8ba7-8db7923805bd",
                    "text": "Activate power outlet",
                    "type": "istar.Task",
                    "x": 773,
                    "y": 609,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "336c8a20-26f7-4dc5-a20f-8b5925c7f439",
                    "text": "Control alarm",
                    "type": "istar.Task",
                    "x": 836,
                    "y": 495,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "c0384b04-9745-43a7-ad96-17cc6a83f613",
                    "text": "Activate alarm",
                    "type": "istar.Task",
                    "x": 807,
                    "y": 566,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "6a12bc40-749d-49a3-a70d-84bccca84167",
                    "text": "Deactivate alarm",
                    "type": "istar.Task",
                    "x": 913,
                    "y": 560,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "9126a353-2812-47fe-bfa4-c7b1c3672952",
                    "text": "Entertainment",
                    "type": "istar.Quality",
                    "x": 1051,
                    "y": 517,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "6824c565-ae86-4cf9-ba0a-c6922f343028",
                    "text": "Manage sound system",
                    "type": "istar.Task",
                    "x": 940,
                    "y": 612,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "755356b4-962f-4dcf-8e36-1a4d2816c391",
                    "text": "Schedule social event with a friend",
                    "type": "istar.Task",
                    "x": 1138,
                    "y": 604,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "494a5feb-2f56-4434-832a-534ab061a6b0",
                    "text": "Play music",
                    "type": "istar.Task",
                    "x": 836,
                    "y": 690,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "5af70b15-c536-435e-ad47-1f4aa592dabe",
                    "text": "Customize playlist according to preferences",
                    "type": "istar.Task",
                    "x": 951,
                    "y": 692,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "12ee7e98-5582-493e-bfe5-21996c0659c2",
                    "text": "Direct sound only to occupied rooms",
                    "type": "istar.Task",
                    "x": 1045,
                    "y": 730,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "e929c189-5dd3-4cb3-8be9-c7a1df556170",
                    "text": "Select songs manually",
                    "type": "istar.Task",
                    "x": 911,
                    "y": 800,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "7968c298-1328-4786-b6b2-0a53e38b884f",
                    "text": "Select songs by preferences",
                    "type": "istar.Task",
                    "x": 1038,
                    "y": 797,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "e1ca06c4-f816-4ba4-9b97-fd9b36a54511",
                    "text": "Fast response",
                    "type": "istar.Task",
                    "x": 1090,
                    "y": 671,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "14d4cc03-526b-4506-aefc-c8cc26b49869",
                    "text": "Invite friend",
                    "type": "istar.Task",
                    "x": 1193,
                    "y": 677,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "7a6b97ae-1ad6-4dcc-bff0-173f06ba3db6",
                    "text": "Manage tenant nutrition",
                    "type": "istar.Task",
                    "x": 618,
                    "y": 737,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "ee2ea7fc-93ad-40bc-b11a-b7b87c00e315",
                    "text": "Tenant is well nourished",
                    "type": "istar.Goal",
                    "x": 725,
                    "y": 677,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "f504dbd8-3abe-4543-bb7d-7fcbc7e42c23",
                    "text": "Provide meals",
                    "type": "istar.Goal",
                    "x": 484,
                    "y": 779,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "9a938a9a-d944-48f2-b9a1-d8fc967b1d2a",
                    "text": "Save money",
                    "type": "istar.Quality",
                    "x": 375,
                    "y": 676.5,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "733e013c-e3d5-48f9-b1bb-47f3ba22e850",
                    "text": "Assist the tenant in cooking the meal",
                    "type": "istar.Task",
                    "x": 392,
                    "y": 849,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "5d6d705c-5a25-40fb-922e-6db0e1cc78a4",
                    "text": "Provide recipe",
                    "type": "istar.Task",
                    "x": 365,
                    "y": 960,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "12e93ae7-6ad0-43ed-ac4d-b24266d95cdc",
                    "text": "Request restaurant meal",
                    "type": "istar.Task",
                    "x": 546,
                    "y": 883,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "425f8bb2-519c-4839-8825-85bc3c8645ab",
                    "text": "Suggest daily menu",
                    "type": "istar.Task",
                    "x": 575,
                    "y": 834,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "d5631cc0-865a-4a18-b211-999a9a39037d",
                    "text": "Keep track of consumed food",
                    "type": "istar.Task",
                    "x": 759,
                    "y": 845,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "63c8611d-a4a5-4a2f-a9e2-44d26375cc5f",
                    "text": "Monitor food consumption",
                    "type": "istar.Task",
                    "x": 809,
                    "y": 940,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "fbe79b38-b7ab-4980-897d-d84a67f7350a",
                    "text": "Keep track of consumed medicines",
                    "type": "istar.Task",
                    "x": 872,
                    "y": 856,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "a35d270d-7972-472d-8e26-14a31ba0f74b",
                    "text": "Monitor medicine consumption",
                    "type": "istar.Task",
                    "x": 983,
                    "y": 993,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "1bf4a5a9-e155-427f-8bf2-cf0111dc01bd",
                    "text": "Customization",
                    "type": "istar.Quality",
                    "x": 329,
                    "y": 1063,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "9fece159-1b77-4895-b926-05c4bd762fa2",
                    "text": "Manage food stock supply",
                    "type": "istar.Goal",
                    "x": 602,
                    "y": 936,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "38bf3ed6-d963-4409-8c0b-53b631332c56",
                    "text": "Buy food when required",
                    "type": "istar.Task",
                    "x": 537,
                    "y": 1009,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "c03e227b-b6e2-4a38-a3a2-aaf458d0262b",
                    "text": "Order food",
                    "type": "istar.Task",
                    "x": 585,
                    "y": 1091,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "62e762e3-6560-4860-89fa-66bc6f5e8ad1",
                    "text": "Get food stock status",
                    "type": "istar.Task",
                    "x": 441,
                    "y": 1079,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "1623c785-fe22-4c96-8988-c9eae3b614f9",
                    "text": "Notify tenants",
                    "type": "istar.Task",
                    "x": 482,
                    "y": 430,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "2ce237c5-9027-4ff4-8744-c28ca73f34f2",
                    "text": "Notify fire department",
                    "type": "istar.Task",
                    "x": 743,
                    "y": 459,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "dbb5b65d-49fe-40ef-b241-7d3091f11083",
                    "text": "Make a log of food consumption",
                    "type": "istar.Task",
                    "x": 701,
                    "y": 931,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "81b16c06-1d05-47c3-9412-826ac1915a32",
                    "text": "Make a log of medicine consumption",
                    "type": "istar.Task",
                    "x": 854.5,
                    "y": 993,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "d04a2c15-d39b-4879-963e-a809cb7f64e2",
                    "text": "Get enviroment data",
                    "type": "istar.Task",
                    "x": 1164,
                    "y": 272,
                    "customProperties": {
                        "Description": ""
                    }
                }
            ]
        },
        {
            "id": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5",
            "text": "Data storage",
            "type": "istar.Actor",
            "x": 755,
            "y": 1296,
            "customProperties": {
                "Description": ""
            },
            "nodes": []
        },
        {
            "id": "ee9cf1ad-3095-4338-96ad-96547a46e2c1",
            "text": "Communication",
            "type": "istar.Actor",
            "x": 1599,
            "y": 839,
            "customProperties": {
                "Description": ""
            },
            "nodes": []
        },
        {
            "id": "611e34df-7de1-4101-ab76-5b53594cba35",
            "text": "Preference manager",
            "type": "istar.Actor",
            "x": 334,
            "y": 1349,
            "customProperties": {
                "Description": ""
            },
            "nodes": []
        },
        {
            "id": "9d10bc4a-0d76-495d-bb81-3d1af8275ba9",
            "text": "Monitor",
            "type": "istar.Actor",
            "x": 1495,
            "y": 222,
            "customProperties": {
                "Description": ""
            },
            "nodes": []
        },
        {
            "id": "9b3379a4-5245-41e9-87cd-7752297a8ce9",
            "text": "Actuator",
            "type": "istar.Actor",
            "x": 60,
            "y": 533,
            "customProperties": {
                "Description": ""
            },
            "nodes": []
        }
    ],
    "orphans": [],
    "dependencies": [
        {
            "id": "d59528d3-48ca-41c9-91bd-153223b4c543",
            "text": "Send fire notification to fire department",
            "type": "istar.Task",
            "x": 1358,
            "y": 892,
            "customProperties": {
                "Description": ""
            },
            "source": "1623c785-fe22-4c96-8988-c9eae3b614f9",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "35136956-b6f6-4876-b10c-513298f53c41",
            "text": "Send fire notification to tenants",
            "type": "istar.Task",
            "x": 1409,
            "y": 681,
            "customProperties": {
                "Description": ""
            },
            "source": "2ce237c5-9027-4ff4-8744-c28ca73f34f2",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "9f4992db-9cdd-43d5-bb43-ed6b3b6a7bb1",
            "text": "Food stock status",
            "type": "istar.Resource",
            "x": 514,
            "y": 1231,
            "customProperties": {
                "Description": ""
            },
            "source": "62e762e3-6560-4860-89fa-66bc6f5e8ad1",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "4067be93-567f-44b6-b95b-a250ba4a6412",
            "text": "Store food consumption data",
            "type": "istar.Task",
            "x": 646,
            "y": 1181,
            "customProperties": {
                "Description": ""
            },
            "source": "dbb5b65d-49fe-40ef-b241-7d3091f11083",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "05017065-0a5a-4a0a-9a38-30a7b1561a73",
            "text": "Request restaurant meal",
            "type": "istar.Task",
            "x": 1372,
            "y": 984,
            "customProperties": {
                "Description": "",
                "Context": "There is an Internet connection available and active at the smart home"
            },
            "source": "12e93ae7-6ad0-43ed-ac4d-b24266d95cdc",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "317873f2-af07-4ba2-a3c3-80570d62ec80",
            "text": "Store medicine consumption data",
            "type": "istar.Task",
            "x": 784,
            "y": 1166,
            "customProperties": {
                "Description": ""
            },
            "source": "81b16c06-1d05-47c3-9412-826ac1915a32",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "30fa866c-3264-4986-a0b3-842a2a04edbc",
            "text": "Preferences",
            "type": "istar.Resource",
            "x": 520,
            "y": 1330,
            "customProperties": {
                "Description": ""
            },
            "source": "611e34df-7de1-4101-ab76-5b53594cba35",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "c4120857-f974-419f-9494-28a05eab42d3",
            "text": "Customization",
            "type": "istar.Quality",
            "x": 333,
            "y": 1213,
            "customProperties": {
                "Description": ""
            },
            "source": "1bf4a5a9-e155-427f-8bf2-cf0111dc01bd",
            "target": "611e34df-7de1-4101-ab76-5b53594cba35"
        },
        {
            "id": "b6b637bf-9f7e-445e-baed-368754d8a00d",
            "text": "Fast response",
            "type": "istar.Quality",
            "x": 1383,
            "y": 819,
            "customProperties": {
                "Description": ""
            },
            "source": "e1ca06c4-f816-4ba4-9b97-fd9b36a54511",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "d5db3cc9-b107-40a4-baba-f67cd25aeaa0",
            "text": "Get musical preferences",
            "type": "istar.Task",
            "x": 851,
            "y": 1396,
            "customProperties": {
                "Description": ""
            },
            "source": "7968c298-1328-4786-b6b2-0a53e38b884f",
            "target": "611e34df-7de1-4101-ab76-5b53594cba35"
        },
        {
            "id": "afb6097a-7ea6-49b0-af1a-0f890c1033c6",
            "text": "Invite friend",
            "type": "istar.Task",
            "x": 1392,
            "y": 759,
            "customProperties": {
                "Description": ""
            },
            "source": "14d4cc03-526b-4506-aefc-c8cc26b49869",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "def7f0ee-cfd6-4e95-91d5-b3b5fbcdb033",
            "text": "Enviroment monitored",
            "type": "istar.Goal",
            "x": 1333,
            "y": 174,
            "customProperties": {
                "Description": ""
            },
            "source": "d04a2c15-d39b-4879-963e-a809cb7f64e2",
            "target": "9d10bc4a-0d76-495d-bb81-3d1af8275ba9"
        },
        {
            "id": "48f01a3e-a778-4fb9-84a9-4f3ced0ff4f7",
            "text": "Play music",
            "type": "istar.Task",
            "x": 195,
            "y": 1000,
            "customProperties": {
                "Description": ""
            },
            "source": "494a5feb-2f56-4434-832a-534ab061a6b0",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "aae21d1f-fca0-4234-ba11-2a0609b1605a",
            "text": "Turn on light",
            "type": "istar.Task",
            "x": 215,
            "y": 425,
            "customProperties": {
                "Description": ""
            },
            "source": "e3beae74-b939-47d8-89fb-2ed6d446a2e8",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "4625d40a-0454-41e5-9f33-b242fe8977c3",
            "text": "Turn off light",
            "type": "istar.Task",
            "x": 216,
            "y": 477,
            "customProperties": {
                "Description": ""
            },
            "source": "e1943868-5e88-41f4-9368-f10e48a360ca",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "4855d6bc-2d36-4fb7-adaa-81dc2e102496",
            "text": "Direct sound only to occupied rooms",
            "type": "istar.Task",
            "x": 163,
            "y": 1053,
            "customProperties": {
                "Description": ""
            },
            "source": "12ee7e98-5582-493e-bfe5-21996c0659c2",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "f60e5e87-4055-4fca-874b-0771bd505725",
            "text": "Turn on heating device",
            "type": "istar.Task",
            "x": 205,
            "y": 214,
            "customProperties": {
                "Description": ""
            },
            "source": "623862d4-6b91-4278-83bf-342e66ef3bda",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "41771f3f-4edd-48d0-9fd1-7d4b92e2f49e",
            "text": "Turn off heating device",
            "type": "istar.Task",
            "x": 213,
            "y": 268,
            "customProperties": {
                "Description": ""
            },
            "source": "9d534e15-95a0-44ea-a1b4-8bab3b1fd6c4",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "47134848-0da5-451a-b4e6-72e8dda02f92",
            "text": "Turn on fan",
            "type": "istar.Task",
            "x": 197,
            "y": 102,
            "customProperties": {
                "Description": ""
            },
            "source": "5e0579a1-57d6-4de1-ad56-0d7810a5b52d",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "950e2c06-d4c7-48b6-a319-203a715ac444",
            "text": "Turn off fan",
            "type": "istar.Task",
            "x": 203,
            "y": 161,
            "customProperties": {
                "Description": ""
            },
            "source": "9ddc02f7-59a9-4565-9721-6e60dc66f10c",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "e6878da8-adf3-4aee-a145-0da2ed9132ab",
            "text": "Open gas valves",
            "type": "istar.Task",
            "x": 212,
            "y": 529,
            "customProperties": {
                "Description": ""
            },
            "source": "62659e86-92a5-4d32-842a-8a44a4646c6d",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "23ba2393-a82e-46f8-ba89-6b7e6a788779",
            "text": "Close gas valves",
            "type": "istar.Task",
            "x": 214,
            "y": 576,
            "customProperties": {
                "Description": ""
            },
            "source": "b9db7012-9e2d-4e85-8beb-ad3e93dc312a",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "15be861c-4a5d-4d7a-8fda-6e088199d2e9",
            "text": "Open window",
            "type": "istar.Task",
            "x": 214,
            "y": 323,
            "customProperties": {
                "Description": ""
            },
            "source": "bab3e64d-95c4-4e60-b105-8fa38aad0093",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "3f6b99c6-52d4-4232-b4bb-3f494c428a38",
            "text": "Close window",
            "type": "istar.Task",
            "x": 215,
            "y": 373,
            "customProperties": {
                "Description": ""
            },
            "source": "b2e93b23-d7f1-48f2-be68-dafef2f9bade",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "50e1bd14-cc99-48c9-97a5-a7ffd89a2021",
            "text": "Deactivate power outlet",
            "type": "istar.Task",
            "x": 209,
            "y": 803,
            "customProperties": {
                "Description": ""
            },
            "source": "ca7c6b8c-e155-4c8f-a8d0-ce86cc1c1a02",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "f640d638-ffcf-4bb1-ae26-13a0a1ce6d68",
            "text": "Activate power outlet",
            "type": "istar.Task",
            "x": 208,
            "y": 743,
            "customProperties": {
                "Description": ""
            },
            "source": "47a0c4b6-9844-4ff3-8ba7-8db7923805bd",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "016d8920-9fe1-4f69-b55f-b4b357b0b0e6",
            "text": "Lock doors",
            "type": "istar.Task",
            "x": 210,
            "y": 868,
            "customProperties": {
                "Description": ""
            },
            "source": "2946613f-b8aa-4d2d-afe0-e1a5ee8bea9d",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "026c2b9d-d549-4abf-9eb4-acbee09cccbd",
            "text": "Unlock doors",
            "type": "istar.Task",
            "x": 202,
            "y": 938,
            "customProperties": {
                "Description": ""
            },
            "source": "d8c3d54b-d979-4872-a435-847c5fc11d89",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "e2b8dda0-20dc-4ad0-81c9-de5889b19757",
            "text": "Activate alarm",
            "type": "istar.Task",
            "x": 213,
            "y": 626,
            "customProperties": {
                "Description": ""
            },
            "source": "c0384b04-9745-43a7-ad96-17cc6a83f613",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "6850d13e-f6a1-4481-9494-d870a297c57e",
            "text": "Deactivate alarm",
            "type": "istar.Task",
            "x": 212,
            "y": 688,
            "customProperties": {
                "Description": ""
            },
            "source": "6a12bc40-749d-49a3-a70d-84bccca84167",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        }
    ],
    "links": [
        {
            "id": "cc4b92e0-a8ba-4d1b-8d34-32a1fdd1c0a7",
            "type": "istar.DependencyLink",
            "source": "1623c785-fe22-4c96-8988-c9eae3b614f9",
            "target": "d59528d3-48ca-41c9-91bd-153223b4c543"
        },
        {
            "id": "d117bd86-bf88-4b0c-bcb0-8539f1af4f47",
            "type": "istar.DependencyLink",
            "source": "d59528d3-48ca-41c9-91bd-153223b4c543",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "e2eed05e-89d5-44a2-ad2d-785cfe81b2bf",
            "type": "istar.DependencyLink",
            "source": "2ce237c5-9027-4ff4-8744-c28ca73f34f2",
            "target": "35136956-b6f6-4876-b10c-513298f53c41"
        },
        {
            "id": "123fd7f2-9279-4698-be17-02f3605d4c18",
            "type": "istar.DependencyLink",
            "source": "35136956-b6f6-4876-b10c-513298f53c41",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "6d6e19c6-f4ab-4039-beef-2b26947d2880",
            "type": "istar.DependencyLink",
            "source": "62e762e3-6560-4860-89fa-66bc6f5e8ad1",
            "target": "9f4992db-9cdd-43d5-bb43-ed6b3b6a7bb1"
        },
        {
            "id": "6346b6c1-5555-49c8-a8be-2c4e2308cc53",
            "type": "istar.DependencyLink",
            "source": "9f4992db-9cdd-43d5-bb43-ed6b3b6a7bb1",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "af8bde76-5f7c-4531-b614-aa4cf8c1ec95",
            "type": "istar.DependencyLink",
            "source": "dbb5b65d-49fe-40ef-b241-7d3091f11083",
            "target": "4067be93-567f-44b6-b95b-a250ba4a6412"
        },
        {
            "id": "3efab726-5dd1-43e2-b207-724a880138f7",
            "type": "istar.DependencyLink",
            "source": "4067be93-567f-44b6-b95b-a250ba4a6412",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "33b48d39-32e9-4bd0-9dd2-7adcb81a9f94",
            "type": "istar.DependencyLink",
            "source": "12e93ae7-6ad0-43ed-ac4d-b24266d95cdc",
            "target": "05017065-0a5a-4a0a-9a38-30a7b1561a73"
        },
        {
            "id": "d942f9f3-b8ef-4a6a-a770-1beef6d0c726",
            "type": "istar.DependencyLink",
            "source": "05017065-0a5a-4a0a-9a38-30a7b1561a73",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "860f3aa1-5f4a-4f95-90a6-797bd6fcb1bf",
            "type": "istar.DependencyLink",
            "source": "81b16c06-1d05-47c3-9412-826ac1915a32",
            "target": "317873f2-af07-4ba2-a3c3-80570d62ec80"
        },
        {
            "id": "592e857a-1bea-4027-adec-38f0bb83f9c6",
            "type": "istar.DependencyLink",
            "source": "317873f2-af07-4ba2-a3c3-80570d62ec80",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "00ebb131-516a-494c-8c25-62acec91f01f",
            "type": "istar.DependencyLink",
            "source": "611e34df-7de1-4101-ab76-5b53594cba35",
            "target": "30fa866c-3264-4986-a0b3-842a2a04edbc"
        },
        {
            "id": "b8eeb88a-e4c9-464e-9fc5-da02a08dfd40",
            "type": "istar.DependencyLink",
            "source": "30fa866c-3264-4986-a0b3-842a2a04edbc",
            "target": "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5"
        },
        {
            "id": "4af7408f-4255-4a5a-8ff3-23fe1bac342a",
            "type": "istar.DependencyLink",
            "source": "1bf4a5a9-e155-427f-8bf2-cf0111dc01bd",
            "target": "c4120857-f974-419f-9494-28a05eab42d3"
        },
        {
            "id": "19fb8d79-9078-4e97-a6c3-3bcdd971e30d",
            "type": "istar.DependencyLink",
            "source": "c4120857-f974-419f-9494-28a05eab42d3",
            "target": "611e34df-7de1-4101-ab76-5b53594cba35"
        },
        {
            "id": "4732399d-1af1-4c6e-8e91-76b794ae1a2a",
            "type": "istar.DependencyLink",
            "source": "e1ca06c4-f816-4ba4-9b97-fd9b36a54511",
            "target": "b6b637bf-9f7e-445e-baed-368754d8a00d"
        },
        {
            "id": "b06732d9-5f15-476c-a9f0-e1e8b03bdeb6",
            "type": "istar.DependencyLink",
            "source": "b6b637bf-9f7e-445e-baed-368754d8a00d",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "ca2dbe17-8353-434b-9e55-c882e9274508",
            "type": "istar.DependencyLink",
            "source": "7968c298-1328-4786-b6b2-0a53e38b884f",
            "target": "d5db3cc9-b107-40a4-baba-f67cd25aeaa0"
        },
        {
            "id": "54db9812-ffaa-49b5-b47f-60d91c38d2c1",
            "type": "istar.DependencyLink",
            "source": "d5db3cc9-b107-40a4-baba-f67cd25aeaa0",
            "target": "611e34df-7de1-4101-ab76-5b53594cba35"
        },
        {
            "id": "cf798988-7116-40fa-833d-0a54ce55cc2e",
            "type": "istar.DependencyLink",
            "source": "14d4cc03-526b-4506-aefc-c8cc26b49869",
            "target": "afb6097a-7ea6-49b0-af1a-0f890c1033c6"
        },
        {
            "id": "15aa74f7-cbe2-447e-9723-6f2d76709082",
            "type": "istar.DependencyLink",
            "source": "afb6097a-7ea6-49b0-af1a-0f890c1033c6",
            "target": "ee9cf1ad-3095-4338-96ad-96547a46e2c1"
        },
        {
            "id": "9274baa9-1c30-49a8-af07-91928c3e828b",
            "type": "istar.OrRefinementLink",
            "source": "490feaca-a7f4-470f-a2db-d5c8073f5f56",
            "target": "0f052835-9f3f-491a-a3f0-c70d2001fca5"
        },
        {
            "id": "7897cc02-8f54-45c7-be2f-b98b4bda6953",
            "type": "istar.OrRefinementLink",
            "source": "3eb43835-be08-42fb-9158-0e1c45d66bbb",
            "target": "0f052835-9f3f-491a-a3f0-c70d2001fca5"
        },
        {
            "id": "ed6ebe94-e22f-422d-8409-55c9965850fc",
            "type": "istar.OrRefinementLink",
            "source": "e54e1fd2-9c11-4097-b296-35dd65763bda",
            "target": "0f052835-9f3f-491a-a3f0-c70d2001fca5"
        },
        {
            "id": "b0a8fbb6-8815-40f3-8da9-647a31a23a93",
            "type": "istar.ContributionLink",
            "source": "834513e9-a5d2-43fa-ae24-3c57f645064a",
            "target": "3b1813ea-e6b1-40ec-a11d-49cda0c82324",
            "label": "help"
        },
        {
            "id": "c9bc5f32-4622-432e-99fe-57ba1dea5a46",
            "type": "istar.ContributionLink",
            "source": "4692dc12-801f-4174-9afa-8e710f4d722f",
            "target": "834513e9-a5d2-43fa-ae24-3c57f645064a",
            "label": "help"
        },
        {
            "id": "79efe291-8d98-4be8-a516-2d900137a7a3",
            "type": "istar.ContributionLink",
            "source": "e8239026-4607-4acc-a4ed-a771d72fbcbc",
            "target": "834513e9-a5d2-43fa-ae24-3c57f645064a",
            "label": "help"
        },
        {
            "id": "687ae564-ff73-4d20-9bd2-6b21ff78187a",
            "type": "istar.AndRefinementLink",
            "source": "bab3e64d-95c4-4e60-b105-8fa38aad0093",
            "target": "490feaca-a7f4-470f-a2db-d5c8073f5f56",
            "customProperties": {
                "Context": "The temperature at the room is hotter than what would be pleasant for the people within it, the temperature outside is colder than the\ntemperature inside the smart home and, the windows are closed"
            }
        },
        {
            "id": "947a17b5-5ac6-4018-9904-0caa88ba1b3b",
            "type": "istar.AndRefinementLink",
            "source": "b2e93b23-d7f1-48f2-be68-dafef2f9bade",
            "target": "490feaca-a7f4-470f-a2db-d5c8073f5f56",
            "customProperties": {
                "Context": "The temperature at the room is colder than what would be pleasant for the people within it, the temperature outside is colder than the\ntemperature inside the smart home, the smart home is not on fire, and the windows are open"
            }
        },
        {
            "id": "7143e055-0a20-4a5d-b909-1161f9b17a89",
            "type": "istar.AndRefinementLink",
            "source": "5e0579a1-57d6-4de1-ad56-0d7810a5b52d",
            "target": "3eb43835-be08-42fb-9158-0e1c45d66bbb",
            "customProperties": {
                "Context": "The temperature at the room is hotter than what would be pleasant for the people within it and the air ventilator is off"
            }
        },
        {
            "id": "f1d665e3-9360-4662-aa65-b05641d4d8c4",
            "type": "istar.AndRefinementLink",
            "source": "9ddc02f7-59a9-4565-9721-6e60dc66f10c",
            "target": "3eb43835-be08-42fb-9158-0e1c45d66bbb",
            "customProperties": {
                "Context": "The temperature at the room is colder than what would be pleasant for the people within it and the air ventilator is on"
            }
        },
        {
            "id": "d72cf112-22ca-4918-9c7a-0ac7a558b18e",
            "type": "istar.AndRefinementLink",
            "source": "623862d4-6b91-4278-83bf-342e66ef3bda",
            "target": "e54e1fd2-9c11-4097-b296-35dd65763bda",
            "customProperties": {
                "Context": "The temperature at the room is colder than what would be pleasant for the people within it and the heating device is off"
            }
        },
        {
            "id": "161d5ffb-22d5-47a2-aa22-e56e93c7c8bf",
            "type": "istar.AndRefinementLink",
            "source": "9d534e15-95a0-44ea-a1b4-8bab3b1fd6c4",
            "target": "e54e1fd2-9c11-4097-b296-35dd65763bda",
            "customProperties": {
                "Context": "The temperature at the room is hotter than what would be pleasant for the people within it and the heating device is on"
            }
        },
        {
            "id": "e72a1002-9f28-4644-82e8-e075302950c5",
            "type": "istar.OrRefinementLink",
            "source": "add6b9fe-6314-4eab-bb22-61d5717c54ce",
            "target": "65524a26-5718-499e-a023-14066a7725d9"
        },
        {
            "id": "eb451ccf-c5e2-4f70-afa9-84ca8cc18c63",
            "type": "istar.AndRefinementLink",
            "source": "0d89c849-6ee1-4b96-9102-103edf016542",
            "target": "add6b9fe-6314-4eab-bb22-61d5717c54ce"
        },
        {
            "id": "9661a69f-2f2d-4d77-aca0-bf62bf820adc",
            "type": "istar.AndRefinementLink",
            "source": "83005b8f-bfe4-4378-995b-78407139c97f",
            "target": "add6b9fe-6314-4eab-bb22-61d5717c54ce"
        },
        {
            "id": "c86b47c0-9abe-40c1-b109-f40ebe8640e2",
            "type": "istar.AndRefinementLink",
            "source": "ee6f36f2-01db-485d-a304-20f41f90d33b",
            "target": "0d89c849-6ee1-4b96-9102-103edf016542"
        },
        {
            "id": "2b46e6b7-aeb8-4229-a959-7a5621725fe7",
            "type": "istar.AndRefinementLink",
            "source": "93365266-ac6f-48ba-9c2d-c1f110ebb5dc",
            "target": "0d89c849-6ee1-4b96-9102-103edf016542"
        },
        {
            "id": "3966f745-f3a3-4d51-b9fa-1b1052d33d7a",
            "type": "istar.AndRefinementLink",
            "source": "e3beae74-b939-47d8-89fb-2ed6d446a2e8",
            "target": "83005b8f-bfe4-4378-995b-78407139c97f",
            "customProperties": {
                "Context": "There is someone at the room or close to it, the room is dark, and the light is off"
            }
        },
        {
            "id": "55078b46-ebc7-48fb-a125-a8839eb784a5",
            "type": "istar.AndRefinementLink",
            "source": "e1943868-5e88-41f4-9368-f10e48a360ca",
            "target": "83005b8f-bfe4-4378-995b-78407139c97f",
            "customProperties": {
                "Context": "There is no one at the room or close to it, and the light is on"
            }
        },
        {
            "id": "40ba72f5-5de0-4c8b-8f34-f3bb63a57d39",
            "type": "istar.AndRefinementLink",
            "source": "62659e86-92a5-4d32-842a-8a44a4646c6d",
            "target": "0e54535c-be18-4ee6-a347-40f0261a6b50",
            "customProperties": {
                "Context": "There is someone at the smart home, there is no gas leaks, the smart home is not on fire, and the gas valves are closed"
            }
        },
        {
            "id": "03b82967-9161-4801-8ba2-d6336ecf62f6",
            "type": "istar.AndRefinementLink",
            "source": "b9db7012-9e2d-4e85-8beb-ad3e93dc312a",
            "target": "0e54535c-be18-4ee6-a347-40f0261a6b50",
            "customProperties": {
                "Context": "The gas valves are open"
            }
        },
        {
            "id": "29f40daf-d232-45d2-9922-ab6135cf4c8e",
            "type": "istar.AndRefinementLink",
            "source": "2946613f-b8aa-4d2d-afe0-e1a5ee8bea9d",
            "target": "632c6d4f-632d-4d45-b4a2-5764744184ef",
            "customProperties": {
                "Context": "The smart home is not on fire and the door is unlocked"
            }
        },
        {
            "id": "956323e1-cae7-4566-9671-25cc8d2495e6",
            "type": "istar.AndRefinementLink",
            "source": "d8c3d54b-d979-4872-a435-847c5fc11d89",
            "target": "632c6d4f-632d-4d45-b4a2-5764744184ef",
            "customProperties": {
                "Context": "The door is locked"
            }
        },
        {
            "id": "fd2ba13b-e299-4456-b569-eaaf3b6f4130",
            "type": "istar.AndRefinementLink",
            "source": "b9db7012-9e2d-4e85-8beb-ad3e93dc312a",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "99185b04-4c14-486b-ae71-4bdd87bec92f",
            "type": "istar.AndRefinementLink",
            "source": "d8c3d54b-d979-4872-a435-847c5fc11d89",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "e458390e-d1e9-424c-8e5d-93788f2a8fb0",
            "type": "istar.AndRefinementLink",
            "source": "bab3e64d-95c4-4e60-b105-8fa38aad0093",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "f48e6494-07d8-4395-9c96-d93440659763",
            "type": "istar.ContributionLink",
            "source": "39e3358a-79c9-4a82-93c9-bc77d26c6610",
            "target": "36f19256-e85f-48c8-a2b1-6b5c68760f93",
            "label": "help"
        },
        {
            "id": "e08d1651-6644-4e23-be20-359368e0d981",
            "type": "istar.ContributionLink",
            "source": "ee6f36f2-01db-485d-a304-20f41f90d33b",
            "target": "36f19256-e85f-48c8-a2b1-6b5c68760f93",
            "customProperties": {
                "Context": "There is no one at the smart home"
            },
            "label": "help"
        },
        {
            "id": "1a848f7b-09f5-46d1-b8fe-4669d1023837",
            "type": "istar.AndRefinementLink",
            "source": "ca7c6b8c-e155-4c8f-a8d0-ce86cc1c1a02",
            "target": "9452a1a3-07dc-49a1-9534-3883aea9d55f",
            "customProperties": {
                "Context": "The power outlet is on and there is no vital equipment attached to it"
            }
        },
        {
            "id": "4c7e1bfa-646f-420c-a21d-80f3464f2c80",
            "type": "istar.AndRefinementLink",
            "source": "47a0c4b6-9844-4ff3-8ba7-8db7923805bd",
            "target": "9452a1a3-07dc-49a1-9534-3883aea9d55f",
            "customProperties": {
                "Context": "The power outlet is off, the smart home is not on fire, and there is no gas leak detected"
            }
        },
        {
            "id": "de5fa6d3-27b5-4352-9d3f-1b0fb77f0e90",
            "type": "istar.AndRefinementLink",
            "source": "ca7c6b8c-e155-4c8f-a8d0-ce86cc1c1a02",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "afb79f27-e868-4869-85c9-536534a64952",
            "type": "istar.AndRefinementLink",
            "source": "c0384b04-9745-43a7-ad96-17cc6a83f613",
            "target": "336c8a20-26f7-4dc5-a20f-8b5925c7f439",
            "customProperties": {
                "Context": "The alarm is off"
            }
        },
        {
            "id": "db764ee9-7569-4469-9922-a50d788986f2",
            "type": "istar.AndRefinementLink",
            "source": "6a12bc40-749d-49a3-a70d-84bccca84167",
            "target": "336c8a20-26f7-4dc5-a20f-8b5925c7f439",
            "customProperties": {
                "Context": "The alarm is on"
            }
        },
        {
            "id": "5c3cf396-365c-42f8-9bda-6afe7b1b5e9e",
            "type": "istar.AndRefinementLink",
            "source": "c0384b04-9745-43a7-ad96-17cc6a83f613",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "da71f16e-e8f0-438f-9f50-23f9d169ffd5",
            "type": "istar.AndRefinementLink",
            "source": "494a5feb-2f56-4434-832a-534ab061a6b0",
            "target": "6824c565-ae86-4cf9-ba0a-c6922f343028"
        },
        {
            "id": "c865a91f-6c5f-4c5d-8fa8-c86a63e1cc56",
            "type": "istar.AndRefinementLink",
            "source": "5af70b15-c536-435e-ad47-1f4aa592dabe",
            "target": "6824c565-ae86-4cf9-ba0a-c6922f343028"
        },
        {
            "id": "a6532228-441c-4c24-8af3-94f33a595b0f",
            "type": "istar.AndRefinementLink",
            "source": "12ee7e98-5582-493e-bfe5-21996c0659c2",
            "target": "6824c565-ae86-4cf9-ba0a-c6922f343028"
        },
        {
            "id": "a8352cf5-f186-475a-aec5-21a8013289e6",
            "type": "istar.AndRefinementLink",
            "source": "e929c189-5dd3-4cb3-8be9-c7a1df556170",
            "target": "5af70b15-c536-435e-ad47-1f4aa592dabe"
        },
        {
            "id": "fe18c50b-876f-422b-b785-9c57d9106235",
            "type": "istar.AndRefinementLink",
            "source": "7968c298-1328-4786-b6b2-0a53e38b884f",
            "target": "5af70b15-c536-435e-ad47-1f4aa592dabe"
        },
        {
            "id": "fc025033-d989-4892-a566-676334dde5d3",
            "type": "istar.ContributionLink",
            "source": "6824c565-ae86-4cf9-ba0a-c6922f343028",
            "target": "9126a353-2812-47fe-bfa4-c7b1c3672952",
            "label": "help"
        },
        {
            "id": "648cb80c-78b8-4a31-bbae-2a0cab3e8785",
            "type": "istar.ContributionLink",
            "source": "755356b4-962f-4dcf-8e36-1a4d2816c391",
            "target": "9126a353-2812-47fe-bfa4-c7b1c3672952",
            "label": "help"
        },
        {
            "id": "2cc35b61-8fb6-41a6-810b-3fe9e1fbb6c1",
            "type": "istar.AndRefinementLink",
            "source": "e1ca06c4-f816-4ba4-9b97-fd9b36a54511",
            "target": "755356b4-962f-4dcf-8e36-1a4d2816c391"
        },
        {
            "id": "22e70d65-a0de-4592-b3a9-6ad4c3dc85ad",
            "type": "istar.AndRefinementLink",
            "source": "14d4cc03-526b-4506-aefc-c8cc26b49869",
            "target": "755356b4-962f-4dcf-8e36-1a4d2816c391"
        },
        {
            "id": "cfddc451-7a9e-42e9-bed0-48f911b517a2",
            "type": "istar.OrRefinementLink",
            "source": "7a6b97ae-1ad6-4dcc-bff0-173f06ba3db6",
            "target": "ee2ea7fc-93ad-40bc-b11a-b7b87c00e315"
        },
        {
            "id": "2b4d5c44-3fd2-427e-825e-023d7defc876",
            "type": "istar.AndRefinementLink",
            "source": "f504dbd8-3abe-4543-bb7d-7fcbc7e42c23",
            "target": "7a6b97ae-1ad6-4dcc-bff0-173f06ba3db6",
            "customProperties": {
                "Context": "The tenant is going to eat at the smart home"
            }
        },
        {
            "id": "0ed0346c-7f19-4d47-b5c7-2737c9330fd3",
            "type": "istar.OrRefinementLink",
            "source": "733e013c-e3d5-48f9-b1bb-47f3ba22e850",
            "target": "f504dbd8-3abe-4543-bb7d-7fcbc7e42c23",
            "customProperties": {
                "Context": "The food in the house’s stock is enough to cook the meal"
            }
        },
        {
            "id": "1bcac623-2db0-4218-994d-f9f4c094cac8",
            "type": "istar.AndRefinementLink",
            "source": "5d6d705c-5a25-40fb-922e-6db0e1cc78a4",
            "target": "733e013c-e3d5-48f9-b1bb-47f3ba22e850"
        },
        {
            "id": "ac2af33e-2700-4d11-9f4f-cad2f67f4799",
            "type": "istar.OrRefinementLink",
            "source": "12e93ae7-6ad0-43ed-ac4d-b24266d95cdc",
            "target": "f504dbd8-3abe-4543-bb7d-7fcbc7e42c23"
        },
        {
            "id": "53647c46-c012-4411-a8e1-a6343eae78b9",
            "type": "istar.AndRefinementLink",
            "source": "425f8bb2-519c-4839-8825-85bc3c8645ab",
            "target": "7a6b97ae-1ad6-4dcc-bff0-173f06ba3db6"
        },
        {
            "id": "18156056-2153-4499-bf7e-ed48f800d9c6",
            "type": "istar.AndRefinementLink",
            "source": "d5631cc0-865a-4a18-b211-999a9a39037d",
            "target": "7a6b97ae-1ad6-4dcc-bff0-173f06ba3db6"
        },
        {
            "id": "82b075d0-515f-4e16-ba72-fb02a00f3898",
            "type": "istar.AndRefinementLink",
            "source": "63c8611d-a4a5-4a2f-a9e2-44d26375cc5f",
            "target": "d5631cc0-865a-4a18-b211-999a9a39037d"
        },
        {
            "id": "d20394b0-2d7b-47ee-979e-bb5fb9551758",
            "type": "istar.AndRefinementLink",
            "source": "fbe79b38-b7ab-4980-897d-d84a67f7350a",
            "target": "7a6b97ae-1ad6-4dcc-bff0-173f06ba3db6"
        },
        {
            "id": "ab774dc7-1287-4c92-bd12-ab6cc541a5e2",
            "type": "istar.AndRefinementLink",
            "source": "a35d270d-7972-472d-8e26-14a31ba0f74b",
            "target": "fbe79b38-b7ab-4980-897d-d84a67f7350a"
        },
        {
            "id": "62298eb2-dab9-4b19-a7e6-faf8a0465871",
            "type": "istar.OrRefinementLink",
            "source": "38bf3ed6-d963-4409-8c0b-53b631332c56",
            "target": "9fece159-1b77-4895-b926-05c4bd762fa2"
        },
        {
            "id": "96619974-e038-4dbc-be22-7a997bd840cc",
            "type": "istar.AndRefinementLink",
            "source": "c03e227b-b6e2-4a38-a3a2-aaf458d0262b",
            "target": "38bf3ed6-d963-4409-8c0b-53b631332c56"
        },
        {
            "id": "d9a25f39-8f22-4489-8e80-2c8ce0cf4045",
            "type": "istar.AndRefinementLink",
            "source": "62e762e3-6560-4860-89fa-66bc6f5e8ad1",
            "target": "733e013c-e3d5-48f9-b1bb-47f3ba22e850"
        },
        {
            "id": "babeb577-02d8-4eb3-b180-0b7005c4ff1e",
            "type": "istar.AndRefinementLink",
            "source": "62e762e3-6560-4860-89fa-66bc6f5e8ad1",
            "target": "38bf3ed6-d963-4409-8c0b-53b631332c56"
        },
        {
            "id": "d98914ed-81ae-4d06-b460-3fbb528f459a",
            "type": "istar.ContributionLink",
            "source": "733e013c-e3d5-48f9-b1bb-47f3ba22e850",
            "target": "9a938a9a-d944-48f2-b9a1-d8fc967b1d2a",
            "label": "help"
        },
        {
            "id": "38684742-f982-409f-91be-c09334def96a",
            "type": "istar.ContributionLink",
            "source": "12e93ae7-6ad0-43ed-ac4d-b24266d95cdc",
            "target": "9a938a9a-d944-48f2-b9a1-d8fc967b1d2a",
            "label": "hurt"
        },
        {
            "id": "f70b71ce-d515-473e-8efb-333ce811d010",
            "type": "istar.ContributionLink",
            "source": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "target": "9a938a9a-d944-48f2-b9a1-d8fc967b1d2a",
            "label": "help"
        },
        {
            "id": "63d1b9fe-535e-47e4-b2e3-f14b8e842a0d",
            "type": "istar.ContributionLink",
            "source": "b2e93b23-d7f1-48f2-be68-dafef2f9bade",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "label": "help"
        },
        {
            "id": "99e5c713-89a5-46ad-932f-090b9abff34e",
            "type": "istar.ContributionLink",
            "source": "5e0579a1-57d6-4de1-ad56-0d7810a5b52d",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "label": "hurt"
        },
        {
            "id": "b2e1aeb3-f202-4ff5-8f42-a365bec8f5c0",
            "type": "istar.ContributionLink",
            "source": "9ddc02f7-59a9-4565-9721-6e60dc66f10c",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "label": "help"
        },
        {
            "id": "04a5ae7c-c28d-475c-bb0c-3df03b0b7e86",
            "type": "istar.ContributionLink",
            "source": "9452a1a3-07dc-49a1-9534-3883aea9d55f",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "label": "help"
        },
        {
            "id": "3c8da1e5-de93-4481-9c59-15934fd6f71a",
            "type": "istar.ContributionLink",
            "source": "623862d4-6b91-4278-83bf-342e66ef3bda",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "customProperties": {
                "Context": "The heating device is electricity-based"
            },
            "label": "hurt"
        },
        {
            "id": "bb36a4ea-3924-446b-a674-9d9744b4c89d",
            "type": "istar.ContributionLink",
            "source": "9d534e15-95a0-44ea-a1b4-8bab3b1fd6c4",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "customProperties": {
                "Context": "The heating device is electricity-based"
            },
            "label": "help"
        },
        {
            "id": "26d1b411-3ef7-46ee-bb9b-52393ae17e22",
            "type": "istar.ContributionLink",
            "source": "add6b9fe-6314-4eab-bb22-61d5717c54ce",
            "target": "b76387a2-ca54-468d-88d1-45227b47ff83",
            "label": "help"
        },
        {
            "id": "83084330-5ced-434b-9c3f-d841a40ac07b",
            "type": "istar.AndRefinementLink",
            "source": "2ce237c5-9027-4ff4-8744-c28ca73f34f2",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "325b4920-6676-4909-8b74-1dd4b7760dd6",
            "type": "istar.AndRefinementLink",
            "source": "1623c785-fe22-4c96-8988-c9eae3b614f9",
            "target": "39e3358a-79c9-4a82-93c9-bc77d26c6610"
        },
        {
            "id": "7e530449-6f8d-4037-a117-216e673f1476",
            "type": "istar.AndRefinementLink",
            "source": "dbb5b65d-49fe-40ef-b241-7d3091f11083",
            "target": "d5631cc0-865a-4a18-b211-999a9a39037d"
        },
        {
            "id": "45c4a355-2054-4c4e-baed-708103b35044",
            "type": "istar.AndRefinementLink",
            "source": "81b16c06-1d05-47c3-9412-826ac1915a32",
            "target": "fbe79b38-b7ab-4980-897d-d84a67f7350a"
        },
        {
            "id": "0b0f1125-b252-4ded-80d1-951dff41fa65",
            "type": "istar.AndRefinementLink",
            "source": "d04a2c15-d39b-4879-963e-a809cb7f64e2",
            "target": "e8239026-4607-4acc-a4ed-a771d72fbcbc"
        },
        {
            "id": "e8b5ca33-a114-4d31-80cd-6f02c0986dc6",
            "type": "istar.DependencyLink",
            "source": "d04a2c15-d39b-4879-963e-a809cb7f64e2",
            "target": "def7f0ee-cfd6-4e95-91d5-b3b5fbcdb033"
        },
        {
            "id": "b583172e-60c6-4214-8582-b3f38568a5e8",
            "type": "istar.DependencyLink",
            "source": "def7f0ee-cfd6-4e95-91d5-b3b5fbcdb033",
            "target": "9d10bc4a-0d76-495d-bb81-3d1af8275ba9"
        },
        {
            "id": "592372a0-6eac-40df-a431-8687ae83e771",
            "type": "istar.DependencyLink",
            "source": "494a5feb-2f56-4434-832a-534ab061a6b0",
            "target": "48f01a3e-a778-4fb9-84a9-4f3ced0ff4f7"
        },
        {
            "id": "61897952-8657-4096-9962-c2057abb06c8",
            "type": "istar.DependencyLink",
            "source": "48f01a3e-a778-4fb9-84a9-4f3ced0ff4f7",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "b0c66f3f-d891-428a-b276-0b7e309e2399",
            "type": "istar.DependencyLink",
            "source": "e3beae74-b939-47d8-89fb-2ed6d446a2e8",
            "target": "aae21d1f-fca0-4234-ba11-2a0609b1605a"
        },
        {
            "id": "340cee99-6029-41d1-8430-694aae165c5d",
            "type": "istar.DependencyLink",
            "source": "aae21d1f-fca0-4234-ba11-2a0609b1605a",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "68d2b770-f3ca-4f06-a9ff-9ef6ffabcb6e",
            "type": "istar.DependencyLink",
            "source": "e1943868-5e88-41f4-9368-f10e48a360ca",
            "target": "4625d40a-0454-41e5-9f33-b242fe8977c3"
        },
        {
            "id": "5850bca3-6e61-4e94-a89d-a1c32a2929b6",
            "type": "istar.DependencyLink",
            "source": "4625d40a-0454-41e5-9f33-b242fe8977c3",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "35ca34b5-141e-4874-bd16-3a98523427a3",
            "type": "istar.DependencyLink",
            "source": "12ee7e98-5582-493e-bfe5-21996c0659c2",
            "target": "4855d6bc-2d36-4fb7-adaa-81dc2e102496"
        },
        {
            "id": "69e4a4f9-e7e7-4af6-a2a2-bd24360e06f2",
            "type": "istar.DependencyLink",
            "source": "4855d6bc-2d36-4fb7-adaa-81dc2e102496",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "4ee29a1e-43cb-4a14-8b7e-04a70193ab81",
            "type": "istar.DependencyLink",
            "source": "623862d4-6b91-4278-83bf-342e66ef3bda",
            "target": "f60e5e87-4055-4fca-874b-0771bd505725"
        },
        {
            "id": "071b31df-587f-4093-9277-df3da19536f7",
            "type": "istar.DependencyLink",
            "source": "f60e5e87-4055-4fca-874b-0771bd505725",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "3f0cbc01-fa06-4651-8816-127a4072e6ef",
            "type": "istar.DependencyLink",
            "source": "9d534e15-95a0-44ea-a1b4-8bab3b1fd6c4",
            "target": "41771f3f-4edd-48d0-9fd1-7d4b92e2f49e"
        },
        {
            "id": "a21ddf82-397b-454a-8ec1-34cfefa972cc",
            "type": "istar.DependencyLink",
            "source": "41771f3f-4edd-48d0-9fd1-7d4b92e2f49e",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "b21a7c65-71b6-47c7-9b80-9651cf745925",
            "type": "istar.DependencyLink",
            "source": "5e0579a1-57d6-4de1-ad56-0d7810a5b52d",
            "target": "47134848-0da5-451a-b4e6-72e8dda02f92"
        },
        {
            "id": "4274ae7f-599b-4340-a73f-bb70d42dea89",
            "type": "istar.DependencyLink",
            "source": "47134848-0da5-451a-b4e6-72e8dda02f92",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "dc0db07b-a794-443c-ae1e-69af38f9a47f",
            "type": "istar.DependencyLink",
            "source": "9ddc02f7-59a9-4565-9721-6e60dc66f10c",
            "target": "950e2c06-d4c7-48b6-a319-203a715ac444"
        },
        {
            "id": "dc0343c4-88f9-4cec-af7a-0415a5aa3110",
            "type": "istar.DependencyLink",
            "source": "950e2c06-d4c7-48b6-a319-203a715ac444",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "d28a19fa-fc37-43b5-8550-96d478418cfe",
            "type": "istar.DependencyLink",
            "source": "62659e86-92a5-4d32-842a-8a44a4646c6d",
            "target": "e6878da8-adf3-4aee-a145-0da2ed9132ab"
        },
        {
            "id": "d46e3622-4db9-46d7-acf4-07003403184b",
            "type": "istar.DependencyLink",
            "source": "e6878da8-adf3-4aee-a145-0da2ed9132ab",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "76117cbf-73a4-4789-861e-ae6167b70bf9",
            "type": "istar.DependencyLink",
            "source": "b9db7012-9e2d-4e85-8beb-ad3e93dc312a",
            "target": "23ba2393-a82e-46f8-ba89-6b7e6a788779"
        },
        {
            "id": "a178ff61-953b-4d45-afd2-cc954dcc4e72",
            "type": "istar.DependencyLink",
            "source": "23ba2393-a82e-46f8-ba89-6b7e6a788779",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "7aa8c3f1-d1a0-4ca4-8da1-0103e3c04d74",
            "type": "istar.DependencyLink",
            "source": "bab3e64d-95c4-4e60-b105-8fa38aad0093",
            "target": "15be861c-4a5d-4d7a-8fda-6e088199d2e9"
        },
        {
            "id": "240c43ff-50cd-43dd-9752-acf1956a0003",
            "type": "istar.DependencyLink",
            "source": "15be861c-4a5d-4d7a-8fda-6e088199d2e9",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "5d9569bd-fcd5-4089-9193-4813fdb2a03d",
            "type": "istar.DependencyLink",
            "source": "b2e93b23-d7f1-48f2-be68-dafef2f9bade",
            "target": "3f6b99c6-52d4-4232-b4bb-3f494c428a38"
        },
        {
            "id": "9e420a03-c342-4484-b092-8a522cfaced4",
            "type": "istar.DependencyLink",
            "source": "3f6b99c6-52d4-4232-b4bb-3f494c428a38",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "65626afd-ae10-4fbd-8007-80d00586f576",
            "type": "istar.DependencyLink",
            "source": "ca7c6b8c-e155-4c8f-a8d0-ce86cc1c1a02",
            "target": "50e1bd14-cc99-48c9-97a5-a7ffd89a2021"
        },
        {
            "id": "b9481a48-22c0-4e04-8542-e61e334314ff",
            "type": "istar.DependencyLink",
            "source": "50e1bd14-cc99-48c9-97a5-a7ffd89a2021",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "d33f0ea5-d914-493d-8304-68e4d1d17317",
            "type": "istar.DependencyLink",
            "source": "47a0c4b6-9844-4ff3-8ba7-8db7923805bd",
            "target": "f640d638-ffcf-4bb1-ae26-13a0a1ce6d68"
        },
        {
            "id": "e8c7a7ae-55e8-4a50-826a-16cf12fdee6d",
            "type": "istar.DependencyLink",
            "source": "f640d638-ffcf-4bb1-ae26-13a0a1ce6d68",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "5fd76160-6727-4f10-9e2a-83fa17009668",
            "type": "istar.DependencyLink",
            "source": "2946613f-b8aa-4d2d-afe0-e1a5ee8bea9d",
            "target": "016d8920-9fe1-4f69-b55f-b4b357b0b0e6"
        },
        {
            "id": "f1744742-e3b1-4e27-90a7-8e1713df2e14",
            "type": "istar.DependencyLink",
            "source": "016d8920-9fe1-4f69-b55f-b4b357b0b0e6",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "e862edc2-8b80-4b99-91b7-4b3813df2261",
            "type": "istar.DependencyLink",
            "source": "d8c3d54b-d979-4872-a435-847c5fc11d89",
            "target": "026c2b9d-d549-4abf-9eb4-acbee09cccbd"
        },
        {
            "id": "74eff4ef-9304-4dc1-aae9-6b5385a57055",
            "type": "istar.DependencyLink",
            "source": "026c2b9d-d549-4abf-9eb4-acbee09cccbd",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "0c1dbb26-24c7-46fe-bb84-afcea23e1d21",
            "type": "istar.DependencyLink",
            "source": "c0384b04-9745-43a7-ad96-17cc6a83f613",
            "target": "e2b8dda0-20dc-4ad0-81c9-de5889b19757"
        },
        {
            "id": "5e3d9091-46f2-4e35-a24b-7b9ff9e6199d",
            "type": "istar.DependencyLink",
            "source": "e2b8dda0-20dc-4ad0-81c9-de5889b19757",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        },
        {
            "id": "fdff0e9c-d068-4209-8d0a-5738eecb95a8",
            "type": "istar.DependencyLink",
            "source": "6a12bc40-749d-49a3-a70d-84bccca84167",
            "target": "6850d13e-f6a1-4481-9494-d870a297c57e"
        },
        {
            "id": "3857c92d-48a5-4a5d-ae2d-2a595fbbb21c",
            "type": "istar.DependencyLink",
            "source": "6850d13e-f6a1-4481-9494-d870a297c57e",
            "target": "9b3379a4-5245-41e9-87cd-7752297a8ce9"
        }
    ],
    "display": {
        "834513e9-a5d2-43fa-ae24-3c57f645064a": {
            "width": 84.16537475585938,
            "height": 35.175201416015625
        },
        "e8239026-4607-4acc-a4ed-a771d72fbcbc": {
            "width": 115.140625,
            "height": 48.462493896484375
        },
        "755356b4-962f-4dcf-8e36-1a4d2816c391": {
            "width": 119.34375,
            "height": 38.34375
        },
        "5af70b15-c536-435e-ad47-1f4aa592dabe": {
            "width": 95.84375,
            "height": 51.53436279296875
        },
        "12ee7e98-5582-493e-bfe5-21996c0659c2": {
            "width": 135.84375,
            "height": 37.34375
        },
        "733e013c-e3d5-48f9-b1bb-47f3ba22e850": {
            "width": 133.640625,
            "height": 38.34375
        },
        "dbb5b65d-49fe-40ef-b241-7d3091f11083": {
            "width": 108.140625,
            "height": 42.34375
        },
        "d59528d3-48ca-41c9-91bd-153223b4c543": {
            "width": 116.140625,
            "height": 38.34375
        },
        "05017065-0a5a-4a0a-9a38-30a7b1561a73": {
            "backgroundColor": "#76FAE5"
        },
        "317873f2-af07-4ba2-a3c3-80570d62ec80": {
            "width": 110.890625,
            "height": 36.934326171875
        },
        "4855d6bc-2d36-4fb7-adaa-81dc2e102496": {
            "width": 138.8125,
            "height": 30.12499237060547
        },
        "cc4b92e0-a8ba-4d1b-8d34-32a1fdd1c0a7": {
            "vertices": [
                {
                    "x": 799,
                    "y": 795
                }
            ]
        },
        "d117bd86-bf88-4b0c-bcb0-8539f1af4f47": {
            "vertices": [
                {
                    "x": 1515,
                    "y": 899
                }
            ]
        },
        "e2eed05e-89d5-44a2-ad2d-785cfe81b2bf": {
            "vertices": [
                {
                    "x": 1326,
                    "y": 542
                }
            ]
        },
        "123fd7f2-9279-4698-be17-02f3605d4c18": {
            "vertices": [
                {
                    "x": 1479,
                    "y": 744
                },
                {
                    "x": 1528,
                    "y": 782
                }
            ]
        },
        "33b48d39-32e9-4bd0-9dd2-7adcb81a9f94": {
            "vertices": [
                {
                    "x": 1149,
                    "y": 938
                }
            ]
        },
        "d942f9f3-b8ef-4a6a-a770-1beef6d0c726": {
            "vertices": [
                {
                    "x": 1508,
                    "y": 979
                }
            ]
        },
        "4732399d-1af1-4c6e-8e91-76b794ae1a2a": {
            "vertices": [
                {
                    "x": 1332,
                    "y": 815
                }
            ]
        },
        "b06732d9-5f15-476c-a9f0-e1e8b03bdeb6": {
            "vertices": [
                {
                    "x": 1522,
                    "y": 861
                }
            ]
        },
        "ca2dbe17-8353-434b-9e55-c882e9274508": {
            "vertices": [
                {
                    "x": 1104,
                    "y": 1255
                }
            ]
        },
        "cf798988-7116-40fa-833d-0a54ce55cc2e": {
            "vertices": [
                {
                    "x": 1368,
                    "y": 737
                }
            ]
        },
        "15aa74f7-cbe2-447e-9723-6f2d76709082": {
            "vertices": [
                {
                    "x": 1528,
                    "y": 818
                }
            ]
        },
        "f48e6494-07d8-4395-9c96-d93440659763": {
            "vertices": [
                {
                    "x": 660,
                    "y": 422
                }
            ]
        },
        "e08d1651-6644-4e23-be20-359368e0d981": {
            "vertices": [
                {
                    "x": 746,
                    "y": 416
                }
            ]
        },
        "d98914ed-81ae-4d06-b460-3fbb528f459a": {
            "vertices": [
                {
                    "x": 412,
                    "y": 794
                }
            ]
        },
        "38684742-f982-409f-91be-c09334def96a": {
            "vertices": [
                {
                    "x": 528,
                    "y": 974
                }
            ]
        },
        "f70b71ce-d515-473e-8efb-333ce811d010": {
            "vertices": [
                {
                    "x": 386,
                    "y": 210
                }
            ]
        },
        "63d1b9fe-535e-47e4-b2e3-f14b8e842a0d": {
            "vertices": [
                {
                    "x": 600,
                    "y": 252
                }
            ]
        },
        "99e5c713-89a5-46ad-932f-090b9abff34e": {
            "vertices": [
                {
                    "x": 641,
                    "y": 250
                }
            ]
        },
        "b2e1aeb3-f202-4ff5-8f42-a365bec8f5c0": {
            "vertices": [
                {
                    "x": 800,
                    "y": 299
                },
                {
                    "x": 769,
                    "y": 193
                },
                {
                    "x": 656,
                    "y": 117
                }
            ]
        },
        "04a5ae7c-c28d-475c-bb0c-3df03b0b7e86": {
            "vertices": [
                {
                    "x": 419,
                    "y": 422
                }
            ]
        },
        "3c8da1e5-de93-4481-9c59-15934fd6f71a": {
            "vertices": [
                {
                    "x": 751,
                    "y": 147
                }
            ]
        },
        "bb36a4ea-3924-446b-a674-9d9744b4c89d": {
            "vertices": [
                {
                    "x": 855,
                    "y": 107
                }
            ]
        },
        "26d1b411-3ef7-46ee-bb9b-52393ae17e22": {
            "vertices": [
                {
                    "x": 1114,
                    "y": 234
                },
                {
                    "x": 938,
                    "y": 144
                }
            ]
        },
        "e8b5ca33-a114-4d31-80cd-6f02c0986dc6": {
            "vertices": [
                {
                    "x": 1285,
                    "y": 218
                }
            ]
        },
        "b583172e-60c6-4214-8582-b3f38568a5e8": {
            "vertices": [
                {
                    "x": 1454,
                    "y": 208
                }
            ]
        },
        "397fb3fe-da8d-4a72-a1c2-3bf6f87a1da5": {
            "collapsed": true
        },
        "ee9cf1ad-3095-4338-96ad-96547a46e2c1": {
            "collapsed": true
        },
        "611e34df-7de1-4101-ab76-5b53594cba35": {
            "collapsed": true
        },
        "9d10bc4a-0d76-495d-bb81-3d1af8275ba9": {
            "collapsed": true
        },
        "9b3379a4-5245-41e9-87cd-7752297a8ce9": {
            "collapsed": true
        }
    },
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Thu, 14 Mar 2019 01:11:45 GMT",
    "diagram": {
        "width": 1784,
        "height": 1475,
        "name": "Contextual Smart Home",
        "customProperties": {
            "Description": "This is a Smart Home system based on the reference below, which itself was based on work by Fabiano Dalpiaz and Raian Ali. \n\nSome elements and links contain contextual annotations, such as the \"Request restaurant meal\" dependum highlighted in blue.",
            "Reference": "Based on João Pimentel, Marcia Lucena, Jaelson Castro, Carla Silva, Fernanda Alencar, Emanuel Santos. Deriving software architectural models from requirements models for adaptive systems: the STREAM-A approach. In: Requirements Engineering Journal, 17, 4, 2012, pp. 259-281. DOI: 10.1007/s00766-011-0126-z"
        }
    }
};

istar.models.everyElementAndLink = {
    "actors": [
        {
            "id": "2b3ba506-1f5b-4b5b-9114-01b1092cd067",
            "text": "Agent A",
            "type": "istar.Agent",
            "x": 56,
            "y": 342,
            "customProperties": {
                "Description": "This is an agent. The idea of the symbol is that it shows the frontal view of a person wearing a hat, with the name of the agent\nappearing on its face",
                "Concept": "Agent is an actor with concrete, physical manifestations, such as a human individual, an organization, or a department"
            },
            "nodes": []
        },
        {
            "id": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "text": "Role A",
            "type": "istar.Role",
            "x": 309,
            "y": 447,
            "customProperties": {
                "Description": "This is a role. The idea of the symbol is that it shows the aerial (top-down) view of a person wearing a hat, with the name of the role\nappearing on the hat. Thus, different people may wear the same \"hat\"",
                "Concept": "Role is an abstract characterization of the behavior of a social actor within some specialized context or domain of endeavor"
            },
            "nodes": []
        },
        {
            "id": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "text": "Actor A",
            "type": "istar.Actor",
            "x": 184,
            "y": 72,
            "customProperties": {
                "Description": "This actor is-a Actor B.\nIt depends on Agent to achieve Dependum A.\nIt depends on Role to satisfy Dependum B.\nIt depends on Role to execute Dependum C.\nIt depends on Actor B to obtain Dependum D.",
                "Tooltip": "This actor is collapsed. You can press 'alt' and click on the actor to expand it, making its inner elements visible",
                "Concept": "Actors are active, autonomous entities that aim at achieving their goals by exercising their know-how, in collaboration with other actors.\n\nActor can be specialized as Role or Agent. Whenever distinguishing the type of actor is not relevant, either because of the scenario-at-hand or the modeling stage, the notion of generic actor—without specialization—can be used in the model."
            },
            "nodes": [
                {
                    "id": "e1acd9b0-c9e9-468b-845c-c7b08db3020f",
                    "text": "Goal X",
                    "type": "istar.Goal",
                    "x": 266,
                    "y": 101,
                    "customProperties": {
                        "Description": "This is a goal of Actor A",
                        "Concept": "A Goal is a state of affairs that the actor wants to achieve and that has clear-cut criteria of achievement"
                    }
                },
                {
                    "id": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
                    "text": "Task X",
                    "type": "istar.Task",
                    "x": 297,
                    "y": 196,
                    "customProperties": {
                        "Description": "This is a task that, if executed, will also imply the achievement of Goal X",
                        "Concept": "Tasks represent actions that an actor wants to be executed, usually with the purpose of achieving some goal"
                    }
                },
                {
                    "id": "a892b326-dae3-4ce1-8513-0de9ac88d4b5",
                    "text": "Task Y",
                    "type": "istar.Task",
                    "x": 204,
                    "y": 213,
                    "customProperties": {
                        "Description": "This is a task that, if executed, will imply the achievement of Goal X"
                    }
                }
            ]
        },
        {
            "id": "6a76ceb5-f287-462d-bf57-a266cc19c243",
            "text": "Actor B",
            "type": "istar.Actor",
            "x": 572,
            "y": 30,
            "customProperties": {
                "Description": "This is an actor with its boundary expanded",
                "Tooltip": "In order to expand or collapse (hide) the boundary of an actor you can press 'alt' and click on the actor",
                "Concept": "Actors are active, autonomous entities that aim at achieving their goals by exercising their know-how, in collaboration with other actors.\n\nActors’ intentionality is made explicit through the actor boundary, which is a graphical container for their intentional elements together with their interrelationships. The actor boundary is represented by a grey area. An intentional element appearing inside the boundary of an actor denotes something that is desired or wanted by that actor"
            },
            "nodes": [
                {
                    "id": "4c3ba102-6514-47a4-b21c-8a8f8cdae0cc",
                    "text": "Goal A",
                    "type": "istar.Goal",
                    "x": 702,
                    "y": 45,
                    "customProperties": {
                        "Description": "This goal is OR-refined by Task A, meaning that if Task A gets executed the Goal A will ve achieved",
                        "Tooltip": "You can resize an element by dragging the small circle on its bottom-right corner",
                        "Concept": "A Goal is a state of affairs that the actor wants to achieve and that has clear-cut criteria of achievement"
                    }
                },
                {
                    "id": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
                    "text": "Task A",
                    "type": "istar.Task",
                    "x": 700,
                    "y": 129,
                    "customProperties": {
                        "Description": "This task is a means to achieve Goal A. It is AND-refined by tasks B and C",
                        "Concept": "Tasks represent actions that an actor wants to be executed, usually with the purpose of achieving some goal"
                    }
                },
                {
                    "id": "60d0943c-169e-41ff-85ed-e19360456863",
                    "text": "Task B",
                    "type": "istar.Task",
                    "x": 634,
                    "y": 209,
                    "customProperties": {
                        "Description": "This task is part of the refinement of Task A",
                        "Concept": "Tasks represent actions that an actor wants to be executed, usually with the purpose of achieving some goal"
                    }
                },
                {
                    "id": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
                    "text": "Task C",
                    "type": "istar.Task",
                    "x": 768,
                    "y": 207,
                    "customProperties": {
                        "Description": "This task is part of the refinement of Task A",
                        "Concept": "Tasks represent actions that an actor wants to be executed, usually with the purpose of achieving some goal"
                    }
                },
                {
                    "id": "df52f053-20a2-4bdf-8e23-e8c53a8ce306",
                    "text": "Quality B",
                    "type": "istar.Quality",
                    "x": 572,
                    "y": 322,
                    "customProperties": {
                        "Description": "Task B provides sufficient positive evidence (make) for the satisfaction of this quality",
                        "Concept": "A quality is an attribute for which an actor desires some level of achievement. For example, the entity could be the system under development and a quality its performance; another entity could be the business being analyzed and a quality the yearly profit. The level of achievement may be defined precisely or kept vague. Qualities can guide the search for ways of achieving goals, and also serve as criteria for evaluating alternative ways of achieving goals"
                    }
                },
                {
                    "id": "3ff6395e-86ec-4661-ba13-c0493331303b",
                    "text": "Quality C",
                    "type": "istar.Quality",
                    "x": 831,
                    "y": 317,
                    "customProperties": {
                        "Description": "Task C provides sufficient evidence against the satisfaction (or for the denial) of this quality",
                        "Concept": "A quality is an attribute for which an actor desires some level of achievement. For example, the entity could be the system under development and a quality its performance; another entity could be the business being analyzed and a quality the yearly profit. The level of achievement may be defined precisely or kept vague. Qualities can guide the search for ways of achieving goals, and also serve as criteria for evaluating alternative ways of achieving goals"
                    }
                },
                {
                    "id": "85940cf3-6d49-4270-9b00-51696b5790f5",
                    "text": "Quality D",
                    "type": "istar.Quality",
                    "x": 699,
                    "y": 455,
                    "customProperties": {
                        "Description": "The satisfaction of Quality B provides weak evidence against the satisfaction (or for the denial) of this quality.\nOn the other hand, the satisfaction of Quality C provides weak positive evidence for the satisfaction of this quality. Quite the pickle, right?",
                        "Concept": "A quality is an attribute for which an actor desires some level of achievement. For example, the entity could be the system under development and a quality its performance; another entity could be the business being analyzed and a quality the yearly profit. The level of achievement may be defined precisely or kept vague. Qualities can guide the search for ways of achieving goals, and also serve as criteria for evaluating alternative ways of achieving goals"
                    }
                },
                {
                    "id": "54c01821-aa4d-4bd0-9fdf-6ddaa25c299f",
                    "text": "Resource A",
                    "type": "istar.Resource",
                    "x": 922,
                    "y": 233,
                    "customProperties": {
                        "Description": "This is resource is needed for the execution of Task C",
                        "Concept": "A Resource is a physical or informational entity that the actor requires in order to perform a task"
                    }
                },
                {
                    "id": "1ecba4f1-f873-466c-8074-092f612d5fed",
                    "text": "Quality A",
                    "type": "istar.Quality",
                    "x": 861,
                    "y": 101,
                    "customProperties": {
                        "Description": "This quality qualifies Task A",
                        "Concept": "A quality is an attribute for which an actor desires some level of achievement. For example, the entity could be the system under development and a quality its performance; another entity could be the business being analyzed and a quality the yearly profit. The level of achievement may be defined precisely or kept vague. Qualities can guide the search for ways of achieving goals, and also serve as criteria for evaluating alternative ways of achieving goals"
                    }
                }
            ]
        }
    ],
    "dependencies": [
        {
            "id": "fd083df6-87fc-4423-b25c-3291a1bf9aa3",
            "text": "Dependum A",
            "type": "istar.Goal",
            "x": 13,
            "y": 177,
            "customProperties": {
                "Description": "This is a dependum in a goal dependency.\n\n– Depender: Actor A\n– dependerElmt: none\n– dependum: Dependum A\n– dependee: Agent A\n– dependeeElmt: none",
                "Tooltip": "You can flip the direction of a dependency by clicking on the button below",
                "Concept": "Dependencies represent social relationships. A goal dependency indicates that the dependee is expected to achieve the goal, and is free to choose how.\n\nDependency relationships should not share the same dependum, as each dependum is a conceptually different element; in some cases, a dependum in one dependency is achieved, but is not achieved in another dependency, even if the dependums may have the same name.\nIn other words, an actor cannot depend on more than one actor for the same dependum, or two actors cannot depend on the same dependum from an actor. Instead, create multiple dependums with the same name"
            },
            "source": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "target": "2b3ba506-1f5b-4b5b-9114-01b1092cd067"
        },
        {
            "id": "81fe40dc-2380-47c0-92ab-1e7281dc020c",
            "text": "Dependum C",
            "type": "istar.Task",
            "x": 323,
            "y": 309,
            "customProperties": {
                "Description": "This is a dependum in a task dependency.\n\n– Depender: Actor A\n– dependerElmt: Task X (inside Actor A)\n– dependum: Dependum C\n– dependee: Role A\n– dependeeElmt: none",
                "Concept": "Dependencies represent social relationships. A task dependency indicates that the dependee is expected to execute the task in a prescribed way"
            },
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        },
        {
            "id": "7b339194-6020-4c2b-86e5-cd07ab9f725d",
            "text": "Dependum D",
            "type": "istar.Resource",
            "x": 453,
            "y": 169,
            "customProperties": {
                "Description": "This is a dependum in a resource dependency.\n\n– Depender: Actor A\n– dependerElmt: Task X (inside Actor A)\n– dependum: Dependum D\n– dependee: Actor B\n– dependeeElmt: Task B (inside Actor B)",
                "Tooltip": "You can change the type of a dependency (goal, quality, task or resource) by clicking on the type in this table",
                "Concept": "Dependencies represent social relationships. A resource dependency indicates that the dependee is expected to make the resource available to the depender"
            },
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "60d0943c-169e-41ff-85ed-e19360456863"
        },
        {
            "id": "ad1e6006-2afa-448a-ab76-94be798d1a1e",
            "text": "Dependum A",
            "type": "istar.Goal",
            "x": 95,
            "y": 467,
            "customProperties": {
                "Description": "This is a dependum in a goal dependency.\n\n– Depender: Role A\n– dependerElmt: none\n– dependum: Dependum A\n– dependee: Agent A\n– dependeeElmt: none",
                "Concept": "Dependencies represent social relationships. A goal dependency indicates that the dependee is expected to achieve the goal, and is free to choose how.\n\nDependency relationships should not share the same dependum, as each dependum is a conceptually different element; in some cases, a dependum in one dependency is achieved, but is not achieved in another dependency, even if the dependums may have the same name.\nIn other words, an actor cannot depend on more than one actor for the same dependum, or two actors cannot depend on the same dependum from an actor. Instead, create multiple dependums with the same name"
            },
            "source": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "target": "2b3ba506-1f5b-4b5b-9114-01b1092cd067"
        },
        {
            "id": "49ba9425-0de8-4fbf-8ec0-6a384e844ea4",
            "text": "Dependum B",
            "type": "istar.Quality",
            "x": 193,
            "y": 314,
            "customProperties": {
                "Description": "This is a dependum in a quality dependency.\n\n– Depender: Actor A\n– dependerElmt: Goal X (inside Actor A)\n– dependum: Dependum B\n– dependee: Role A\n– dependeeElmt: none",
                "Concept": "Dependencies represent social relationships. A quality dependency indicates that  the dependee is expected to sufficiently satisfy the quality, and is free to choose how"
            },
            "source": "a892b326-dae3-4ce1-8513-0de9ac88d4b5",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        }
    ],
    "links": [
        {
            "id": "c14e7fda-e081-450f-b716-3fc839802fc3",
            "type": "istar.DependencyLink",
            "source": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "target": "fd083df6-87fc-4423-b25c-3291a1bf9aa3",
            "customProperties": {
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown",
                "Description": "This link is part of a goal dependency. The \"D\" is pointing from Actor A to Dependum A"
            }
        },
        {
            "id": "a7ad94ed-b49e-465f-912b-4ea6f86cd976",
            "type": "istar.DependencyLink",
            "source": "fd083df6-87fc-4423-b25c-3291a1bf9aa3",
            "target": "2b3ba506-1f5b-4b5b-9114-01b1092cd067",
            "customProperties": {
                "Description": "This link is part of a goal dependency. The \"D\" is pointing from Dependum A to Agent A",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "8118839e-ae5e-4755-87ba-c9fb29f10625",
            "type": "istar.DependencyLink",
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "81fe40dc-2380-47c0-92ab-1e7281dc020c",
            "customProperties": {
                "Description": "This link is part of a task dependency. The \"D\" is pointing from Actor A to Dependum C",
                "Tooltip": "Do you see the gap between the beginning of this link and Actor A? You can remove these gaps by clicking on \"Pixel-perfect links\" in the Options menu",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "5a65337a-8568-4eaf-b63b-f9256b314015",
            "type": "istar.DependencyLink",
            "source": "81fe40dc-2380-47c0-92ab-1e7281dc020c",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "customProperties": {
                "Description": "This link is part of a task dependency. The \"D\" is pointing from Dependum C to Role A",
                "Tooltip": "Congratulations, you found this secret tip! You can change the size of the diagram on the Options menu. But if all you want is to enlarge it, you can just drag an element to the bottom or right and the diagram will automatically expand",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "fa443e67-28f5-4934-a5d6-aae299fd95c3",
            "type": "istar.DependencyLink",
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "7b339194-6020-4c2b-86e5-cd07ab9f725d",
            "customProperties": {
                "Description": "This link is part of a resource dependency. The \"D\" is pointing from Actor A to Dependum D",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "fc7573af-3955-4998-b839-ad4dd7649601",
            "type": "istar.DependencyLink",
            "source": "7b339194-6020-4c2b-86e5-cd07ab9f725d",
            "target": "60d0943c-169e-41ff-85ed-e19360456863",
            "customProperties": {
                "Description": "This link is part of a resource dependency. The \"D\" is pointing from Dependum D to Task B (which is inside Actor B)",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "fd846234-3871-4c3b-bd10-64bdb4621fb5",
            "type": "istar.DependencyLink",
            "source": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "target": "ad1e6006-2afa-448a-ab76-94be798d1a1e",
            "customProperties": {
                "Description": "This link is part of a goal dependency. The \"D\" is pointing from Role A to Dependum A",
                "Tooltip": "If you accidentally added to many vertices to an link, you can delete them by clickin on the \"Clear vertices\" button below"
            }
        },
        {
            "id": "b15583b6-46c5-44a3-af48-c53535af7ee9",
            "type": "istar.DependencyLink",
            "source": "ad1e6006-2afa-448a-ab76-94be798d1a1e",
            "target": "2b3ba506-1f5b-4b5b-9114-01b1092cd067",
            "customProperties": {
                "Description": "This link is part of a goal dependency. The \"D\" is pointing from Dependum A to Agent A",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "bb3a0297-98a5-419a-b2be-1fa7d8386b3a",
            "type": "istar.DependencyLink",
            "source": "a892b326-dae3-4ce1-8513-0de9ac88d4b5",
            "target": "49ba9425-0de8-4fbf-8ec0-6a384e844ea4",
            "customProperties": {
                "Description": "This link is part of a quality dependency. The \"D\" is pointing from Actor A to Dependum B",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "b092f4ad-f635-4f27-a335-5f2c3874ad8c",
            "type": "istar.DependencyLink",
            "source": "49ba9425-0de8-4fbf-8ec0-6a384e844ea4",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "customProperties": {
                "Description": "This link is part of a quality dependency. The \"D\" is pointing from Dependum B to Role A",
                "Concept": "A dependency is defined as a relationship with five arguments:\n– depender is the actor that depends for something (the dependum) to be provided;\n– dependerElmt is the intentional element within the depender’s actor boundary where the dependency starts from, which explains why the dependency exists;\n– dependum is an intentional element that is the object of the dependency;\n– dependee is the actor that should provide the dependum;\n– dependeeElmt is the intentional element that explains how the dependee intends to provide the dependum\n\nDependencies link the dependerElmt within the depender actor to the dependum, outside actor boundaries, to the dependeeElmt within the dependee actor. The link is drawn with a “D” symbol indicating direction, with the D acting as an arrowhead “>”, pointing from dependerElmt to dependum to dependeeElmt.\n\nBoth the dependerElmt and the dependeeElmt can be omitted. This optionality is used when creating an initial Strategic Dependency view, or to support expressing partial knowledge, e.g., when the “why” (dependerElmt) or the “how”; (dependeeElmt) of the dependency are unknown"
            }
        },
        {
            "id": "fa92f725-2109-4c53-b8e3-d82da60fc44e",
            "type": "istar.OrRefinementLink",
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "e1acd9b0-c9e9-468b-845c-c7b08db3020f",
            "customProperties": {
                "Description": "This is an (inclusive) OR-refinement linking Task X to Goal X",
                "Concept": "The black triangle in this link indicates that it is an (inclusive) OR-refinement: the fulfillment of at least one child makes the parent fulfilled"
            }
        },
        {
            "id": "c2cdf0b6-0aba-4b26-affd-4a3ec2da6c67",
            "type": "istar.IsALink",
            "source": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "target": "6a76ceb5-f287-462d-bf57-a266cc19c243",
            "name": "Usually you DON'T want to define names for links",
            "customProperties": {
                "Concept": "Actors are often interrelated. In iStar 2.0, this is captured via actor links that define/describe these relationships. Actor links are binary, linking a single actor to a single other actor.\n\nA is-a link represents the concept of generalization / specialization in iStar 2.0. Only roles can be specialized into roles, or general actors into general actors. For\ninstance, a PhD student (role) can be defined as a specialization of a Student (another role). Agents cannot be specialized via is-a, as they are concrete instantiations (e.g., a John Smith cannot be another agent).",
                "Description": "This links states that Actor A is a (specialization of) Actor B"
            }
        },
        {
            "id": "8a160047-6059-4688-ad66-1dd02d130fc5",
            "type": "istar.OrRefinementLink",
            "source": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
            "target": "4c3ba102-6514-47a4-b21c-8a8f8cdae0cc",
            "customProperties": {
                "Concept": "iStar 2.0 features a generic relationship called \"refinement\" that links goals and tasks hierarchically. Refinement is an n-ary relationship relating one parent to one or more children.\nA parent can only be AND-refined or OR-refined, not both simultaneously\n\nThe black triangle in this link indicates that it is an (inclusive) OR-refinement: the fulfillment of at least one child makes the parent fulfilled. This relationship allows for a single child (as is the case here).\n\nDepending on the connected elements, refinement takes different meanings:\n• If the parent is a goal (which is the case here): in the case of OR-refinement, a child task is a particular way (a “means”) for fulfilling the parent goal (the “end”), while a child goal is a sub-goal that can be achieved for fulfilling the parent goal;\n• If the parent is a task: in the case of OR-refinement, a child goal is a goal whose existence that is uncovered by analyzing the parent task which may substitute for the original task, while a child task is a way to execute the parent task.",
                "Description": "This is an OR-refinement linking Task A with Goal A"
            }
        },
        {
            "id": "cb88aba6-9fdf-4f90-9eaa-0b74be5d0edd",
            "type": "istar.AndRefinementLink",
            "source": "60d0943c-169e-41ff-85ed-e19360456863",
            "target": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
            "customProperties": {
                "Concept": "The small line in the top of this link indicates that it is an AND-refinement: the fulfillment of all the n children (n ≥ 2) makes the parent fulfilled.\n\nDepending on the connected elements, refinement takes different meanings:\n• If the parent is a goal: in the case of AND-refinement, a child goal is a sub-state of affairs that is part of the parent goal, while a child task is a sub-task that must be fulfilled;\n• If the parent is a task (which is the case here): in the case of AND-refinement, a child task is a sub-task that is identified as part of the parent task, while a child goal is a goal that is uncovered by analyzing the parent task"
            }
        },
        {
            "id": "af1ac65b-8480-4c90-a960-e6e9ce239409",
            "type": "istar.AndRefinementLink",
            "source": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
            "target": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
            "customProperties": {
                "Concept": "The small line in the top of this link indicates that it is an AND-refinement: the fulfillment of all the n children (n ≥ 2) makes the parent fulfilled.\n\nDepending on the connected elements, refinement takes different meanings:\n• If the parent is a goal: in the case of AND-refinement, a child goal is a sub-state of affairs that is part of the parent goal, while a child task is a sub-task that must be fulfilled;\n• If the parent is a task (which is the case here): in the case of AND-refinement, a child task is a sub-task that is identified as part of the parent task, while a child goal is a goal that is uncovered by analyzing the parent task"
            }
        },
        {
            "id": "ddf9d7ba-47bc-42fb-9ea8-d93ecbed4ec1",
            "type": "istar.QualificationLink",
            "source": "1ecba4f1-f873-466c-8074-092f612d5fed",
            "target": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
            "customProperties": {
                "Concept": "The qualification relationship relates a quality to its subject: a task, goal, or resource. Placing a qualification relationship expresses a desired quality over the execution of a task, the achievement of the goal, or the provision of the resource. For example, a quality “Quick saving” may refer to the goal “Save model”, qualifying how the operation or function of this goal should be achieved",
                "Tooltip": "You can add vertices to a link by clicking right on top of its line"
            }
        },
        {
            "id": "8621b90b-d6cc-4edf-b7d8-9747292bd4f3",
            "type": "istar.NeededByLink",
            "source": "54c01821-aa4d-4bd0-9fdf-6ddaa25c299f",
            "target": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
            "customProperties": {
                "Concept": "The Needed-By relationship links a task with a resource and it indicates that the actor needs the resource in order to execute the task. This relationship does not specify what is the reason for this need: consumption, reading, modification, creation, etc."
            }
        },
        {
            "id": "14fc329e-60d2-4d10-8ed2-7aea6bdb0263",
            "type": "istar.ContributionLink",
            "source": "60d0943c-169e-41ff-85ed-e19360456863",
            "target": "df52f053-20a2-4bdf-8e23-e8c53a8ce306",
            "customProperties": {
                "Concept": "Contribution links represent the effects of intentional elements on qualities, and are essential to assist analysts in the decision-making process among alternative goals or tasks. Contribution links lead to the accumulation of evidence for qualities. We talk of qualities being fulfilled or satisfied, having sufficient positive evidence, or being denied, having strong negative evidence.\n\nThis here is a 'make' contribution: The source provides sufficient positive evidence for the satisfaction of the target. In some i* variations this is called a ++ contribution",
                "Tooltip": "You can change the value of a contribution (make, help, hurt or break) by clicking on the value in this table"
            },
            "label": "make"
        },
        {
            "id": "c268c9ad-85db-44aa-b219-995e339e462a",
            "type": "istar.ContributionLink",
            "source": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
            "target": "3ff6395e-86ec-4661-ba13-c0493331303b",
            "customProperties": {
                "Concept": "Contribution links represent the effects of intentional elements on qualities, and are essential to assist analysts in the decision-making process among alternative goals or tasks. Contribution links lead to the accumulation of evidence for qualities. We talk of qualities being fulfilled or satisfied, having sufficient positive evidence, or being denied, having strong negative evidence.\n\nThis here is a 'break' contribution: The source provides sufficient evidence against the satisfaction (or for the denial) of the target.  In some i* variations this is called a -- contribution"
            },
            "label": "break"
        },
        {
            "id": "80811f20-5b66-4a89-8863-c1319ffa1c3b",
            "type": "istar.ContributionLink",
            "source": "df52f053-20a2-4bdf-8e23-e8c53a8ce306",
            "target": "85940cf3-6d49-4270-9b00-51696b5790f5",
            "customProperties": {
                "Concept": "Contribution links represent the effects of intentional elements on qualities, and are essential to assist analysts in the decision-making process among alternative goals or tasks. Contribution links lead to the accumulation of evidence for qualities. We talk of qualities being fulfilled or satisfied, having sufficient positive evidence, or being denied, having strong negative evidence.\n\nThis here is a 'hurt' contribution: The source provides weak evidence against the satisfaction (or for the denial) of the target.  In some i* variations this is called a - contribution"
            },
            "label": "hurt"
        },
        {
            "id": "0a80971f-4c33-4785-853a-fc6ce0453e61",
            "type": "istar.ContributionLink",
            "source": "3ff6395e-86ec-4661-ba13-c0493331303b",
            "target": "85940cf3-6d49-4270-9b00-51696b5790f5",
            "customProperties": {
                "Concept": "Contribution links represent the effects of intentional elements on qualities, and are essential to assist analysts in the decision-making process among alternative goals or tasks. Contribution links lead to the accumulation of evidence for qualities. We talk of qualities being fulfilled or satisfied, having sufficient positive evidence, or being denied, having strong negative evidence.\n\nThis here is a 'help' contribution:  The source provides weak positive evidence for the satisfaction of the target.  In some i* variations this is called a + contribution"
            },
            "label": "help"
        },
        {
            "id": "f7259dfe-ab11-47ee-bbdc-06a76a0cb145",
            "type": "istar.ParticipatesInLink",
            "source": "2b3ba506-1f5b-4b5b-9114-01b1092cd067",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "customProperties": {
                "Concept": "Actors are often interrelated. In iStar 2.0, this is captured via actor links that define/describe these relationships. Actor links are binary, linking a single actor to a single other actor.\n\nA participates-in link represents any kind of association, other than generalization/specialization, between two actors. No restriction exists on the type of actors linked by this association. Depending on the connected elements, this link takes different meanings. Two typical situations are the following:\n• When the source is an agent and the target is a role, this represents the plays relationship, i.e., an agent plays a given role. For instance, the agent Smith plays the role of Tool User.\n• When the source and the target are of the same type, this will often represent the part-of relationship. For instance, the Beta Tester role is part of the Tool User role",
                "Description": "This link states that Agent A plays the role Role A"
            }
        },
        {
            "id": "710b0263-0263-4b39-bd9f-26214616ba84",
            "type": "istar.OrRefinementLink",
            "source": "a892b326-dae3-4ce1-8513-0de9ac88d4b5",
            "target": "e1acd9b0-c9e9-468b-845c-c7b08db3020f",
            "customProperties": {
                "Description": "This is an (inclusive) OR-refinement linking Task X to Goal X",
                "Concept": "The black triangle in this link indicates that it is an (inclusive) OR-refinement: the fulfillment of at least one child makes the parent fulfilled"
            }
        }
    ],
    "display": {
        "c14e7fda-e081-450f-b716-3fc839802fc3": {
            "vertices": [
                {
                    "x": 112,
                    "y": 126
                }
            ]
        },
        "a7ad94ed-b49e-465f-912b-4ea6f86cd976": {
            "vertices": [
                {
                    "x": 43,
                    "y": 277
                }
            ]
        },
        "8118839e-ae5e-4755-87ba-c9fb29f10625": {
            "vertices": [
                {
                    "x": 383,
                    "y": 284
                }
            ]
        },
        "5a65337a-8568-4eaf-b63b-f9256b314015": {
            "vertices": [
                {
                    "x": 387,
                    "y": 361
                },
                {
                    "x": 365,
                    "y": 390
                },
                {
                    "x": 345,
                    "y": 413
                }
            ]
        },
        "fa443e67-28f5-4934-a5d6-aae299fd95c3": {
            "vertices": [
                {
                    "x": 388,
                    "y": 180
                }
            ]
        },
        "fc7573af-3955-4998-b839-ad4dd7649601": {
            "vertices": [
                {
                    "x": 568,
                    "y": 195
                }
            ]
        },
        "fd846234-3871-4c3b-bd10-64bdb4621fb5": {
            "vertices": [
                {
                    "x": 319,
                    "y": 526
                },
                {
                    "x": 282,
                    "y": 538
                },
                {
                    "x": 264,
                    "y": 505
                },
                {
                    "x": 223,
                    "y": 551
                },
                {
                    "x": 233,
                    "y": 496
                },
                {
                    "x": 186,
                    "y": 541
                },
                {
                    "x": 138,
                    "y": 521
                }
            ]
        },
        "b15583b6-46c5-44a3-af48-c53535af7ee9": {
            "vertices": [
                {
                    "x": 71,
                    "y": 447
                }
            ]
        },
        "bb3a0297-98a5-419a-b2be-1fa7d8386b3a": {
            "vertices": [
                {
                    "x": 156,
                    "y": 265
                }
            ]
        },
        "b092f4ad-f635-4f27-a335-5f2c3874ad8c": {
            "vertices": [
                {
                    "x": 313,
                    "y": 383
                }
            ]
        },
        "14fc329e-60d2-4d10-8ed2-7aea6bdb0263": {
            "vertices": [
                {
                    "x": 646,
                    "y": 274
                }
            ]
        },
        "c268c9ad-85db-44aa-b219-995e339e462a": {
            "vertices": [
                {
                    "x": 855,
                    "y": 272
                }
            ]
        },
        "80811f20-5b66-4a89-8863-c1319ffa1c3b": {
            "vertices": [
                {
                    "x": 619,
                    "y": 433
                }
            ]
        },
        "0a80971f-4c33-4785-853a-fc6ce0453e61": {
            "vertices": [
                {
                    "x": 865,
                    "y": 434
                }
            ]
        },
        "2b3ba506-1f5b-4b5b-9114-01b1092cd067": {
            "collapsed": true
        },
        "ccf83503-3c8f-4886-a30f-8a290499d8b2": {
            "collapsed": true
        },
        "9cab7456-727b-4d7e-81dd-af8903718cb3": {
            "collapsed": true
        }
    },
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Mon, 31 Dec 2018 14:52:34 GMT",
    "diagram": {
        "width": 1100,
        "height": 600,
        "name": "Every iStar 2.0 element and link",
        "customProperties": {
            "Description": "This is an example showing every iStar 2.0 element and link.\n\nKinds of actor:\n - Actor, Agent and Role\n\nDependency links:\n - Goal, Quality, Task and Resource dependency\n\nActor links:\n - Is-A and Participates-In\n\nInner elements:\n - Goal, Quality, Task, Resource\n\nInner element links:\n - And-refinement, Or-refinement, Needed-By, Qualification, and Contribution links (make, help, hurt, break)",
            "Tooltip": "Click on \"Toggle fullscreen\" in the Options menu to facilitate the use of the tool\n\nAlso, click on the elements and links of this model to learn more about the iStar 2.0 language",
            "Origin": "Model created by João Pimentel (UFRPE/Brazil). Concepts copied (with adaptations) from the iStar 2.0 language guide, by Fabiano Dalpiaz , Xavier Franch, and Jennifer Horkoff. You can access the full guide through the Help menu"
        }
    }
};

istar.models.buyerDrivenECommerce = {
    "actors": [
        {
            "id": "09c7354b-25e0-4b59-8fd1-38e5925c0ec5",
            "text": "Customer As Buyer [Service]",
            "type": "istar.Actor",
            "x": 31,
            "y": 56,
            "nodes": [
                {
                    "id": "41f6245a-fe65-4b02-9348-1d2a5aa49b61",
                    "text": "Low Price",
                    "type": "istar.Quality",
                    "x": 31,
                    "y": 193
                },
                {
                    "id": "fd9cb71e-7beb-43b4-8bb3-407b94432adb",
                    "text": "Flexibility [Purchasing]",
                    "type": "istar.Quality",
                    "x": 88,
                    "y": 94
                },
                {
                    "id": "cbb50b38-f83c-4871-b545-3bd72f9aac29",
                    "text": "Service Be Purchased [Service]",
                    "type": "istar.Goal",
                    "x": 203,
                    "y": 66,
                    "customProperties": {
                        "Description": "The customer’s main goal is that Service Be Purchased [Service]. The goal is parameterized on Service so that the graph may be evaluated differently for different services."
                    }
                },
                {
                    "id": "c9731a43-8765-450f-aec1-5450d733a923",
                    "text": "Purchase by Naming My Own Price [Service]",
                    "type": "istar.Task",
                    "x": 199,
                    "y": 159,
                    "customProperties": {
                        "Description": "One possible way to accomplish the Service Be Purchased goal is through the task Purchase By Naming My Own Price [Service]. It is connected to the goal with an or-refinement link. This task has two sub-elements connected to it through and-refinement links – the sub-task Name A Price [Service], and the sub-goal Low Price Service Provider Be Found.\n\nNaming one’s own price contributes positively (Help) to the buyer’s desired quality of Low Price, but negatively (Hurt) to Flexibility [Purchasing] because preferences about schedule, choice of airline, etc., could not be accommodated"
                    }
                },
                {
                    "id": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
                    "text": "Name a Price [Service]",
                    "type": "istar.Task",
                    "x": 115,
                    "y": 304
                },
                {
                    "id": "ced7a959-842e-40db-8214-90bebb537259",
                    "text": "Low Price Service Provider Be Found",
                    "type": "istar.Goal",
                    "x": 251,
                    "y": 297
                },
                {
                    "id": "e9d26ca1-da40-4f0a-a10b-f4e5ddaedcb8",
                    "text": "Good Quality [Service]",
                    "type": "istar.Quality",
                    "x": 372,
                    "y": 267,
                    "customProperties": {
                        "Description": ""
                    }
                }
            ]
        },
        {
            "id": "88bdaa42-a903-4744-a515-55ce9b016442",
            "text": "Middleman As Seller [Service]",
            "type": "istar.Actor",
            "x": 639,
            "y": 35,
            "nodes": [
                {
                    "id": "66b6daf0-c676-46c2-8552-dabd042c4163",
                    "text": "Profitability",
                    "type": "istar.Quality",
                    "x": 784,
                    "y": 48
                },
                {
                    "id": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
                    "text": "Customer Attraction [Service]",
                    "type": "istar.Quality",
                    "x": 801,
                    "y": 182
                },
                {
                    "id": "5536a6e3-7a22-4f93-afca-d944ad76e682",
                    "text": "Be Middleman [Service]",
                    "type": "istar.Goal",
                    "x": 1034,
                    "y": 50
                },
                {
                    "id": "be1aa6fc-66dd-40f8-af03-a652352793e1",
                    "text": "Sell in Buyer Driven Style [Service]",
                    "type": "istar.Task",
                    "x": 1046,
                    "y": 135
                },
                {
                    "id": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
                    "text": "Accept Purchase Request with Price",
                    "type": "istar.Task",
                    "x": 859,
                    "y": 310
                },
                {
                    "id": "ef62e89b-1bdd-49ed-959c-be64f45d673a",
                    "text": "Send Modified Request to Supplier",
                    "type": "istar.Task",
                    "x": 1122,
                    "y": 232
                },
                {
                    "id": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
                    "text": "Get Price Agreement From Supplier",
                    "type": "istar.Task",
                    "x": 1075,
                    "y": 322
                },
                {
                    "id": "53516afe-4276-487c-b2f5-62298257e377",
                    "text": "Loyalty",
                    "type": "istar.Quality",
                    "x": 639,
                    "y": 199,
                    "customProperties": {
                        "Description": ""
                    }
                },
                {
                    "id": "05a6b113-d29d-4190-b33e-bf5d7870ba99",
                    "text": "Pay for Purchasing [Service]",
                    "type": "istar.Task",
                    "x": 913,
                    "y": 183,
                    "customProperties": {
                        "Description": ""
                    }
                }
            ]
        },
        {
            "id": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "text": "Supplier [Service]",
            "type": "istar.Actor",
            "x": 839,
            "y": 563,
            "nodes": []
        }
    ],
    "dependencies": [
        {
            "id": "d4beb38e-13e2-4e69-8540-d6ac5780ad36",
            "text": "Name a Price [Service]",
            "type": "istar.Task",
            "x": 488,
            "y": 232,
            "customProperties": {
                "Description": "In a task dependency, an actor depends on another to perform an activity. The activity description specifies a particular course of action. For example, the task dependency Name a Price [Service] expresses that the customer depends on the middleman to name his own price for the service in need by specifying the standard procedure for naming a price."
            },
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "07e4ea3e-bd43-49e3-b41c-38320942dcfb",
            "text": "Low Price Service Provider Be Found",
            "type": "istar.Goal",
            "x": 477,
            "y": 404,
            "customProperties": {
                "Description": "In a goal dependency, an actor depends on another to make a condition in the world come true. The goal dependency Low Price Service Provider be Found from the customer to the middleman means that it is up to the middleman to decide how to find the low price service provider"
            },
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a"
        },
        {
            "id": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6",
            "text": "Acceptable Price [Service]",
            "type": "istar.Quality",
            "x": 172,
            "y": 536,
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "4cff68b2-92bf-4e1c-b802-44daaadfdadd",
            "text": "Attract More Customers [Service]",
            "type": "istar.Quality",
            "x": 643,
            "y": 468,
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c"
        },
        {
            "id": "4407a764-eef0-409e-90da-668fa688b17f",
            "text": "Agreement on Price [P]",
            "type": "istar.Resource",
            "x": 991,
            "y": 458,
            "customProperties": {
                "Description": "In a resource dependency, an actor depends on another for the availability of an entity. The depender takes the availability of the resource to be unproblematic. In this example, the customer’s dependency on the supplier for agreement on price is modelled as a resource dependency"
            },
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "7c51a553-16a7-4e5d-883d-0aa0ee9ae4cf",
            "text": "Good Quality [Service]",
            "type": "istar.Quality",
            "x": 307,
            "y": 476,
            "customProperties": {
                "Description": "The customer’s dependency on the supplier for good quality service can be achieved in different ways. The desired degree of how good the quality should be is ultimately decided by the depender"
            },
            "source": "e9d26ca1-da40-4f0a-a10b-f4e5ddaedcb8",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "62b11734-5a57-4b75-843c-6e1aa99bc8a5",
            "text": "Loyalty",
            "type": "istar.Quality",
            "x": 495,
            "y": 147,
            "customProperties": {
                "Description": ""
            },
            "source": "53516afe-4276-487c-b2f5-62298257e377",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "cf0b6aaa-a607-4e88-9065-b030e98c18f0",
            "text": "Pay for Purchasing [Service]",
            "type": "istar.Task",
            "x": 490,
            "y": 86,
            "customProperties": {
                "Description": ""
            },
            "source": "05a6b113-d29d-4190-b33e-bf5d7870ba99",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        }
    ],
    "links": [
        {
            "id": "9bc7f0d0-59e0-4889-94e8-0f26c8e7a557",
            "type": "istar.DependencyLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "d4beb38e-13e2-4e69-8540-d6ac5780ad36"
        },
        {
            "id": "c92f63ad-90a8-4323-a1c4-eabd803e6a6c",
            "type": "istar.DependencyLink",
            "source": "d4beb38e-13e2-4e69-8540-d6ac5780ad36",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "cacaaf61-5a24-436a-96a8-7c91e5dc2e0a",
            "type": "istar.DependencyLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "07e4ea3e-bd43-49e3-b41c-38320942dcfb"
        },
        {
            "id": "bf177ac0-0e58-42f9-b34d-ea5273310e94",
            "type": "istar.DependencyLink",
            "source": "07e4ea3e-bd43-49e3-b41c-38320942dcfb",
            "target": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a"
        },
        {
            "id": "1818b2db-f879-4462-a411-82a14ae3c861",
            "type": "istar.DependencyLink",
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6"
        },
        {
            "id": "85440206-b98a-4290-9244-2b49198a0205",
            "type": "istar.DependencyLink",
            "source": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "f2b0cbc9-4165-4818-95b8-ebdb2bcdf682",
            "type": "istar.DependencyLink",
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "4cff68b2-92bf-4e1c-b802-44daaadfdadd"
        },
        {
            "id": "797ae0a0-b147-4e44-aba6-2b54582d8d91",
            "type": "istar.DependencyLink",
            "source": "4cff68b2-92bf-4e1c-b802-44daaadfdadd",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c"
        },
        {
            "id": "e16dab80-7af1-489e-9dbc-73c93f656b79",
            "type": "istar.DependencyLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "4407a764-eef0-409e-90da-668fa688b17f"
        },
        {
            "id": "391d982a-a069-4dd6-bb5b-aeaf66be365a",
            "type": "istar.DependencyLink",
            "source": "4407a764-eef0-409e-90da-668fa688b17f",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "195ffcdc-8884-4321-932a-00e5dec79f73",
            "type": "istar.OrRefinementLink",
            "source": "c9731a43-8765-450f-aec1-5450d733a923",
            "target": "cbb50b38-f83c-4871-b545-3bd72f9aac29"
        },
        {
            "id": "87f9cad7-b9cc-49fe-ab58-896acbf19d2a",
            "type": "istar.AndRefinementLink",
            "source": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "416f468d-2df4-4778-b9c1-fe8834287722",
            "type": "istar.OrRefinementLink",
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "5536a6e3-7a22-4f93-afca-d944ad76e682"
        },
        {
            "id": "20119a89-b236-4164-96d2-f98c76a67261",
            "type": "istar.AndRefinementLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "f18a4b6e-11a1-409a-8ad8-893cd2230891",
            "type": "istar.AndRefinementLink",
            "source": "ef62e89b-1bdd-49ed-959c-be64f45d673a",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "cc31d1cb-8436-43cb-a9f7-752752173dbc",
            "type": "istar.AndRefinementLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "df755fd9-b1c4-4427-8735-04fd6c039873",
            "type": "istar.ContributionLink",
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "66b6daf0-c676-46c2-8552-dabd042c4163",
            "label": "help"
        },
        {
            "id": "5ad03ad3-8757-49a5-9dfc-cd3e63ad526e",
            "type": "istar.AndRefinementLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "bf722f05-ed86-4b51-950f-53c88fa55b93",
            "type": "istar.ContributionLink",
            "source": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
            "target": "41f6245a-fe65-4b02-9348-1d2a5aa49b61",
            "label": "help"
        },
        {
            "id": "3808903f-e1c0-48e3-a43f-e728336661c4",
            "type": "istar.ContributionLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "fd9cb71e-7beb-43b4-8bb3-407b94432adb",
            "label": "hurt"
        },
        {
            "id": "5988ab20-38da-46fe-9ef0-eb471a5c4e97",
            "type": "istar.ContributionLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "66b6daf0-c676-46c2-8552-dabd042c4163",
            "label": "hurt"
        },
        {
            "id": "ff4cbf2d-2167-4618-838c-e6c48fd75181",
            "type": "istar.ContributionLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
        },
        {
            "id": "1cbae22c-e5f0-4e06-9b72-503c72d83222",
            "type": "istar.ContributionLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
        },
        {
            "id": "50e90f9a-58cb-4f52-82f7-754c9e50683c",
            "type": "istar.QualificationLink",
            "source": "e9d26ca1-da40-4f0a-a10b-f4e5ddaedcb8",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "80cc9d57-b599-4a73-bdab-2813d316f95d",
            "type": "istar.DependencyLink",
            "source": "e9d26ca1-da40-4f0a-a10b-f4e5ddaedcb8",
            "target": "7c51a553-16a7-4e5d-883d-0aa0ee9ae4cf"
        },
        {
            "id": "97d9f275-e3ec-43da-b139-fd8fb54c2834",
            "type": "istar.DependencyLink",
            "source": "7c51a553-16a7-4e5d-883d-0aa0ee9ae4cf",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "55d7d74e-7fc9-46cd-b6dd-045b597dded5",
            "type": "istar.DependencyLink",
            "source": "53516afe-4276-487c-b2f5-62298257e377",
            "target": "62b11734-5a57-4b75-843c-6e1aa99bc8a5"
        },
        {
            "id": "089059b7-d33b-4fbe-a5fc-e7ff04cd77fd",
            "type": "istar.DependencyLink",
            "source": "62b11734-5a57-4b75-843c-6e1aa99bc8a5",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "d9efb91f-199f-4278-814c-ced8684080c9",
            "type": "istar.ContributionLink",
            "source": "53516afe-4276-487c-b2f5-62298257e377",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
        },
        {
            "id": "abf948ac-9690-437f-b06f-55a74876b189",
            "type": "istar.DependencyLink",
            "source": "05a6b113-d29d-4190-b33e-bf5d7870ba99",
            "target": "cf0b6aaa-a607-4e88-9065-b030e98c18f0"
        },
        {
            "id": "a945654d-4862-4939-9af9-ebed458498f4",
            "type": "istar.DependencyLink",
            "source": "cf0b6aaa-a607-4e88-9065-b030e98c18f0",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "73f4c938-3650-4262-9f62-a45c3b35577c",
            "type": "istar.AndRefinementLink",
            "source": "05a6b113-d29d-4190-b33e-bf5d7870ba99",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        }
    ],
    "display": {
        "cbb50b38-f83c-4871-b545-3bd72f9aac29": {
            "backgroundColor": "#FADF71"
        },
        "c9731a43-8765-450f-aec1-5450d733a923": {
            "backgroundColor": "#FADF71",
            "width": 106.85000610351562,
            "height": 45.90000915527344
        },
        "ced7a959-842e-40db-8214-90bebb537259": {
            "width": 91.85000610351562,
            "height": 51.600006103515625
        },
        "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c": {
            "width": 85.6348876953125,
            "height": 53.16175842285156
        },
        "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4": {
            "width": 128.03334045410156,
            "height": 40.600006103515625
        },
        "ef62e89b-1bdd-49ed-959c-be64f45d673a": {
            "width": 107.03334045410156,
            "height": 38.20001220703125
        },
        "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a": {
            "width": 102.03334045410156,
            "height": 44.600006103515625
        },
        "d4beb38e-13e2-4e69-8540-d6ac5780ad36": {
            "backgroundColor": "#FADF71"
        },
        "07e4ea3e-bd43-49e3-b41c-38320942dcfb": {
            "backgroundColor": "#FADF71",
            "width": 99.85000610351562,
            "height": 46.600006103515625
        },
        "4cff68b2-92bf-4e1c-b802-44daaadfdadd": {
            "width": 89.636962890625,
            "height": 55.161956787109375
        },
        "4407a764-eef0-409e-90da-668fa688b17f": {
            "backgroundColor": "#FADF71"
        },
        "7c51a553-16a7-4e5d-883d-0aa0ee9ae4cf": {
            "backgroundColor": "#FADF71"
        },
        "9bc7f0d0-59e0-4889-94e8-0f26c8e7a557": {
            "vertices": [
                {
                    "x": 688,
                    "y": 271
                }
            ]
        },
        "c92f63ad-90a8-4323-a1c4-eabd803e6a6c": {
            "vertices": [
                {
                    "x": 296,
                    "y": 262
                }
            ]
        },
        "cacaaf61-5a24-436a-96a8-7c91e5dc2e0a": {
            "vertices": [
                {
                    "x": 372,
                    "y": 370
                }
            ]
        },
        "bf177ac0-0e58-42f9-b34d-ea5273310e94": {
            "vertices": [
                {
                    "x": 947,
                    "y": 407
                }
            ]
        },
        "1818b2db-f879-4462-a411-82a14ae3c861": {
            "vertices": [
                {
                    "x": 509,
                    "y": 595
                }
            ]
        },
        "85440206-b98a-4290-9244-2b49198a0205": {
            "vertices": [
                {
                    "x": 159,
                    "y": 444
                }
            ]
        },
        "f2b0cbc9-4165-4818-95b8-ebdb2bcdf682": {
            "vertices": [
                {
                    "x": 721,
                    "y": 556
                }
            ]
        },
        "797ae0a0-b147-4e44-aba6-2b54582d8d91": {
            "vertices": [
                {
                    "x": 697,
                    "y": 443
                },
                {
                    "x": 746,
                    "y": 328
                }
            ]
        },
        "e16dab80-7af1-489e-9dbc-73c93f656b79": {
            "vertices": [
                {
                    "x": 1080,
                    "y": 372
                }
            ]
        },
        "391d982a-a069-4dd6-bb5b-aeaf66be365a": {
            "vertices": [
                {
                    "x": 960,
                    "y": 543
                }
            ]
        },
        "df755fd9-b1c4-4427-8735-04fd6c039873": {
            "vertices": [
                {
                    "x": 863,
                    "y": 150
                }
            ]
        },
        "bf722f05-ed86-4b51-950f-53c88fa55b93": {
            "vertices": [
                {
                    "x": 81,
                    "y": 275
                }
            ]
        },
        "3808903f-e1c0-48e3-a43f-e728336661c4": {
            "vertices": [
                {
                    "x": 131,
                    "y": 195
                }
            ]
        },
        "5988ab20-38da-46fe-9ef0-eb471a5c4e97": {
            "vertices": [
                {
                    "x": 775,
                    "y": 231
                }
            ]
        },
        "1cbae22c-e5f0-4e06-9b72-503c72d83222": {
            "vertices": [
                {
                    "x": 1024,
                    "y": 270
                }
            ]
        },
        "80cc9d57-b599-4a73-bdab-2813d316f95d": {
            "vertices": [
                {
                    "x": 343,
                    "y": 406
                }
            ]
        },
        "97d9f275-e3ec-43da-b139-fd8fb54c2834": {
            "vertices": [
                {
                    "x": 547,
                    "y": 561
                }
            ]
        },
        "55d7d74e-7fc9-46cd-b6dd-045b597dded5": {
            "vertices": [
                {
                    "x": 605,
                    "y": 227
                }
            ]
        },
        "089059b7-d33b-4fbe-a5fc-e7ff04cd77fd": {
            "vertices": [
                {
                    "x": 386,
                    "y": 164
                }
            ]
        },
        "d9efb91f-199f-4278-814c-ced8684080c9": {
            "vertices": [
                {
                    "x": 748,
                    "y": 201
                }
            ]
        },
        "abf948ac-9690-437f-b06f-55a74876b189": {
            "vertices": [
                {
                    "x": 748,
                    "y": 134
                }
            ]
        },
        "a945654d-4862-4939-9af9-ebed458498f4": {
            "vertices": [
                {
                    "x": 425,
                    "y": 116
                }
            ]
        },
        "f9b4f95d-861a-4f71-b3d7-1e75c6dda381": {
            "collapsed": true
        }
    },
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Thu, 14 Mar 2019 14:17:02 GMT",
    "diagram": {
        "width": 1244,
        "height": 700,
        "name": "Buyer-driven e-commerce system",
        "customProperties": {
            "Description": "Example of a buyer-driven e-commerce system. In such a system, the customer depends on a middleman to find a service provider who is willing to accept a price set by the customer. The customer submits a priced request to a middleman. The middleman forwards the request to suppliers. If a supplier decides to accept the request, it makes an agreement with the middleman. The middleman expects the customer to pay for the purchase in time.",
            "Colors": "Checkout the yellow elements, they have textual descriptions",
            "About": "When you collapse every actor, the model becomes a *Strategic Dependency* (SD) model, consisting of a set of nodes and links. Each node represents an actor, and each link between two actors indicates that one actor depends on the other for something in order that the former may attain some goal. We call the depending actor the depender, and the actor who is depended upon the dependee. The object around which the\ndependency relationship centers is called the dependum. By depending on another actor for a dependum, an actor (the depender) is able to achieve goals that it was not able to without the dependency, or not as easily or as well. At the same time, the depender becomes vulnerable. If the dependee fails to deliver the dependum, the depender would be adversely affected in its ability to achieve its goals.\n\nWhen actors are expanded, you have a *Strategic Rationale* (SR) model, which provides a more detailed level of modelling by looking “inside” actors to model internal intentional relationships. Intentional elements (goals, tasks, resources, and qualities) appear in SR models not only as external dependencies, but also as internal elements arranged into (mostly hierarchical) structures of or-refinements, and-refinements, contribution, needed-by and qualification relationships.",
            "Origin": "Model and text based on Eric Yu, Lin Liu, and Ying Li. \"Modelling strategic actor relationships to support intellectual property management.\" International Conference on Conceptual Modeling, 2001. It was adapted to conform to the iStar 2.0 standard, thus it is not an exact copy of the original model."
        }
    }
};