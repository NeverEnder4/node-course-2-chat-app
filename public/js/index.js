
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
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');

    var li = $('<li></li>');
    li.text(`${message.from} (${formattedTime}): ${message.text} `);
    $('#messages').append(li);
});

//Listens for new location message from the server and adds it to the DOM
socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');

    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from} (${formattedTime}): `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

var messageTextBox = $('[name=message]');
var sendButton = $('#send-message');
sendButton.attr('disabled', 'disabled');

//Messagebox on change keyup handler
messageTextBox.on('change keyup', function() {
    if($.trim(messageTextBox.val()) !== '') {
        sendButton.removeAttr('disabled');
    } else {
        sendButton.attr('disabled', 'disabled');
    }
});

//Message form handler
$('#message-form').on('submit', function(e) {
    e.preventDefault();

    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

//Location btn handler
var locationButton = $('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
})