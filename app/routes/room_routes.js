module.exports = function(app, db) {
  app.post('/rooms', (req, res) => {
    const node = { text: req.body.body, title: req.body.title };
    db.collection('rooms').insert(note, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
