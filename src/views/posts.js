import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as f from 'fpx'
import * as actions from '../store/actions'

import Spinner from './spinner'
import * as u from '../shared/utils'
import * as t from 'timeago.js'
import * as m from '../shared/misc'
import * as s from '../shared/svg'

class Posts extends Component {

    componentDidMount(){
        const { onFetchPosts } = this.props
        onFetchPosts()
    }

    render() {
        const { posts, loading, error, onFetchPost } = this.props

        let postsPage = <Spinner />
        if (!loading) {
            postsPage = (
                <div className='width-100p gaps-v-4'>
                    {f.map(posts, post => {
                        const { id, title, date, thumbnail, url, author, smallImg, awards, upVotes, commentCount } = post
                        return (
                                <Post
                                    onClick={(id) => {onFetchPost(id)} }
                                    id={id}
                                    key={id}
                                    title={title}
                                    date={date}
                                    thumbnail={thumbnail}
                                    url={url}
                                    author={author}
                                    smallImg={smallImg}
                                    upVotes={upVotes}
                                    commentCount={commentCount}
                                    awards={awards} />
                        )
                    })}
                </div>
            )
        }

        return postsPage
    }

}

const mapStateToProps = state => {
    const { posts, loading, error } = state
    return {
        posts: posts,
        loading: loading,
        error: error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

const Post = (props) => {
    const { id, title, url, author, awards, date, upVotes, commentCount } = props
    const awardsShort = f.take(f.reverse(f.sortBy(awards, u.getCount)), 3)
    const dateFormatted = t.format(date * 1000)
    const upVotesFormatted = u.thousandsToK(upVotes, 0)
    const commentCountFormatted = u.thousandsToK(commentCount, 1)
    return (
            <div className='post-card gaps-v-1'>
                <div className='row-start-center gaps-h-0x5 width-100p'>
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
                <Link to={`/posts/${id}`}>
                    <h3 className='font-h2 font-weight-700'>{title}</h3>
                    <m.Image className='width-100p margin-t-1' url={url} alt={title} />
                </Link>

                <Reactions upVotes={upVotesFormatted} commentCount={commentCountFormatted}/>
            </div>
    )
}

const Award = (props) => {
    const {img, count} = props
    return (
        <div className='row-start-center'>
            <img src={img} alt='awards' className='award' />
            <span className='padding-l-0x25'>{count}</span>
        </div>

    )
}

const AuthorBlock = (props) => {
    const {authorName, date} = props
    return(
        <div className='row-start-center'>
            <span>Posted by u/{authorName} {date}</span>
        </div>
    )
}

const Reactions = (props) => {
    const {upVotes, commentCount} = props
    return (
        <div className='row-start-center gaps-h-0x5 width-100p'>
            <div className='row-start-center gaps-h-0x25'>
                <s.UpVote />
                {upVotes}
            </div>
            <div className='row-start-center'>
                <s.CommentBubble />
                {commentCount}
            </div>
        </div>
    )
}