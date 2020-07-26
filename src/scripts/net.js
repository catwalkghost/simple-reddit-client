import * as c from '../shared/const'
import * as f from 'fpx'

export function fetchPosts() {
    fetch(c.POSTS_URL)
        .then(res =>
            res.json()
                .then((res) => {
                    const { data: { children} } = res
                    // console.log(children)
                    let postsArr = []
                    f.map(children, post => {
                        const { data: { id, title, thumbnail, url, author, smallImg } } = post
                        try {
                            postsArr.push({
                                id: id,
                                title: title,
                                thumbnail: thumbnail,
                                url: url,
                                author: author,
                                smallImg: smallImg,
                            })
                        } catch (err) {
                            console.log(err)
                        }
                    })
                    console.log(postsArr)
                    return postsArr
                })
        )
}