const getRoomData = require('../db_actions/get_room_data');
const getEntries = require('../db_actions/get_entries');
const getSingleEntry = require('../db_actions/get_single_entry');

module.exports = function(io, db) {
	console.log('[socket io] a server initialized');
	let pollingInterval;

	io.on('connection', socket => {
		console.log('[socket.io] a client connected');

		socket.on('initialize', async data => {
			const { roomId = 743, count = 30, step = 1e5 } = data;

			let lastEntry;

			// console.log('[socket io] initializing data', data);

			const roomData = await getRoomData(db, roomId);
			const lastFiftyEntries = await getEntries(db, roomId, count);
			
			socket.emit('room_initial_data', roomData);
			socket.emit('room_initial_entries', lastFiftyEntries);

			pollingInterval = setInterval(async () => {
				lastEntry = await getSingleEntry(db, roomId);
				socket.emit('room_last_entry', lastEntry);
			}, step);
		});

		socket.on('disconnect', () => {
			clearInterval(pollingInterval);
			console.log('[socket.io] a client disconnected');
		});
	});
};
