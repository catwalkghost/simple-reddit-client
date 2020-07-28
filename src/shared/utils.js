import * as f from 'fpx'

// A simple util to update objects immutably. Handy for Redux
export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    }
}

export const commentsParser = (data) => {
    let result = {}

    result.post = data[0].data.children[0].data
    result.comments = flatComments(data[1].data.children)

    return result
}

// Flatten Comments
const flatComments = (comments) => {
    let result = []
    comments.forEach(({ data: cmt }) => {
        if (!cmt.children) {
            const replies = getReplies(cmt)
            result.push([cmt, ...replies])
        }
    })
    return result
}

const getReplies = (comment) => {
    if (!comment.replies) {
        return []
    }
    let replies = []
    const { children } = comment.replies.data
    children.forEach(child => {
        if (child.kind !== "more") {
            const rep = child.data;
            const moreReps = getReplies(rep)
            replies = replies.concat(rep, moreReps)
        }
    })
    return replies
}

export const getCount = ({count}) => {
    return count
}

export const thousandsToK = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(0)) + 'K' : Math.sign(num)*Math.abs(num)
}
