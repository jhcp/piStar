// 
// middleware usado para enviar mensajes al padre del iframe
// 


 plug.smsg = function(){
    'use strict';
    return{
        sendParent: function (mensaje){
            parent.postMessage(mensaje, "*");
            console.log("sendmsg")
        }

    };
}();

