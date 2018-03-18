const express = require('express');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const db = require('./config/db');
const setUpRoutes = require('./app/routes');
const setUpSocket = require('./app/socket');

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

const port = 8030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

server.listen(port, () => {
	console.log('We are live on ' + port);
});

MongoClient.connect(db.url, (err, MongoClient) => {
	console.log('mongo client connected');
	if (err) return console.log(err);

	const db = MongoClient.db('hackaton_climate_db');

	setUpRoutes(app, db);
	setUpSocket(io, db, app);
});
