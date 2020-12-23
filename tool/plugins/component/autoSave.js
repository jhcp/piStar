$('#autoSave').click(function(){
    var condiciones = $("#autoSave").is(":checked");
    if (!condiciones) {
        alert("Debe aceptar las condiciones");
        event.preventDefault();
        
    }
    console.log(condiciones);
});