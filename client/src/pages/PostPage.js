import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from './components/Post'


const PostPage = () => {
    const { id } = useParams()
    const [postContent, setpostContent] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3300/posts/byId/${id}`).then((response) => {
            setpostContent(response.data)

        })
    }, []);
    return <Post postInfo={postContent} />
}

export default PostPage