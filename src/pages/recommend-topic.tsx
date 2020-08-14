import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import loadable from '@loadable/component'
import { SectionChild, ISectionProps } from '@/components/ScrollSection/Section'
import { IPaginate, INavItem, IPostItem, IEbook, IPlaylist, IPostRes } from "@/types"
import { LayoutH1Wide } from '@/layout-parts'
// Types 
import { normalizePostRes } from '@/helpers'
const FeatureSection = loadable(() => import('@/components/PostItem/DesktopHeaderPost'))
import TS from '@/strings'


const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {
    console.log(props)
    const { pageContext, path, data } = props
    const { ebooks, posts, playlists } = data.ac
    const allPosts = posts.data.map(item => normalizePostRes(item));

    const {
        title,
        breadcrumb

    } = pageContext

    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(allPosts[0])


    const mockSections: ISectionProps[] = [{
        title: "Test",
        childPosts: allPosts.slice(1, 5),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel facilisis libero. Donec vel lorem ipsum. Vestibulum viverra nulla libero, ac facilisis ligula commodo a. Fusce sollicitudin convallis erat, non convallis neque semper eu. Etiam aliquam blandit ex vel aliquam. Nam fermentum eget nibh et euismod. Curabitur faucibus metus eu mollis viverra. Integer posuere pellentesque euismod. Donec suscipit vulputate elit eu elementum. Sed cursus dictum magna quis finibus.",
        ebook: ebooks[0],
        playlist: playlists[0],
        mainPost: allPosts[2],
        links: [
            { name: 'link name', to: 'slug' },
            { name: 'link name 2', to: 'slug-2' }
        ]


    }]
    const [sections, setSection] = React.useState<ISectionProps[]>(mockSections)

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]} type="page"
                breadcrumb={breadcrumb}
                path={path}
            />
            <LayoutH1Wide title={"Mock Title"} />
            {headerPost && (
                <FeatureSection  {...headerPost} />
            )}
            <div className="standard-max-w-px py-8">
                {sections.map(s => {
                    return (
                        <SectionChild {...s} />
                    )
                })}
            </div>

        </div>
    )

}

export default TaxonomyPage
interface ITaxonomyPageProps {
    pageContext: {
        slug: string
        title: string
        breadcrumb: INavItem[]
    }
    path: string
    data: {
        ac: {
            ebooks: IEbook[]
            playlists: IPlaylist[]
            posts: {
                data: IPostRes[]
            }
        }
    }
}

export const pageQuery = graphql`
    query TestTopic {
        ac {
            ebooks {
                title
                excerpt
                sources
                slug
                authors {
                name
                slug
                pivot {
                    as
                    }
                }
                image {
                    src
                    srcset
                    alt
                }
            }

            playlists {
                title
                slug
                excerpt
                tracks {
                    src
                    title
                    id
                    post {
                        slug
                    }
                }

            }
            
        }

    }
`

