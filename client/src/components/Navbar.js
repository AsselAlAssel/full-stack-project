import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'

function Navbar() {
    const ctx = useContext(AuthContext)
    const handellogoutClicked = () => {
        localStorage.removeItem('accessToken')
        ctx.setAuthState({
            username: "",
            id: "",
            isLogin: false
        })
    }
    return (
        <div className='navbar'>
            <div className='nav-links'>

                {!ctx.AuthState.isLogin ? (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/registration'>Registration</Link>
                    </>
                ) : (
                    <><Link to='/' className='GoToHomePage'>Home Page</Link>
                        <Link to='/create-post'>Create Post</Link></>
                )
                }
            </div>
            <div className='nav-logout'>
                {ctx.AuthState.isLogin &&
                    <>
                        <span>{ctx.AuthState.username}</span>
                        <button onClick={handellogoutClicked}>Logout</button>
                    </>
                }

            </div>

        </div >
    )
}

export default Navbar