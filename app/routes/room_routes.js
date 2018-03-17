const getRoomData = require('../db_actions/get_room_data');

module.exports = function(app, db) {
	// Add room
	app.post('/rooms', (req, res) => {
		const note = {
      description: req.body.description, 
      title: req.body.title, 
      roomId: req.body.roomId,
      conditions: req.body.conditions
    };

		db.collection('rooms').insert(note, (err, result) => {
			if (err) {
				res.send({ error: 'An error has occurred while adding rooms' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	// Get a room
	app.get('/rooms/:id', async (req, res) => {
		const roomId = req.params.id;

		try {
			const roomData = await getRoomData(db, roomId);
			res.send(roomData);
		} catch (error) {
			console.log('Failed getting a room', error)
			res.status(500).send({ error: 'An error has occurred while getting a room' })
		}
	});
};
