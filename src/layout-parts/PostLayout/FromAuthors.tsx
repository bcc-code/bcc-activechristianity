import * as React from 'react'
import { FetchPostsFromArchivePage } from '@/HOC/FetchPosts'
import { IPostAuthors } from '@/types'
import Row3ColAndXScroll from '@/components/List/Combo/Row3Col-HorizontalScroll'

import ac_strings from '@/strings/ac_strings.js'


const MoreFromAuthor: React.FC<{ authors: IPostAuthors[], postId: string }> = ({ authors, postId }) => {

    return (
        <div className="hidden sm:block">
            {authors?.map(item => {
                return (

                    <div className="pt-6">
                        {item.authors.map(a => (
                            <FetchPostsFromArchivePage
                                slug={`${ac_strings.slug_ac_author}/${a.to}`}
                                layout="list"
                                render={({ posts }) => {
                                    const filteredPosts = posts.filter(p => `${p.id}` !== `${postId}`).slice(0, 6)
                                    return filteredPosts.length > 0 ? (
                                        <Row3ColAndXScroll
                                            title={`${ac_strings.more_from} ${a.name}`}
                                            posts={filteredPosts}
                                        />
                                    ) : <div></div>
                                }}

                            />

                        ))}
                    </div>

                )
            })}
        </div>
    )
}
export default MoreFromAuthor

