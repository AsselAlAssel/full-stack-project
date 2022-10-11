import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'

function Navbar() {
    const ctx = useContext(AuthContext)
    return (
        <div className='navbar'>
            <Link to='/' className='GoToHomePage'>Home Page</Link>
            <Link to='/create-post'>Create Post</Link>
            {!ctx.AuthState &&
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/registration'>Registration</Link>
                </>
            }

        </div>
    )
}

export default Navbar