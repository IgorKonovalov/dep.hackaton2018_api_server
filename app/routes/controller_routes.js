const axios = require('axios');
const getRoomData = require('../db_actions/get_room_data');

const checkIfExtreme = (data, conditions) => {
	let result;

	const co2Conditions = conditions.find(el => el.id === 'co2');
	const tempConditions = conditions.find(el => el.id === 'tmp');
	const lightConditions = conditions.find(el => el.id === 'light');

	if (co2Conditions.minConfortValue > data.co2 || co2Conditions.maxConfortValue < data.co2) {
		return ({
			conditions: co2Conditions,
			value: data.co2
		})
	}
	if (tempConditions.minConfortValue > data.tmp || tempConditions.maxConfortValue < data.tmp) {
		return ({
			conditions: tempConditions,
			value: data.tmp
		})
	}
	if (lightConditions.minConfortValue > data.light || lightConditions.maxConfortValue < data.light) {
		return ({
			conditions: lightConditions,
			value: data.light
		})
	}
}

module.exports = function(app, db) {
	let roomData;
	let counter = 0;
	app.post('/controller', async (req, res) => {
		const data = {
			...req.body,
			time: Date.now()
		};
	
		console.log('data came from controller', data)

		if (counter === 0) {
			roomData = await getRoomData(db, data.roomId);
			counter++;
		}

		const extremeConditions = checkIfExtreme(data, roomData.conditions);
		
		// handle extreme conditions	
		if (extremeConditions) {
			// send conditions + value to bot if something is wrong
			axios.post('http://10.66.168.97:52811/extreme', {
				data: extremeConditions
			}) 
		}

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
