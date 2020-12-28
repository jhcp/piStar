//
//controller js controla como distribuir la data
//

plug.controlador = function(){


    return{
        mensajeRecibido: function (data){ //controla donde enviar mensaje
                console.log(data.id);
                console.log(data.token);
                if(data.id && data.token){
                    plug.controlador.saveLS("dataP",data);
                        //llamamos a localStorage
                        
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
                    console.log("entro");
                    console.log(data)
                    localStorage.setItem(key,JSON.stringify(data));
                };
                
        },

        getlS: function(key){//devuelve data de LS 
            if(!localStorage.getItem(key)){
                return false;
            };
            return JSON.parse(localStorage.getItem(key));

        },
        
        updateModel: function (key,model,idmodel){
            let data = plug.controlador.getlS(key);
            if(idmodel==="istar"){
                data.model_i.model=JSON.parse(model);
                plug.controlador.saveLS(key,data)
            }else if(idmodel==="ac"){
                console.log(model);
                data.model_AC.model=model;
            }
            return data;
        },
        saveModel: async function (key,model,id){
            plug.controlador.saveLS(key,model);
            let estado = await plug.connect.save_model({"id":id.id},model);
            return estado;
        }

        
    };
}();