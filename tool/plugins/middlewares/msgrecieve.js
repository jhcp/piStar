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
};