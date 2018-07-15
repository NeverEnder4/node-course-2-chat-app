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

    //socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app!'
    });
    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined',
        createdAt: new Date().getTime()
    });

    //Listens for the client to disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    //Event listener for client emitting createMessage
    socket.on('createMessage', (message) => {

        //Emits event to everyone but user who emits it
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
        //Emits newMessage event and creats server side time stamp to all users
    //     io.emit('newMessage', {
    //         from: message.from,
    //         text: message.text,
    //         createdAt: new Date().getTime()
    //     })
    // });

});

//Serves static assets from specifed path
app.use(express.static(publicPath));

//Listens to specified port on your computer
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
