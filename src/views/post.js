import React, { Component } from 'react'
import FullPost from "./fullpost";
import {Link} from 'react-router-dom'

class Post extends Component {
    render(){
        const { id, title, thumbnail, url, author, smallImg } = this.props
        return (
            <Link to={`/posts/${id}`}>
                {console.log(id)}
                <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <h3>{title}</h3>
                    <img src={thumbnail} alt={title} />
                    <p>Author: {author}</p>
                </div>
            </Link>
        )
    }
}

export default Post