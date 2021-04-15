
plug.verify = async function(){
            
                var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
                console.log(model);
                model= await plug.controlador.updateModel("data",model);
                let estado = await plug.connect.post('http://localhost:3000/modelos/verificar/',model);
                console.log(estado.respuesta.validator[0]);//borrar
                if(estado.respuesta.validator[0]==="abc"){
                    // ===========================================================
                    console.log("modelo correcto")
                    plug.smsg.sendParent("verified");
                }else{
                    plug.smsg.sendParent(estado.respuesta);
                }

                
            }
    

