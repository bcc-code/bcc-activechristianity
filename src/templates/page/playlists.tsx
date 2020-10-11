import React from 'react'
import { graphql } from "gatsby"
// components
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { LayoutH1Wide } from '@/components/Headers'
import MetaTag from '@/components/Meta'
import { playlistToPost } from '@/helpers'
// types
import { IPlaylist, ITranslations } from '@/types'

const PlaylistOverview: React.FC<IPlaylistOverviewProps> = ({ pageContext, path, data }) => {
    const { title, slug, } = pageContext
    const translatedUrls: ITranslations[] = []
    const allPlaylists = data.ac.playlists
    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={translatedUrls}
                type="page"
                breadcrumb={[]}
                path={path}

            />
            <LayoutH1Wide title={title} />
            <div className="grid grid-cols-2 md:grid-cols-4  grid-h70 standard-max-w-px py-8">
                {allPlaylists.map((item) => {
                    const post = playlistToPost(item)
                    return (

                        <div className="div-content">
                            <FeaturedCard
                                {...post}
                                likes={99}
                                type="playlist"

                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlaylistOverview



interface IPlaylistOverviewProps {
    path: string
    pageContext: {
        title: string
        slug: string

    }
    data: {
        ac: {
            playlists: IPlaylist[]
        }
    }
}

export const pageQuery = graphql`
    query AllPlaylists {
        ac {
            playlists {
                title
                slug
                image {
                    src
                    srcset
                    dataUri
                }
            }
        }
    }
`
