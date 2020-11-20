import React from 'react'
import Link from '@/components/CustomLink'
import { IAuthor, ITopicNavItem } from '@/types'
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import topicFiter from '@/strings/topic-filters.json'
import TextSizeTitle, { ITextSizeWClamp } from '@/components/PostElements/TextSizeWClamp'
import ac_strings from '@/strings/ac_strings.js'
import Flickity from "react-flickity-component";
import SquareImage from '@/components/Images/Image1to1Rounded'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'
import shortid from 'shortid'
interface IFetchPost {
    topics?: ITopicNavItem[],
    authors?: IAuthor[],
    formats?: ITopicNavItem[]
    postId: string
}

const ReadNext: React.FC<IFetchPost> = ({ topics, authors, formats, postId }) => {
    return (

        <div className={`flex flex-col fixed h-20 left-0 bottom-0 right-0 bg-d4slate-lighter sm:hidden`} style={{ zIndex: 60, marginBottom: `65px` }}>
            {topics && formats && (

                <FetchTopicPostItems
                    topics={[...topics.map(t => ({ ...t, slug: `${t.to}/1` })), ...formats.map(f => ({ ...f, slug: `${f.to}/${ac_strings.slug_latest}` }))]}
                    layout={"list"}
                    render={({ topicPostItems }) => {

                        return (
                            <div>
                                <Flickity
                                    options={{ autoPlay: 8000, prevNextButtons: false, pageDots: false }}
                                >
                                    {topicPostItems.map(topic => {
                                        const selectFromList = topic.posts.filter(post => post.id !== postId)
                                        const randomNr = Math.floor(Math.random() * selectFromList.length)
                                        const pickPost = randomNr
                                        const showPost = selectFromList[pickPost]
                                        return (
                                            <div className="w-full" key={shortid()}>



                                                <div className="text-sm flex" >
                                                    <Link to={showPost.slug} className="h-20 w-20">
                                                        <SquareImage
                                                            {...showPost.image}
                                                        />
                                                    </Link>
                                                    <div className="flex-1 p-2">
                                                        <Link to={topic.slug} className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2">
                                                            More from <span className="font-bold text-d4secondary">{topic.name}</span>
                                                        </Link>
                                                        <Link to={showPost.slug} className="text-sm">
                                                            <TextSizeTitle
                                                                rawText={showPost.title}
                                                                clamp={2}
                                                                fontKey="text-sm"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Flickity>
                            </div>

                        )
                    }}
                />

            )}
        </div>


    )
}

export default React.memo(ReadNext)