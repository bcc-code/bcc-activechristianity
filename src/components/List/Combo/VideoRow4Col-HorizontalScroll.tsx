import * as React from "react"
import { SectionTitleDesktopAndMobile } from '@/components/Headers'
import HSCardListVideo from '@/components/HorizontalScroll/HSCardListVideo'
import { IPostItem } from '@/types'
const Row2ColAndHorizontalScroll: React.FC<{ name: string, slug?: string, posts: IPostItem[] }> = ({ slug: to, name, posts }) => {
    return (
        <div>
            <SectionTitleDesktopAndMobile
                name={name}
                to={to}
            />

            <HSCardListVideo posts={posts} />
        </div>
    )
}

export default Row2ColAndHorizontalScroll




