import * as at from './actionTypes'
import * as u from '../shared/utils'

const initialState = {
    posts: [],
    post: [],
    comments: [],
    loading: false,
    error: null,
}

const loadingTrue = (state, action) => {
    return u.updateObject(state, {loading: true})
}


const fetchPostsSuccess = (state, action) => {
    return u.updateObject(state, {
        posts: action.posts,
        loading: false,
    })
}

const fetchPostSuccess = (state, action) => {
    return u.updateObject(state, {
        post: action.post,
        comments: action.comments,
        loading: false,
    })
}

const fetchError = (state, action) => {
    return u.updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case at.FETCH_POSTS_INIT:
            return loadingTrue(state, action)

        case at.FETCH_POSTS_SUCCESS:
            return fetchPostsSuccess(state,action)

        case at.FETCH_POSTS_ERROR:
            return fetchError(state, action)

        case at.FETCH_POST_INIT:
            return loadingTrue(state, action)

        case at.FETCH_POST_SUCCESS:
            return fetchPostSuccess(state,action)

        case at.FETCH_POST_ERROR:
            return fetchError(state, action)

        default:
            return state
    }
}

export default reducer