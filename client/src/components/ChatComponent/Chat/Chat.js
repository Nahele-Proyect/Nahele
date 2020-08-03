//React imports
import React, { useState, useEffect } from "react"
import queryString from 'query-string'
//Sockets imports
import io from "socket.io-client"
//Self-made components imports
import TextContainer from '../TextContainer/TextContainer'
import Messages from '../Messages/Messages'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
//Self-made css import
import './Chat.css'

let socket

const Chat = props => {
  const [name] = useState(props.loggedInUser.username)
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = `${process.env.REACT_APP_URL_CHAT}`

  useEffect(() => {
    const { room } = queryString.parse(props.location.search)
    socket = io(ENDPOINT)

    setRoom(room)

    socket.emit('join', { name, room }, (error) => error && alert(error))
  }, [ENDPOINT, name, props.location.search])

  useEffect(() => {
    socket.on('message', (message) => setMessages([...messages, message]))

    socket.on('roomData', ({ users }) => setUsers(users))

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [messages])


  const sendMessage = e => {
    e.preventDefault()
    message && socket.emit('sendMessage', message, () => setMessage(''))
  }

  return (

    <div className='chatComponent'>
      <div className="outerContainer">
        <div className="container">

          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users} />
      </div>
    </div>
  )
}

export default Chat
