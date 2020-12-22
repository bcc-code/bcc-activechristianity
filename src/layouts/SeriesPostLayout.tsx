import React from 'react'
import Link from '@/components/CustomLink'

import LeftSidebarLayout, { ISiderbar } from './LeftSidebarLayout/index'
import { DesktopPostMain } from '@/layout-parts/PostLayout/PostSections'
import Content from '@/components/Content'
import { INavItem, IPostRes } from '@/types'

interface IProps {
    sections: INavItem[]
    title: string | JSX.Element
    post: IPostRes
    pageInfo: {
        currentPage: number
        nextPage: INavItem | undefined
        prevPage: INavItem | undefined
    }
}
const ScrollSectionLayout: React.FC<IProps> = ({ sections, title, post }) => {

    const SidebarNav: React.FC<ISiderbar> = ({ closeMobileNav }) => {
        const handleOpenMobileNav = () => {
            closeMobileNav()
        }
        return (
            <div className="flex flex-col">
                <div className="hidden sm:block y">
                    <h1
                        className="sm:text-lg lg:text-xl xl:text-2xl font-bold mb-4"
                        onClick={handleOpenMobileNav}
                    >
                        {title}
                    </h1>
                </div>
                {sections.map((item, i) => (
                    <Link
                        key={i}
                        activeClassName="font-bold text-ac-secondary"
                        to={item.to}
                        className={`flex tracking-wide text-base sm:text-lg mb-4 sm:mb-8`}
                        onClick={handleOpenMobileNav}
                    >
                        <div className="px-4">{i + 1}</div>
                        <div>{item.name}</div>
                    </Link>
                )
                )}

            </div>
        )
    }


    return (
        <LeftSidebarLayout
            menuIcon
            title={title}
            sidebar={SidebarNav}
            content={(
                <div className="px-4">
                    <DesktopPostMain
                        title={post.title}
                        translatedUrls={post.langs}
                        id={post.id}
                        excerpt={post.excerpt}
                        shareSlug={`${post.slug}`}
                        notHide
                    >
                        <Content content={post.content} />
                    </DesktopPostMain>
                </div>
            )}
        />

    )
}

export default ScrollSectionLayout
