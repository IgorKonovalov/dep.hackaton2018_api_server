const getEntries = require('../db_actions/get_entries');
const getSingleEntry = require('../db_actions/get_single_entry');

module.exports = function(app, db) {
  // Get last 50 entries of data from DB
	app.get('/controller/:room', async (req, res) => {
    const roomId = req.params.room;
		const data = req.body;    
    try {
      const roomData = await getEntries(db, roomId, 50);
			res.send(roomData);
		} catch (error) {
			console.log('Failed getting a entries', error)
			res.status(500).send({ error: 'An error has occurred while getting data' })
    }
  });
  
  app.get('/controller/:room/last', async (req, res) => {
    // get last entry from DB
    const roomId = req.params.room;
		const data = req.body;
    try {
      const roomData = await getSingleEntry(db, roomId)
			res.send(roomData);
		} catch (error) {
			console.log('Failed getting a entry', error)
			res.status(500).send({ error: 'An error has occurred while getting data' })
    }
	});
};
