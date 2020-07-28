import React from 'react'

export const Image = ({alt, style, url, className}) => {
    return (
        <img
            className={`${className || ''}`}
            style={style}
            src={url}
            alt={alt} />
    )
}