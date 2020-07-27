import React, {Component} from 'react'
import { connect, useSelector } from 'react-redux'
import * as actions from '../store/actions'

import * as f from 'fpx'

class FullPost extends Component {

    componentDidMount(){
        const { onFetchPost, match: { params: { id }}} = this.props
        onFetchPost(id)
    }

    render() {
        const { post, comments } = this.props
        const { id, thumbnail, title} = post
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <PostBody
                    key={id}
                    title={title}
                    thumbnail={thumbnail} />
                <Comments comments={comments} />
            </div>
        )
    }
}

const PostBody = (props) => {
    const { title, thumbnail } = props
    return (
        <div>
            <h3>{title}</h3>
            <img src={thumbnail} alt={title} />
        </div>
    )
}

const Comments = (props) => {
    const {comments} = props
    return (
        <div>
            {!comments ? null :
            f.map(comments, (level, i) => {
                return (
                    <div key={i} className="comment-block">
                        {level.map(cmt => <Comment key={cmt.id} cmt={cmt} />)}
                    </div>
                )
            })}
        </div>
    )
}

const Comment = (props) => {
    const { cmt } = props
    const { author, depth, score, body, body_html } = cmt
    return (
        <div className="comment" style={{ marginLeft: `${depth}rem` }}>
            <div>
                <span className="comment__author">{author}</span>
                <span className="comment__score">{score}</span>
            </div>
            {/*<div dangerouslySetInnerHTML={{ __html: body_html }} />*/}
            <p>{body}</p>
        </div>
    );
};



const mapStateToProps = state => {
    const { post, comments, loading, error } = state
    return {
        post: post,
        comments: comments,
        loading: loading,
        error: error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (id) => dispatch(actions.fetchPost(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FullPost)