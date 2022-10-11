import React from 'react'
import AuthForm from './components/AuthForm'

const Login = () => {
    return (
        <div className='login'>
            <h3>Login</h3>
            <AuthForm apiLink="http://localhost:3300/auth/login" sendToken={true} />
        </div>
    )
}

export default Login