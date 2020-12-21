// 
// boton encargado de transformar el modelo
// 


$('#transformar').click(function(){// testeo borrar 
    console.log("test de transformar");
    modelo();
});

async function modelo (){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    console.log(model);
    model= await plug.controlador.updateModel("data",model);
    let estado = plug.connect.post('http://localhost:3000/modelos/verificar/',model);
    console.log(estado);//borrar

    if(estado.validator[0] === "abc"){
        let estado = plug.connect.post('http://localhost:3000/modelos/verificar/transformar/',model);
        if(!Error){
            console.log("modelo transformado");
        };
    }
};