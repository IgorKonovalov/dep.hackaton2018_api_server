const getSingleEntry = require('../db_actions/get_single_entry');

module.exports = function(app, db) {
  // Get a room
  app.get('/data/latest/:room', async (req, res) => {
    const roomId = req.params.room
    let conditions
    try {
      conditions = await getSingleEntry(db, roomId)
    } catch (error) {
      conditions = String('error while geting last entry for bot', error)
    }

    res.send(conditions);
  });
};
