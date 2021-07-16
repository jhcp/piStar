plug.transform = async function(){
    


    var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
    model= await plug.controlador.updateModel("data",model);
    let estado = await plug.connect.post(verify,model);
    console.log(estado.respuesta.validator[0]);//borrar

    if(estado.respuesta.validator[0] === "abc"){
        let a = await plug.save.save(false)
        if(a=== true){
            let id = await plug.controlador.getlS("dataP");
        let url=transform+'id='+id.id;
        let estado = await plug.connect.post(url,model);
        if(estado != Error){
            const message ={
                "idm":1,
                "message":"the model has been saved and transformed"
            };
            console.log("transformed")
            plug.smsg.sendParent(message);
            

        }else{
            const message ={
                "idm":1,
                "message":"error in transform"
            };
            plug.smsg.sendParent(message);
        }
        }
        
    }
}
    

