module.exports = function(db, roomId, amount) {
	return new Promise((resolve, reject) =>
		db
			.collection('data')
			.find({}, { limit: 1 })
			.sort({ $natural: -1 })
			.toArray((err, results) => {
				if (err) {
					reject({
						error: 'An error has occured while getting data from devices'
					});
				} else {
					resolve(results.reverse());
				}
			})
	);
};
