// 
//  btn para verificar el modelo  
// 
$('#verificar').click(function(){
    console.log("test de verificar");// testeo borrar 
});
function modelo(){
    var model = istar.fileManager.saveModel();//guardamos el modelo creado en model
    plug.connect.put(model);
};
