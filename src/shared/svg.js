import React from 'react'

const svgProps = ({className: cls, ...props}) => {
    return {
        className: `feather ${cls || ''}`,
        xmlns: 'http://www.w3.org/2000/svg',
        width: '20',
        height: '20',
        viewBox: '0 0 20 20',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        ...props,
    }
}


// EmptySVG
export const EmptySVG = (props) => {
    return <svg {...svgProps(props)} strokeWidth='0' fill='currentColor'/>
}

// Upvote
export const UpVote = (props) => {
    return(
        <svg {...svgProps(props)} strokeWidth='0' fill='currentColor'>
            <path d='M9.951908,4.166667H9.951867l-5.36036,5.825781C4.593775,9.997617,4.592553,9.994831,4.594821,10h3.321361 c0.000668,0.000668,0.001042,0.001041,0.001709,0.001709V15h4.166667v-4.99648c0.001369-0.001369,0.002151-0.002151,0.00352-0.00352 h3.329831L9.951908,4.166667z' />
        </svg>
    )
}

// Comment Bubble
export const CommentBubble = (props) => {
    return(
        <svg {...svgProps(props)} strokeWidth='0' fill='currentColor' >
            <path d='M9.797619,5H6.869048C4.916324,5,3.333333,6.582991,3.333333,8.535715v0.071428c0,1.952715,1.58299,3.535714,3.535714,3.535714h2.178571v2.142858c0,0,3.126962-3.052717,3.273708-3.202253c0.625967-0.63787,1.012006-1.512015,1.012006-2.476318V8.535715C13.333333,6.582991,11.750343,5,9.797619,5z' />
        </svg>

    )
}

