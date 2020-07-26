import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class FullPost extends Component {

    componentDidMount(){
        const { onFetchPost } = this.props
        onFetchPost()

    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                Post Goes Here
            </div>
        )
    }

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