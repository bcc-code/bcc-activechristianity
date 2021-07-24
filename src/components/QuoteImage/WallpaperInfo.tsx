import * as React from 'react'
import Link from '@/components/CustomLink'
import { IQuote } from '@/types'
import ColorBlockNoImg from '@/components/PostItemCards/ColorBlockNoImg'
import { FetchTopicPostItems, FetchAuthorPosts } from '@/HOC/FetchTopicFormatType'
import { ToggleFollowWithName } from '@/components/PostElements/TopicToggleFollow'
import ac_strings from '@/strings/ac_strings'

const ShowWallpaperRelatedInfo: React.FC<IQuote> = (wallpaper) => {
    const isAcArticle = typeof wallpaper.source === "string" && wallpaper.source.toLowerCase() === "ac articles"
    const isBibleQuote = wallpaper.author && `${wallpaper.author.id}` === "108501"
    const postSectionHeader = isAcArticle ? ac_strings.quotes_found_post : ac_strings.explore_subject;

    const hasNotBibleAuthor = !isBibleQuote && wallpaper.author
    return (
        <div className="pt-10">
            {<div className="italic pb-4 ">{wallpaper.content}</div>}
            {!isBibleQuote && wallpaper.author && <h3 className="pb-4 italic">{ac_strings.by} {wallpaper.author.name}</h3>}
            {!isAcArticle && wallpaper.source && <h3 className="pb-4 italic">{ac_strings.from} {wallpaper.source}</h3>}

            {wallpaper.post && <h3 className="font-semibold pb-4">{postSectionHeader}</h3>}
            {wallpaper.post && (
                /*              <FetchOnePost
                                 slug={wallpaper.post.slug}
                                 render={({ post }) => {
                                     return post ? (
                                         
                                     ) : <div></div>
                                 }}
                             /> */
                <ColorBlockNoImg  {...wallpaper.post} />
            )}
            {
                wallpaper.author && !isBibleQuote && (
                    <>
                        <h3 className="font-semibold pb-4">{ac_strings.more_from} <Link className="text-ac-secondary" to={`${ac_strings.slug_ac_author}/${wallpaper.author.slug}`}>{wallpaper.author.name}</Link></h3>
                        <FetchAuthorPosts
                            slug={wallpaper.author.slug}
                            render={({ posts, loading }) => {
                                const post = posts[0]
                                return post ? (
                                    <ColorBlockNoImg {...post} />
                                ) : <div></div>
                            }}
                        />
                    </>
                )
            }
            {
                !hasNotBibleAuthor && wallpaper.topics && wallpaper.topics[0] && (
                    <>
                        <FetchTopicPostItems
                            layout="list"
                            topics={[wallpaper.topics[0]].map(t => ({ ...t, slug: `${ac_strings.slug_topic}/${t.slug}/1` }))}
                            render={({ topicPostItems }) => {
                                return (
                                    <>
                                        {topicPostItems.map(t => {

                                            return (
                                                <>
                                                    <h3 className="font-semibold pb-4">
                                                        {ac_strings.posts_from_same_topic} <Link className="text-ac-secondary" to={`${ac_strings.slug_topic}/${t.slug}`}>{t.name}</Link>
                                                    </h3>
                                                    {t.posts[0] && <ColorBlockNoImg {...t.posts[0]} />}
                                                </>

                                            )
                                        })}
                                    </>
                                )
                            }}
                        />
                    </>
                )
            }
            {wallpaper.topics && (
                <div className="flex flex-wrap border-ac-gray py-6">
                    {wallpaper.topics && wallpaper.topics.map(t => {
                        return <ToggleFollowWithName to={`${ac_strings.slug_topic}/${t.slug}/1`} name={t.name} id={t.id} />
                    })}
                </div>
            )}

        </div>
    )
}

export default ShowWallpaperRelatedInfo