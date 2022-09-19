import React from 'react'
import "./Post.css"
import user from '../../assets/user.jpg'
import { useNavigate } from 'react-router-dom'

const Post = (props) => {
    const { username, title, postText, id } = props.postInfo;
    const navigate = useNavigate();
    const handelPostClicked = () => {
        navigate(`/post/${id}`)
    }

    return (
        <div className='post' onClick={handelPostClicked}>
            <div className='post--writer post--head'>
                <img src={user} alt="user" />
                <p>{username}</p>
            </div>
            <div className='post--body'>
                <p className='post--title'>{title}</p>
                <p className='post--postText'>{postText}</p>
            </div>
        </div >
    )
}

export default Post