import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/' className='GoToHomePage'>Home Page</Link>
            <Link to='/create-post'>Create Post</Link>
        </div>
    )
}

export default Navbar