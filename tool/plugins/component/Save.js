var control=true
plug.save = function(){
    return{
        save: async function(control){
            var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
            model= await plug.controlador.updateModel("data",model);
            let id = await plug.controlador.getlS("dataP");
            retorno = await plug.controlador.saveModel("data",model,id)
            console.log(retorno)
            if(control===false){
                return true
            }
            if(retorno.state == true){
                const message ={
                    "idm":3,
                    "message":"saved"
                };
                plug.smsg.sendParent(message);
            }else{
                plug.smsg.sendParent("error en guardado");
                    
            }
        
        },
        autosave: function(){

        }

    }
}();



