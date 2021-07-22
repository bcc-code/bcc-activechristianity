import React from "react"
import { graphql } from "gatsby"


import Link from '@/components/CustomLink'

import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
// helpers
import { PodcastPageHeadSection } from '@/templates/page/podcast-intro'
import livingTheGospel from '@/strings/static/podcastProperties'

import ac_strings from '@/strings/ac_strings.js'
import menus from '@/strings/generated/menus.json'
const { menusItems } = menus


const PodcastHeader = () => {

    return (
        <div className="max-w-sm mx-auto">
            <PodcastPageHeadSection>
                <h1 className="p-4 font-semibold text-3xl relative z-10">{livingTheGospel.title}</h1>
                {/*                 <div className="flex">
                    <div className="p-4">

                        <Link
                            className="inline-block bg-white rounded-full text-ac-slate-dark px-4 py-2 font-semibold mb-4"
                            to={menusItems.podcast_info.to}
                        >
                            {ac_strings.learn_more}
                        </Link>
                        <SubscribePodcast />
                    </div>
                </div> */}

            </PodcastPageHeadSection>

        </div>
    )
}

export default PodcastHeader

