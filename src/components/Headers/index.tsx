
import * as React from 'react';
import Link from '@/components/CustomLink'

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

export const PageSectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="font-semibold pb-4 px-4 text-xl">{title}</div>
)

export const PageSectionHeaderUpperCaseGray: React.FC<{ title: string }> = ({ title }) => (
    <span className="uppercase font-roboto text-d4slate-light font-semibold text-xs">
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