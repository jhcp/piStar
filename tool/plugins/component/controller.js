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
                if(key != "data"){
               
                    var verify= plug.controlador.compararLS(key,data)
                }else{
                    verify=true;
                };
                if(verify){
                    localStorage.setItem(key,JSON.stringify(data));
                };
                
        },

        getlS: function(key){//devuelve data de LS 
            if(!localStorage.getItem(key)){
                return false;
            };
            return JSON.parse(localStorage.getItem(key));

        },
        updateModel: (key,model)=>{
            let data = plug.controlador.getlS(key);
            data.model_i.model=JSON.parse(model);
            return data;
        }
    };
}();