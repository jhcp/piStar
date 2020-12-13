// 
// escucha encargado de recibir los mensajes del padre
// 
window.addEventListener('message', handleMessage, false);

// message event handler (e is event object) 
function handleMessage(e) {
    // Reference to element for data display
	var el = document.getElementById('display');
	//console.log('escuche');
	console.log(e.data);
	plug.controlador.mensajeRecibido(e.data);







	//=============================================
	//localStorage.setItem('dataParent',e.data);
    // Check origin
    /*if ( e.origin === '*' ) {//direccion del padre del iframe
		// Retrieve data sent in postMessage
		
		console.log(e.data);
        el.innerHTML = e.data;
        // Send reply to source of message
		e.source.postMessage('Message received', e.origin);
		console.log("recibi la wea");
    }*/
};