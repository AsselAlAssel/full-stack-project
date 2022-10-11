import React from 'react'
import "./Comment.css"

export const Comment = (props) => {
    return (
        <div className='comment'>
            <p>{props.CommentBody}</p>
        </div>
    )
}
