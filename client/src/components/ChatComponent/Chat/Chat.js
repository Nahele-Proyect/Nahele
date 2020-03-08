import React, { useState, useEffect } from "react"
import queryString from 'query-string'

import io from "socket.io-client"

import TextContainer from '../TextContainer/TextContainer'
import Messages from '../Messages/Messages'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'

import './Chat.css'

let socket

const Chat = props => {
  const [name] = useState(props.loggedInUser.username)
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    const { room } = queryString.parse(props.location.search)
    socket = io(ENDPOINT)

    setRoom(room)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error)
      }
    })
  }, [ENDPOINT, props.location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })

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

          <InfoBar room={ room } />
          <Messages messages={ messages } name={ name } />
          <Input message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
        </div>
        <TextContainer users={ users } />
      </div>
    </div>
  )
}

export default Chat
