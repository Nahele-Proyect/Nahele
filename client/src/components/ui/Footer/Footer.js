import React from 'react'

import './footer.css'

import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
    return (
        <Navbar sticky='bottom' className='footer' bg='dark'>
            <Navbar.Collapse className="justify-content-center items-align-center">
                <p>
                    Made by: <a href='https://github.com/Andres-Atehortua' target='blank'>Andrés </a> & <a href='https://github.com/Nelsoncc1812' target='blank'> Nelson</a></p>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Footer

