import React, { Component } from 'react'
import FullPost from "./fullpost";
import { Link } from 'react-router-dom'

const post = (props) => {
    const { id, title, thumbnail, url, author, smallImg } = props
    return (
        <Link to={`/posts/${id}`}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <h3>{title}</h3>
                <img src={thumbnail} alt={title} />
                <p>Author: {author}</p>
            </div>
        </Link>
    )
}

export default post