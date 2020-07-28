import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as f from 'fpx'
import * as actions from '../store/actions'

import Post from './post'
import Spinner from './spinner'
import FullPost from './fullpost'

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
                <div>
                    {f.map(posts, post => {
                        const { id, title, date, thumbnail, url, author, smallImg, awards, upVotes } = post
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
        onFetchPosts: () => dispatch(actions.fetchPosts()),
        onFetchPost: (id) => dispatch(actions.fetchPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)