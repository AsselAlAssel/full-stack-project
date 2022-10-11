import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from './CommentSection'
import Post from './components/Post'
import "./PostPage.css"


const PostPage = () => {
    const { id } = useParams()
    const [postContent, setpostContent] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3300/posts/byId/${id}`).then((response) => {
            setpostContent(response.data)

        })
    }, []);
    return (
        <div className='postPage'>
            <div className='postPage--post'>
                <Post postInfo={postContent} />
            </div>
            <CommentSection />
        </div>
    )

}

export default PostPage