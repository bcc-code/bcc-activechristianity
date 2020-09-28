import React from 'react'
import { Section } from 'react-scroll-section'
import Video16to9 from '@/components/Images/Video16to9'
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import CustomizedPageComponent from './CustomizedPageComponent'

export interface ISectionProps {
    title: string
    childComponent: IPageCompTypes
}
export interface IScrollSectionChildProps {
    slug: string
    title: string
    childPage: IPageCompTypes
    background?: boolean
}


const ScrollSectionChild: React.FC<IScrollSectionChildProps> = ({ slug, background, title, childPage }) => {
    return (
        <Section id={slug} className={`py-16 ${background ? '' : 'bg-d4athens'}`} >
            <div className="w-tablet px-4">
                <h2 className="font-bold text-xl pb-4">{title}</h2>
                {slug === "about-us-top" && <Video16to9
                    src="https://www.youtube.com/embed/sAbW36EzKIc"
                    className={`rounded-xxl sm:rounded-xl overflow-hidden mt-8`}
                />}
                <CustomizedPageComponent {...childPage} />

            </div>
        </Section>
    )
}

export default ScrollSectionChild