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
        const { post } = this.props
        const { id, thumbnail, title} = post
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <PostBody
                    key={id}
                    title={title}
                    thumbnail={thumbnail} />
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

const comment = (props) => {

}


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