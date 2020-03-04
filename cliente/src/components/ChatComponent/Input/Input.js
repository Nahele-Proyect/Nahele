import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <div className='inputComponent'>
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button className="sendButton" onClick={e => sendMessage(e)}>Enviar</button>
    </form>
  </div>
)

export default Input;