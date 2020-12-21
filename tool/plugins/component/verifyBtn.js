// 
//  btn para verificar el modelo  



// 
$('#verificar').click(function(){
    console.log("test de verificar");// testeo borrar 
    modelo();
    guardar();// testeo borrar
});
async function modelo(){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    console.log(model);
    model= await plug.controlador.updateModel("data",model);
    let estado = await plug.connect.post('http://localhost:3000/modelos/verificar/',model);
    console.log(estado);//borrar
};


async function guardar(){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    console.log(model);
    model= await plug.controlador.updateModel("data",model);
    let id = await plug.controlador.getlS("dataP");
    console.log(model);
    let estado = await plug.connect.save_model({"id":id.id},model);
};