module.exports = function(app, db) {
	app.post('/controller', (req, res) => {
		console.log('Get data from arduino server', req.body);
		res.status('200').send({ text: 'Thanks' });
	});

	app.get('/', (req, res) => {
		res.send('hello somebody!!');
	});
};
