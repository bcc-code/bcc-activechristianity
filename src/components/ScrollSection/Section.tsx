import React from 'react'
import Accordian from '@/components/Accordion'
import { IPostItem, INavItem, IImage, IEbook, IPlaylist } from '@/types'
import { Section } from 'react-scroll-section'
import TopImgPost from '@/components/PostItem/TopImg'

import Content from '@/components/Content'
import TwoToOneImg from "@/components/Images/Image2To1"
import BgImgOverlayPost from '@/components/PostItem/BgImgOverlaidPost'
import FullWidthHeaderPost from '@/components/PostItem/DesktopHeaderPost'
import { OutlineRightIcon } from "@/components/Buttons"
import PostsRow from '@/layout-parts/PostsRow'
import EbookSection from './Ebook'
import PlayllistSection from './Playlist'

export interface ISectionProps {
    title: string
    description?: string
    mainPost?: IPostItem
    mainImage?: IImage
    mainVideo?: string
    links?: INavItem[]
    childPosts?: IPostItem[]
    accordianList?: { title: string, content: string }[]
    ebook?: IEbook
    playlist?: IPlaylist
}
export interface IScrollSectionChildProps extends ISectionProps {
    id: string

    background?: boolean
}

export const SectionChild: React.FC<ISectionProps> = ({
    title,
    description,
    mainPost,
    childPosts,
    mainImage,
    mainVideo,
    links,
    accordianList,
    ebook,
    playlist
}) => {
    return (
        <div>
            <h2 className="font-bold text-xl pb-4">{title}</h2>
            {mainImage && (
                <div className="relative py-4 sm:px-4" >
                    <TwoToOneImg image={mainImage} alt={title} />
                </div>
            )}
            {mainVideo && (
                <div className="py-4">
                    <div
                        className='media embed-responsive embed-responsive-16by9 py-4 sm:px-4'
                        dangerouslySetInnerHTML={{ __html: mainVideo }}
                    />
                </div>

            )}

            {description && (
                <Content content={description} />
            )}

            {mainPost && (
                <FullWidthHeaderPost {...mainPost} />
            )}


            {childPosts && (
                <PostsRow posts={childPosts} />
            )}
            {links && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-8 pb-16">
                    {links.map(({ name, to }) => {
                        return (
                            <OutlineRightIcon name={name} to={to} key={to} />
                        )
                    })}
                </div>
            )}
            {accordianList && (
                <div className="my-4">

                    {accordianList.map((item, k) => {
                        return (
                            <Accordian
                                key={k}
                                title={<h6>{item.title}</h6>}
                                content={<div dangerouslySetInnerHTML={{ __html: item.content }} />}
                            />
                        )
                    })}
                </div>
            )}
            {ebook && (
                <EbookSection
                    {...ebook}
                />
            )}

            {playlist && (
                <PlayllistSection
                    {...playlist}
                />
            )}

        </div>
    )
}
const ScrollSectionChild: React.FC<IScrollSectionChildProps> = ({ id, background }) => {

    return (
        <Section id={id} className={`py-16 ${background ? '' : 'bg-d4athens'}`} >

        </Section>
    )
}

export default ScrollSectionChild