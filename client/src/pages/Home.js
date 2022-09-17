import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from './components/Post';


export const Home = () => {
    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3300/posts").then((response) => {
            setListOfPosts(response.data);
        })
    }, []);
    return (
        <div className='home'>
            {listOfPosts.map((value) => <Post postInfo={value} key={Math.random()} />)}
        </div>

    );
}
