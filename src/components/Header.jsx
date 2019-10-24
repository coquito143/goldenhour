import React from 'react'
import { Link } from 'react-router-dom';
import camera from '../img/camera.png'

function Header(props) {
  return (
    <header>
      <h1><img src={camera} alt="camera icon" />  the Golden Hour</h1>
      <p>for creating magical photos</p>
      <p id="newzip" onClick={props.toggleHome()}>Enter New Zip Code</p>
  
    </header>
  )
}

export default Header;