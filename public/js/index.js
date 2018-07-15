
var socket = io();
const $ = jQuery;
        
/****************  CONNECTION TO SERVER  *******************/
socket.on('connect', function () {
    console.log('Connected to server');
});

//Listens for server disconnect
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

 //Listens for new message event and data emitted from server
 socket.on('newMessage', function (message) {
    console.log('New message:', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text} `);
    $('#messages').append(li);
});

 //Emit createMessage and send data to server
 //Add callback function as 3rd argument, function gets called in server
 // when event is heard and returns something to client from callback 
 socket.emit('createMessage', {
    from: 'Tony',
    text: 'I love you Ki-Ki!'
}, function (data) {
    console.log('Got it', data);
});


//Message form handling
$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});
