module.exports = function(app, db) {
	app.post('/controller', (req, res) => {
		const data = {
			...req.body,
			time: Date.now()
		};
		// insert data to DB
		db.collection('data').insert(data, (err, result) => {
			if (err) {
				res.send({ error: 'An error has occurred while saving data from devices' });
			} else {
				res.status('200').send('ok');
			}
		});
	});
};
