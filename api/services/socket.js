var uuid = require('uuid');
var clients = {
	
};

function init(socket, data){
	var id = uuid.v4();
	console.log('assign uuid %s to socket', id);
	clients[id] = {id: uuid, socket: socket};
	socket.uuid = id;
	socket.on('cmd', function(data){
		process.emit('socket.'+data.cmd, data);
	});
	socket.emit('response', {action: 'uuid', uuid: id});
}

function findPlayer(uuid) {
	return clients[uuid];
}

/*
on client side:
sendCmd('plus', {a:1, b:2}, function(resp) {
	console.log('1+2=', resp)
});
*/
process.on('socket.plus', function(data){
	console.log('socket.plus received', data);
	findPlayer(data.id).socket.emit('plus', data.data.a+data.data.b);
});

module.exports = {
	onConnect: function(session, socket) {
		console.log('onConnect');
		socket.on('message', function(){
			console.log('socket.onMessage');
		});
		socket.on('init', function(data){
			console.log('init', data);
			init(socket, data);
		});
	},
	onDisconnect: function(session, socket) {
		console.log('socket disconnected %s', socket.uuid);
		delete clients[socket.uuid];
	},
	findPlayer: findPlayer,
	listClients: function(){
		return Object.keys(clients);
	}
};