var socket = io();

socket.on('connect', function () {
    console.log('connected to the server')
});

socket.on('disconnect', function () {
    console.log('lost connection to the server')
});

// custom

socket.on('newMessage', function(message) {
    console.log('newMessage received', message);
})