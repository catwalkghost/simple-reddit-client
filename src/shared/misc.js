import React from 'react'
import * as u from './utils'

export const Image = ({alt, style, url, className}) => {
    return (
        <img
            className={`${className || ''}`}
            style={style}
            src={url}
            alt={alt} />
    )
}

export const LoadingIndicator = ({loadingText}) => {
    return (
        <div className='col-center-center gaps-v-2 height-100p'>
            <div className='pulsating' />
                <span className='fg-primary'>{loadingText}</span> :
        </div>
    )
}

export const ErrorText = ({errorText}) => {
    return (
        <div className='col-center-center gaps-v-2'>
            <div className='pulsating' />
            <span className='fg-error'>Error</span>
            {u.isNonEmptyString(errorText)
                ? <span className='fg-error'>{errorText}</span>
                : null
            }
        </div>
    )
}