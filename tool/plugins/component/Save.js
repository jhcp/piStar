$('#saveModel').click(function(){// testeo borrar 
    console.log("test save");
    save();
});

async function save (){
    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    model= await plug.controlador.updateModel("data",model,"istar");
    let id = await plug.controlador.getlS("dataP");
    retorno = await plug.controlador.saveModel("data",model,id)
    if(retorno != Error){
        //test de modal


            // Get the modal
            var modal = document.getElementById("myModal");


            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close2")[0];

            // When the user clicks on the button, open the modal
            document.getElementById('testing').innerHTML = "model saved";
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
        //test de modal


            // Get the modal
            var modal = document.getElementById("myModal");


            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close2")[0];

            // When the user clicks on the button, open the modal
            document.getElementById('testing').innerHTML = "no se ha podido guardar";
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
    }

};