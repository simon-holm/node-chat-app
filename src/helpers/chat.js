const openCloseChatHelper = (currentChat, sessions) => {
    
    let newSessions = [...sessions];
    if (currentChat[0].isOpen == true) {
        newSessions.map(session => {
            if (session.chatName === currentChat[0].chatName) {
                session.isOpen = false
            }
        })
    } else if (currentChat[0].isOpen == false) {
        newSessions.map(session => {
            if (session.chatName === currentChat[0].chatName) {
                session.isOpen = true
            }
        })
    }

    return newSessions
    
}

export { openCloseChatHelper }