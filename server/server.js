/****************  IMPORTED 3rd PARTY MODULES  *******************/
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/****************  IMPORTED LOCAL MODULES  *******************/
const { generateMessage, generateLocationMessage } = require('./utils/message');

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

//Registers event listener, listens for a new client connection, returns socket var
io.on('connection', (socket) => {

    //socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    //Event listener for client emitting createMessage
    //Callback from emitted event as 3rd parameter
    socket.on('createMessage', (message, callback) => {
        //Emits event to everyone
        //Pass in argument for callback that will return to client 

        if(!message.text.trim()) {
            return;
        }
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

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
