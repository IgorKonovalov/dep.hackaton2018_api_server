// TODO: need to check
module.exports = function(app, db) {
  // Get data from devices
	app.get('/controller/:room', (req, res) => {
    const roomId = req.params.room;
		const data = req.body;
		console.log('Get data from arduino server', req.body);

    db.collection('data')
      .find({ roomId })
      .limit(50)
      .toArray((err, results) => {
        if (err) {
          res.send({ error: 'An error has occured while getting data from devices' });
        } else {
          res.send(results);
        }
      })
	});

	app.get('/', (req, res) => {
		res.send('hello somebody!!');
	});
};
