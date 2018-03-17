module.exports = function(db, roomId) {
  return new Promise((resolve, reject) =>
    db.collection('rooms')
      .find({ roomId: String(roomId) })
      .toArray((err, roomData) => {
        if (err) {
          reject({ error: 'An error has occured while getting rooms' });
        } else {
          if (roomData.length === 0) {
            reject({ error: 'No room found' });
            return;
          }
          resolve(roomData[0]);
        }
      })
    )
};
