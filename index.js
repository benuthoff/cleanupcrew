// Cleanup Crew Program
// by Ben Uthoff


// Dependencies and Setup.
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

const Socket = require('socket.io');
const io = new Socket.Server(server);

const fs = require('fs');

// Socket.io Endpoints


// Run Web Server.
app.use(express.static('src'));
server.listen(9900, () => {
	console.log('listening on *:9900');
});