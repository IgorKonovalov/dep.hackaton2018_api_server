module.exports = function(db, roomId) {
  return new Promise((resolve, reject) => 
    db.collection('rooms')
      .find({ roomId })
      .toArray((err, rooms) => {
        console.log(db.collection('rooms'))
        console.log('I get ', rooms, 'in response', roomId)
        if (err) {
          reject({ error: 'An error has occured while getting rooms' });
        } else {
          resolve(rooms);
        }
      })
    )
};
