import React, { Component } from 'react'
import FullPost from "./fullpost";
import { Link } from 'react-router-dom'
import * as f from 'fpx'
import * as u from '../shared/utils'
import * as t from 'timeago.js'

const post = (props) => {
    const { id, title, thumbnail, url, author, smallImg, awards, date, upVotes } = props
    const awardsShort = f.take(f.reverse(f.sortBy(awards, u.getCount)), 3)
    const dateFormatted = t.format(date * 1000)
    const upVotesFormatted = u.thousandsToK(upVotes)
    return (
        <Link to={`/posts/${id}`}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <AuthorBlock authorName={author} date={dateFormatted}/>
                    {f.map(awardsShort, award => {
                        const { id, count, static_icon_url } = award
                        return (
                            <Award
                                key={id}
                                img={static_icon_url}
                                count={count} />
                        )
                })}
                </div>
                <h3>{title}</h3>
                <img src={thumbnail} alt={title} />
                <Reactions upVotes={upVotesFormatted} />
            </div>
        </Link>
    )
}

export default post

const Award = (props) => {
    const {img, count} = props
    return (
            <>
                <img src={img} alt='awards' style={{ maxWidth: '30px' }}/>
                <span>{count}</span>
            </>

    )
}

const AuthorBlock = (props) => {
    const {authorName, date} = props
    return(
        <div>
            <span>Posted by u/{authorName} {date}</span>
        </div>
    )
}

const Reactions = (props) => {
    const {upVotes, commentCount} = props
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {upVotes}
            </div>
        </div>
    )
}
