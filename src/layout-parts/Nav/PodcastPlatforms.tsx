import React from 'react'
import { socialLinks } from '@/strings/generated/menus.json'
import { GooglePodcastIcon, SpotifyIcon, ApplePodcastIcon } from '@/components/Icons/Podcast'
import { YoutubeIcon } from '@/components/Icons/SocialMedia'
import PlatformstNav from './PlatformsNav'
const { social_youtube, social_rss, social_itunes, social_spotify } = socialLinks

const platforms = [
    {
        icon: <ApplePodcastIcon customSize={36} className="w-6 h-6" />,
        name: 'iTunes',
        url: social_itunes
    }, {
        icon: <SpotifyIcon customSize={36} className="w-6 h-6" />,
        name: 'Spotify',
        url: social_spotify
    },
    {
        icon: <YoutubeIcon customSize={36} className="w-6 h-6" />,
        name: 'Youtube',
        url: social_youtube
    },
    {
        icon: <GooglePodcastIcon customSize={36} className="w-6 h-6" />,
        name: 'RSS',
        url: social_rss
    },
]
const Platforms: React.FC<{ col?: boolean }> = ({ col }) => <PlatformstNav platforms={platforms} col={col} />
export default platforms
