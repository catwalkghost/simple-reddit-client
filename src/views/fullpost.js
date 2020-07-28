import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import {Helmet} from 'react-helmet'
import * as f from 'fpx'
import * as c from '../shared/const'
import {Post} from './post'

class FullPost extends Component {

    componentDidMount(){
        const { onFetchPost, match: { params: { id }}} = this.props
        onFetchPost(id)
    }

    render() {
        const { post, comments } = this.props
        const { id, title, created_utc, url, author, all_awardings, ups, num_comments } = post
        return (
            <>
                <Helmet title={`${title} | ${c.TITLE}`}/>
                <div className='col-center-center width-100p'>
                    <Post
                        id={id}
                        key={id}
                        title={title}
                        date={created_utc}
                        url={url}
                        author={author}
                        upVotes={ups}
                        commentCount={num_comments}
                        awards={all_awardings} />
                    <Comments comments={comments} />
                </div>
            </>
        )
    }
}


const Comments = (props) => {
    const {comments} = props
    return (
        <div className='col-start-center comments-block'>
            {!comments ? null :
            f.map(comments, (level, i) => {
                return (
                    <div key={i} className='comment-block'>
                        {f.map(level, cmt => {
                            const { id } = cmt
                            return <Comment key={id} cmt={cmt}/>
                        })}
                    </div>
                )
            })}
        </div>
    )
}

const Comment = (props) => {
    const { cmt } = props
    const { author, depth, score, body } = cmt
    return (
        <div className='padding-1' style={{ marginLeft: `${depth}rem` }}>
            <div className='fg-grey font-weight-700'>
                <span>{author}</span>
                <span>{score}</span>
            </div>
            <p className='comment-body'>{body}</p>
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