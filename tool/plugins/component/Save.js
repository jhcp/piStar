
plug.save = function(){
    return{
        save: async function(){
            var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
            model= await plug.controlador.updateModel("data",model);
            let id = await plug.controlador.getlS("dataP");
            retorno = await plug.controlador.saveModel("data",model,id)
            console.log(retorno)
            if(retorno.state == true){
                plug.smsg.sendParent("modelo guardado");
            }else{
                plug.smsg.sendParent("error en guardado");
                    
            }
        
        },
        autosave: function(){

        }

    }
}();



