import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as f from 'fpx'
import * as actions from '../store/actions'

import * as c from '../shared/const'
import * as m from '../shared/misc'

import { Post } from './post'

class Posts extends Component {

    componentDidMount(){
        const { onFetchPosts } = this.props
        onFetchPosts()
    }

    render() {
        const { posts, loading, error } = this.props

        let postsPage = <m.LoadingIndicator loadingText={c.LOADING} />
        if (!loading) {
            postsPage = (
                <div className='width-100p gaps-v-4'>
                    {f.map(posts, post => {
                        const { id, title, date, thumbnail, url, author, awards, upVotes, commentCount } = post
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
        if (error) {
            postsPage= <m.ErrorText errorText={error}/>
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