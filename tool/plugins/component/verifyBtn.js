// 
//  btn para verificar el modelo  
// 
$('#verificar').click(function(){
    console.log("test de verificar");// testeo borrar 
});
function modelo(){
    var model = istar.fileManager.saveModel();//guardamos el modelo creado en model
};
async function verify () {
    try {
          const res = await fetch('http://localhost:3000/model',{
            method: 'POST',
            body: new URLSearchParams({// conten type x-www-form-urlencoded

            })
          });
          const resDB = await res.json();
          console.log('funciona conexion con rest de piStar')
          console.log(resDB)
    } catch (e) {
          // algo ha ido mal
    }
};