import React from 'react'
import "./Comment.css"

export const Comment = ({ comment }) => {
    console.log(comment)
    return (
        <div className='comment'>
            <p>{comment.username} :</p>
            <p style={{ paddingLeft: "20px " }}>{comment.commentBody}</p>
        </div>
    )
}
