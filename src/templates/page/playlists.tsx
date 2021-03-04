import React from 'react'
import { graphql } from "gatsby"
// components
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { LayoutH1Wide } from '@/components/Headers'
import MetaTag from '@/components/Meta'
import PodcastTopImg from '@/components/PostItemCards/PlaylistTopImg'
// types
import { IPlaylist, ITranslations } from '@/types'
import shortId from 'shortid'
import ac_strings from '@/strings/ac_strings.js'
const PlaylistOverview: React.FC<IPlaylistOverviewProps> = ({ pageContext, path, data }) => {

    const { title, slug, } = pageContext
    const translatedUrls: ITranslations[] = []
    const { audio, podcasts, songs, playlists } = data.ac
    return (
        <div className="max-w-tablet mx-auto pt-6">
            <MetaTag
                title={title}
                translatedUrls={translatedUrls}
                type="page"
                breadcrumb={[]}
                path={path}

            />
            <LayoutH1Wide title={title} />
            <h2>Playlist</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  grid-h70  gap-2 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12 py-8 px-4">
                {playlists.map((p) => {

                    return (

                        <PodcastTopImg
                            key={shortId()}
                            {...p}
                            slug={`${ac_strings.slug_playlist}/${p.slug}`}
                        />
                    )
                })}
            </div>
            <h2>Songs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  grid-h70  gap-2 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12 py-8 px-4">
                {songs.map((p) => {

                    return (

                        <PodcastTopImg
                            key={shortId()}
                            {...p}
                            slug={`${ac_strings.slug_playlist}/${p.slug}`}
                        />
                    )
                })}
            </div>
            <h2>Audio Posts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  grid-h70  gap-2 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12 py-8 px-4">
                {audio.map((p) => {

                    return (

                        <PodcastTopImg
                            key={shortId()}
                            {...p}
                            slug={`${ac_strings.slug_playlist}/${p.slug}`}
                        />
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
            audio: IPlaylist[]
            songs: IPlaylist[]
            podcasts: IPlaylist[]
            playlists: IPlaylist[]
        }
    }
}

export const pageQuery = graphql`
fragment PlaylistSimple on AcGraphql_Playlist {
                id
                title
                slug
                excerpt
                image {
                    src
                    srcset
                    dataUri
                }
}
    query AllPlaylists {
        ac {
            audio:playlists(type:AUDIO_POSTS) {
                ...PlaylistSimple
            }
            songs:playlists(type:SONGS) {
                    ...PlaylistSimple
            }
            podcasts:playlists(type:PODCAST) {
                    ...PlaylistSimple
            }
            playlists {
                    ...PlaylistSimple
            }
        }
    }
`
