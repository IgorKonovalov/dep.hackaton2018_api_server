module.exports = function(app, db) {
  // Add room
  app.post('/rooms', (req, res) => {
    const note = { 
      text: req.body.body, 
      title: req.body.title, 
      roomId: req.body.roomId
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
  app.get('/rooms/:id', (req, res) => {
    const roomId = req.params.id
    
    db.collection('rooms')
      .find({ roomId })
      .toArray((err, rooms) => {
        if (err) {
          res.send({ error: 'An error has occured while getting rooms' });
        } else {
          res.send(rooms);
        }
      })
  });
};
