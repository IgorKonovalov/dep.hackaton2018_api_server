module.exports = function(io, db) {
	console.log('[socket io] server initialized');
	io.on('connection', socket => {
		console.log('[socket.io] a client connected');

    socket.emit('hello', 'world!')
    
		socket.on('create room', roomCode => {
			console.log('[socket io] room created');  
		});

		socket.on('disconnect', () => {
			console.log('[socket.io] user disconnected');
		});

		socket.on('initialize', () => {
			console.log('[socket io] initializing data');
		});
	});
};
