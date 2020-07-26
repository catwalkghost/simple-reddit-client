import React from 'react'

const post = (props) => {
    const { id, title, thumbnail, url, author, smallImg } = props
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
           <h3>{title}</h3>
           <img src={thumbnail} alt={title} />
           <p>Author: {author}</p>
        </div>
    )
}

export default post