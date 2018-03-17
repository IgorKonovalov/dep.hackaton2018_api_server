const roomRoutes = require('./room_routes');
const userRoutes = require('./user_routes');
const controllerRoutes = require('./controller_routes');
const telegramBotRoutes = require('./telegram-bot_routes');
const dataRoutes = require('./data_routes');

module.exports = function(app, db) {
  roomRoutes(app, db);
  userRoutes(app, db);
  dataRoutes(app, db);
  telegramBotRoutes(app, db);
  controllerRoutes(app, db);
};
