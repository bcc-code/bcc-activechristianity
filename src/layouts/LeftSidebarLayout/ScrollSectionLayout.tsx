import React from 'react'
import { ScrollingProvider, SectionLink } from 'react-scroll-section';
import ScrollSectionChild, { IScrollSectionChildProps } from '@/components/ScrollSection/Section'
import LeftSidebarLayout, { ISiderbar } from './index'

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
            <div>
                <div className="hidden sm:block">
                    <SectionLink section={sections[0].id}>
                        {({ onClick }) => (
                            <h1
                                role="button"
                                className="sm:text-lg lg:text-4xl xl:text-5xl font-bold mb-4"
                                onClick={() => { handleClick(onClick) }}
                                onKeyDown={() => { handleClick(onClick) }}
                            >
                                {title}
                            </h1>
                        )}
                    </SectionLink>
                </div>
                {sections.map((item, i) => {
                    return (
                        <SectionLink section={item.id}>
                            {({ onClick, isSelected }) => (
                                <div
                                    role="button"
                                    className={`tracking-wide text-base sm:text-lg sm:mb-2 leading-loose ${isSelected ? 'font-bold' : ''}`}
                                    onClick={() => { handleClick(onClick) }}
                                    onKeyDown={() => { handleClick(onClick) }}
                                    selected={isSelected}
                                >
                                    {item.title}
                                </div>
                            )}
                        </SectionLink>
                    )
                })}
            </div>
        )
    }

    const content = (
        <div className="z-10 w-full">
            {sections.map((item, k) =>
                (
                    <ScrollSectionChild key={k} {...item} background={k % 2 == 0} />
                )
            )}
        </div>
    )

    return (

        <ScrollingProvider>
            <LeftSidebarLayout
                title={title}
                sidebar={ScrollSectionSidebar}
                content={content}
            />
        </ScrollingProvider>

    )
}

export default ScrollSectionLayout