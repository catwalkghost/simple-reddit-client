import * as at from './actionTypes'
import * as c from '../shared/const'
import * as f from 'fpx'

export const fetchPostsInit = () => {
    return {
        type: at.FETCH_POSTS_INIT
    }
}

export const fetchPostInit = () => {
    return {
        type: at.FETCH_POST_INIT
    }
}

export const fetchPostSuccess = (post) => {
    return {
        type: at.FETCH_POST_SUCCESS,
        post: post,
    }
}

export const fetchPostError = (err) => {
    return {
        type: at.FETCH_POST_ERROR,
        error: err,
    }
}

export const fetchPostsSuccess = (fetchedPosts) => {
    return {
        type: at.FETCH_POSTS_SUCCESS,
        posts: fetchedPosts,
    }
}

export const fetchPostsError = (err) => {
    return {
        type: at.FETCH_POSTS_ERROR,
        error: err,
    }
}

export const fetchPosts = () => {
    // Using Thunk here:
    return dispatch => {
        dispatch(fetchPostsInit()) // To show the loading indicator/spinner

        fetch(c.BASE_URL + c.TOP_POSTS)
            .then(res =>
                res.json()
                    .then((res) => {
                        const { data: { children} } = res
                        // console.log(children)
                        let fetchedPosts = []

                        f.map(children, post => {
                            const { data: { id, title, thumbnail, url, author, smallImg } } = post
                            try {
                                fetchedPosts.push({
                                    id: id,
                                    title: title,
                                    thumbnail: thumbnail,
                                    url: url,
                                    author: author,
                                    smallImg: smallImg,
                                })
                            } catch (err) {
                                dispatch(fetchPostsError(err))
                            }
                        })
                        console.log(fetchedPosts)
                        dispatch(fetchPostsSuccess(fetchedPosts))
                    }))
    }
}

export const fetchPost = (postId) => {
    return dispatch => {
        dispatch(fetchPostInit())

        const queryParams = c.COMMENTS + postId + '.json'

        fetch(c.BASE_URL + queryParams)
            .then(res => res.json()
                .then(res => {
                    const { data } = res[0].data.children[0]
                    const img = data.preview.images[0].resolutions[3].url

                    const postDetails = res[0].data.children
                    let postData = []
                    f.map(postDetails, item => {
                        const { data: {id, title, thumbnail }} = item
                        try {
                            postData.push({
                                id: id,
                                title: title,
                                img: img,
                                thumbnail: thumbnail,
                            })
                        } catch (err) {
                            console.log(err)
                            dispatch(fetchPostError(err))
                        }

                    })
                    console.log(data,postData)
                    dispatch(fetchPostSuccess(postData))
                }))
    }
}