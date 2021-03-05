import * as React from 'react'
import Link from '@/components/CustomLink'
import { INavItem, IPostAuthors } from '@/types'
import { PageSectionHeaderUpperCaseGray, PostH1 } from '@/components/Headers'
import { BookmarksAndViews } from '@/components/PostElements'
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI/arrowIcons'
import { PublishIcon } from '@/components/Icons/MUI/postIcons'
import Row3ColAndXScroll from '@/components/List/Combo/Row3Col-HorizontalScroll'
import ShareButton from '@/components/PostElements/SharePopover'
import ToogleBookmark from '@/components/PostElements/ToggleBookmark'
import ac_strings from '@/strings/ac_strings.js'

import { FetchPostsFromArchivePage } from '@/HOC/FetchPosts'
import shortid from 'shortid'
interface IPostMain {
    id: string
    title: string
    excerpt: string
    shareSlug: string
    translatedUrls?: INavItem[]
    notHide?: boolean
}

interface IMobilePostMain extends IPostMain {
    height: number
}

export interface IShareLikesViewsProps extends ILikesViewsProps {
    shareSlug: string
    text: string
}

interface ILikesViewsProps {
    id: string
    likes?: number
    views?: string
}

interface IDesktopPostMain extends IPostMain {
    headerLeft?: JSX.Element
    headerMeta?: JSX.Element

}


const bgStyle = {
    filter: 'blur(15px)',
    opacity: '0.9',
    transform: 'scale(1.2)',

    height: "300px",
    top: "-20px",
    bottom: "-10px",
    right: "-10px",
    left: "-10px"

}

export const MobileHeaderBackground: React.FC<{ imgUrl: string }> = ({ imgUrl, children }) => {

    return (
        <div className="sm:hidden fixed inset-x top-0 w-full flex items-center" style={{ top: "96px", height: "330px" }}>
            <div
                className={`absolute w-full flex items-end`}
                style={{ ...bgStyle, backgroundImage: `url(${imgUrl})`, }}
            />
            <div className=" absolute left-0 top-0 bottom-0 right-0" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)' }}></div>

            <div className="flex flex-col justify-center items-center w-full" style={{ transform: "translateY(-30px)" }}>
                {children}
            </div>
        </div>
    )
}

export const Translations: React.FC<{ translatedUrls?: INavItem[] }> = ({ translatedUrls }) => {
    if (translatedUrls && translatedUrls.length > 1) {

        return (
            <div className="border-ac-gray border-t py-8 text-gray-600">
                <PageSectionHeaderUpperCaseGray title={ac_strings.post_available} />
                <div className="flex flex-wrap text-sm pt-4">
                    {translatedUrls.map(item => (
                        <a className="w-1/2 sm:w-1/3 md:w-1/4 pb-2" href={item.to}>{item.name}</a>
                    ))}
                </div>
            </div>
        )
    } else {
        return null
    }
}


export const AuthorFollowSection: React.FC<{ authors: IPostAuthors }> = ({ authors }) => {
    return (
        <div className="flex flex-col mb-4">
            <PageSectionHeaderUpperCaseGray title={authors.as} />

            <span className="">
                {authors.authors.map(a => (
                    <Link className="block text-sm pt-1" to={`${ac_strings.slug_ac_author}/${a.to}`}>
                        <div className="font-roboto ">{a.name}</div>
                        <div className="text-gray-500">{a.excerpt}</div>
                    </Link>
                ))}
            </span>
        </div>
    )
}
export const AuthorsFollowAndPosts: React.FC<{ authors: IPostAuthors[], postId: string }> = ({ authors, postId }) => {
    return (
        <div>
            <div className="border-ac-gray border-b pt-6">
                {authors?.map(item => {
                    return (
                        <AuthorFollowSection authors={item} />
                    )
                })}
            </div>

            {authors?.map(item => {
                return (

                    <div>
                        {item.authors.map(a => (
                            <FetchPostsFromArchivePage
                                slug={`${ac_strings.slug_ac_author}/${a.to}`}
                                layout="list"
                                render={({ posts }) => {
                                    const fourPosts = posts.filter(p => p.id !== postId).slice(0, 4)
                                    return fourPosts.length > 0 ? (
                                        <Row3ColAndXScroll
                                            title={`${ac_strings.more_from} ${a.name}`}
                                            posts={posts}
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

export const AuthorBookmarkShareSection: React.FC<IShareLikesViewsProps & { authors?: IPostAuthors[], formats?: ITopic[] }> = (props) => {
    const { id, shareSlug, text, views, likes, authors, formats } = props
    return (
        <div className="relative bg-white border-ac-gray flex justify-between">
            <div className="flex flex-col">
                {authors?.map(item => {
                    return (
                        <AuthorFollowSection authors={item} />
                    )
                })}
                {formats && formats.length > 0 && (
                    <span className="">
                        <PageSectionHeaderUpperCaseGray title={ac_strings.categories} />
                        {formats.map(a => (
                            <div>
                                <Link className="block text-sm pt-1" to={`${ac_strings.slug_ac_author}/${a.to}`}>
                                    <div className="font-roboto ">{a.name}</div>
                                    <div className="text-gray-500">{a.excerpt}</div>
                                </Link>
                            </div>
                        ))}
                    </span>
                )

                }


            </div>
            <div className="flex">
                <BookmarksAndViews
                    id={id}
                    views={views}
                    likes={likes}
                />
                <ShareButton
                    shareUrl={shareSlug}
                    text={text ? text : ""}
                    label={ac_strings.share}
                    color="slate-dark"
                />
            </div>
        </div>
    )
}


export const ShareSection: React.FC<IShareLikesViewsProps> = (props) => {
    const { id, shareSlug, text, views, likes } = props
    return (
        <div className="relative bg-white border-ac-gray flex justify-between">
            <BookmarksAndViews
                id={id}
                views={views}
                likes={likes}
            />
            <ShareButton
                shareUrl={shareSlug}
                text={text ? text : ""}
                label={ac_strings.share}
                size="5"
            />
        </div>
    )
}

export const ShareBookmarkTopShortCuts: React.FC<IShareLikesViewsProps & { isPlayingAudio: boolean }> = ({ id, shareSlug, text, isPlayingAudio }) => {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={`flex flex-col mx-3 py-2 fixed right-0 bottom-0 ${isPlayingAudio ? 'mb-40' : 'mb-24'} bg-white shadow rounded-full text-white text-sm`} style={{ zIndex: 60 }}>
            <button className="px-2 py-1" key={shortid()}>
                <ToogleBookmark
                    id={id}
                />
            </button>
            <button className="px-2 py-1" key={shortid()}>
                <ShareButton
                    shareUrl={shareSlug}
                    text={text ? text : ""}
                    color="secondary"
                    size="6"
                    placement="right"
                />


            </button>
            <button key={shortid()} className="px-2 py-1" onClick={scrollToTop}>
                <PublishIcon
                    className="fill-secondary"
                    customSize="6"
                />
            </button>
        </div>
    )
}
export const MobileMainWrapper: React.FC<{ height: number }> = ({ height, children }) => {
    return (
        <div className="sm:hidden">
            <div className="relative w-full h-full bg-white rounded-t-2xl mt-64 pt-4 px-4 z-50" style={{ marginTop: `${height}px` }}>
                <svg className="mx-auto mb-5" width="44" height="5" viewBox="0 0 44 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="44" height="5" rx="2.5" fill="#D4D4D4" />
                </svg>

                {children}

            </div>

        </div>
    )
}

export const MobilePostMain: React.FC<IMobilePostMain> = ({ id, height, title, excerpt, children, shareSlug, translatedUrls }) => {
    return (
        <div className="sm:hidden">
            <MobileMainWrapper height={height} >
                <PostH1 title={title} />

                <p className="text-ac-gray-dark mb-6 leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />

                {children}
                <Translations translatedUrls={translatedUrls || []} />
            </MobileMainWrapper>

        </div>
    )
}

export const DesktopPostMain: React.FC<IDesktopPostMain> = ({ id, title, excerpt, headerLeft, headerMeta, children, shareSlug, translatedUrls, notHide }) => {

    return (
        <div className={`${notHide ? '' : 'hidden'} sm:block mt-16 sm:mt-24 px-4`}>
            <div className="max-w-tablet m-auto">
                <div className="flex">
                    {headerLeft && (
                        <div className=" w-1/3 lg:w-4/12">
                            {headerLeft}
                        </div>
                    )}
                    <div className="flex-1">
                        <PostH1 title={title} />
                        <p className="text-ac-slate-dark-dark text-lg font-medium leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />
                        {headerMeta && <div className="border-b w-1/6 my-8 border-ac-gray"></div>}
                        {headerMeta}
                    </div>

                </div>
                {children}
                <Translations translatedUrls={translatedUrls} />
            </div>

        </div >
    )
}

export const MoreLatestLink: React.FC<{ latestSlug: string }> = ({ latestSlug }) => (
    <div className="w-full flex justify-center py-4">
        <Link
            className="flex items-center px-2 py-1 text-ac-secondary text-sm"
            to={`/${latestSlug}`}
        >
            <span>{ac_strings.more_latest}</span>
            <KeyboardArrowRightIcon customSize="4" className="fill-slate-dark" />
        </Link>
    </div>
)

