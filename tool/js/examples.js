/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
istar.examples = istar.examples || {};  //prevents overriding the variable, while also preventing working with a null variable

istar.examples.loadPistarWelcome = function () {
    loadModel(this.pistarWelcome);
};

istar.examples.loadTravelReimbursement = function () {
    loadModel(this.travelReimbursement);
};

istar.examples.loadBuyerDrivenECommerce = function () {
    loadModel(this.buyerDrivenECommerce);
};

istar.examples.loadEveryElementAndLink = function () {
    loadModel(this.everyElementAndLink);
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
            "x": 119,
            "y": 49,
            "nodes": [
                {
                    "id": "71c7aeb6-fb99-40a1-bcd1-5a29e5b45252",
                    "text": "i* models created",
                    "type": "istar.Goal",
                    "x": 320,
                    "y": 88
                },
                {
                    "id": "8d716a61-1ca4-44f4-934c-26166ea44d11",
                    "text": "Use piStar",
                    "type": "istar.Task",
                    "x": 291,
                    "y": 170
                },
                {
                    "id": "e159ce92-b29d-4fdc-a533-ee1e904f9f57",
                    "text": "Good Quality",
                    "type": "istar.Quality",
                    "x": 190,
                    "y": 65
                }
            ]
        }
    ],
    "dependencies": [],
    "links": [
        {
            "id": "de114c37-510c-4d81-a664-e7e34ca164e0",
            "type": "istar.AndRefinementLink",
            "source": "8d716a61-1ca4-44f4-934c-26166ea44d11",
            "target": "71c7aeb6-fb99-40a1-bcd1-5a29e5b45252"
        },
        {
            "id": "e5ea3334-f0a6-4d0d-8f30-fc651aca693f",
            "type": "istar.ContributionLink",
            "source": "8d716a61-1ca4-44f4-934c-26166ea44d11",
            "target": "e159ce92-b29d-4fdc-a533-ee1e904f9f57",
            "label": "help"
        }
    ],
    "display": {
        "e5ea3334-f0a6-4d0d-8f30-fc651aca693f": {
            "vertices": [
                {
                    "x": 200,
                    "y": 180
                }
            ]
        }
    },
    "tool": "pistar.1.0.1",
    "istar": "2.0",
    "saveDate": "Sat, 10 Mar 2018 23:46:16 GMT",
    "diagram": {
        "width": 1700,
        "height": 1300
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
                    "text": "Accommodati on booked",
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
            "id": "ddb052be-c62f-4215-9bd1-b23ae3e2ddfe",
            "type": "istar.DependencyLink",
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "fe9bc590-394b-4585-be24-66419eb353b9"
        },
        {
            "id": "f941a127-da62-4a9c-8a64-81fbf45286c3",
            "type": "istar.DependencyLink",
            "source": "fe9bc590-394b-4585-be24-66419eb353b9",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "67b641af-0413-4592-8725-df3afa396866",
            "type": "istar.DependencyLink",
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "dc25d9f6-7aea-46fd-8b59-1e317f5017f1"
        },
        {
            "id": "c808b404-4c74-4123-8836-904b96b8dff7",
            "type": "istar.DependencyLink",
            "source": "dc25d9f6-7aea-46fd-8b59-1e317f5017f1",
            "target": "9544119c-dd79-417e-8a19-6f67455d784b"
        },
        {
            "id": "ce3b7974-e7a7-4905-af45-a31136a31a63",
            "type": "istar.DependencyLink",
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "f26ec7d2-3133-42b0-b54c-2b4695e9ee1b"
        },
        {
            "id": "41f3e904-b669-4178-9344-cf8fd0dff4f1",
            "type": "istar.DependencyLink",
            "source": "f26ec7d2-3133-42b0-b54c-2b4695e9ee1b",
            "target": "3c57900f-ba6a-4277-ba86-a688b23628a8"
        },
        {
            "id": "85b3f18a-c274-480d-8a1f-c7d0bce5d67f",
            "type": "istar.AndRefinementLink",
            "source": "7897dbdc-5dd5-4332-9e31-cac22e01f1e1",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "9d369bc4-9676-4612-8ee4-e30823dec83e",
            "type": "istar.AndRefinementLink",
            "source": "609eedc5-29e7-4360-b9ad-5ca23076033c",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "fb7da26f-1eb8-483b-9809-fbecf697dad2",
            "type": "istar.AndRefinementLink",
            "source": "334c70d0-7786-4dda-8340-aa63c921bc03",
            "target": "ac7c22c2-6538-4fe3-a14f-8f8a2233a472"
        },
        {
            "id": "a9be70e5-fdfe-4ddf-98c6-d2cd1a72a332",
            "type": "istar.IsALink",
            "source": "c7b6f310-8fab-4181-8323-a4190cd35c26",
            "target": "830b5ef8-0f41-4a17-ba2a-ba4a8f4e799b"
        },
        {
            "id": "9bc7ee5c-8b84-4028-a343-95e81e6500f3",
            "type": "istar.ParticipatesInLink",
            "source": "77f4dfe4-1af2-4271-bbfa-0f5892cad0e4",
            "target": "c7b6f310-8fab-4181-8323-a4190cd35c26"
        },
        {
            "id": "8973ae0d-aa9e-4e16-a75e-7521a212ff66",
            "type": "istar.AndRefinementLink",
            "source": "d7350e31-1d29-46b0-bce5-e191189720cd",
            "target": "8f5b5975-10bc-44b5-92b2-c53e2394b2c9"
        },
        {
            "id": "00631d53-57d0-4a3c-94c4-e72845704cfc",
            "type": "istar.AndRefinementLink",
            "source": "c3f53c8d-b421-4c60-8dbf-03b07978295b",
            "target": "d7350e31-1d29-46b0-bce5-e191189720cd"
        },
        {
            "id": "051aeed0-6e45-44e6-a5c5-c6e409afed1d",
            "type": "istar.AndRefinementLink",
            "source": "4e767af4-fd1e-4e3e-8a82-3740521e576a",
            "target": "d7350e31-1d29-46b0-bce5-e191189720cd"
        },
        {
            "id": "18ab31d8-e424-42fe-856f-edbbf8f59cbc",
            "type": "istar.OrRefinementLink",
            "source": "191249f9-d249-47db-b5f2-c09449307eb4",
            "target": "c3f53c8d-b421-4c60-8dbf-03b07978295b"
        },
        {
            "id": "c21268d7-4747-408f-8bef-7bef4d8a539a",
            "type": "istar.OrRefinementLink",
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "c3f53c8d-b421-4c60-8dbf-03b07978295b"
        },
        {
            "id": "da75c221-ff52-4212-87c0-77c1c40a5ee9",
            "type": "istar.QualificationLink",
            "source": "0055d468-1097-43b2-95bf-1781730b1985",
            "target": "c3f53c8d-b421-4c60-8dbf-03b07978295b"
        },
        {
            "id": "3e2560e2-935c-40eb-a741-91652b9c23f9",
            "type": "istar.OrRefinementLink",
            "source": "37b28c3f-7554-4c62-91cd-44cac0873977",
            "target": "4e767af4-fd1e-4e3e-8a82-3740521e576a"
        },
        {
            "id": "fec0fdd1-fdff-4b7d-9454-1f2fb90d44a8",
            "type": "istar.OrRefinementLink",
            "source": "102cbb1c-5600-4058-bed9-cc9e1ad1d9e9",
            "target": "4e767af4-fd1e-4e3e-8a82-3740521e576a"
        },
        {
            "id": "489c481d-3442-4b65-b2d2-4bddfc9c5879",
            "type": "istar.ContributionLink",
            "source": "191249f9-d249-47db-b5f2-c09449307eb4",
            "target": "0055d468-1097-43b2-95bf-1781730b1985",
            "label": "hurt"
        },
        {
            "id": "8cfba3d6-791f-42fb-aa30-509f5fdfd8a8",
            "type": "istar.ContributionLink",
            "source": "9bb7e927-3dee-4485-8fda-01954d324c88",
            "target": "0055d468-1097-43b2-95bf-1781730b1985",
            "label": "help"
        },
        {
            "id": "b458c670-8ab1-4d56-be9d-10b4ba8ab311",
            "type": "istar.ContributionLink",
            "source": "37b28c3f-7554-4c62-91cd-44cac0873977",
            "target": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "label": "help"
        },
        {
            "id": "f1a68ee0-9415-4391-ae7f-32826886906a",
            "type": "istar.ContributionLink",
            "source": "102cbb1c-5600-4058-bed9-cc9e1ad1d9e9",
            "target": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "label": "break"
        },
        {
            "id": "389b2fdf-d3a6-445c-9336-c2401a6df1e2",
            "type": "istar.AndRefinementLink",
            "source": "16d9b9bf-fdef-4832-8f7d-8dcb42513371",
            "target": "8f5b5975-10bc-44b5-92b2-c53e2394b2c9"
        },
        {
            "id": "3e773b8a-4f33-4ba0-8ff3-c5f95a4f811d",
            "type": "istar.OrRefinementLink",
            "source": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d",
            "target": "16d9b9bf-fdef-4832-8f7d-8dcb42513371"
        },
        {
            "id": "ad797322-54f0-4376-b933-fc61b4ebfe9f",
            "type": "istar.OrRefinementLink",
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "16d9b9bf-fdef-4832-8f7d-8dcb42513371"
        },
        {
            "id": "b4ae53e5-7a61-4512-93a9-8a32987e5fcf",
            "type": "istar.AndRefinementLink",
            "source": "f34b98b9-6cba-4410-8a49-451e00049e43",
            "target": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d"
        },
        {
            "id": "d93cd6bb-efce-4666-b2a0-351a94725d4e",
            "type": "istar.AndRefinementLink",
            "source": "94b43d28-480c-4a22-92ed-c8ba69a1d111",
            "target": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d"
        },
        {
            "id": "aa8e1ca9-a8a2-49de-85b5-cce1e559b6e4",
            "type": "istar.OrRefinementLink",
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "f34b98b9-6cba-4410-8a49-451e00049e43"
        },
        {
            "id": "493b4891-23f1-489d-b8ed-f91e347748d7",
            "type": "istar.OrRefinementLink",
            "source": "11d870d2-7987-45c9-a36a-7b177219ae50",
            "target": "f34b98b9-6cba-4410-8a49-451e00049e43"
        },
        {
            "id": "769ab616-746b-4e79-86f1-49fe9dba60e5",
            "type": "istar.OrRefinementLink",
            "source": "89643e71-e10f-4474-9ac6-3ddd413bfda8",
            "target": "94b43d28-480c-4a22-92ed-c8ba69a1d111"
        },
        {
            "id": "320b32f2-3889-4380-b95f-e903c0444b16",
            "type": "istar.OrRefinementLink",
            "source": "b73684df-4238-47d2-ae5a-e9d88df9559a",
            "target": "94b43d28-480c-4a22-92ed-c8ba69a1d111"
        },
        {
            "id": "37ba1dc5-53a2-4b9a-9d6c-d140748db5f7",
            "type": "istar.AndRefinementLink",
            "source": "1747e206-fa35-4229-b4be-67b3893e84d1",
            "target": "11d870d2-7987-45c9-a36a-7b177219ae50"
        },
        {
            "id": "cf6f8efd-c17a-487e-b0c8-678a375bab6b",
            "type": "istar.AndRefinementLink",
            "source": "49da8a06-b243-4c6e-9c50-dded496bec94",
            "target": "11d870d2-7987-45c9-a36a-7b177219ae50"
        },
        {
            "id": "dec0a41b-b870-484b-80ea-029679ad7e52",
            "type": "istar.NeededByLink",
            "source": "8a867e08-5a70-4816-ab02-1d84cf1b79dd",
            "target": "49da8a06-b243-4c6e-9c50-dded496bec94"
        },
        {
            "id": "a7742406-b982-4ff3-ad41-b54733a1abbe",
            "type": "istar.OrRefinementLink",
            "source": "13efea03-96a0-4162-b89e-f46efc9a96c4",
            "target": "b73684df-4238-47d2-ae5a-e9d88df9559a"
        },
        {
            "id": "66863b26-37c0-46b0-be1d-4d763501c21d",
            "type": "istar.OrRefinementLink",
            "source": "59d154e2-8af7-48da-9f55-195ffebab399",
            "target": "b73684df-4238-47d2-ae5a-e9d88df9559a"
        },
        {
            "id": "5eaadd36-8b49-4fbd-b3ee-7be1873f319f",
            "type": "istar.ParticipatesInLink",
            "source": "9ebf064b-88e2-48e0-9a63-7adda0ae89d0",
            "target": "a0b5233e-414b-4c96-b87c-45d3167c1ea6"
        },
        {
            "id": "b648c4b5-e073-4cae-97f9-af1b73e377b5",
            "type": "istar.QualificationLink",
            "source": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "target": "d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d"
        },
        {
            "id": "af2f0fc1-c89c-4c35-8490-cec27b05ff52",
            "type": "istar.ContributionLink",
            "source": "11d870d2-7987-45c9-a36a-7b177219ae50",
            "target": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "label": "help"
        },
        {
            "id": "3b4e03a6-ddbe-4b4b-9a19-8e9636f76d7d",
            "type": "istar.ContributionLink",
            "source": "0afa08e3-2306-40c8-9d40-2c144b748664",
            "target": "c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397",
            "label": "help"
        },
        {
            "id": "6d850692-483f-490b-a641-e710a5613d45",
            "type": "istar.ContributionLink",
            "source": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "target": "c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397",
            "label": "help"
        },
        {
            "id": "f3179685-9e8a-4f88-8b7b-fe4cd03322f6",
            "type": "istar.ContributionLink",
            "source": "4934265e-abf6-4fe1-91c9-38c2a6aadcb0",
            "target": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "label": "help"
        },
        {
            "id": "34f2d9db-93e7-4b2f-a2c5-25323edafe63",
            "type": "istar.ContributionLink",
            "source": "11d870d2-7987-45c9-a36a-7b177219ae50",
            "target": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "label": "hurt"
        },
        {
            "id": "55a8ae1f-060c-4ba4-b842-b5c5f292d924",
            "type": "istar.ContributionLink",
            "source": "f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d",
            "target": "685e4589-9717-487f-aa94-2eab2f7c5b46",
            "label": "make"
        }
    ],
    "display": {
        "ddb052be-c62f-4215-9bd1-b23ae3e2ddfe": {
            "vertices": [
                {
                    "x": 427,
                    "y": 573
                }
            ]
        },
        "f941a127-da62-4a9c-8a64-81fbf45286c3": {
            "vertices": [
                {
                    "x": 402,
                    "y": 765
                }
            ]
        },
        "67b641af-0413-4592-8725-df3afa396866": {
            "vertices": [
                {
                    "x": 1115,
                    "y": 282
                }
            ]
        },
        "c808b404-4c74-4123-8836-904b96b8dff7": {
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
        "ce3b7974-e7a7-4905-af45-a31136a31a63": {
            "vertices": [
                {
                    "x": 598,
                    "y": 598
                },
                {
                    "x": 632,
                    "y": 726
                }
            ]
        },
        "41f3e904-b669-4178-9344-cf8fd0dff4f1": {
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
        "489c481d-3442-4b65-b2d2-4bddfc9c5879": {
            "vertices": [
                {
                    "x": 287,
                    "y": 328
                }
            ]
        },
        "8cfba3d6-791f-42fb-aa30-509f5fdfd8a8": {
            "vertices": [
                {
                    "x": 367,
                    "y": 358
                }
            ]
        },
        "b458c670-8ab1-4d56-be9d-10b4ba8ab311": {
            "vertices": [
                {
                    "x": 458,
                    "y": 330
                }
            ]
        },
        "f1a68ee0-9415-4391-ae7f-32826886906a": {
            "vertices": [
                {
                    "x": 504,
                    "y": 332
                }
            ]
        },
        "af2f0fc1-c89c-4c35-8490-cec27b05ff52": {
            "vertices": [
                {
                    "x": 595,
                    "y": 387
                }
            ]
        },
        "3b4e03a6-ddbe-4b4b-9a19-8e9636f76d7d": {
            "vertices": [
                {
                    "x": 482,
                    "y": 521
                }
            ]
        },
        "6d850692-483f-490b-a641-e710a5613d45": {
            "vertices": [
                {
                    "x": 737,
                    "y": 649
                }
            ]
        },
        "f3179685-9e8a-4f88-8b7b-fe4cd03322f6": {
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
        "34f2d9db-93e7-4b2f-a2c5-25323edafe63": {
            "vertices": [
                {
                    "x": 877,
                    "y": 502
                }
            ]
        },
        "55a8ae1f-060c-4ba4-b842-b5c5f292d924": {
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
    "tool": "pistar.1.0.1",
    "istar": "2.0",
    "saveDate": "Sat, 10 Mar 2018 23:32:12 GMT",
    "diagram": {
        "width": 1500,
        "height": 1100
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
                    "y": 66
                },
                {
                    "id": "c9731a43-8765-450f-aec1-5450d733a923",
                    "text": "Purchase by Naming My Own Price [Service]",
                    "type": "istar.Task",
                    "x": 199,
                    "y": 159
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
                    "x": 248,
                    "y": 293
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
                    "x": 714,
                    "y": 62
                },
                {
                    "id": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
                    "text": "Customer Attraction [Service]",
                    "type": "istar.Quality",
                    "x": 749,
                    "y": 189
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
            "x": 442,
            "y": 19,
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "bdd82c46-be52-42af-9214-b41cc90fb0c3",
            "text": "Pay for Purchasing [Service]",
            "type": "istar.Task",
            "x": 437,
            "y": 98,
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "d4beb38e-13e2-4e69-8540-d6ac5780ad36",
            "text": "Name a Price [Service]",
            "type": "istar.Task",
            "x": 456,
            "y": 212,
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "07e4ea3e-bd43-49e3-b41c-38320942dcfb",
            "text": "Low Price Service Provider Be Found",
            "type": "istar.Goal",
            "x": 477,
            "y": 404,
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a"
        },
        {
            "id": "26c69472-2055-4e2a-8b1c-e6899355e7f0",
            "text": "Good Quality [Service]",
            "type": "istar.Quality",
            "x": 397,
            "y": 534,
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
            "x": 650,
            "y": 475,
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c"
        },
        {
            "id": "4407a764-eef0-409e-90da-668fa688b17f",
            "text": "Agreement on Price [P]",
            "type": "istar.Resource",
            "x": 991,
            "y": 458,
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        }
    ],
    "links": [
        {
            "id": "a471561a-9363-4021-9103-b296e2768bea",
            "type": "istar.DependencyLink",
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "4f0d2b0b-fe4c-42a3-adfa-6e57888016ce"
        },
        {
            "id": "0deee214-9951-4165-97c4-e00eddfb3141",
            "type": "istar.DependencyLink",
            "source": "4f0d2b0b-fe4c-42a3-adfa-6e57888016ce",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "88576b2d-8dde-4431-ad1e-43914f8343aa",
            "type": "istar.DependencyLink",
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "bdd82c46-be52-42af-9214-b41cc90fb0c3"
        },
        {
            "id": "85a457fe-abc0-4413-b1cb-2f15ebc446d8",
            "type": "istar.DependencyLink",
            "source": "bdd82c46-be52-42af-9214-b41cc90fb0c3",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "7b1d98e8-8371-4dfe-8ff4-212f4ddf98a6",
            "type": "istar.DependencyLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "d4beb38e-13e2-4e69-8540-d6ac5780ad36"
        },
        {
            "id": "d4399f26-441c-44b5-a3f4-ef5e45e13fb3",
            "type": "istar.DependencyLink",
            "source": "d4beb38e-13e2-4e69-8540-d6ac5780ad36",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "beee4c3b-b65c-458b-a7ca-4d5bd28b7075",
            "type": "istar.DependencyLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "07e4ea3e-bd43-49e3-b41c-38320942dcfb"
        },
        {
            "id": "53b887d9-fc5b-4a1d-8798-e04f69c08680",
            "type": "istar.DependencyLink",
            "source": "07e4ea3e-bd43-49e3-b41c-38320942dcfb",
            "target": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a"
        },
        {
            "id": "115f20df-c841-453f-ab3e-bde5fa2e8a7e",
            "type": "istar.DependencyLink",
            "source": "c9731a43-8765-450f-aec1-5450d733a923",
            "target": "26c69472-2055-4e2a-8b1c-e6899355e7f0"
        },
        {
            "id": "e15ad3e4-78e1-4354-804f-c8e514f402f0",
            "type": "istar.DependencyLink",
            "source": "26c69472-2055-4e2a-8b1c-e6899355e7f0",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "bcee45ee-f43d-4d3d-97d7-4197956fb559",
            "type": "istar.DependencyLink",
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6"
        },
        {
            "id": "cc95000c-c860-4efa-85a9-6ced5ac14cbc",
            "type": "istar.DependencyLink",
            "source": "a77ec4dd-ab7d-463c-82fd-928cf3dde4c6",
            "target": "ed027de5-ce0c-4544-bd6f-13da198dff2a"
        },
        {
            "id": "9ccb89f3-2bf0-4ca1-911c-a68bf5fb5dbc",
            "type": "istar.DependencyLink",
            "source": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381",
            "target": "4cff68b2-92bf-4e1c-b802-44daaadfdadd"
        },
        {
            "id": "2cf41527-d0f9-4bf8-8db9-2bf824deb67c",
            "type": "istar.DependencyLink",
            "source": "4cff68b2-92bf-4e1c-b802-44daaadfdadd",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c"
        },
        {
            "id": "07313247-b064-495d-bbbe-3bc3fe03cd93",
            "type": "istar.DependencyLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "4407a764-eef0-409e-90da-668fa688b17f"
        },
        {
            "id": "bd32f342-c1ec-45f8-8dc4-97bc33118705",
            "type": "istar.DependencyLink",
            "source": "4407a764-eef0-409e-90da-668fa688b17f",
            "target": "f9b4f95d-861a-4f71-b3d7-1e75c6dda381"
        },
        {
            "id": "a7e68b4e-f308-492d-bce7-0993efabc40d",
            "type": "istar.OrRefinementLink",
            "source": "c9731a43-8765-450f-aec1-5450d733a923",
            "target": "cbb50b38-f83c-4871-b545-3bd72f9aac29"
        },
        {
            "id": "86002901-6518-4bea-883d-595ccbd1236a",
            "type": "istar.AndRefinementLink",
            "source": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "6b535e90-5f85-443e-96d9-8362a2805530",
            "type": "istar.OrRefinementLink",
            "source": "be1aa6fc-66dd-40f8-af03-a652352793e1",
            "target": "5536a6e3-7a22-4f93-afca-d944ad76e682"
        },
        {
            "id": "84ed3d1e-fe36-46fd-b179-a061efe8d4da",
            "type": "istar.AndRefinementLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "8b957d0c-90ed-41a5-a136-a3cc02f1e3d9",
            "type": "istar.AndRefinementLink",
            "source": "ef62e89b-1bdd-49ed-959c-be64f45d673a",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "4505b684-4367-428c-b0f7-e77e9999c502",
            "type": "istar.AndRefinementLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "be1aa6fc-66dd-40f8-af03-a652352793e1"
        },
        {
            "id": "0c84cc82-1da6-490a-860b-b6f21c4e7904",
            "type": "istar.ContributionLink",
            "source": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "target": "66b6daf0-c676-46c2-8552-dabd042c4163",
            "label": "help"
        },
        {
            "id": "170b8775-b02a-46aa-8b62-0c378a5e2241",
            "type": "istar.AndRefinementLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "c9731a43-8765-450f-aec1-5450d733a923"
        },
        {
            "id": "66b4b909-91f5-4323-821b-cd849b3e2bd5",
            "type": "istar.ContributionLink",
            "source": "ed027de5-ce0c-4544-bd6f-13da198dff2a",
            "target": "41f6245a-fe65-4b02-9348-1d2a5aa49b61",
            "label": "help"
        },
        {
            "id": "63d114e8-9b8d-40cf-bba7-f1eada4e469c",
            "type": "istar.ContributionLink",
            "source": "ced7a959-842e-40db-8214-90bebb537259",
            "target": "fd9cb71e-7beb-43b4-8bb3-407b94432adb",
            "label": "hurt"
        },
        {
            "id": "efa8a610-fd56-4a44-a8a3-a1767e0c0982",
            "type": "istar.ContributionLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "66b6daf0-c676-46c2-8552-dabd042c4163",
            "label": "hurt"
        },
        {
            "id": "299c9f2e-1211-4fc1-8d2e-d0d36db3e24d",
            "type": "istar.ContributionLink",
            "source": "afbabeb8-bf7c-432f-bc12-3cf1d2142ba4",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
        },
        {
            "id": "437313fe-4ec0-45c0-984f-b134c1ef2b07",
            "type": "istar.ContributionLink",
            "source": "eaf58ea7-2db6-4ab1-9ed4-6b457ac0661a",
            "target": "b389b51d-d8ef-4b7a-9b7c-e48b9fdb528c",
            "label": "help"
        }
    ],
    "display": {
        "a471561a-9363-4021-9103-b296e2768bea": {
            "vertices": [
                {
                    "x": 640,
                    "y": 182
                },
                {
                    "x": 553,
                    "y": 67
                }
            ]
        },
        "0deee214-9951-4165-97c4-e00eddfb3141": {
            "vertices": [
                {
                    "x": 358,
                    "y": 75
                }
            ]
        },
        "88576b2d-8dde-4431-ad1e-43914f8343aa": {
            "vertices": [
                {
                    "x": 808,
                    "y": 132
                }
            ]
        },
        "85a457fe-abc0-4413-b1cb-2f15ebc446d8": {
            "vertices": [
                {
                    "x": 361,
                    "y": 128
                }
            ]
        },
        "7b1d98e8-8371-4dfe-8ff4-212f4ddf98a6": {
            "vertices": [
                {
                    "x": 677,
                    "y": 273
                }
            ]
        },
        "d4399f26-441c-44b5-a3f4-ef5e45e13fb3": {
            "vertices": [
                {
                    "x": 304,
                    "y": 237
                }
            ]
        },
        "beee4c3b-b65c-458b-a7ca-4d5bd28b7075": {
            "vertices": [
                {
                    "x": 372,
                    "y": 370
                }
            ]
        },
        "53b887d9-fc5b-4a1d-8798-e04f69c08680": {
            "vertices": [
                {
                    "x": 947,
                    "y": 407
                }
            ]
        },
        "115f20df-c841-453f-ab3e-bde5fa2e8a7e": {
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
        "e15ad3e4-78e1-4354-804f-c8e514f402f0": {
            "vertices": [
                {
                    "x": 626,
                    "y": 570
                }
            ]
        },
        "bcee45ee-f43d-4d3d-97d7-4197956fb559": {
            "vertices": [
                {
                    "x": 509,
                    "y": 595
                }
            ]
        },
        "cc95000c-c860-4efa-85a9-6ced5ac14cbc": {
            "vertices": [
                {
                    "x": 159,
                    "y": 444
                }
            ]
        },
        "9ccb89f3-2bf0-4ca1-911c-a68bf5fb5dbc": {
            "vertices": [
                {
                    "x": 721,
                    "y": 556
                }
            ]
        },
        "2cf41527-d0f9-4bf8-8db9-2bf824deb67c": {
            "vertices": [
                {
                    "x": 746,
                    "y": 328
                }
            ]
        },
        "07313247-b064-495d-bbbe-3bc3fe03cd93": {
            "vertices": [
                {
                    "x": 1080,
                    "y": 372
                }
            ]
        },
        "bd32f342-c1ec-45f8-8dc4-97bc33118705": {
            "vertices": [
                {
                    "x": 960,
                    "y": 543
                }
            ]
        },
        "0c84cc82-1da6-490a-860b-b6f21c4e7904": {
            "vertices": [
                {
                    "x": 791,
                    "y": 131
                }
            ]
        },
        "66b4b909-91f5-4323-821b-cd849b3e2bd5": {
            "vertices": [
                {
                    "x": 81,
                    "y": 275
                }
            ]
        },
        "63d114e8-9b8d-40cf-bba7-f1eada4e469c": {
            "vertices": [
                {
                    "x": 142,
                    "y": 223
                }
            ]
        },
        "efa8a610-fd56-4a44-a8a3-a1767e0c0982": {
            "vertices": [
                {
                    "x": 736,
                    "y": 239
                }
            ]
        },
        "299c9f2e-1211-4fc1-8d2e-d0d36db3e24d": {
            "vertices": []
        },
        "437313fe-4ec0-45c0-984f-b134c1ef2b07": {
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
    "tool": "pistar.1.0.1",
    "istar": "2.0",
    "saveDate": "Sun, 11 Mar 2018 00:28:56 GMT",
    "diagram": {
        "width": 1200,
        "height": 700
    }
};

istar.examples.everyElementAndLink = {
    "actors": [
        {
            "id": "2b3ba506-1f5b-4b5b-9114-01b1092cd067",
            "text": "Agent",
            "type": "istar.Agent",
            "x": 56,
            "y": 342,
            "nodes": []
        },
        {
            "id": "ccf83503-3c8f-4886-a30f-8a290499d8b2",
            "text": "Role",
            "type": "istar.Role",
            "x": 309,
            "y": 447,
            "nodes": []
        },
        {
            "id": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "text": "Actor",
            "type": "istar.Actor",
            "x": 202,
            "y": 76,
            "nodes": [
                {
                    "id": "e1acd9b0-c9e9-468b-845c-c7b08db3020f",
                    "text": "Goal",
                    "type": "istar.Goal",
                    "x": 284,
                    "y": 105
                },
                {
                    "id": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
                    "text": "Task",
                    "type": "istar.Task",
                    "x": 305,
                    "y": 199
                }
            ]
        },
        {
            "id": "6a76ceb5-f287-462d-bf57-a266cc19c243",
            "text": "Actor",
            "type": "istar.Actor",
            "x": 572,
            "y": 30,
            "nodes": [
                {
                    "id": "4c3ba102-6514-47a4-b21c-8a8f8cdae0cc",
                    "text": "Goal",
                    "type": "istar.Goal",
                    "x": 702,
                    "y": 45
                },
                {
                    "id": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
                    "text": "Task",
                    "type": "istar.Task",
                    "x": 700,
                    "y": 129
                },
                {
                    "id": "60d0943c-169e-41ff-85ed-e19360456863",
                    "text": "Task",
                    "type": "istar.Task",
                    "x": 634,
                    "y": 209
                },
                {
                    "id": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
                    "text": "Task",
                    "type": "istar.Task",
                    "x": 768,
                    "y": 207
                },
                {
                    "id": "df52f053-20a2-4bdf-8e23-e8c53a8ce306",
                    "text": "Quality",
                    "type": "istar.Quality",
                    "x": 572,
                    "y": 322
                },
                {
                    "id": "3ff6395e-86ec-4661-ba13-c0493331303b",
                    "text": "Quality",
                    "type": "istar.Quality",
                    "x": 831,
                    "y": 317
                },
                {
                    "id": "85940cf3-6d49-4270-9b00-51696b5790f5",
                    "text": "Quality",
                    "type": "istar.Quality",
                    "x": 699,
                    "y": 455
                },
                {
                    "id": "54c01821-aa4d-4bd0-9fdf-6ddaa25c299f",
                    "text": "Resource",
                    "type": "istar.Resource",
                    "x": 922,
                    "y": 233
                },
                {
                    "id": "1ecba4f1-f873-466c-8074-092f612d5fed",
                    "text": "Quality",
                    "type": "istar.Quality",
                    "x": 860,
                    "y": 101
                }
            ]
        }
    ],
    "dependencies": [
        {
            "id": "fd083df6-87fc-4423-b25c-3291a1bf9aa3",
            "text": "Dependum",
            "type": "istar.Goal",
            "x": 12,
            "y": 178,
            "source": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "target": "2b3ba506-1f5b-4b5b-9114-01b1092cd067"
        },
        {
            "id": "9934417c-7c57-4272-837d-fb75b6eff101",
            "text": "Dependum",
            "type": "istar.Quality",
            "x": 181,
            "y": 332,
            "source": "e1acd9b0-c9e9-468b-845c-c7b08db3020f",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        },
        {
            "id": "81fe40dc-2380-47c0-92ab-1e7281dc020c",
            "text": "Dependum",
            "type": "istar.Task",
            "x": 379,
            "y": 333,
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        },
        {
            "id": "7b339194-6020-4c2b-86e5-cd07ab9f725d",
            "text": "Dependum",
            "type": "istar.Resource",
            "x": 453,
            "y": 169,
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "60d0943c-169e-41ff-85ed-e19360456863"
        }
    ],
    "links": [
        {
            "id": "a758b97d-bccf-4f54-9bee-8c29bcddafe9",
            "type": "istar.OrRefinementLink",
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "e1acd9b0-c9e9-468b-845c-c7b08db3020f"
        },
        {
            "id": "9780344c-72b0-4bcc-8eee-6af8abda3e7c",
            "type": "istar.IsALink",
            "source": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "target": "6a76ceb5-f287-462d-bf57-a266cc19c243"
        },
        {
            "id": "d8ba60f5-88c4-4cfc-8058-004aeab36501",
            "type": "istar.DependencyLink",
            "source": "9cab7456-727b-4d7e-81dd-af8903718cb3",
            "target": "fd083df6-87fc-4423-b25c-3291a1bf9aa3"
        },
        {
            "id": "0a6f14b3-005a-4309-930b-6568691227b5",
            "type": "istar.DependencyLink",
            "source": "fd083df6-87fc-4423-b25c-3291a1bf9aa3",
            "target": "2b3ba506-1f5b-4b5b-9114-01b1092cd067"
        },
        {
            "id": "df0020bb-6275-473a-8731-601c27ca7f7c",
            "type": "istar.DependencyLink",
            "source": "e1acd9b0-c9e9-468b-845c-c7b08db3020f",
            "target": "9934417c-7c57-4272-837d-fb75b6eff101"
        },
        {
            "id": "b49cc7da-17e0-470f-86cf-9bb9aae6898d",
            "type": "istar.DependencyLink",
            "source": "9934417c-7c57-4272-837d-fb75b6eff101",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        },
        {
            "id": "0617cbda-3b51-45c1-8565-3a64aedc54e0",
            "type": "istar.DependencyLink",
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "81fe40dc-2380-47c0-92ab-1e7281dc020c"
        },
        {
            "id": "dd595e43-d9dc-4e44-a751-132144628adf",
            "type": "istar.DependencyLink",
            "source": "81fe40dc-2380-47c0-92ab-1e7281dc020c",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        },
        {
            "id": "608da22e-748e-4856-8c15-50476891cbfa",
            "type": "istar.OrRefinementLink",
            "source": "e1270a5e-3c20-4be9-8097-66f6ed8502cd",
            "target": "4c3ba102-6514-47a4-b21c-8a8f8cdae0cc"
        },
        {
            "id": "7c09c187-4d18-4d2f-93c0-074b0bd37000",
            "type": "istar.AndRefinementLink",
            "source": "60d0943c-169e-41ff-85ed-e19360456863",
            "target": "e1270a5e-3c20-4be9-8097-66f6ed8502cd"
        },
        {
            "id": "24a18788-367e-4174-9411-450388e0a40e",
            "type": "istar.AndRefinementLink",
            "source": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
            "target": "e1270a5e-3c20-4be9-8097-66f6ed8502cd"
        },
        {
            "id": "43f22aeb-95b1-4c37-ab77-475d6ef23c8b",
            "type": "istar.QualificationLink",
            "source": "1ecba4f1-f873-466c-8074-092f612d5fed",
            "target": "e1270a5e-3c20-4be9-8097-66f6ed8502cd"
        },
        {
            "id": "cb9ab7bd-1204-4f0e-875b-79e7adf45a80",
            "type": "istar.NeededByLink",
            "source": "54c01821-aa4d-4bd0-9fdf-6ddaa25c299f",
            "target": "0a28f23e-2008-43b3-9e63-025bdfd5f30c"
        },
        {
            "id": "77a95e79-997f-4322-84cd-80c596d41ac1",
            "type": "istar.ContributionLink",
            "source": "60d0943c-169e-41ff-85ed-e19360456863",
            "target": "df52f053-20a2-4bdf-8e23-e8c53a8ce306",
            "label": "make"
        },
        {
            "id": "95ae8e2d-7edd-4fbc-99ca-2faa44e8f17e",
            "type": "istar.ContributionLink",
            "source": "0a28f23e-2008-43b3-9e63-025bdfd5f30c",
            "target": "3ff6395e-86ec-4661-ba13-c0493331303b",
            "label": "break"
        },
        {
            "id": "a9b52236-13ed-41ab-b946-9b9ba34e82c4",
            "type": "istar.ContributionLink",
            "source": "df52f053-20a2-4bdf-8e23-e8c53a8ce306",
            "target": "85940cf3-6d49-4270-9b00-51696b5790f5",
            "label": "hurt"
        },
        {
            "id": "b1adf2a6-577d-4b97-ba8c-785dd255fa1e",
            "type": "istar.ContributionLink",
            "source": "3ff6395e-86ec-4661-ba13-c0493331303b",
            "target": "85940cf3-6d49-4270-9b00-51696b5790f5",
            "label": "help"
        },
        {
            "id": "f7485e56-5c1e-447e-985f-ddcb9b48ce03",
            "type": "istar.DependencyLink",
            "source": "b64fbf2b-b55e-4510-b31f-9adef8de5b69",
            "target": "7b339194-6020-4c2b-86e5-cd07ab9f725d"
        },
        {
            "id": "19fe6b56-9de3-46c4-af0d-46503c438ceb",
            "type": "istar.DependencyLink",
            "source": "7b339194-6020-4c2b-86e5-cd07ab9f725d",
            "target": "60d0943c-169e-41ff-85ed-e19360456863"
        },
        {
            "id": "c5d14beb-fe64-462c-8135-269bc4c7f3c1",
            "type": "istar.ParticipatesInLink",
            "source": "2b3ba506-1f5b-4b5b-9114-01b1092cd067",
            "target": "ccf83503-3c8f-4886-a30f-8a290499d8b2"
        }
    ],
    "display": {
        "d8ba60f5-88c4-4cfc-8058-004aeab36501": {
            "vertices": [
                {
                    "x": 112,
                    "y": 126
                }
            ]
        },
        "0a6f14b3-005a-4309-930b-6568691227b5": {
            "vertices": [
                {
                    "x": 43,
                    "y": 277
                }
            ]
        },
        "df0020bb-6275-473a-8731-601c27ca7f7c": {
            "vertices": [
                {
                    "x": 165,
                    "y": 262
                }
            ]
        },
        "b49cc7da-17e0-470f-86cf-9bb9aae6898d": {
            "vertices": [
                {
                    "x": 285,
                    "y": 399
                }
            ]
        },
        "0617cbda-3b51-45c1-8565-3a64aedc54e0": {
            "vertices": [
                {
                    "x": 422,
                    "y": 279
                }
            ]
        },
        "dd595e43-d9dc-4e44-a751-132144628adf": {
            "vertices": []
        },
        "77a95e79-997f-4322-84cd-80c596d41ac1": {
            "vertices": [
                {
                    "x": 646,
                    "y": 274
                }
            ]
        },
        "95ae8e2d-7edd-4fbc-99ca-2faa44e8f17e": {
            "vertices": [
                {
                    "x": 855,
                    "y": 272
                }
            ]
        },
        "a9b52236-13ed-41ab-b946-9b9ba34e82c4": {
            "vertices": [
                {
                    "x": 619,
                    "y": 433
                }
            ]
        },
        "b1adf2a6-577d-4b97-ba8c-785dd255fa1e": {
            "vertices": [
                {
                    "x": 865,
                    "y": 434
                }
            ]
        },
        "f7485e56-5c1e-447e-985f-ddcb9b48ce03": {
            "vertices": [
                {
                    "x": 388,
                    "y": 180
                }
            ]
        },
        "19fe6b56-9de3-46c4-af0d-46503c438ceb": {
            "vertices": [
                {
                    "x": 568,
                    "y": 195
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
    "tool": "pistar.1.0.1",
    "istar": "2.0",
    "saveDate": "Sun, 11 Mar 2018 01:00:05 GMT",
    "diagram": {
        "width": 1500,
        "height": 1500
    }
};
