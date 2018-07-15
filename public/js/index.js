
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

 //Listens for new message event and data emitted from server and adds it to the DOM
 socket.on('newMessage', function (message) {
    console.log('New message:', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text} `);
    $('#messages').append(li);
});

//Listens for new location message from the server and adds it to the DOM
socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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


//Message form handler
$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});

//Location btn handler
var locationButton = $('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location.');
    });
})