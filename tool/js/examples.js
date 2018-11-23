/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
istar.examples = istar.examples || {};  //prevents overriding the variable, while also preventing working with a null variable

istar.examples.loadPistarWelcome = function () {
    loadModel(this.pistarWelcome);
};

istar.examples.loadInsulinPump = function () {
    loadModel(this.insulinPump);
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

istar.examples.insulinPump = {
  "actors": [
    {
      "id": "94e2c803-cbfb-4ee3-9d8f-67f3cf5ef3c8",
      "text": "Paciente",
      "type": "istar.Role",
      "x": 41,
      "y": 32,
      "nodes": [
        {
          "id": "6c5a096d-a5c3-435d-b034-610f861da646",
          "text": "Utilizar a bomba de insulina",
          "type": "istar.Goal",
          "x": 270,
          "y": 62
        },
        {
          "id": "0bb4ff4d-4445-4305-b218-bb4c5d92e7b5",
          "text": "Verificar as configurações gerais",
          "type": "istar.Goal",
          "x": 153,
          "y": 141
        },
        {
          "id": "36131377-c87e-41fb-af03-1bd3d15f9bb2",
          "text": "Verificar tela",
          "type": "istar.Task",
          "x": 41,
          "y": 201
        },
        {
          "id": "426d292c-4b07-4a36-89fd-a1e3e8af7554",
          "text": "Verificar alarmes",
          "type": "istar.Task",
          "x": 172,
          "y": 245
        },
        {
          "id": "ef966d7e-dbde-4b54-9e4d-dfef7f6f9603",
          "text": "Verificar nível de bateria",
          "type": "istar.Task",
          "x": 233,
          "y": 343
        },
        {
          "id": "4bb1838a-a952-4452-abbc-6a6a854c280b",
          "text": "Verificar nível de insulina",
          "type": "istar.Task",
          "x": 56,
          "y": 254
        },
        {
          "id": "af701087-fb7e-4e74-b375-956b8eb796bc",
          "text": "Visualizar bateria em tela separada",
          "type": "istar.Task",
          "x": 219,
          "y": 408
        },
        {
          "id": "682ec01e-d9d9-4108-a306-a6e090290482",
          "text": "Visualizar insulina em tela separada",
          "type": "istar.Task",
          "x": 64,
          "y": 388
        },
        {
          "id": "5fc4f8d2-d186-4a08-b29e-577838a86d21",
          "text": "Precisão",
          "type": "istar.Quality",
          "x": 76,
          "y": 471
        },
        {
          "id": "9c5e4d9f-f6a1-4889-880d-d1a5a2c7e957",
          "text": "Ter infusão basal configurada",
          "type": "istar.Goal",
          "x": 286,
          "y": 161
        },
        {
          "id": "a4cd9b33-b487-47f9-aa25-31f3bc7b5fa3",
          "text": "Ter infusão bolus configurada",
          "type": "istar.Goal",
          "x": 387,
          "y": 203
        },
        {
          "id": "9a5976db-2e25-437f-81fc-cd11f8cf5040",
          "text": "Alterar perfil basal armazenado",
          "type": "istar.Task",
          "x": 313,
          "y": 252
        },
        {
          "id": "0a07a24b-d4b7-4813-98e3-828492d1235c",
          "text": "Alterar bolus",
          "type": "istar.Task",
          "x": 453,
          "y": 263
        },
        {
          "id": "2310770c-d143-4657-b5d4-b260f17aa7c5",
          "text": "Trocar cartucho do conjunto de infusão",
          "type": "istar.Task",
          "x": 558,
          "y": 32
        },
        {
          "id": "4e7801ad-8893-4340-a544-ca77ca7f67af",
          "text": "Interromper infusão ativa",
          "type": "istar.Task",
          "x": 738,
          "y": 33
        },
        {
          "id": "e3a1fb00-2fde-4650-8576-bfba29634f19",
          "text": "Recolher êmbolo",
          "type": "istar.Task",
          "x": 681,
          "y": 83
        },
        {
          "id": "d92d8295-a411-4aa5-a2be-4f5f75d242db",
          "text": "Trocar a bateria",
          "type": "istar.Task",
          "x": 546,
          "y": 96
        },
        {
          "id": "5543012a-ae44-47d7-bf4f-6fae843cdf9d",
          "text": "Receber infusão basal",
          "type": "istar.Goal",
          "x": 598,
          "y": 151
        },
        {
          "id": "e7551f0c-e93a-454a-a1e2-19282ba5a12b",
          "text": "Receber infusão bolus",
          "type": "istar.Goal",
          "x": 621,
          "y": 199
        }
      ]
    },
    {
      "id": "eb955bd6-4963-4980-acf4-e950d484a2ff",
      "text": "Controlador da bomba de insulina",
      "type": "istar.Agent",
      "x": 1114,
      "y": 144,
      "nodes": [
        {
          "id": "58380278-5958-4708-97c1-c23c5da429a0",
          "text": "Gerenciar a bomba de insulina",
          "type": "istar.Goal",
          "x": 1294,
          "y": 168
        },
        {
          "id": "71700733-d17d-4c5e-959e-c451263becf9",
          "text": "Realizar tratamento adequado do paciente",
          "type": "istar.Goal",
          "x": 1231,
          "y": 242
        },
        {
          "id": "fb0563a3-0bbe-4346-9b37-01d942c2b0b4",
          "text": "Manter tela atualizada",
          "type": "istar.Goal",
          "x": 1395,
          "y": 251
        },
        {
          "id": "2caecc86-5cb0-4664-ab7c-2da8331ef89c",
          "text": "Gerenciar alertas",
          "type": "istar.Goal",
          "x": 1526,
          "y": 218
        },
        {
          "id": "278be251-493a-4711-810b-1ed1dba53225",
          "text": "Monitorar sensores",
          "type": "istar.Goal",
          "x": 1481,
          "y": 159
        },
        {
          "id": "c90d835d-4bcd-467f-a2ad-b1beced7fca3",
          "text": "Gerenciar infusão bolus",
          "type": "istar.Goal",
          "x": 1152,
          "y": 309
        },
        {
          "id": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35",
          "text": "Gerenciar infusão basal",
          "type": "istar.Goal",
          "x": 1300,
          "y": 309
        },
        {
          "id": "c79533f8-8e48-435c-b658-c6ae0401130f",
          "text": "Iniciar bolus",
          "type": "istar.Task",
          "x": 1114,
          "y": 381
        },
        {
          "id": "3381cdfe-abeb-4a21-9746-025944bac76a",
          "text": "Cancelar bolus",
          "type": "istar.Task",
          "x": 1264,
          "y": 379
        },
        {
          "id": "f74c9449-7f93-4e6b-8088-a31e73877d10",
          "text": "Iniciar basal",
          "type": "istar.Task",
          "x": 1404,
          "y": 379
        },
        {
          "id": "84ac3bbe-f6f8-470b-b072-385d8b2409c0",
          "text": "Interromper basal",
          "type": "istar.Task",
          "x": 1464,
          "y": 335
        }
      ]
    },
    {
      "id": "db3834eb-6634-4e7f-835b-ca3634b7cd9e",
      "text": "Fornecedor da bomba de insulina",
      "type": "istar.Role",
      "x": 64,
      "y": 634,
      "nodes": [
        {
          "id": "bca648bd-a4d3-4a62-aa10-ec2e40afba8e",
          "text": "Fornecer suporte ao uso da bomba",
          "type": "istar.Goal",
          "x": 148,
          "y": 648
        },
        {
          "id": "0c5af4ce-1724-4068-a3f9-4a3c8ebc606e",
          "text": "Auxiliar o paciente no uso da bomba",
          "type": "istar.Task",
          "x": 78,
          "y": 726
        },
        {
          "id": "131ad81a-229e-4707-98cf-1b947fcd3628",
          "text": "Realizar manutenções no dispositivo",
          "type": "istar.Task",
          "x": 246,
          "y": 725
        }
      ]
    }
  ],
  "dependencies": [
    {
      "id": "e08c3568-0449-4e53-a8b7-7d5603f3f239",
      "text": "Ter infusão bolus gerenciada",
      "type": "istar.Goal",
      "x": 955,
      "y": 308,
      "source": "e7551f0c-e93a-454a-a1e2-19282ba5a12b",
      "target": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35"
    },
    {
      "id": "6b42d09d-d05c-4f8d-8c9e-12ac556c4f4f",
      "text": "Ter infusão basal gerenciada",
      "type": "istar.Goal",
      "x": 945,
      "y": 221,
      "source": "5543012a-ae44-47d7-bf4f-6fae843cdf9d",
      "target": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35"
    }
  ],
  "links": [
    {
      "id": "c8bd2927-1dd9-424c-9ae4-2c6ae77e84ee",
      "type": "istar.AndRefinementLink",
      "source": "36131377-c87e-41fb-af03-1bd3d15f9bb2",
      "target": "0bb4ff4d-4445-4305-b218-bb4c5d92e7b5"
    },
    {
      "id": "3b431adf-4053-435f-8192-c6bfbaa43ca0",
      "type": "istar.AndRefinementLink",
      "source": "426d292c-4b07-4a36-89fd-a1e3e8af7554",
      "target": "0bb4ff4d-4445-4305-b218-bb4c5d92e7b5"
    },
    {
      "id": "59fb404e-12ec-4aa8-a63a-ec84f0a758b8",
      "type": "istar.AndRefinementLink",
      "source": "4bb1838a-a952-4452-abbc-6a6a854c280b",
      "target": "0bb4ff4d-4445-4305-b218-bb4c5d92e7b5"
    },
    {
      "id": "48f96b98-cf60-492b-a3c1-eddf87b92a66",
      "type": "istar.AndRefinementLink",
      "source": "ef966d7e-dbde-4b54-9e4d-dfef7f6f9603",
      "target": "0bb4ff4d-4445-4305-b218-bb4c5d92e7b5"
    },
    {
      "id": "fafe8709-c6c0-46b1-814d-7cb63486f7c2",
      "type": "istar.OrRefinementLink",
      "source": "682ec01e-d9d9-4108-a306-a6e090290482",
      "target": "4bb1838a-a952-4452-abbc-6a6a854c280b"
    },
    {
      "id": "b601373b-10c8-4885-87aa-32e8c631c69c",
      "type": "istar.OrRefinementLink",
      "source": "af701087-fb7e-4e74-b375-956b8eb796bc",
      "target": "ef966d7e-dbde-4b54-9e4d-dfef7f6f9603"
    },
    {
      "id": "0e8bcbed-b9fc-4143-be30-ff5d57346df1",
      "type": "istar.ContributionLink",
      "source": "682ec01e-d9d9-4108-a306-a6e090290482",
      "target": "5fc4f8d2-d186-4a08-b29e-577838a86d21",
      "label": "help"
    },
    {
      "id": "e8a45669-0792-4842-b8cd-7f3f1b95af15",
      "type": "istar.ContributionLink",
      "source": "af701087-fb7e-4e74-b375-956b8eb796bc",
      "target": "5fc4f8d2-d186-4a08-b29e-577838a86d21",
      "label": "help"
    },
    {
      "id": "6555587f-99c4-4699-b959-488f394ffe74",
      "type": "istar.OrRefinementLink",
      "source": "0bb4ff4d-4445-4305-b218-bb4c5d92e7b5",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "37aa5d84-4e74-4de5-8a1a-9b5f28cdbe64",
      "type": "istar.OrRefinementLink",
      "source": "9c5e4d9f-f6a1-4889-880d-d1a5a2c7e957",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "189801ef-1716-4474-bf26-bb8d5e2c1066",
      "type": "istar.OrRefinementLink",
      "source": "a4cd9b33-b487-47f9-aa25-31f3bc7b5fa3",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "553f4f22-3a20-4b03-9ad0-1ce3d7d8fd89",
      "type": "istar.OrRefinementLink",
      "source": "9a5976db-2e25-437f-81fc-cd11f8cf5040",
      "target": "9c5e4d9f-f6a1-4889-880d-d1a5a2c7e957"
    },
    {
      "id": "d130b14d-9ab0-455d-a414-551c1e1f15c0",
      "type": "istar.OrRefinementLink",
      "source": "0a07a24b-d4b7-4813-98e3-828492d1235c",
      "target": "a4cd9b33-b487-47f9-aa25-31f3bc7b5fa3"
    },
    {
      "id": "cd6ff1bd-4333-461e-972e-8303cde53e97",
      "type": "istar.OrRefinementLink",
      "source": "2310770c-d143-4657-b5d4-b260f17aa7c5",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "89c3e5e2-4c85-4e5f-b958-ba8a7857e54e",
      "type": "istar.AndRefinementLink",
      "source": "4e7801ad-8893-4340-a544-ca77ca7f67af",
      "target": "2310770c-d143-4657-b5d4-b260f17aa7c5"
    },
    {
      "id": "a8cdf759-e827-425c-b0e4-458590a7af4b",
      "type": "istar.AndRefinementLink",
      "source": "e3a1fb00-2fde-4650-8576-bfba29634f19",
      "target": "2310770c-d143-4657-b5d4-b260f17aa7c5"
    },
    {
      "id": "f4624464-fa31-4e05-b18f-02b03227174b",
      "type": "istar.AndRefinementLink",
      "source": "d92d8295-a411-4aa5-a2be-4f5f75d242db",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "bbb66076-2878-4e0d-b115-d35936f18a08",
      "type": "istar.AndRefinementLink",
      "source": "71700733-d17d-4c5e-959e-c451263becf9",
      "target": "58380278-5958-4708-97c1-c23c5da429a0"
    },
    {
      "id": "112f8e2b-6ed0-4b7d-9152-01f30f32a776",
      "type": "istar.AndRefinementLink",
      "source": "fb0563a3-0bbe-4346-9b37-01d942c2b0b4",
      "target": "58380278-5958-4708-97c1-c23c5da429a0"
    },
    {
      "id": "2eba1a25-de20-467f-872a-eaab6b4db8a7",
      "type": "istar.AndRefinementLink",
      "source": "2caecc86-5cb0-4664-ab7c-2da8331ef89c",
      "target": "58380278-5958-4708-97c1-c23c5da429a0"
    },
    {
      "id": "c7b3abe5-ba3e-404d-9db4-5c5e612dccc5",
      "type": "istar.AndRefinementLink",
      "source": "278be251-493a-4711-810b-1ed1dba53225",
      "target": "58380278-5958-4708-97c1-c23c5da429a0"
    },
    {
      "id": "dd616273-0530-471d-948d-0c8d9d7480e2",
      "type": "istar.AndRefinementLink",
      "source": "c90d835d-4bcd-467f-a2ad-b1beced7fca3",
      "target": "71700733-d17d-4c5e-959e-c451263becf9"
    },
    {
      "id": "b5bb8f54-ee54-4997-ae0d-ca3e02c4a672",
      "type": "istar.AndRefinementLink",
      "source": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35",
      "target": "71700733-d17d-4c5e-959e-c451263becf9"
    },
    {
      "id": "8b4c280e-0013-48d9-9037-fac4fd79288f",
      "type": "istar.OrRefinementLink",
      "source": "c79533f8-8e48-435c-b658-c6ae0401130f",
      "target": "c90d835d-4bcd-467f-a2ad-b1beced7fca3"
    },
    {
      "id": "ac6cc268-b038-431c-8ffe-3228ec4f5ce1",
      "type": "istar.OrRefinementLink",
      "source": "3381cdfe-abeb-4a21-9746-025944bac76a",
      "target": "c90d835d-4bcd-467f-a2ad-b1beced7fca3"
    },
    {
      "id": "6faf3460-4944-42c4-b077-57cfae7f3b16",
      "type": "istar.OrRefinementLink",
      "source": "f74c9449-7f93-4e6b-8088-a31e73877d10",
      "target": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35"
    },
    {
      "id": "440f424e-6642-4425-9626-9154caf0a19b",
      "type": "istar.OrRefinementLink",
      "source": "84ac3bbe-f6f8-470b-b072-385d8b2409c0",
      "target": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35"
    },
    {
      "id": "d619f63e-f9c6-454f-bc04-0db6c1ea8f63",
      "type": "istar.OrRefinementLink",
      "source": "5543012a-ae44-47d7-bf4f-6fae843cdf9d",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "5843d9d6-4013-4aeb-b641-736ef6826259",
      "type": "istar.OrRefinementLink",
      "source": "e7551f0c-e93a-454a-a1e2-19282ba5a12b",
      "target": "6c5a096d-a5c3-435d-b034-610f861da646"
    },
    {
      "id": "b18a1560-9967-45e7-ab4c-e82e234c82a3",
      "type": "istar.DependencyLink",
      "source": "e7551f0c-e93a-454a-a1e2-19282ba5a12b",
      "target": "e08c3568-0449-4e53-a8b7-7d5603f3f239"
    },
    {
      "id": "8385ab5f-b772-4c30-93e7-c981f27ae382",
      "type": "istar.DependencyLink",
      "source": "e08c3568-0449-4e53-a8b7-7d5603f3f239",
      "target": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35"
    },
    {
      "id": "b9d9b7c4-6c0f-4194-8a75-39d82f5b551e",
      "type": "istar.DependencyLink",
      "source": "5543012a-ae44-47d7-bf4f-6fae843cdf9d",
      "target": "6b42d09d-d05c-4f8d-8c9e-12ac556c4f4f"
    },
    {
      "id": "07929003-3fe9-4b8f-b1d5-309e84cf9424",
      "type": "istar.DependencyLink",
      "source": "6b42d09d-d05c-4f8d-8c9e-12ac556c4f4f",
      "target": "cce86b69-cfd4-4e04-9f90-f09d49d0bf35"
    },
    {
      "id": "d2e0d4da-823b-4351-b641-44d359017674",
      "type": "istar.OrRefinementLink",
      "source": "0c5af4ce-1724-4068-a3f9-4a3c8ebc606e",
      "target": "bca648bd-a4d3-4a62-aa10-ec2e40afba8e"
    },
    {
      "id": "46917520-a085-4d32-a42b-515549a520ba",
      "type": "istar.OrRefinementLink",
      "source": "131ad81a-229e-4707-98cf-1b947fcd3628",
      "target": "bca648bd-a4d3-4a62-aa10-ec2e40afba8e"
    }
  ],
  "display": {
    "48f96b98-cf60-492b-a3c1-eddf87b92a66": {
      "vertices": [
        {
          "x": 317,
          "y": 235
        }
      ]
    },
    "f4624464-fa31-4e05-b18f-02b03227174b": {
      "vertices": [
        {
          "x": 524,
          "y": 118
        }
      ]
    }
  },
  "tool": "pistar.1.2.0",
  "istar": "2.0",
  "saveDate": "Thu, 22 Nov 2018 21:38:29 GMT",
  "diagram": {
    "width": 1700,
    "height": 1300
  }
};
