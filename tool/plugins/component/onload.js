// 
// componente que se cargara cada vez que se renderize la pagina
// 
// ========================================================

//   ========================================================== 

const mensajeinit = "cargada"; //mesaje que se enviara al padre a penas se cargue la pagina

async function inicio(){
    await plug.smsg.sendParent(mensajeinit); //carga la funcion requerida a penas se renderiza la pagina
    let data=await plug.controlador.getlS("dataP");
    
    if(!data){console.log("no hay na")};// borrar
    console.log(data);
    
    let modelo = await plug.connect.getModel({"id":data.id});
    console.log(modelo.model_i.model);
    
   
    cargar(modelo.model_i.model);
    
    
    

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
