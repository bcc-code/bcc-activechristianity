import React from 'react'
import { graphql } from "gatsby"
import { IQuote } from '@/types'
import { WallpaperModalContent } from '@/components/CustomizedPageComponent/Gallery/Modal'
import { INavItem, IGlossary } from '@/types'

const Wallpaper: React.FC<IQuoteWallpaperProps> = (props) => {
    console.log(props.data.ac.quote)
    const wallpaper = props.data.ac.quote
    const image = wallpaper.images && wallpaper.images[0]
    const color = image?.colors[0]
    return (
        <div className="relativeh-full pt-4 max-w-tablet m-auto px-4 wallpapers-layout-container md:grid md:grid-cols-2">
            <WallpaperModalContent
                isActive={true}
                color={color}
                wallpaper={wallpaper}

            />
        </div>
    )
}

export default Wallpaper

interface IQuoteWallpaperProps {
    path: string
    data: {
        ac: {
            quote: IQuote
        }
    }
}

export const wallpaperQuery = graphql`
    query quoteById($id: ID!) {
        ac {
            quote(id:$id){
                author {
                    id
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
                post {
                    slug
                }
                topics {
                    id
                    name
                    slug
                }
            }
        }
    }
`