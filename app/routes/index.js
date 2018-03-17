const roomRoutes = require('./room_routes');
const userRoutes = require('./user_routes');
const controllerRoutes = require('./controller_routes');

module.exports = function(app, db) {
  roomRoutes(app, db);
  userRoutes(app, db);
  controllerRoutes(app);
};
