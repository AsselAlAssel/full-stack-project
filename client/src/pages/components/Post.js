import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext';
import "./Post.css"
import user from '../../assets/user.jpg'
import { useNavigate, Link } from 'react-router-dom'
import { AiFillDelete, AiOutlineLike } from 'react-icons/ai'
import { BiCommentDetail, BiShare } from 'react-icons/bi'
import axios from 'axios'

const Post = (props) => {
    console.log(props.postInfo)
    const { username, title, postText, id, Likes, UserId } = props.postInfo;
    const length = Likes?.length;
    const [numberOflikes, setnumberOflikes] = useState(0);
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    let isLiked = Likes?.find((like) => {
        return like.UserId === ctx.AuthState.id
    })

    if (!isLiked) {
        isLiked = Likes?.find((like) => {
            return like === "0"
        })
        console.log(isLiked, "isLiked")
    }

    console.log(isLiked)
    const [liked, setliked] = useState(false);

    useEffect(() => {
        setnumberOflikes(length)
        setliked(!!isLiked ? true : false)
    }, [length, isLiked])


    const handelPostClicked = () => {
        navigate(`/post/${id}`)
    }

    const handelClickDeletePost = () => {
        axios.delete(`http://localhost:3300/posts/${id}`, {
            headers: {
                token: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            props.setListOfPosts(props.listOfPosts.filter((val) => {
                return val.id !== id
            }
            ))
        }
        )
    }


    const handelPostLike = (event) => {
        console.log(event.target.closest('button'))
        console.log(liked)


        axios.post("http://localhost:3300/likes", {
            PostId: id,
            UserId: ctx.AuthState.id

        }).then(res => {
            if (props?.home) {
                console.log("home")
                props.setListOfPosts(props.listOfPosts.map((post) => {
                    if (post.id === id) {
                        if (res.data.isLiked) {
                            return { ...post, Likes: [...post.Likes, "0"] }
                        } else {
                            const likesArray = post.Likes;
                            likesArray.splice(likesArray.findIndex((like) => like.UserId === ctx.AuthState.id), 1)
                            return { ...post, Likes: likesArray }
                        }
                    } else {
                        return post
                    }
                }))
                return;
            } else {
                if (res.data.isLiked) {
                    setnumberOflikes(numberOflikes + 1)
                } else {
                    setnumberOflikes(numberOflikes - 1)
                }
            }

            setliked(!liked)

        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className='post' >
            {ctx.AuthState.id === UserId && props?.home && < button className='post--delete' onClick={handelClickDeletePost}><AiFillDelete className='post--deleteIcon' /></button>}
            <div className='post--writer post--head'>
                <img src={user} alt="user" />
                {!props?.user ? (
                    <p><Link to={`user-info/${UserId}`} >{username}</Link></p>
                ) :
                    <p>{username}</p>
                }
            </div>
            <div className='post--body'>
                <p className='post--title'>{title}</p>
                <p className='post--postText'>{postText}</p>
            </div>
            <div className='post--footer'>
                <div className='numberOflikesAndcooments'>
                    <p>0 comments</p>
                    <p>{numberOflikes} likes</p>
                </div>
                {!props?.user &&
                    < div className='like-share-comments'>
                        <button><BiShare className='icon share' /></button>
                        <button onClick={handelPostClicked}><BiCommentDetail className='icon commentBtn' /></button>
                        <button className={liked ? "active" : "xxxx"} onClick={event => handelPostLike(event)} > <AiOutlineLike className='icon like' /></button>
                    </div>
                }
            </div >

        </div >

    )
}

export default Post