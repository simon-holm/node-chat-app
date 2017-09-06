import io from 'socket.io-client'
const socket =
  process.env.NODE_ENV.trim() === 'development'
    ? io.connect('http://localhost:3000')
    : io()

socket.on('connect', function() {
  console.log('connected to the server')
})

socket.on('disconnect', function() {
  console.log('lost connection to the server')
})

function newMessage(cb) {
  socket.on('newMessage', function(message) {
    cb(message)
  })
}

function newLocationMessage(cb) {
  socket.on('newLocationMessage', function(message) {
    cb(message)
  })
}

function sendMessage({ chatName, from, text }, cb) {
  socket.emit(
    'createMessage',
    {
      chatName,
      from,
      text
    },
    message => console.log('Message SENT', message)
  )
}

function botBroadcastLocation(chatName, user, pos, cb) {
  console.log(pos)
  socket.emit('createLocationMessage', {
    chatName,
    user,
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  }),
    () => console.log('Broadcasting Location')
}

export { newMessage, newLocationMessage, sendMessage, botBroadcastLocation }
