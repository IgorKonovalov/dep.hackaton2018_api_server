const nameMap = id => {
  if (id === 'tmp') {
    return 'Temperature';
  }
  if (id === 'co2') {
    return 'Сarbon dioxide (CO2)';
  }
  return 'Luminosity';
}

const measureMap = id => {
  if (id === 'tmp') {
    return '°C';
  }
  if (id === 'co2') {
    return 'ppm';
  }
  return 'lm';
}

const roomDataMapper = room => {
  return {
    ...room,
    conditions: Object.keys(room.conditions).map(key => {
      const values = room.conditions[key]
      console.log(key, values)

      return {
        id: key,
        name: nameMap(key),
        measure: measureMap(key),
        minComfortValue: values.min,
        maxComfortValue: values.max,
      }
    })
  }
}

module.exports = function(db, roomId) {
  return new Promise((resolve, reject) =>
    db.collection('rooms')
      .find({ roomId: String(roomId) })
      .toArray((err, roomData) => {
        if (err) {
          reject({ error: 'An error has occured while getting rooms' });
        } else {
          // console.log(Object.keys(roomData.conditions))
          resolve(roomDataMapper(roomData[0]));
        }
      })
    )
};
