// TODO: need to check
module.exports = function(app, db) {
	app.post('/controller', (req, res) => {
		const data = req.body;
		console.log('Get data from arduino server', req.body);

		db.collection('data').insert(data, (err, result) => {
			if (err) {
				res.send({ error: 'An error has occurred while saving data from devices' });
			} else {
				res.status('200');
			}
		});
	});

	app.get('/', (req, res) => {
		res.send('hello somebody!!');
	});
};
