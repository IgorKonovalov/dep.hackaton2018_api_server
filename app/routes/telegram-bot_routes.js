module.exports = function(app, db) {
  // Get a room
  app.get('/data/latest/:room', (req, res) => {
    const roomId = req.params.room
    
    const conditions = {
      tmp: 23,
      co2: 620,
      light: 330
    }

    res.send(conditions);
  });
};
