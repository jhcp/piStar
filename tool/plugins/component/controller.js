//
//controller js controla como distribuir la data
//

plug.controlador = function(){

var key = "dataP";
    return{
        mensajeRecibido: function (data){ //controla donde enviar mensaje
                if(data.id==="" && data.token===""){
                    saveLS(data);
                        //llamamos a localStorage
                        
                }
        },

        compararLS: function (data){// si retorna true es que se puede escribir en el localStorage
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


        saveLS: function (data){ //funcion encargada de guardar la data en el localStorage
                let verify= compararLS(data)
                if(verify){
                    localStorage.setItem(key,JSON.stringify(data));
                };
                
        },

        getlS: function(){//devuelve solo token y id de proyecto
            if(!localStorage.getItem(key)){
                return false;
            };
            return JSON.parse(localStorage.getItem(key));

        }
    };
}();