import React from 'react'
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <h1>the Golden Hour</h1>
      {props.showhome && 
        <Link to='/'>
          <p>Home</p>
        </Link>}
    </header>
  )
}

export default Header;