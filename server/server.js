/****************  IMPORTED 3rd PARTY PACKAGES  *******************/
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

/****************  CREATES SOCKETIO SERVER CONNECTION  *******************/
var io = socketIO(server);

//Registers event listener, listens for a new client connection
io.on('connection', (socket) => {
    console.log('New user connected');

    //Listens for the client to disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    //Event listener for client emitting createMessage
    socket.on('createMessage', (message) => {

        //Emit the created message to the client with a timestamp
        socket.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

//Serves static assets from specifed path
app.use(express.static(publicPath));

//Listens to specified port on your computer
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
