const generateMessage = (chatName, from, text) => {
    return {
        chatName,
        from,
        text,
        createdAt: new Date().getTime()
    }
};

module.exports = {
    generateMessage
};