module.exports = function(db, roomId) {
  return new Promise((resolve, reject) =>
    db.collection('rooms')
      // Number here
      .find({ roomId: Number(roomId) })
      .toArray((err, roomData) => {
        if (err) {
          reject({ error: 'An error has occured while getting rooms' });
        } else {
          resolve(roomData[0]);
        }
      })
    )
};
