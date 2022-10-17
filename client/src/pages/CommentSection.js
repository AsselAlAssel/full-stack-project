import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./CommentSection.css"
import { Comment } from './components/Comment'
import { useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const CommentSection = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id)
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState("");

    const handelDeleteComment = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3300/comments/${id}`, {
            headers: {
                token: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            console.log(response)
            setComments(comments.filter((val) => {
                return val.id !== id
            }
            ))
        })
    }

    useEffect(() => {
        console.log(comments)
        axios.get(`http://localhost:3300/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, []);


    const handlePostClicked = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3300/comments', {
            commentBody: comment,
            PostId: id
        }, {
            headers: {
                token: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            console.log(response)
            if (response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.error,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
                setComment("")
                navigate("/login")
            } else {
                console.log("---------------", response.data)
                setComments([...comments, response.data]);
                setComment("")
            }

        })
    }
    return (

        <div className='commentSection'>
            {console.log(comments)}
            <form onSubmit={handlePostClicked}>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)} />
                <button>Post</button>
            </form>
            <div className='commentsContainer'>
                {comments.map((comment) => {
                    console.log(comment)
                    return <Comment comment={comment} key={Math.random()}
                        handelDeleteComment={handelDeleteComment} />
                })}

            </div>
        </div>
    )
}
export default CommentSection