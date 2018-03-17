const getRoomData = require('../db_actions/get_data');

module.exports = function(io, db) {
	console.log('[socket io] a server initialized');
	io.on('connection', socket => {
		console.log('[socket.io] a client connected');

		socket.on('initialize', async (roomId) => {
			console.log('[socket io] initializing data', roomId);

			const roomData = await getRoomData(db, roomId);
			
			socket.emit('room_initial_data', roomData);
		});

		socket.on('disconnect', () => {
			console.log('[socket.io] a client disconnected');
		});
	});
};
