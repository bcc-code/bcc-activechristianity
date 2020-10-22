import React from 'react'
import { Link } from "gatsby";

import FetchSocialMediaPlatforms from '@/HOC/FetchSocialMediaPlatforms'

interface ISMPlatform {
    name: string
    url: string
    icon: JSX.Element
}

const ColLink: React.FC<{ icon: JSX.Element, name: string, url: string }> = ({ icon, name, url }) => {

    return (
        <Link to={url} className="flex w-full items-center bg-white mb-4 rounded-md p-4">
            <div className="px-2">
                {icon}
            </div>
            <div className="ml-4">
                {name}
            </div>
        </Link>
    )
}

const SocialPlatforms: React.FC<{ col?: boolean }> = ({ col }) => {


    return (
        <FetchSocialMediaPlatforms

            render={({ platforms }) => {
                return !col ? (
                    <div className="flex justify-around w-full items-center">
                        {platforms.map((item, i) => {
                            return (
                                <Link to={item.url} key={i}>
                                    {item.icon}
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                        <div className="flex flex-col mt-8">
                            {platforms.map((item, i) => {
                                return (
                                    <ColLink
                                        {...item}
                                        key={i}
                                    />
                                )
                            })}

                        </div>

                    )
            }}

        />



    )
}

export default SocialPlatforms
