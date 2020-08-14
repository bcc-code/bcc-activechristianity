import React from 'react'

import { GooglePodcastIcon, SpotifyIcon, ApplePodcastIcon } from '@/components/Icons/Podcast'
import { YoutubeIcon } from '@/components/Icons/SocialMedia'

interface ISubscribePodcast {
    showText?: boolean
}
interface IPodcastPlatform {
    icon: JSX.Element,
    name: string,
    to?: string,
    href?: string
}


export const platforms: IPodcastPlatform[] = [

    {
        icon: <ApplePodcastIcon customSize={36} className="w-6 h-6" />,
        name: 'iTunes',
        href: 'https://podcasts.apple.com/no/podcast/living-the-gospel/id1476370542'
    }, {
        icon: <SpotifyIcon customSize={36} className="w-6 h-6" />,
        name: 'Spotify',
        href: 'https://open.spotify.com/show/7t07k9sAKEMsKYutGZ6kqh?si=n_DCbkFyRgqf1O264x0Akw'
    },
    {
        icon: <YoutubeIcon customSize={36} className="w-6 h-6" />,
        name: 'RSS',
        href: `${process.env.SITE_URL}/podcast_feed.xml`
    },
    {
        icon: <GooglePodcastIcon customSize={36} className="w-6 h-6" />,
        name: 'RSS',
        href: `${process.env.SITE_URL}/podcast_feed.xml`
    },

]

export const SubscribePodcast: React.FC<ISubscribePodcast> = ({ showText }) => (
    <div className="flex flex-col mt-2 mb-4 text-gray-600 ">
        {showText === true && <span className="w-full text-sm sm:text-center pb-4">Subscribe on</span>}
        <div className="w-full flex flex-wrap">
            {/*  */}
            {platforms.map((item, k) => {
                return (
                    <a key={k} className="flex-1 max-h-8 max-w-8 mx-2" href={item.href} rel="noopener noreferrer">{item.icon}</a>
                )
            })}
        </div>
    </div>
)