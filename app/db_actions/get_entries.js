module.exports = function(db, roomId, amount) {
	return new Promise((resolve, reject) =>
		db
			.collection('data')
			// String here
			.find({ roomId: String(roomId) })
			.sort({ _id: -1 })
			.limit(amount)
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
