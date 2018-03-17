module.exports = function(app, db) {
  // Add user
  app.post('/users/:room', (req, res) => {
    const roomId = req.params.room

    const note = {
      name: req.body.name,
      roomId
    };

    db.collection('users')
      .insert(note, (err, result) => {
        if (err) {
          res.send({ error: 'An error has occurred while adding user' });
        } else {
          res.send(result.ops[0]);
        }
      });
  });
  
  // Get users from a room
  app.get('/users/:room', (req, res) => {
    const roomId = req.params.room
    
    db.collection('users')
      .find({ roomId })
      .toArray((err, users) => {
        if (err) {
          res.send({ error: 'An error has occured while getting users' });
        } else {
          res.send(users);
        }
      })
  });
};
