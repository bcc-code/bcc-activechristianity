import React from 'react'
import { ScrollingProvider, SectionLink, Si } from 'react-scroll-section';
import Video16to9 from '@/components/Images/Video16to9'
import ScrollSectionChild, { IScrollSectionChildProps } from '@/components/ScrollSection/Section'
import LeftSidebarLayout, { ISiderbar } from './index'
import Content from '@/components/Content'
import { Section } from 'react-scroll-section'
interface IProps {
    sections: IScrollSectionChildProps[]
    title: string
}
const ScrollSectionLayout: React.FC<IProps> = ({ sections, title }) => {

    const ScrollSectionSidebar: React.FC<ISiderbar> = ({ closeMobileNav }) => {
        const handleClick = (onClick: any) => {
            onClick();
            closeMobileNav()
        }
        return (
            <div className="pt-16">
                <SectionLink section={"about-us"}>
                    {({ onClick, isSelected }) => (
                        <div
                            role="button"
                            className={`tracking-wide text-base sm:text-lg sm:mb-2 leading-loose ${isSelected ? 'font-bold' : ''}`}
                            onClick={() => { handleClick(onClick) }}
                            onKeyDown={() => { handleClick(onClick) }}
                            selected={isSelected}
                        >
                            Intro
                        </div>
                    )}
                </SectionLink>
                {sections.map((item, i) => {
                    console.log(item.slug)
                    return (
                        <SectionLink section={item.slug} key={i}>
                            {({ onClick, isSelected }) => {
                                return (
                                    <div
                                        role="button"
                                        className={`tracking-wide text-base sm:text-lg sm:mb-2 leading-loose ${isSelected ? 'font-bold' : ''}`}
                                        onClick={() => { handleClick(onClick) }}
                                        onKeyDown={() => { handleClick(onClick) }}
                                        selected={isSelected}
                                    >
                                        {item.title}
                                    </div>
                                )
                            }}
                        </SectionLink>
                    )
                })}
            </div>
        )
    }

    const content = (
        <div className="z-10 w-full">
            <Section id={"about-us"} className={`py-16`} >
                <div className="w-tablet">

                    <Content content="<p>ActiveChristianity® by Brunstad Christian Church explores how God’s Word challenges and empowers us to live 100% according to His will, so we no longer need to fall in sin, but can come to a life of victory.</p>" />
                    <Video16to9
                        src="https://www.youtube.com/embed/sAbW36EzKIc"
                        className={`rounded-xxl sm:rounded-xl overflow-hidden mt-8`}
                    />
                </div>
            </Section>
            {sections.map((item, k) =>
                (
                    <ScrollSectionChild key={k} {...item} background={k % 2 == 0} />
                )
            )}
        </div>
    )

    return (

        <ScrollingProvider
            offset={0}
        >
            <LeftSidebarLayout
                title={title}
                sidebar={ScrollSectionSidebar}
                content={content}
            />
        </ScrollingProvider>

    )
}

export default ScrollSectionLayout