// 
// boton encargado de transformar el modelo
// 


$('#transformar').click(function(){// testeo borrar 
    console.log("test de transformar");
    transform();
});

async function transform (){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    model= await plug.controlador.updateModel("data",model);
    let estado = await plug.connect.post('http://localhost:3000/modelos/verificar/',model);
    console.log(estado.respuesta.validator[0]);//borrar

    if(estado.respuesta.validator[0] === "abc"){
        let estado = plug.connect.post('http://localhost:3000/modelos/transformar/',model);
        if(!Error){
            console.log("modelo transformado");
        };
    }
};