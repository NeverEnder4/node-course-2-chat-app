
var socket = io();
        
/****************  CONNECTION TO SERVER  *******************/
socket.on('connect', function () {
    console.log('Connected to server');

    //Listens for server disconnect
    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    //Emit createMessage and send data to server
    socket.emit('createMessage', {
        from: 'Tony',
        text: 'I love you Ki-Ki!'
    })

    //Listens for new message event and data emitted from server
    socket.on('newMessage', function (newMessage) {
        console.log('New message:', newMessage);
    });

});
