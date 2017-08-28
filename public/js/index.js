var socket = io();

socket.on('connect', function () {
    console.log('connected to the server')

    socket.emit('createEmail', {
        to: 'Test@test.se',
        body: 'This is the body of this email',
    });
});

socket.on('disconnect', function () {
    console.log('lost connection to the server')
});

socket.on('newEmail', function(data) {
    console.log('New Email', data)
});