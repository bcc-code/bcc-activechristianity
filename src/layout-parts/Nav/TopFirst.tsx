import React, { Profiler } from 'react'
import { graphql } from "gatsby"
import ac_strings from '@/strings/ac_strings'

import LanguageDropdown from '@/layout-parts/Nav/Languages'
import UserNav from '@/layout-parts/Nav/User'
import { LaunchIcon } from '@/components/Icons/MUI/navIcons'
import { topLink } from '@/strings/generated/menus.json'

const TopDesktop: React.FC = () => {
    const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)

    React.useEffect(() => {
        setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
    }, [])

    if (isMobile) {
        return (
            <div className="sm:hidden">
            </div>
        )
    } else {
        return (
            <div className=" hidden sm:flex justify-between items-center border-gray-200 border-b py-2 sm:py-0 px-2 text-gray-500 text-sm ">

                <a href={topLink} target="_blank" className="flex items-center text-sm -mt-1 pl-1">
                    <span>{ac_strings.tagline}</span>
                    <span className="px-2">
                        <LaunchIcon customSize="4" className="fill-slate-dark" />
                    </span>
                </a>
                <div className="hidden sm:flex items-center text-sm">
                    <UserNav className="pr-4" />
                    <a target="_blank" href={`${ac_strings.slug_contact}`} className={"py-2 pr-4 hover:text-ac-slate"}>
                        {ac_strings.contact}
                    </a>
                    <LanguageDropdown className="border-l pl-2 p-0" />
                </div>
            </div>
        );
    };


}

export default React.memo(TopDesktop)

export interface ITagline {
    text: string;
    path: string;
}

export const query = graphql`

    query GetSiteUrlTop {
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