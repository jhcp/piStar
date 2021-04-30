
//
//controller js controla como distribuir la data
//

plug.controlador = function(){
    

    return{
        mensajeRecibido: function (data){ //controla donde enviar mensaje
                if(data.idm ==0){
                    plug.controlador.saveLS("dataP",data);
                        //llamamos a localStorage
                }else if(data.idm==1){
                    console.log(data.idm)
                    plug.transform()
                }else if(data.idm==2){
                    console.log(data.idm)
                    plug.verify()
                }else if(data.idm==3){
                    console.log(data.idm)
                    plug.save.save()
                    
                    
                }
        },

        compararLS: function (key,data){// si retorna true es que se puede escribir en el localStorage
                if(!localStorage.getItem(key)){
                    return true;
                }else{
                    let datap = JSON.parse(localStorage.getItem(key));
                    if(data.id===datap.id){
                        if(data.token===datap.token){
                            return false;
                        }else{
                            return true;
                        };
                    
                    }else{
                        return true;
                    };
                };
        },


        saveLS: function (key,data){ //funcion encargada de guardar la data en el localStorage
                
                    verify=true;
               
                if(verify){
                    // console.log("entro");
                    // console.log(data)
                    localStorage.setItem(key,JSON.stringify(data));
                };
                
        },

        getlS: function(key){//devuelve data de LS 
            if(!localStorage.getItem(key)){
                return false;
            };
            return JSON.parse(localStorage.getItem(key));

        },
        
        updateModel: function (key,model){
            let data = plug.controlador.getlS(key);
            
                data.model_i.model=JSON.parse(model);
                plug.controlador.saveLS(key,data)
            
            return data;
        },
        saveModel: async function (key,model,id){
            plug.controlador.saveLS(key,model);
            let estado = await plug.connect.save_model({"id":id.id},model);
            return estado;
        }

        
    };
}();