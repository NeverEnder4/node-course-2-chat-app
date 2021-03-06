/****************  IMPORTED 3rd PARTY MODULES  *******************/
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/****************  IMPORTED LOCAL MODULES  *******************/
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');


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

//Creates a new instance of users
var users = new Users();

//Registers event listener, listens for a new client connection, returns socket var
io.on('connection', (socket) => {

    //On join event validate the parameters sent by submitted form
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

         //socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    });

    //Event listener for client emitting createMessage
    //Callback from emitted event as 3rd parameter
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        if(!message.text.trim()) {
            return;
        }
        
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });

    //Listens for the client to disconnect
    socket.on('disconnect', () => {
        var user  = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });
    
});


//Serves static assets from specifed path
app.use(express.static(publicPath));

//Listens to specified port on your computer
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
