var socket = io();

socket.on('connect', function () {
    console.log('connected to the server')

    socket.emit('createMessage', {
        from: 'Simon',
        text: 'Hello this is createMessage',
        createdAt: 11110000
    });
});

socket.on('disconnect', function () {
    console.log('lost connection to the server')
});

socket.on('newEmail', function(data) {
    console.log('New Email', data)
});

socket.on('newMessage', function(message) {
    console.log('newMessage received', message);
})