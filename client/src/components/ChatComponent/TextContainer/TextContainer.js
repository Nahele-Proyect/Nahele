//React import
import React from 'react'
//Image import
import onlineIcon from '../../../images/onlineIcon.png'
//Self-made css import
import './TextContainer.css'

const TextContainer = ({ users }) => (
  <div className='textContainerComponent'>
    <div className="textContainer">
      {
        users &&
        (
          <div>
            <h1>Usuarios conectados</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    - {name}
                    <img alt="Online Icon" src={onlineIcon} />
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
      }
    </div>
  </div>
)

export default TextContainer