// Cleanup Crew Program
// by Ben Uthoff

// LINKS TO DOCS:
// Host the server yourself:
//    https://github.com/benuthoff/cleanupcrew/wiki/CleanupCrew-Documentation#setup
// Customizing config.json:
//    https://github.com/benuthoff/cleanupcrew/wiki/CleanupCrew-Documentation#json-config-reference

// This app was made to be viewed in its own window.
// Go to https://CleanupCrew.benuthoff.repl.co!

// Dependencies and Setup.
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

const Socket = require('socket.io');
const io = new Socket.Server(server);

const fs = require('fs');

var STORE = JSON.parse(fs.readFileSync('./config.json'));

// Socket.io Endpoints
io.on('connection', (socket) => {

	// New Connection! Send the client the data.
	socket.emit('datasend', STORE);

	socket.on('datasync', (store) => {
		STORE = store;
		fs.writeFileSync('./config.json', JSON.stringify(store));
	});

})

// Run Web Server.
app.use(express.static('src'));
server.listen(9900, () => {
	console.log('listening on *:9900');
});