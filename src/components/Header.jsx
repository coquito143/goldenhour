import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>the Golden Hour</h1>
      <Link to='/'>
        <h2>Home</h2>
      </Link>
    </header>
  )
}

export default Header;