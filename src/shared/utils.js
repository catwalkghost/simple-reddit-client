import * as f from 'fpx'
import * as c from './const'

// Checks if a string not empty
export const isNonEmptyString = (value) => {
    return f.isString(value) && value.trim() !== ''
}

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

export const thousandsToK = (num, fractionDigits) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(fractionDigits)) + 'K' : Math.sign(num)*Math.abs(num)
}

// Fake Button props

/*
Usage:

  <span {...u.fakeButtonProps({onClick: someAction})}>
    label
  </span>

Usable for layouts unsupported by the native button element, such as a flex
container. Doesn't work for submit buttons. Supports focus and keyboard
activation. Last resort, try native buttons first.
*/
export const fakeButtonProps = ({onClick, disabled, readOnly, ...props} = {}) => {
    disabled = Boolean(disabled || readOnly)
    return {
        role: 'button',
        tabIndex: disabled ? undefined : 0,
        onKeyPress: (onClick && !disabled)
            ? simulateActivationOnKeyPress.bind(undefined, onClick)
            : undefined,
        onClick,
        disabled,
        ...props,
    }
}

const simulateActivationOnKeyPress = (onClick, event) => {
    f.validate(onClick, f.isFunction)
    if (event.keyCode === c.KEY_CODE_ENTER) {
        onClick(event)
        return
    }
    if (event.keyCode === c.KEY_CODE_SPACE) {
        // Prevent default scroll on Space
        event.preventDefault()
        onClick(event)
    }
}
