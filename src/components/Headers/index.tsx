
import * as React from 'react';
import Link from '@/components/CustomLink'
import { UnderlineLinkViewAll } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.js'
export const TitleWithIcon: React.FC<{ title: string | JSX.Element, icon: JSX.Element }> = ({ icon, title }) => (
    <span className="flex">
        <span className="pr-2">{icon}</span>
        <span> {title}</span>
    </span>
)
export const LayoutH1: React.FC<{ title: string | JSX.Element, icon?: JSX.Element }> = ({ title, icon }) => (
    <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl py-6 flex items-center">{icon && <div className="pr-4">{icon} </div>}<div>{title}</div></h1>
)

export const PostH1: React.FC<{ title: string }> = ({ title }) => (
    <h1 className=" font-semibold text-ac-slate-dark text-2xl sm:text-4xl sm:leading-tight mb-4 sm:mb-6" dangerouslySetInnerHTML={{ __html: title }} />
)

export const PageSectionHeader: React.FC<{ title: string, className?: string }> = ({ title, className }) => (
    <div className={`px-4 text-2xl ${className ? className : ''}`}>{title}</div>
)

export const PageSectionHeaderUpperCaseGray: React.FC<{ title: string }> = ({ title }) => (
    <span className="block uppercase font-roboto font-normal text-gray-500 text-sm tracking-wider pb-2">
        {title}
    </span>
)
export const PostRelatedContentHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="py-6 font-semibold text-sm sm:text-base text-ac-secondary">{title}</div>
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
    const mainClass = "border-b w-full pb-1 relative h-12 mb-10"
    const text = <span className="block text-sm sm:text-base border-b border-ac-primary pb-1 absolute uppercase font-roboto " style={{ bottom: "-1px" }}>{name}</span>
    if (to) {
        return (
            <Link className={`${mainClass} flex justify-between items-end`} to={to} >
                <span className=" text-xl ">{text}</span>
                <span className="text-sm text-ac-slate-light">{ac_strings.see_all}</span>
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

export const SectionTitleDesktopAndMobile: React.FC<IUnderlineTitleLink> = ({ name, to }) => {
    return (
        <div>
            <div className="hidden sm:block standard-max-w-px">
                <UnderlineTitleLink name={name} to={to} />
            </div>
            <div className="block sm:hidden">
                <div className="w-full flex justify-between pt-6 pr-4">
                    <PageSectionHeader title={name} className="pb-4" />
                    {to && <UnderlineLinkViewAll to={`${to}`} />}
                </div>
            </div>
        </div>
    )
}