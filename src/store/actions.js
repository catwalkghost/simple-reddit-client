import * as at from './actionTypes'
import * as c from '../shared/const'
import * as f from 'fpx'
import * as u from '../shared/utils'

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
        post: post.post,
        comments: post.comments,
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
                            const { data: { id, title, thumbnail, url, author, smallImg, all_awardings, created_utc, ups, num_comments } } = post
                            try {
                                fetchedPosts.push({
                                    id: id,
                                    title: title,
                                    date: created_utc,
                                    thumbnail: thumbnail,
                                    url: url,
                                    author: author,
                                    smallImg: smallImg,
                                    awards: all_awardings,
                                    upVotes: ups,
                                    commentCount: num_comments,
                                })
                            } catch (err) {
                                dispatch(fetchPostsError(err))
                            }
                        })
                        // console.log(fetchedPosts)
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
                    const postData = u.commentsParser(res)
                    console.log(postData.post, postData.comments)
                    dispatch(fetchPostSuccess(postData))
                })
                .catch(err => console.log(err))
            )
    }
}
