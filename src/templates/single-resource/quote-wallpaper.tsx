import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import Content from '@/components/Content'
import { PostH1 } from '@/components/Headers'


import { INavItem, IGlossary } from '@/types'

const Wallpaper: React.FC<IQuoteWallpaperProps> = (props) => {
    console.log(props)
    return (
        <div className="relativeh-full pt-4 max-w-tablet m-auto px-4 wallpapers-layout-container ">
            {/*                 <MetaTag
                path={path}
                title={title}
                type="article"
                translatedUrls={[]}
                breadcrumb={[...breadcrumb, { name: title, to: path }]}
            />
            <PostH1 title={title} />
            <div className="border-b w-1/6 my-8 border-ac-gray"></div>
            <Content content={glossary.content} title={title} slug={path} /> */}
        </div>
    )
}

export default Wallpaper
interface IQuoteWallpaperProps {
    path: string
    pageContext: {
        title: string
        slug: string
        glossary: IGlossary
        breadcrumb: INavItem[]
    }
}

export const wallpaperQuery = graphql`
    query quoteById($id: ID!) {
        ac {
            quote(id:$id){
                author {
                    name
                    slug
                }
                id
                content
                source
                images {
                    src
                    srcset
                    dataUri
                    colors
                }
            }
        }
    }
`