import * as React from 'react';
import h2p from 'html2plaintext'
import SquareImg from '@/components/Images/Image1to1Rounded'
import { PlaylistPlayButton } from '@/layout-parts/Buttons/PlayButton'

import Link from '@/components/CustomLink'
import { IPostItem, IImage, IPostAuthors } from '@/types'
import TS from '@/strings'
import Icon from '@/components/Icons/Icon'
import Bookmark from '@/layout-parts/Buttons/ToggleBookmark'
import { BookmarksAndViews } from '@/layout-parts'
import './style/parts.css'

interface ITextConfig {
    [key: string]: {
        s: string
        h2lines: string
        h3lines?: string
        h4lines?: string
    }
}
const textConfig: ITextConfig = {
    'top-img-exceprt': {
        s: 'text-gray-600 text-sm',
        h2lines: 'max-h-10',
        h3lines: 'max-h-16'
    },
    'excerpt': {
        s: 'text-gray-600 text-base',
        h2lines: 'max-h-12',
        h3lines: 'max-h-18'
    },
    'excerpt-lg': {
        s: 'text-gray-600 text-base sm:text-lg',
        h2lines: 'max-h-12 sm:max-h-14',
        h3lines: 'max-h-16 sm:max-h-18'//'max-h-20 sm:max-h-24'
    },
    'simple-lg': {
        s: 'text-lg',
        h2lines: 'h-14 max-h-14',
        h3lines: 'h-18 max-h-18'
    },
    'right-img': {
        s: 'text-base md:text-lg lg:text-xl',
        h2lines: 'max-h-12 sm:max-h-14 lg:max-h-15 xl:max-h-18'
    },//16px-24px

    'feature-card': {
        s: 'text-sm md:text-base lg:text-lg',
        h2lines: 'max-h-12 sm:max-h-12 md:max-h-15 lg:max-h-18',
        h3lines: 'max-h-16 sm:max-h-18 md:max-h-20 lg:max-h-22'
    },
    'feature-card-full': {
        s: 'text-base md:text-xl lg:text-2xl ',
        h2lines: 'max-h-12 md:max-h-15 lg:max-h-18',
    },
    'top-img': {
        s: 'text-base',
        h2lines: 'max-h-12 sm:max-h-15',
        h3lines: 'max-h-20 sm:max-h-24',
        h4lines: 'max-h-24'
    }, //16px-18px
    'top-img-lg': {
        s: 'text-2xl',
        h2lines: 'max-h-18 '
    }, // 24px
    'header-post': {
        s: 'text-xl lg:text-3xl xl:text-4xl leading-tight', // text-2xl lg:text-4xl xl:text-5xl leading-tight'
        h2lines: 'max-h-14 sm:max-h-24 lg:max-h-36 xl:max-h-48'
    } //18px-64px
}
interface IPostItemTitle {
    rawText: string,
    fontKey?: string,
    bold?: 'font-semibold' | 'font-bold',
    clamp?: 1 | 2 | 3 | 4,
    className?: string
}

const getClass = (props: IPostItemTitle) => {

    const { fontKey, bold, clamp, className } = props
    let size = 'text-base sm:text-lg'
    let h = ''
    let clampClass = ''

    if (fontKey && textConfig[fontKey]) {
        size = textConfig[fontKey].s

        if (clamp && clamp === 1) {
            clampClass = 'truncate'
        }
        if (clamp && clamp === 2) {
            h = textConfig[fontKey].h2lines
            clampClass = 'clamp2'
        }

        if (clamp && clamp === 3) {
            h = textConfig[fontKey].h3lines || textConfig[fontKey].h2lines
            clampClass = 'clamp3'
        }

        if (clamp && clamp === 4) {
            h = textConfig[fontKey].h4lines || textConfig[fontKey].h3lines || textConfig[fontKey].h2lines
            clampClass = 'clamp4'
        }
    }
    let textClass = size

    if (h !== '') {
        textClass = `${textClass} ${h}`
    }

    if (clampClass !== '') {
        textClass = `${textClass} ${clampClass}`
    }

    if (bold) {
        textClass = `${textClass} ${bold}`
    }

    if (className) {
        textClass = `${textClass} ${className}`
    }

    return textClass
}

export const PostTitle: React.FC<IPostItemTitle> = (props) => {
    const textClass = getClass(props)
    const title = h2p(props.rawText)

    return (
        <h2 className={textClass}>{title}</h2>
    )
}


export const PostExcerpt: React.FC<IPostItemTitle> = (props) => {
    const excerptClass = getClass(props)
    const excerpt = h2p(props.rawText)

    return (
        <div className={excerptClass}>{excerpt}</div>
    )

}

export const ReadMore: React.FC<{ slug: string, bookmarked?: boolean, id: string }> = ({ slug, bookmarked, id }) => {
    return (
        <div className="flex justify-between">
            <Link className="block text-indigo-500 text-sm" to={slug}>{TS.read_more}</Link>
            <Bookmark id={id} color="slate-light" size="4" />
        </div>
    )
}

interface IProps {
    className?: string
    readingTime?: string
    authors?: IPostAuthors[]
}

export const AuthorLink: React.FC<{ authors?: IPostAuthors[] }> = ({ authors }) => {
    return <span>{authors && authors[0] ? authors[0].authors.map(item => <Link className="inline-block post-meta-commar" to={item.to}>{item.name}</Link>) : ''}</span>
}
export const ReadingTimingAuthor: React.FC<IProps> = ({ readingTime, authors, className }) => {

    return (
        <span className={className ? className : 'text-sm text-gray-600'}>
            <span>{readingTime ? readingTime : ''}</span>
            {readingTime && authors && <span> · </span>}
            <AuthorLink authors={authors} />
        </span>
    )
}

export const ReadingTimingIcon: React.FC<IProps> = ({ readingTime, authors, className }) => {

    return (
        <span className={"text-sm text-gray-600 mr-2 flex items-center"}>
            <Icon
                name="AccessTime"
                color="slate-light"
                size="5"
            />
            <span className="text-xs text-d4slate-light pl-2">
                {readingTime}
            </span>
        </span>
    )
}


export const PlaylistBackground: React.FC<{ slug: string, imageUrl: IImage }> = ({ slug, imageUrl }) => {
    return (
        <div className="w-full relative">
            <div id="play-button" className="absolute p-2 text-white z-10 inset-0 flex justify-center items-center">
                <PlaylistPlayButton slug={slug} />
            </div>
            <SquareImg {...imageUrl} alt='background' />
        </div>
    )
}

export interface IPostBase {
    wrapperClass?: string
    postTitleProps: IPostItemTitle
    postExcerptProps: IPostItemTitle
    hasReadMore?: boolean
    hasReadingTime?: boolean
    audioDuration?: boolean
    post: IPostItem

}
export const PostBase: React.FC<IPostBase> = (props) => {
    const { wrapperClass, postExcerptProps, postTitleProps, hasReadMore, post, hasReadingTime, audioDuration } = props
    const { slug, reading_time, bookmarked, id, authors, media } = post

    let postAuthors = authors
    let postReadingTime = reading_time?.text

    if (media && media.audio && audioDuration) {
        postAuthors = []
        postReadingTime = media.audio.duration
    }

    return (
        <div className={`flex flex-col flex-1 ${wrapperClass}`}>
            <Link to={`/${slug}`} className="flex flex-col flex-1 leading-normal">
                <PostTitle {...postTitleProps} />
                <PostExcerpt {...postExcerptProps} />
                <div className="text-sm text-gray-500 mb-4"> <AuthorLink authors={authors} /></div>
            </Link>


            <div className="pb-4 flex">
                <ReadingTimingIcon
                    readingTime={postReadingTime}
                />
                <BookmarksAndViews
                    id={id}
                    likes={post.likes}
                    views={post.views}
                />
            </div>
            {hasReadMore && (
                <ReadMore slug={slug} bookmarked={bookmarked} id={id} />
            )}
        </div>
    )
}

export const PostLabel: React.FC<{ text: string | JSX.Element }> = ({ text }) => (
    <span className="font-roboto rounded uppercase p-1 text-xxs bg-white opacity-75">{text}</span>
)