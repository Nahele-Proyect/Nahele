//React import
import React from 'react'
//Scroll import
import ScrollToBottom from 'react-scroll-to-bottom'
//Self-made component import
import Message from './Message/Message'
//Self-made css import
import './Messages.css'

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
  </ScrollToBottom>
)

export default Messages