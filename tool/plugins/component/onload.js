// 
// componente que se cargara cada vez que se renderize la pagina
// 
// ========================================================

//   ========================================================== 

const mensajeinit = "cargada"; //mesaje que se enviara al padre a penas se cargue la pagina

async function inicio(){
    plug.smsg.sendParent(mensajeinit); //carga la funcion requerida a penas se renderiza la pagina
    let data=await plug.controlador.getlS();
    var modelo = await plug.connect.get({"id":"asdad"});
    cargar(modelo);
    

};

function cargar(modelo){
    $(document).ready(function () { //ejecuta js despues de que todos los elementos en la pagina fueron cargados
        setTimeout(function () {
            console.log(modelo);
            istar.fileManager.loadModel(modelo);
            ui.selectPaper();//clear selection
            }, 5);
    });
};

//wait the ui finish loading before loading a model
    

window.onload = inicio();
//window.onload = console.log("mensaje enviado");
