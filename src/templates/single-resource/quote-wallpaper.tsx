import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import { WallpaperModalContent } from '@/components/CustomizedPageComponent/Gallery/Modal'
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon, KeyboardArrowDownIcon } from '@/components/Icons/MUI/arrowIcons'
import Link from '@/components/CustomLink'
import Modal from 'react-modal';
import ac_strings from '@/strings/ac_strings.js'

const Wallpaper: React.FC<IQuoteWallpaperProps> = (props) => {
    console.log(props)
    const moreInfo = props.data.ac.quote
    const wallpaper = props.pageContext
    console.log(wallpaper)
    const { image, color, size, nextId, previousId, pagePath, breadcrumb, content } = wallpaper

    return (
        <div>
            <MetaTag
                title={`${content} ${ac_strings.wallpaper_title}`}
                type="page"
                path={pagePath}
                breadcrumb={breadcrumb}
            />
            <Modal
                isOpen={true}
                className="inset-0 h-screen w-screen px-2 flex justify-center items-center overflow-scroll"
                style={{
                    overlay: {
                        backgroundColor: color ? `rgba(${color[0]}, ${color[1]}, ${color[2]}` : 'rgba(0, 0, 0, 0.5)',
                        zIndex: 700,
                        transition: `background-color 1000ms linear`
                    }
                }}
            >
                <div
                    className="absolute top-0 right-0 left-0 z-10 text-white w-full flex justify-end"
                    style={{ background: 'linear-gradient( to top, transparent, rgba(0, 0, 0, 0.5) )' }}

                >
                    <Link
                        className=""
                        to={`${ac_strings.wallpaper_slug}`}
                    >
                        <CloseIcon />
                    </Link>
                </div>
                <div className="h-full w-full pt-10 overflow-scroll relative ">
                    <div className="absolute bottom-1/2 right-0 left-0 z-10 text-white w-full flex p-2 justify-between">

                        <Link
                            className=""
                            to={`${ac_strings.wallpaper_slug}/${previousId}`}
                        >
                            <KeyboardArrowLeftIcon />
                        </Link>
                        <Link
                            className=""
                            to={`${ac_strings.wallpaper_slug}/${nextId}`}
                        >
                            <KeyboardArrowRightIcon />
                        </Link>
                    </div>
                    <WallpaperModalContent
                        image={image}
                        wallpaper={{ ...wallpaper, ...moreInfo }}
                        isActive={true}
                        size={size}
                        color={color}
                    />
                </div>
            </Modal>
        </div>
    )
}

/* id?: string | number
image?: IGalleryImage
wallpaper?: IQuote
color: number[]
size: string */

export default Wallpaper

interface IQuoteWallpaperProps {
    path: string
    pageContext: any
    data: any
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