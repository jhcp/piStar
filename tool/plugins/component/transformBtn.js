// 
// boton encargado de transformar el modelo
// 


$('#transformar').click(function(){// testeo borrar 
    console.log("test de transformar");
    transform();
});

async function transform (){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    model= await plug.controlador.updateModel("data",model,"istar");
    let estado = await plug.connect.post('http://localhost:3000/modelos/verificar/',model);
    console.log(estado.respuesta.validator[0]);//borrar

    if(estado.respuesta.validator[0] === "abc"){
        let estado = await plug.connect.post('http://localhost:3000/modelos/transformar/',model);
        if(estado != Error){
            console.log(estado)
            model= await plug.controlador.updateModel("data",estado.respuesta,"ac");
            console.log("modelo transformado");
            let id = await plug.controlador.getlS("dataP");
            plug.controlador.saveModel("data",model,id);
            












            //test de modal


            // Get the modal
            var modal = document.getElementById("myModal");


            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close2")[0];

            // When the user clicks on the button, open the modal
            document.getElementById('testing').innerHTML = "model saved and transformed";
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

        };
    }
};