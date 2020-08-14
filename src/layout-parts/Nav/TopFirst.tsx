import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import TS from '@/strings'

import LanguageDropdown from '@/layout-parts/Nav/Languages'
import UserNav from '@/layout-parts/Nav/User'
import NewWindowIcons from '@/components/Icons/NewWindow'
const TopDesktop: React.FC = () => {

    return (
        <StaticQuery query={query}
            render={(data: IGetSiteUrl) => {
                const { acNodeSetting: { url } } = data
                const tagline: ITagline = {
                    text: TS.tagline,
                    path: url
                };
                return (
                    <div className="flex justify-between items-center border-gray-200 border-b py-2 sm:py-0 px-2 text-gray-500 text-sm ">
                        <a href={tagline.path} target="_window" className="flex items-center text-sm">
                            <span>{tagline.text}</span>
                            <span className="px-2"><NewWindowIcons className="w-4 h-4" /></span>
                        </a>

                        <div className="hidden sm:flex items-center text-sm">
                            <UserNav className="pr-4" />

                            <Link className="py-2 pr-4" to={TS.slug_contact}>{TS.contact}</Link>
                            <LanguageDropdown className="border-l pl-2 p-0" />
                        </div>
                    </div>
                )
            }}

        />

    )
}

export default TopDesktop

export interface ITagline {
    text: string;
    path: string;
}

export const query = graphql`

    query GetSiteUrl {
        acNodeSetting{
            url
        }
    }
`

export interface IGetSiteUrl {
    acNodeSetting: {
        url: string
    }
}