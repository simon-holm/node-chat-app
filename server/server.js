const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

let nrOfCurrentUsers = 0;

io.on('connection', (socket) => {
    nrOfCurrentUsers += 1;
    console.log(`New user connected! Nr of current users: ${nrOfCurrentUsers}`)

    // user join socket.emit from Admin 'Welcome to the chat app'
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat!',
        createdAt: new Date().getTime()
    });

    // socket.broadcast.emit from Adming text = New user joined.
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined the chat!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', ({ from, text }) => {
        console.log('createMessage', {from, text})
        io.emit('newMessage', {
            from, 
            text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        nrOfCurrentUsers -= 1;
        console.log(`User disconnected! Nr of current users: ${nrOfCurrentUsers}`);

        // notify other users on leave
        io.emit('newMessage', {
            from: 'Admin',
            text: 'User left the chat',
            createdAt: new Date().getTime()
        });
    });
});



server.listen(3000, () =>  {
    console.log(`Server is up on port ${port}`);
});


