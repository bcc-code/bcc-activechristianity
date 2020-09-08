import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import RecommendLayout from '@/layouts/RecommendLayoutNew'
import { UnderlineTitleLink, typeIcons, LayoutH1Wide, TitleWithIcon } from '@/layout-parts'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { IOnePostByType } from '@/layout-parts/RecommendLayout/PostsByTypes'
import { IOnePostByTypeRow } from '@/layout-parts/RecommendLayout/PostsByTypeRow'
import { INavItem, IPostsByFormat, IPostItem, IPostsByFormatCollection, INavItemCount, ISubtopicLinks } from '@/types'
import { fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData'
import getPostByTypesLayout from '@/layout-parts/RecommendLayout/getPostsLayout'
// Types 
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {

    const { pageContext, path } = props
    const [headerPost, setHeaderPost] = React.useState<IPostItem | null>(null)
    const [latest, setLatest] = React.useState<IPostItem[]>([])
    const [popular, setPopular] = React.useState<IPostItem[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [mobilePostRows, setMobilePostRows] = React.useState<IOnePostByTypeRow[] | undefined>(undefined)
    const [desktopRow1, setDesktopRow1] = React.useState<IOnePostByType[] | undefined>(undefined)
    const [desktopRow2, setDesktopRow2] = React.useState<IOnePostByType[] | undefined>(undefined)
    const [typeLinks, setTypeLinks] = React.useState<INavItemCount[] | undefined>(undefined)
    const [formatLinks, setFormatLinks] = React.useState<INavItemCount[] | undefined>(undefined)
    const {
        title,
        types,
        formats,
        breadcrumb
    } = pageContext

    const latestSlug = `${path}/1`
    React.useEffect(() => {

        fetchPostslistFromArchivePage(latestSlug).then(res => {
            if (res) {
                setLatestPosts(res)

            }
        })
    }, [props.pageContext])

    React.useEffect(() => {
        if (types.length > 1) {
            setTypeLinks(types.map(link => ({ ...link, name: <TitleWithIcon icon={typeIcons[link.key]} title={link.name} /> })))
        }

        const nrOfFormats = formats.length


        if (nrOfFormats > 1) {
            setFormatLinks(formats)
            const getTypes: Promise<IPostsByFormat | undefined>[] = []
            formats.forEach(f => {
                const slug = `${TS.slug_topic}/${f.to}`
                getTypes.push(fetchPostslistFromArchivePage(slug).then(posts => {
                    if (posts) {
                        const postsByFormat: IPostsByFormat = {
                            keyName: f.key,
                            type: {
                                name: f.name,
                                to: slug,
                            },
                            postsRow: posts
                        }
                        return postsByFormat
                    }
                }))
            })

            Promise.all(getTypes).then(res => {
                const collection: IPostsByFormat[] = []
                res.forEach(r => {
                    if (r) {
                        collection.push(r)
                    }
                })

                const { postsByTypesRow, postsByTypesRow1, postsByTypesRow2 } = getPostByTypesLayout(collection)
                if (postsByTypesRow1.length > 0) {
                    setMobilePostRows(postsByTypesRow)
                }

                if (postsByTypesRow1.length > 1) {
                    setDesktopRow1(postsByTypesRow1)
                }

                if (postsByTypesRow2.length > 2) {
                    setDesktopRow2(postsByTypesRow2)
                }


            })

        }

    }, [props.pageContext])

    const setLatestPosts = (posts: IPostItem[]) => {

        setHeaderPost(posts[0])
        setLatest(posts)
        setPopular(posts.slice(5, 10))
    }

    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]} type="page"
                breadcrumb={breadcrumb}
                path={path}
            />
            <Placeholder loading={isLoading || !headerPost}>
                {headerPost && (
                    <RecommendLayout
                        latestSlug={latestSlug}
                        name={title}
                        headerPost={headerPost}
                        latestPosts={latest}
                        popularPosts={popular}
                        postsByTypes={mobilePostRows}
                        postsByTypesRow1={desktopRow1}
                        postsByTypesRow2={desktopRow2}
                        postTypes={formatLinks}
                        relatedTopics={typeLinks}

                    />
                )}
            </Placeholder>

        </div>
    )

}

export default TaxonomyPage
interface ITaxonomyPageProps {
    pageContext: {
        slug: string
        title: string
        breadcrumb: INavItem[]
        types: ISubtopicLinks[]
        formats: ISubtopicLinks[]
    }
    path: string
}

