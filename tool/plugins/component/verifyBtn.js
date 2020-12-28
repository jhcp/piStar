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
    console.log(estado.respuesta.validator[0]);//borrar
    if(estado.respuesta.validator[0]==="abc"){
        // ===========================================================
    // Get the modal
    var modal = document.getElementById("myModal");


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close2")[0];

    // When the user clicks on the button, open the modal
    document.getElementById('testing').innerHTML = "model verified";
    modal.style.display = "block";
    

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
        
    }else{
        document.getElementById('testing').innerHTML = estado;
    }

    
};


// async function guardar(){
//     var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
//     console.log(model);
//     model= await plug.controlador.updateModel("data",model,"istar");
//     let id = await plug.controlador.getlS("dataP");
//     console.log(model);
//     let estado = await plug.connect.save_model({"id":id.id},model);
//     console.log(estado);
// };