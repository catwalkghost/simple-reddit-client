import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import * as f from 'fpx'

class FullPost extends Component {

    componentDidMount(){
        const { onFetchPost, post } = this.props
        onFetchPost()
        console.log(post)


    }

    render() {
        const { post } = this.props
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                {f.map(post, postData => {
                    const { id, thumbnail, title } = postData
                    return (
                        <PostBody
                            key={id}
                            title={title}
                            thumbnail={thumbnail} />
                    )
                })}
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

const mapStateToProps = state => {
    const { post, loading, error } = state
    return {
        post: post,
        loading: loading,
        error: error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: () => dispatch(actions.fetchPost())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FullPost)