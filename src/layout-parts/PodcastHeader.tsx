import React from "react"
import { graphql } from "gatsby"

// Components

import { UnderlineLinkViewAll } from '@/components/Button'
import Link from '@/components/CustomLink'
import MetaTag from '@/components/Meta'

import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import TopImg from '@/components/PostItemCards/TopImg'
import RightImg from '@/components/PostItemCards/RightImg'
// helpers
import { PodcastPageHeadSection } from '@/templates/page/podcast-intro'
import livingTheGospel from '@/strings/podcastProperties'

import { INavItem } from '@/types'

import ac_strings from '@/strings/ac_strings.js'



const PodcastHeader = () => {

    return (
        <div className="max-w-sm mx-auto">
            <PodcastPageHeadSection>
                <h1 className="p-4 font-semibold text-3xl relative z-10">{livingTheGospel.title}</h1>
                <div className="flex">
                    <div className="p-4">

                        <Link
                            className="inline-block bg-white rounded-full text-ac-slate-dark px-4 py-2 font-semibold mb-4"
                            to={ac_strings.slug_podcast_intro}
                        >
                            {ac_strings.learn_more}
                        </Link>
                        <SubscribePodcast />
                    </div>
                </div>

            </PodcastPageHeadSection>

        </div>
    )
}

export default PodcastHeader

