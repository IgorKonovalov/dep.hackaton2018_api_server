const roomRoutes = require('./room_routes');
const controllerRoutes = require('./controller_routes');
module.exports = function(app, db) {
  roomRoutes(app, db);
  controllerRoutes(app)
};
