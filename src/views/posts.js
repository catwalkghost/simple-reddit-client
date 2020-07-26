import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as f from 'fpx'
import * as actions from '../store/actions'

import Post from './post'
import Spinner from './spinner'

class Posts extends Component {

    componentDidMount(){
        const { onFetchPosts } = this.props
        onFetchPosts()
    }

    render() {
        const { posts, loading, error } = this.props

        let postsPage = <Spinner />
        if (!loading) {
            postsPage = (
                <div>
                    {f.map(posts, post => {
                        const { id, title, thumbnail, url, author, smallImg } = post
                        return (
                            <Post
                                key={id}
                                title={title}
                                thumbnail={thumbnail}
                                url={url}
                                author={author}
                                smallImg={smallImg} />
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