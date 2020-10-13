import React from 'react'
import { ScrollingProvider, SectionLink, Si } from 'react-scroll-section';
import Video16to9 from '@/components/Images/Video16to9'
import ScrollSectionChild, { IScrollSectionChildProps } from '@/components/ScrollSection/Section'
import LeftSidebarLayout, { ISiderbar } from './index'
import Content from '@/components/Content'
import { Section } from 'react-scroll-section'
const imageUrl = 'https://media.activechristianity.org/2019/08/ac-home-hero-bg.jpg'
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
            <Section id={"about-us"} className={`pb-16 relative`} >
                <div
                    className="background-image w-full flex flex-col justify-center px-4 py-12"
                    style={{
                        top: "50px",
                        background: `url(${imageUrl}) center center no-repeat`,
                        backgroundSize: "cover",
                        zIndex: 200,
                        minHeight: "250px",
                        /*  backgroundPositionY: "30%", */
                    }}
                >
                    <div className="standard-max-w-px w-full ">
                        <h1 className="sm:text-lg lg:text-4xl xl:text-5xl font-bold mb-4" >{title}</h1>

                    </div>
                </div>
                <div className="w-tablet px-4 pt-4">
                    <p className="leading-loose italic">ActiveChristianity® by Brunstad Christian Church explores how God’s Word challenges and empowers us to live 100% according to His will, so we no longer need to fall in sin, but can come to a life of victory.</p>
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