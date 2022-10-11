import React from 'react'
import AuthForm from './components/AuthForm'

const Registration = () => {
    return (
        <div className='registration'>
            <h3>Registration</h3>
            <AuthForm apiLink="http://localhost:3300/auth" sendToken={false} />
        </div>
    )

}

export default Registration