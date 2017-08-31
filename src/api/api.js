import io from 'socket.io-client';
const socket = process.env.NODE_ENV.trim() === 'development' ? io.connect('http://localhost:3000') : io();

socket.on('connect', function () {
    console.log('connected to the server')
});

socket.on('disconnect', function () {
    console.log('lost connection to the server')
});

function newMessage(cb) {
    socket.on('newMessage', function(message) {
        console.log('newMessage received', message);
    })
}

export { newMessage };