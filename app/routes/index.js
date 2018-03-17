const roomRoutes = require('./room_routes');
module.exports = function(app, db) {
  roomRoutes(app, db);
};
