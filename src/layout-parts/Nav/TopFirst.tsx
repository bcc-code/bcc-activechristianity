import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Link from '@/components/CustomLink'
import TS from '@/strings'

import LanguageDropdown from '@/layout-parts/Nav/Languages'
import UserNav from '@/layout-parts/Nav/User'
import Icon from '@/components/Icons/Icon'
const TopDesktop: React.FC = () => {

    return (
        <StaticQuery query={query}
            render={(data: IGetSiteUrl) => {
                const { acNodeSetting: { top_link } } = data
                const tagline: ITagline = {
                    text: TS.tagline,
                    path: top_link
                };
                return (
                    <div className="flex justify-between items-center border-gray-200 border-b py-2 sm:py-0 px-2 text-gray-500 text-sm ">
                        <a href={tagline.path} target="_window" className="flex items-center text-sm -mt-1 pl-1">
                            <span>{tagline.text}</span>
                            <span className="px-2">
                                <Icon name="Launch" size="4" color="slate-dark" />
                            </span>
                        </a>

                        <div className="hidden sm:flex items-center text-sm">
                            <UserNav className="pr-4" />

                            <Link className="py-2 pr-4 hover:text-d4slate" to={TS.slug_contact}>{TS.contact}</Link>
                            <LanguageDropdown className="border-l pl-2 p-0" />
                        </div>
                    </div>
                )
            }}

        />

    )
}

export default React.memo(TopDesktop)

export interface ITagline {
    text: string;
    path: string;
}

export const query = graphql`

    query GetSiteUrl {
        acNodeSetting{
            top_link
        }
    }
`

export interface IGetSiteUrl {
    acNodeSetting: {
        top_link: string
    }
}