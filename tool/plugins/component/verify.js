
plug.verify = async function(){
            
                var model = await istar.fileManager.saveModel();//guardamos el modelo creado en model
                console.log(model);
                model= await plug.controlador.updateModel("data",model);
                let estado = await plug.connect.post('"https://servicio-rest-alpha.herokuapp.com/modelos/verificar/',model);
                console.log(estado.respuesta.validator[0]);//borrar
                if(estado.respuesta.validator[0]==="abc"){
                    // ===========================================================
                    const message ={
                        "idm":2,
                        "message":"No errors found in the model"
                    };
                    plug.smsg.sendParent(message);
                }else{
                    plug.smsg.sendParent(estado.respuesta);
                }

                
            }
    

