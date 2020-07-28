import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as f from 'fpx'
import * as actions from '../store/actions'

import Spinner from './spinner'
import { Post } from './post'

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
                                    id={id}
                                    key={id}
                                    title={title}
                                    date={date}
                                    thumbnail={thumbnail}
                                    url={url}
                                    author={author}
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