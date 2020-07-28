import React, { Component } from 'react'
import FullPost from "./fullpost";
import { Link } from 'react-router-dom'
import * as f from 'fpx'
import * as u from '../shared/utils'

const post = (props) => {
    const { id, title, thumbnail, url, author, smallImg, awards } = props
    const awardsShort = f.take(f.reverse(f.sortBy(awards, u.getCount)), 3)

    return (
        <Link to={`/posts/${id}`}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {f.map(awardsShort, award => {
                    return (
                        <Award img={award.static_icon_url}
                        count={award.count} />
                    )
                })}
                </div>
                <h3>{title}</h3>
                <img src={thumbnail} alt={title} />
                <p>Author: {author}</p>
            </div>
        </Link>
    )
}

export default post

const Award = (props) => {
    const {img, count} = props
    return (
            <>
                <img src={img} alt='awards' />
                <span>{count}</span>
            </>

    )
}