const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//Path to index.html
const publicPath = path.join(__dirname, '../public');

//port variable that determines which port to listen to based on environment
const port = process.env.PORT || 3000;

//Express method for routes
var app = express();

//Turns your computer into an HTTP server and creates an http server object
var server = http.createServer(app);

//Create web-socket server
var io = socketIO(server);

//Registers event listener, 'connection' lets you listen for a new connection
//socket is similar to the var in index.html
io.on('connection', (socket) => {
    console.log('New user connected');

    //Listens for the client to disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//Serves static assets from specifed path
app.use(express.static(publicPath));

//Listens to specified port on your computer
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
