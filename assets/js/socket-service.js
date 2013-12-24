;(function ready(){
	console.log('socket.io loading...');
	if(typeof socket == 'undefined'){
		document.addEventListener('DOMContentLoaded', ready);
		return;
	}
	
	socket.on('connect', function () {
		console.log('socket connected');
		socket.on('response', function(data) {
			console.log('response', data);
			switch(data.action){
			case 'uuid':
				uuid(data);
				break;
			case 'response':
				break;
			default:
				console.log('unknown action', data.action);
				break;
			}
		});
		
		setTimeout(function send(){
			if(socket.uuid) return;
			sendInit();
			setTimeout(send, 100);
		}, 100);
	});
	
	function sendInit(){
		console.log('send init');
		socket.emit('init', 'init');
	}
	
	function uuid(data){
		console.log('socket ready');
		console.log('my uuid is', data.uuid);
		socket.uuid = data.uuid;
	}
	
	/*
	sendCmd('plus', {a:1, b:2}, function(resp) {
		console.log('1+2=', resp)
	});
	*/
	window.sendCmd = function(cmd, data, cb) {
		socket.emit('cmd', {
			cmd: cmd,
			id: socket.uuid,
			data: data
		});
		socket.once(cmd, cb);
	};
})();