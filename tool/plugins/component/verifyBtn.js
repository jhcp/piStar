// 
//  btn para verificar el modelo  



// 
$('#verificar').click(function(){
    console.log("test de verificar");// testeo borrar 
    modelo();
});
async function modelo(){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    console.log(model);
    model= await plug.controlador.updateModel("data",model);
    let estado = await plug.connect.post('http://localhost:3000/modelos/verificar/',model);
    console.log(estado);//borrar
};
