import * as at from './actionTypes'
import * as u from '../shared/utils'

const initialState = {
    posts: [],
    post: [],
    comments: [],
    loading: false,
    error: null,
}

const loadingFalse = (state, action) => {
    return u.updateObject(state, {loadingFalse})
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case at.FETCH_POSTS_INIT:
            return loadingFalse(state, action)

        case at.FETCH_POSTS_SUCCESS:
            return fetchPostsSuccess(state,action)

        case at.FETCH_POSTS_ERROR:
            return loadingFalse(state, action)

        case at.FETCH_POST_INIT:
            return loadingFalse(state, action)

        case at.FETCH_POST_SUCCESS:
            return fetchPostSuccess(state,action)

        case at.FETCH_POST_ERROR:
            return loadingFalse(state, action)

        default:
            return state
    }
}

export default reducer