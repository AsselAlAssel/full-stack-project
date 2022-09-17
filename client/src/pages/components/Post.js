import React from 'react'
import "./Post.css"
import user from '../../assets/user.jpg'

const Post = (props) => {
    const { username, title, postText } = props.postInfo;
    return (
        <div className='post'>
            <div className='post--writer post--head'>
                <img src={user} alt="user" />
                <p>{username}</p>
            </div>
            <div className='post--body'>
                <p className='post--title'>{title}</p>
                <p className='post--postText'>{postText}</p>
            </div>
        </div>
    )
}

export default Post