import React from 'react'
import menus from '@/strings/generated/menus.json'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/Icons/SocialMedia'
import PlatformstNav from './PlatformsNav'
const { socialLinks } = menus
const { social_facebook, social_instagram, social_youtube, social_rss, social_itunes, social_spotify } = socialLinks

export const platforms = [
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
        url: social_youtube,
        icon: <YoutubeIcon />,
        name: 'Youtube'
    }
]
const PlatformsAll: React.FC<{ col?: boolean }> = ({ col }) => <PlatformstNav platforms={platforms} col={col} />
export default PlatformsAll
