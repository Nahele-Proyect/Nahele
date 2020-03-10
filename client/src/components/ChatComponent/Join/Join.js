//React imports
import React, { useState } from 'react'
import { Link } from "react-router-dom"
//Self-made css import
import './Join.css'

const Join = props => {
  const [room, setRoom] = useState('')

  return (
    <div className='joinComponent'>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Salas de chat</h1>

          <h2>{props.loggedInUser.username}</h2>

          <div >
            <div className="form-group">
              <label htmlFor="chatList">Escoge la sala de chat</label>
              <select name="park" className="form-control" id="chatList" onChange={e => setRoom(e.target.value)}>
                <option defaultValue hidden>Seleccionar</option> {/*TO-DO preguntar otra forma*/}
                <option value="perros">Perros</option>
                <option value="gatos">Gatos</option>
                <option value="otros">Otros</option>

              </select>
            </div>
          </div>
          <Link onClick={e => !room && e.preventDefault()} to={`/chat?room=${room}`}>
            <button className='button' type="submit">Entrar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Join