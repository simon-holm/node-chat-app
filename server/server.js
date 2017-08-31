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

    socket.emit('newMessage', { 
        from: 'John',
        text:'See ya',
        createdAt: new Date().toDateString()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    });

    socket.on('disconnect', () => {
        nrOfCurrentUsers -= 1;
        console.log(`User disconnected! Nr of current users: ${nrOfCurrentUsers}`)
    })
});



server.listen(3000, () =>  {
    console.log(`Server is up on port ${port}`);
});


