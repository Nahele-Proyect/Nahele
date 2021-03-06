//React import
import React from 'react'
//Images import
import onlineIcon from '../../../images/onlineIcon.png'
import closeIcon from '../../../images/closeIcon.png'
//Self-made css import
import './InfoBar.css'

const InfoBar = props => (
  <div className='infoComponent'>
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>Sala: {props.room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/join"><img src={closeIcon} alt="close icon" /></a>
      </div>
    </div>
  </div>
)

export default InfoBar