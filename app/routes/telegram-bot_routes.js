const axios = require('axios');
const getSingleEntry = require('../db_actions/get_single_entry');
const constants = require('../const');

module.exports = function(app, db) {
  // Get latest data for room
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

  // if bot post to change conditions, make request to controller
  app.post('/action/:room', async (req, res) => {
    // To do handle requests somehow
    const roomId = req.params.room
    console.log('get request', req.body.action)

    await axios.post(constants.ipController, {
      action: req.body.action
    }).then(() => {
      console.log('posted data to controller')
    }).catch((error) => {
      console.log('error while ending to controller', error)
    });
    res.send('got it!')
  })
};
