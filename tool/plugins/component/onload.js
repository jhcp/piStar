// 
// componente que se cargara cada vez que se renderize la pagina
// 
// ========================================================
let load={
    "actors": [
      {
        "id": "1ed3469e-ba8b-4947-ab59-d133c74e4401",
        "text": "Actor",
        "type": "istar.Actor",
        "x": 306,
        "y": 173,
        "customProperties": {
          "Description": ""
        },
        "nodes": []
      }
    ],
    "orphans": [],
    "dependencies": [],
    "links": [],
    "display": {},
    "tool": "pistar.2.0.0",
    "istar": "2.0",
    "saveDate": "Sat, 12 Dec 2020 04:41:54 GMT",
    "diagram": {
      "width": 2000,
      "height": 1300,
      "customProperties": {
        "Description": ""
      }
    }
  };
//   ========================================================== 
//  borrar 





const mensajeinit = "cargada"; //mesaje que se enviara al padre a penas se cargue la pagina

async function inicio(){
    plug.smsg.sendParent(mensajeinit); //carga la funcion requerida a penas se renderiza la pagina
    let data=plug.controlador.getlS();
    plug.connect.get(data);
    cargar();
    

};

function cargar(){
    $(document).ready(function () { //ejecuta js despues de que todos los elementos en la pagina fueron cargados
        setTimeout(function () {
            istar.fileManager.loadModel(load);
            ui.selectPaper();//clear selection
            }, 5);
    });
};

//wait the ui finish loading before loading a model
    

window.onload = inicio();
//window.onload = console.log("mensaje enviado");
