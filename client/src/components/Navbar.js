import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/' className='GoToHomePage'>Home Page</Link>
            <Link to='/create-post'>Create Post</Link>
            <Link to='/login'>Login</Link>
            <Link to='/registration'>Registration</Link>


        </div>
    )
}

export default Navbar