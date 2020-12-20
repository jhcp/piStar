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
    
    plug.connect.verify(model);
};
