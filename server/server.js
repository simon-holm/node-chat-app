const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const clientPath = path.join(__dirname, '../dist');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const { generateMessage } = require('./utils/message');

app.use(express.static(clientPath));

let nrOfCurrentUsers = 0;

io.on('connection', (socket) => {
    nrOfCurrentUsers += 1;
    console.log(`New user connected! Nr of current users: ${nrOfCurrentUsers}`)

    // user join socket.emit from Admin 'Welcome to the chat app'
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

    // socket.broadcast.emit from Adming text = New user joined.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat'));

    socket.on('createMessage', ({ from, text }, callback) => {
        console.log('createMessage', {from, text})
        io.emit('newMessage', generateMessage(from, text));
        callback('This is from the server');
    });

    socket.on('disconnect', () => {
        nrOfCurrentUsers -= 1;
        console.log(`User disconnected! Nr of current users: ${nrOfCurrentUsers}`);

        // notify other users on leave
        io.emit('newMessage', generateMessage('Admin', 'User left the chat'));
    });
});



server.listen(port, () =>  {
    console.log(`Server is up on port ${port}`);
});


