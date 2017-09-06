const generateMessage = (chatName, from, text) => {
  return {
    chatName,
    from,
    text,
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (chatName, user, from, lat, lng) => {
  return {
    chatName,
    user,
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}
