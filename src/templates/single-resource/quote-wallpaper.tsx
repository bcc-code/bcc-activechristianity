import React, { useState } from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import WallpaperModalContent from '@/components/QuoteImage/QuoteModalContent'
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons'
import Link from '@/components/CustomLink'
import Modal from 'react-modal';
import ac_strings from '@/strings/ac_strings.js'
import { useLocation } from '@reach/router';
import { getAllUrlParams } from '@/helpers/index-js'
import { normalizePostRes } from '@/helpers/normalizers'
const Wallpaper: React.FC<IQuoteWallpaperProps> = (props) => {
    const { post, ...moreInfo } = props.data.ac.quote
    const wallpaper = props.pageContext

    const { image, color, size, nextId, previousId, pagePath, breadcrumb, content, isBibleQuote, source } = wallpaper
    const location = useLocation();
    const parsed: any = getAllUrlParams(location.search);

    const { parent, filter, index, openmodal } = parsed

    const getIndex = parseInt(index)
    const paramString = `openmodal=${openmodal}&parent=${parent}&filter=${filter}`

    const [preNextIds, setPreNextIds] = useState({
        previousId: `${ac_strings.wallpaper_slug}/${previousId}?${paramString}`,
        nextId: `${ac_strings.wallpaper_slug}/${nextId}?${paramString}`
    })
    React.useEffect(() => {

        if (typeof parent === "string" && filter === "true") {
            console.log('fetching')
            fetch(`/page-data/${parent}/page-data.json`)
                .then(res => res.json())
                .then((res) => {


                    const { quotes } = res.result.pageContext

                    setPreNextIds({
                        previousId: getIndex < 1 ? parent : `${ac_strings.wallpaper_slug}/${quotes[getIndex - 1].id}?${paramString}&index=${getIndex - 1}`,
                        nextId: getIndex > 10 ? parent : `${ac_strings.wallpaper_slug}/${quotes[getIndex + 1].id}?${paramString}&index=${getIndex + 1}`,
                    })
                })
        } else {
            console.log('na')
        }


    }, [])

    const metaTitle = `${isBibleQuote ? source : ''} Bibleverse wallpaper - ${content} `

    const child = (
        <WallpaperModalContent
            image={{ ...image, alt: metaTitle }}
            wallpaper={{ ...wallpaper, ...moreInfo, post: post ? normalizePostRes(post) : null }}
            isActive={true}
            size={size}
            color={color}
            border={openmodal !== "true"}
        />
    )

    return (
        <div className="pt-9 sm:pt-0">
            <MetaTag
                title={metaTitle}
                type="page"
                path={pagePath}
                breadcrumb={breadcrumb}
            />
            {openmodal === "true" ? (
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
                            className="p-4"
                            to={parent}
                        >
                            <CloseIcon />
                        </Link>
                    </div>
                    <div className="h-full w-full pt-10 overflow-scroll relative ">
                        <div className="absolute bottom-1/2 right-0 left-0 z-10 text-white w-full flex p-2 justify-between">

                            <Link
                                className=""
                                to={preNextIds.previousId}
                            >
                                <KeyboardArrowLeftIcon className="shadow" />
                            </Link>
                            <Link
                                className=""
                                to={preNextIds.nextId}
                            >
                                <KeyboardArrowRightIcon className="shadow" />
                            </Link>
                        </div>
                        {child}
                    </div>
                </Modal>
            ) : (
                <div className="py-6">

                    {child}
                </div>
            )}
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
                    title
                    slug

                    excerpt
                    image {
                        src
                        srcset
                        dataUri
                        colors

                    }
                    track {
                        url
                        title
                        duration
                        playlists {
                            slug
                            title
                        }
                        post {
                            title
                            slug
                        }
                    }
                    authors {
                        name
                        slug
                        id
                        pivot {
                            as
                        }
                    }
                    topics {
                        name
                        slug
                        id
                        group {
                            id
                            name
                            slug
                        }
                    }
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