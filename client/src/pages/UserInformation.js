import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "./UserInformation.css"
import Post from './components/Post'
import { AuthContext } from '../helpers/AuthContext'




const UserInformation = () => {

    const { id } = useParams()
    const [listOfPosts, setListOfPosts] = useState([])
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3300/posts/user-info/${id}`).then((response) => {
            setListOfPosts(response.data)
        })
    }, [])
    console.log(listOfPosts)
    const handelChangePasswordClicked = () => {
        navigate("/chnage-pass");
    }


    return (
        <div className='userInfo'>
            <h1 className='userInfo--username'>{listOfPosts[0]?.username}</h1>
            <div className='userInfo--EditProfile'>
                {ctx.AuthState.username === listOfPosts[0]?.username && (
                    <button className='userInfo--changeThePassword' onClick={handelChangePasswordClicked}>Change the password</button>
                )}
            </div>


            <div className='userInfo--posts'>
                {listOfPosts.map((value, key) => {
                    return <Post key={value.id} postInfo={value} user={true} />
                })}
            </div>

        </div>
    )
}

export default UserInformation