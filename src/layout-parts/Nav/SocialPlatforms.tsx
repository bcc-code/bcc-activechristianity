import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/Icons/SocialMedia'

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
        <StaticQuery
            query={query}
            render={(data: IFooterData) => {
                const { social_facebook, social_instagram } = data.acNodeSetting
                const colLinks = [
                    {
                        url: social_facebook,
                        icon: <FacebookIcon />,
                        name: 'Facebook'
                    },
                    {
                        url: social_instagram,
                        icon: <InstagramIcon />,
                        name: 'Instagram'
                    },
                    {
                        url: social_instagram,
                        icon: <YoutubeIcon />,
                        name: 'Youtube'
                    }
                ]
                return !col ? (
                    <div className="flex justify-around w-full items-center">
                        {colLinks.map((item, i) => {
                            return (
                                <Link to={item.url} key={i}>
                                    {item.icon}
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                        <div className="flex flex-col mt-8">
                            {colLinks.map((item, i) => {
                                return (
                                    <ColLink
                                        {...item}
                                        key={i}
                                    />
                                )
                            })}

                        </div>

                    )
            }} />

    )
}

export default SocialPlatforms

const query = graphql`
    query GetSocialSimple{
        acNodeSetting {
            social_facebook
            social_instagram
            
        }
    }
`

interface IFooterData {
    acNodeSetting: {
        social_facebook: string
        social_instagram: string
    }

}