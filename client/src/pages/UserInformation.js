import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./UserInformation.css"
import Post from './components/Post'




const UserInformation = () => {
    const { id } = useParams()
    const [listOfPosts, setListOfPosts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3300/posts/user-info/${id}`).then((response) => {
            setListOfPosts(response.data)
        })
    }, [])
    console.log(listOfPosts)


    return (
        <div className='userInfo'>
            <h1 className='userInfo--username'>{listOfPosts[0]?.username}</h1>
            <div className='userInfo--posts'>
                {listOfPosts.map((value, key) => {
                    return <Post key={value.id} postInfo={value} user={true} />
                })}
            </div>

        </div>
    )
}

export default UserInformation