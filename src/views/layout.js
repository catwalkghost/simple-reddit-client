import React, { Component } from 'react'

class Layout extends Component {

    render() {
        const { props: { children }} = this

        return (
            <main className='content'>
                {children}
            </main>

        )
    }
}

export default Layout
