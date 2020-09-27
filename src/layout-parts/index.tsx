import * as React from 'react'
import loadable from '@loadable/component'
import Link from '@/components/CustomLink'
import { ITranslations, INavItem, IAuthor, IPostAuthors } from '@/types'

import Icon from '@/components/Icons'
import IconMUI from '@/components/Icons/Icon'
const Row2ColAndXScroll = loadable(() => import('@/layout-parts/List/Combo/Row2Col-HorizontalScroll'))
import ShareButton from '@/layout-parts/Buttons/SharePopover'
import ToogleBookmark from '@/layout-parts/Buttons/ToggleBookmark'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
import FetchPostFromList from '@/layout-parts/HOC/FetchPostList'

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

interface IShareLikesViewsProps extends ILikesViewsProps {
    shareSlug: string
    text: string
}

interface ILikesViewsProps {
    id: string
    likes?: number
    views?: number
}

interface IDesktopPostMain extends IPostMain {
    headerLeft?: JSX.Element
    headerMeta?: JSX.Element

}

export const typeIcons: { [key: string]: JSX.Element } = {
    'listen': <Icon name="listen" size="lg" />,
    'read': <Icon name="file" size="lg" />,
    'watch': <Icon name="watch" size="lg" />

}

export const TitleWithIcon: React.FC<{ title: string | JSX.Element, icon: JSX.Element }> = ({ icon, title }) => (
    <span className="flex items-center">
        <span className="pr-4">{icon}</span> {title}
    </span>
)
export const LayoutH1: React.FC<{ title: string | JSX.Element, icon?: JSX.Element }> = ({ title, icon }) => (
    <h1 className="font-semibold sm:text-2xl md:text-3xl py-6 flex items-center">{icon && <div className="pr-4">{icon} </div>}<div>{title}</div></h1>
)

export const PostH1: React.FC<{ title: string }> = ({ title }) => (
    <h1 className=" font-semibold text-d4slate-dark text-2xl sm:text-4xl sm:leading-tight mb-4 sm:mb-6" dangerouslySetInnerHTML={{ __html: title }} />
)

export const PageSectionHeaderUpperCaseGray: React.FC<{ title: string }> = ({ title }) => (
    <span className="uppercase font-roboto text-gray-500 font-semibold text-sm">
        {title}
    </span>
)
export const PostRelatedContentHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="py-6 font-semibold text-sm sm:text-base text-d4secondary">{title}</div>
)
export const LayoutH1Wide: React.FC<{ title: string | JSX.Element }> = ({ title }) => (
    <div className="standard-max-w-px sm:block">
        <LayoutH1 title={title} />
    </div>
)

interface IUnderlineTitleLink {
    name: string;
    to?: string;
}

export const UnderlineTitleLink: React.FC<IUnderlineTitleLink> = ({ name, to }) => {
    const mainClass = "border-b w-full pb-1 relative text-xl h-12 mb-10"
    const text = <span className="block text-sm sm:text-base border-b border-d4primary pb-1 absolute uppercase font-roboto " style={{ bottom: "-1px" }}>{name}</span>
    if (to) {
        return (
            <Link className={`${mainClass} flex justify-between`} to={to} >
                {text}
            </Link>
        )
    } else {
        return (
            <div className={mainClass}>
                {text}
            </div>
        )
    }

}

const bgStyle = {
    filter: 'blur(15px)',
    opacity: '0.9',
    transform: 'scale(1.2)',

    backgroundSize: "cover",
    height: "300px",
    top: "-20px"

}

export const MobileHeaderBackground: React.FC<{ imgUrl: string }> = ({ imgUrl, children }) => {

    return (
        <div className="sm:hidden fixed inset-x top-0 w-full flex items-center" style={{ top: "50px", height: "330px" }}>
            <div
                className={`absolute w-full flex items-end`}
                style={{ ...bgStyle, backgroundImage: `url(${imgUrl})`, }}
            />
            <div className=" absolute left-0 top-0 bottom-0 right-0" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)' }}></div>

            <div className="flex flex-col justify-center items-center w-full" style={{ transform: "translateY(-15px)" }}>
                {children}
            </div>
        </div>
    )
}

const Translations: React.FC<{ translatedUrls?: INavItem[] }> = ({ translatedUrls }) => {
    if (translatedUrls && translatedUrls.length > 1) {

        return (
            <div className="border-d4gray border-t py-8 text-gray-600">
                <PageSectionHeaderUpperCaseGray title={ac_strings.postAvailable} />
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

export const BookmarksAndViews: React.FC<ILikesViewsProps> = (props) => {
    const { id, likes, views } = props
    return (
        <div className="font-roboto flex">
            <div className="mr-2 flex items-center">
                {typeof views === "number" && (
                    <div className="mr-4 flex items-center">
                        <IconMUI
                            name="VisibilityOutlined"
                            color="slate-light"
                            size="5"
                        />
                        <span className="text-xs text-d4slate-light pl-2">
                            {views}
                        </span>
                    </div>
                )}

                <ToogleBookmark
                    id={id}
                    color="slate-light"
                    size="5"
                />
                <span className="text-xs text-d4slate-light pl-2">
                    {likes}
                </span>
            </div>


        </div>
    )
}

export const AuthoerFollowSection: React.FC<{ authors: IPostAuthors }> = ({ authors }) => {
    return (
        <div className="flex flex-col">
            <PageSectionHeaderUpperCaseGray title={authors.as} />

            <span>{authors.authors.map(a => (
                <div className="text-sm">
                    <div className="font-roboto ">{a.name}</div>
                    <div className="text-gray-500">{a.excerpt}</div>
                </div>
                /*                 <div className="w-full flex justify-between items-center text-sm">
                                    <div>
                                        <div className="font-roboto ">{a.name}</div>
                                        <div className="text-gray-500">{a.excerpt}</div>
                                    </div>
                                    <OutlineSmallRounded>{ac_strings.follow}</OutlineSmallRounded>
                                </div> */

            ))}
            </span>
        </div>
    )
}
export const AuthorsFollowAndPosts: React.FC<{ authors: IPostAuthors[], postId: string }> = ({ authors, postId }) => {
    return (
        <div>
            <div className="border-d4gray border-b py-6">
                {authors?.map(item => {
                    return (
                        <AuthoerFollowSection authors={item} />
                    )
                })}
            </div>

            {authors?.map(item => {
                return (

                    <div>
                        {item.authors.map(a => (
                            <div className="py-6">
                                <FetchPostFromList
                                    slug={`${TS.slug_ac_author}/${a.to}`}
                                    layout="list"
                                    render={({ posts }) => {
                                        const fourPosts = posts.filter(p => p.id !== postId).slice(0, 4)
                                        return fourPosts.length > 0 ? (
                                            <Row2ColAndXScroll
                                                title={`${ac_strings.more_from} ${a.name}`}
                                                posts={posts}
                                            />
                                        ) : null
                                    }}

                                />
                            </div>

                        ))}
                    </div>

                )
            })}
        </div>
    )
}

export const AuthorBookmarkShareSection: React.FC<IShareLikesViewsProps & { authors?: IPostAuthors[] }> = (props) => {
    const { id, shareSlug, text, views, likes, authors } = props
    return (
        <div className="relative bg-white border-d4gray flex justify-between">
            <div className="flex">
                {authors?.map(item => {
                    return (
                        <AuthoerFollowSection authors={item} />
                    )
                })}
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
                />
            </div>
        </div>
    )
}


export const ShareSection: React.FC<IShareLikesViewsProps> = (props) => {
    const { id, shareSlug, text, views, likes } = props
    return (
        <div className="relative bg-white border-d4gray flex justify-between">
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

export const ShareBookmarkTopShortCuts: React.FC<IShareLikesViewsProps> = ({ id, shareSlug, text, views, likes }) => {
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
        <div className="flex flex-col fixed bottom-0 right-0 mx-3 py-2 mb-16 bg-white shadow rounded-full text-white text-sm" style={{ zIndex: 60 }}>
            <button className="px-2 py-1">
                <ToogleBookmark
                    id={id}
                />
            </button>
            <button className="px-2 py-1">
                <ShareButton
                    shareUrl={shareSlug}
                    text={text ? text : ""}
                    color="secondary"
                    size="6"
                    placement="right"
                />


            </button>
            <button className="px-2 py-1" onClick={scrollToTop}>
                <IconMUI
                    name="Publish"
                    color="secondary"
                    size="6"
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

                <p className="text-d4gray-dark mb-6 leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />

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
                        <p className="text-d4slate-dark-dark text-lg font-medium leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />
                        {headerMeta && <div className="border-b w-1/6 my-8 border-d4gray"></div>}
                        {headerMeta}
                    </div>

                </div>
                {children}
                <Translations translatedUrls={translatedUrls} />
            </div>

        </div >
    )
}
