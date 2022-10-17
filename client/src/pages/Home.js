import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Post from './components/Post';
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
    const ctx = useContext(AuthContext)
    const navigate = useNavigate();
    if (!ctx.AuthState.isLogin) {
        navigate('/login')
    }

    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3300/posts", {
            headers: {
                token: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setListOfPosts(response.data);
        })
    }, []);
    return (
        <div className='home'>
            {listOfPosts.map((value) => <Post postInfo={value} key={Math.random()} setListOfPosts={setListOfPosts} listOfPosts={listOfPosts} home={true} />)}
        </div>

    );
}
