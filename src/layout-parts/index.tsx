import * as React from 'react'
import Link from '@/components/CustomLink'
import { ITranslations, INavItem } from '@/types'
import ArrowRight from '@/components/Icons/ArrowRight'
import h2p from 'html2plaintext'
import ShareButton from '@/components/Buttons/SharePopover'
import ToogleBookmark from '@/components/Buttons/ToggleBookmark'
import ac_strings from '@/strings/ac_strings.json'
import languages from '@/strings/languages.json'

import WatchIcon from '@/components/Icons/Screen';
import AudioIcon from '@/components/Icons/Audio';
import FileIcon from '@/components/Icons/File'


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

interface IShareProps {
    id: string
    shareSlug: string
    text: string
    simple?: boolean
    bookmarked?: boolean
    size?: number

}

interface IDesktopPostMain extends IPostMain {
    headerLeft?: JSX.Element
    headerMeta?: JSX.Element

}

export const typeIcons: { [key: string]: JSX.Element } = {
    'listen': <AudioIcon />,
    'read': <FileIcon className="w-6 h-6" />,
    'watch': <WatchIcon className="pt-1 w-5 h-5" />

}

export const TitleWithIcon: React.FC<{ title: string | JSX.Element, icon: JSX.Element }> = ({ icon, title }) => (
    <span className="flex">
        <span className="pr-4">{icon}</span> {title}
    </span>
)
export const LayoutH1: React.FC<{ title: string | JSX.Element }> = ({ title }) => (
    <h1 className="font-semibold sm:text-2xl md:text-3xl py-6"> {title}</h1>
)

export const PostH1: React.FC<{ title: string }> = ({ title }) => (
    <h1 className=" font-semibold text-d4slate-dark text-2xl sm:text-4xl sm:leading-tight mb-4 sm:mb-6" dangerouslySetInnerHTML={{ __html: title }} />
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
                <h6>{ac_strings.postAvailable}</h6>
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

export const ShareSection: React.FC<IShareProps> = (props) => {
    const { id, shareSlug, text, simple, bookmarked, size } = props
    return (
        <div className={simple ? "mr-2 flex" : "relative bg-white border-d4gray border-t flex justify-between py-8 px-4"}>
            <div className={simple ? "mr-4 flex" : "flex items-center text-d4gray-dark"}>
                <ToogleBookmark
                    id={id}
                    bookmarked={bookmarked}
                    className={simple ? "text-d4gray-dark" : ""}
                    size={size}
                />
                {simple !== true && <span className="px-4 uppercase">28 likes</span>}
            </div>
            <ShareButton
                shareUrl={shareSlug}
                text={text ? text : ""}
                label={simple ? undefined : "Share"}
                size={size}
            />
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

                <p className="text-d4gray-dark text-lg mb-6 leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />

                {children}
                <ShareSection id={id} shareSlug={shareSlug} text={excerpt} />
                <Translations translatedUrls={translatedUrls || []} />
            </MobileMainWrapper>

        </div>
    )
}

export const DesktopPostMain: React.FC<IDesktopPostMain> = ({ id, title, excerpt, headerLeft, headerMeta, children, shareSlug, translatedUrls, notHide }) => {

    return (
        <div className={`${notHide ? '' : 'hidden'} sm:block mt-16 sm:mt-24`}>
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
                <ShareSection id={id} shareSlug={shareSlug} text={h2p(excerpt)} />
                <Translations translatedUrls={translatedUrls} />
            </div>

        </div >
    )
}
