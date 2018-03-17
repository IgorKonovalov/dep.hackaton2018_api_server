module.exports = function(app) {
	app.post('/controller', (req, res) => {
		console.log(req.body);
		res.status('200').send({ text: req.body.body });
	});

	app.get('/', (req, res) => {
		res.send('hello somebody!!');
	});
};
