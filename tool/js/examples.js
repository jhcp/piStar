/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
istar.examples = istar.examples || {};  //prevents overriding the variable, while also preventing working with a null variable

istar.examples.loadPistarWelcome = function () {
    loadModel(this.pistarWelcome);
};

// istar.examples.experimentExample = function () {
//     console.log('Go drink some water, this will take a while');
//     var actor = istar.addActor(23, 23, 'Actor');
//     for (var i = 1; i <= 40; i++) {
//         for (var j = 0; j < 25; j++) {
//             var kindOfElement = istar.examples.util.randomIntegerFromMinToMax(0, 4);
//             var x = 10 + i * 30;
//             var y = 10 + j * 30;
//             var name = 'element ' + (j * 40 + i);
//             var priority = istar.examples.util.randomIntegerFromMinToMax(1, 101);
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
// istar.examples.util = {};
// istar.examples.util.randomIntegerFromMinToMax = function (min, max) {
//     //min (included)
//     //max (excluded)
//     return Math.floor(Math.random() * (max - min)) + min;
// };


istar.examples.pistarWelcome = {
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

istar.examples.travelReimbursement = {
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

istar.examples.buyerDrivenECommerce = {
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
                    "x": 93,
                    "y": 117
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
                }
            ]
        },
        {
            "id": "88bdaa42-a903-4744-a515-55ce9b016442",
            "text": "Middleman As Seller [Service]",
            "type": "istar.Actor",
            "x": 628,
            "y": 39,
            "nodes": [
                {
                    "id": "66b6daf0-c676-46c2-8552-dabd042c4163",
                    "text": "Profitability",
                    "type": "istar.Quality",
                    "x": 719,
                    "y": 52
                },
                {
                    "id": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
                    "text": "Customer Attraction [Service]",
                    "type": "istar.Quality",
                    "x": 736,
                    "y": 186
                },
                {
                    "id": "5536a6e3-7a22-4f93-afca-d944ad76e682",
                    "text": "Be Middleman [Service]",
                    "type": "istar.Goal",
                    "x": 868,
                    "y": 65
                },
                {
                    "id": "be1aa6fc-66dd-40f8-af03-a652352793e1",
                    "text": "Sell in Buyer Driven Style [Service]",
                    "type": "istar.Task",
                    "x": 860,
                    "y": 159
                },
                {
                    "id": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
                    "text": "Accept Purchase Request with Price",
                    "type": "istar.Task",
                    "x": 790,
                    "y": 332
                },
                {
                    "id": "ef62e89b-1bdd-49ed-959c-be64f45d673a",
                    "text": "Send Modified Request to Supplier",
                    "type": "istar.Task",
                    "x": 886,
                    "y": 278
                },
                {
                    "id": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
                    "text": "Get Price Agreement From Supplier",
                    "type": "istar.Task",
                    "x": 1004,
                    "y": 270
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
            "id": "4f0d2b0b-fe4c-42a3-adfa-6e57888016ce",
            "text": "Loyalty",
            "type": "istar.Quality",
            "x": 439,
            "y": 143,
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "bdd82c46-be52-42af-9214-b41cc90fb0c3",
            "text": "Pay for Purchasing [Service]",
            "type": "istar.Task",
            "x": 453,
            "y": 97,
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "d4beb38e-13e2-4e69-8540-d6ac5780ad36",
            "text": "Name a Price [Service]",
            "type": "istar.Task",
            "x": 456,
            "y": 212,
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
            "id": "26c69472-2055-4e2a-8b1c-e6899355e7f0",
            "text": "Good Quality [Service]",
            "type": "istar.Quality",
            "x": 402,
            "y": 502,
            "customProperties": {
                "Description": "The customer’s dependency on the supplier for good quality service can be achieved in different ways. The desired degree of how good the quality should be is ultimately decided by the depender"
            },
            "source": "c9731a43-8765-450f-aec1-5450d733a923",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
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
        }
    ],
    "links": [
        {
            "id": "27c4d658-fc21-4e6e-8bfd-ae065c284b7b",
            "type": "istar.DependencyLink",
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "4f0d2b0b-fe4c-42a3-adfa-6e57888016ce"
        },
        {
            "id": "2ea8be5d-f023-466f-85e0-be92446e01b7",
            "type": "istar.DependencyLink",
            "source": "4f0d2b0b-fe4c-42a3-adfa-6e57888016ce",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "751fe42f-1761-4138-b5c6-daa92e10ed3c",
            "type": "istar.DependencyLink",
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "bdd82c46-be52-42af-9214-b41cc90fb0c3"
        },
        {
            "id": "13d7bed7-b769-4bbb-af3b-899c5c61541e",
            "type": "istar.DependencyLink",
            "source": "bdd82c46-be52-42af-9214-b41cc90fb0c3",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "f2f7715c-79f2-423f-85fc-3d99d5b8b58e",
            "type": "istar.DependencyLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "d4beb38e-13e2-4e69-8540-d6ac5780ad36"
        },
        {
            "id": "807f5b18-0704-418c-9144-9b381d7848a9",
            "type": "istar.DependencyLink",
            "source": "d4beb38e-13e2-4e69-8540-d6ac5780ad36",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "9ecfecb3-f272-48c4-abde-4f89f001e44e",
            "type": "istar.DependencyLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "07e4ea3e-bd43-49e3-b41c-38320942dcfb"
        },
        {
            "id": "63da876f-1a6a-47d3-a4da-fc92586d21b9",
            "type": "istar.DependencyLink",
            "source": "07e4ea3e-bd43-49e3-b41c-38320942dcfb",
            "target": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a"
        },
        {
            "id": "a6b2b1ff-acc2-4481-9032-70d5e4565661",
            "type": "istar.DependencyLink",
            "source": "c9731a43-8765-450f-aec1-5450d733a923",
            "target": "26c69472-2055-4e2a-8b1c-e6899355e7f0"
        },
        {
            "id": "8d115d91-edbb-4026-b74b-84390118a19e",
            "type": "istar.DependencyLink",
            "source": "26c69472-2055-4e2a-8b1c-e6899355e7f0",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "0a1f941f-a739-4900-b635-d01de58241a6",
            "type": "istar.DependencyLink",
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6"
        },
        {
            "id": "e8d01264-07a5-41c4-8c06-9c5b6716a519",
            "type": "istar.DependencyLink",
            "source": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "4d7ebe39-64e4-44c2-8274-47e25dca47a5",
            "type": "istar.DependencyLink",
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "4cff68b2-92bf-4e1c-b802-44daaadfdadd"
        },
        {
            "id": "50ccb26e-bb66-47a0-bc37-7f064536e0eb",
            "type": "istar.DependencyLink",
            "source": "4cff68b2-92bf-4e1c-b802-44daaadfdadd",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c"
        },
        {
            "id": "fbff6f50-2f5e-4bf3-88b2-e61f086cb955",
            "type": "istar.DependencyLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "4407a764-eef0-409e-90da-668fa688b17f"
        },
        {
            "id": "546f7273-06b2-4e9d-aa45-853094b8b7ad",
            "type": "istar.DependencyLink",
            "source": "4407a764-eef0-409e-90da-668fa688b17f",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "2cd90362-91c0-47f2-a9ca-96222e76a6ea",
            "type": "istar.OrRefinementLink",
            "source": "c9731a43-8765-450f-aec1-5450d733a923",
            "target": "cbb50b38-f83c-4871-b545-3bd72f9aac29"
        },
        {
            "id": "f92231ad-4a51-40fd-be21-08276d842505",
            "type": "istar.AndRefinementLink",
            "source": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "cf64d33c-e164-4941-acc4-8974180a30b7",
            "type": "istar.OrRefinementLink",
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "5536a6e3-7a22-4f93-afca-d944ad76e682"
        },
        {
            "id": "54b11582-ed1b-4b26-b7d6-e83a190a58cd",
            "type": "istar.AndRefinementLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "67b9ba53-2ada-4b03-a2a0-9fa307fd08f5",
            "type": "istar.AndRefinementLink",
            "source": "ef62e89b-1bdd-49ed-959c-be64f45d673a",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "a6be41a1-081f-4c28-86bf-250caff19c92",
            "type": "istar.AndRefinementLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "680d0be5-1ae3-422a-8943-806fffa82e38",
            "type": "istar.ContributionLink",
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "66b6daf0-c676-46c2-8552-dabd042c4163",
            "label": "help"
        },
        {
            "id": "91941f17-1cd4-44a7-a384-5a6e97d9c7f9",
            "type": "istar.AndRefinementLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "09c4befc-c9d5-4d40-8e2c-c58ea6461fdc",
            "type": "istar.ContributionLink",
            "source": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
            "target": "41f6245a-fe65-4b02-9348-1d2a5aa49b61",
            "label": "help"
        },
        {
            "id": "2e4cf48b-a41d-4e22-a2cc-da519fbdb351",
            "type": "istar.ContributionLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "fd9cb71e-7beb-43b4-8bb3-407b94432adb",
            "label": "hurt"
        },
        {
            "id": "7911dc40-5200-48a4-99c1-ef47c9c54db2",
            "type": "istar.ContributionLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "66b6daf0-c676-46c2-8552-dabd042c4163",
            "label": "hurt"
        },
        {
            "id": "eca7f4d6-db5b-44f7-9b0a-b55be2155f8b",
            "type": "istar.ContributionLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
        },
        {
            "id": "b75b8afc-6b80-4ff3-ba60-c61c292992b6",
            "type": "istar.ContributionLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
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
        "26c69472-2055-4e2a-8b1c-e6899355e7f0": {
            "backgroundColor": "#FADF71"
        },
        "4cff68b2-92bf-4e1c-b802-44daaadfdadd": {
            "width": 89.636962890625,
            "height": 55.161956787109375
        },
        "4407a764-eef0-409e-90da-668fa688b17f": {
            "backgroundColor": "#FADF71"
        },
        "27c4d658-fc21-4e6e-8bfd-ae065c284b7b": {
            "vertices": [
                {
                    "x": 640,
                    "y": 182
                }
            ]
        },
        "2ea8be5d-f023-466f-85e0-be92446e01b7": {
            "vertices": [
                {
                    "x": 373,
                    "y": 160
                }
            ]
        },
        "751fe42f-1761-4138-b5c6-daa92e10ed3c": {
            "vertices": [
                {
                    "x": 808,
                    "y": 132
                }
            ]
        },
        "13d7bed7-b769-4bbb-af3b-899c5c61541e": {
            "vertices": [
                {
                    "x": 361,
                    "y": 128
                }
            ]
        },
        "f2f7715c-79f2-423f-85fc-3d99d5b8b58e": {
            "vertices": [
                {
                    "x": 677,
                    "y": 273
                }
            ]
        },
        "807f5b18-0704-418c-9144-9b381d7848a9": {
            "vertices": [
                {
                    "x": 304,
                    "y": 237
                }
            ]
        },
        "9ecfecb3-f272-48c4-abde-4f89f001e44e": {
            "vertices": [
                {
                    "x": 372,
                    "y": 370
                }
            ]
        },
        "63da876f-1a6a-47d3-a4da-fc92586d21b9": {
            "vertices": [
                {
                    "x": 947,
                    "y": 407
                }
            ]
        },
        "a6b2b1ff-acc2-4481-9032-70d5e4565661": {
            "vertices": [
                {
                    "x": 229,
                    "y": 397
                },
                {
                    "x": 284,
                    "y": 497
                }
            ]
        },
        "8d115d91-edbb-4026-b74b-84390118a19e": {
            "vertices": [
                {
                    "x": 626,
                    "y": 570
                }
            ]
        },
        "0a1f941f-a739-4900-b635-d01de58241a6": {
            "vertices": [
                {
                    "x": 509,
                    "y": 595
                }
            ]
        },
        "e8d01264-07a5-41c4-8c06-9c5b6716a519": {
            "vertices": [
                {
                    "x": 159,
                    "y": 444
                }
            ]
        },
        "4d7ebe39-64e4-44c2-8274-47e25dca47a5": {
            "vertices": [
                {
                    "x": 721,
                    "y": 556
                }
            ]
        },
        "50ccb26e-bb66-47a0-bc37-7f064536e0eb": {
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
        "fbff6f50-2f5e-4bf3-88b2-e61f086cb955": {
            "vertices": [
                {
                    "x": 1080,
                    "y": 372
                }
            ]
        },
        "546f7273-06b2-4e9d-aa45-853094b8b7ad": {
            "vertices": [
                {
                    "x": 960,
                    "y": 543
                }
            ]
        },
        "680d0be5-1ae3-422a-8943-806fffa82e38": {
            "vertices": [
                {
                    "x": 798,
                    "y": 154
                }
            ]
        },
        "09c4befc-c9d5-4d40-8e2c-c58ea6461fdc": {
            "vertices": [
                {
                    "x": 81,
                    "y": 275
                }
            ]
        },
        "2e4cf48b-a41d-4e22-a2cc-da519fbdb351": {
            "vertices": [
                {
                    "x": 123,
                    "y": 206
                }
            ]
        },
        "7911dc40-5200-48a4-99c1-ef47c9c54db2": {
            "vertices": [
                {
                    "x": 710,
                    "y": 235
                }
            ]
        },
        "b75b8afc-6b80-4ff3-ba60-c61c292992b6": {
            "vertices": [
                {
                    "x": 981,
                    "y": 251
                }
            ]
        },
        "f9b4f95d-861a-4f71-b3d7-1e75c6dda381": {
            "collapsed": true
        }
    },
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Fri, 28 Dec 2018 15:40:41 GMT",
    "diagram": {
        "width": 1200,
        "height": 700,
        "name": "Buyer-driven e-commerce system",
        "customProperties": {
            "Description": "Example of a buyer-driven e-commerce system. In such a system, the customer depends on a middleman to find a service provider who is willing to accept a price set by the customer. The customer submits a priced request to a middleman. The middleman forwards the request to suppliers. If a supplier decides to accept the request, it makes an agreement with the middleman. The middleman expects the customer to pay for the purchase in time.",
            "Colors": "Checkout the yellow elements, they have textual descriptions",
            "About": "When you collapse every actor, the model becomes a *Strategic Dependency* (SD) model, consisting of a set of nodes and links. Each node represents an actor, and each link between two actors indicates that one actor depends on the other for something in order that the former may attain some goal. We call the depending actor the depender, and the actor who is depended upon the dependee. The object around which the\ndependency relationship centers is called the dependum. By depending on another actor for a dependum, an actor (the depender) is able to achieve goals that it was not able to without the dependency, or not as easily or as well. At the same time, the depender becomes vulnerable. If the dependee fails to deliver the dependum, the depender would be adversely affected in its ability to achieve its goals.\n\nWhen actors are expanded, you have a *Strategic Rationale* (SR) model, which provides a more detailed level of modelling by looking “inside” actors to model internal intentional relationships. Intentional elements (goals, tasks, resources, and qualities) appear in SR models not only as external dependencies, but also as internal elements arranged into (mostly hierarchical) structures of or-refinements, and-refinements, contribution, needed-by and qualification relationships.",
            "Origin": "Model and text based on Eric Yu, Lin Liu, and Ying Li. \"Modelling strategic actor relationships to support intellectual property management.\" International Conference on Conceptual Modeling, 2001."
        }
    }
};

istar.examples.everyElementAndLink = {
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
            "Origin": "Model created by João Pimentel (UFRPE/Brazil). Concepts mostly copied from the iStar 2.0 language guide, by Fabiano Dalpiaz , Xavier Franch, and Jennifer Horkoff. You can access the full guide through the Help menu"
        }
    }
};
