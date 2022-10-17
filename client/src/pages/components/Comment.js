import React, { useContext } from 'react'
import "./Comment.css"
import { AiFillDelete } from 'react-icons/ai'
import { AuthContext } from '../../helpers/AuthContext'

export const Comment = ({ comment, handelDeleteComment }) => {
    const ctx = useContext(AuthContext)
    const handelDelete = () => {
        handelDeleteComment(comment.id)
    }


    console.log(comment)
    return (
        <div className='comment'>
            <p>{comment.username} :</p>
            <p style={{ paddingLeft: "20px " }}>{comment.commentBody}</p>
            {comment.username === ctx.AuthState.username && <p className='deleteContainer'>
                <button className='delete--button'
                    onClick={handelDelete}><AiFillDelete className='delete--icon' />
                </button> </p>
            }
        </div>
    )
}
