

import * as React from 'react';
import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import Link from '@/components/CustomLink';
import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import { OutlineScriptureChapter } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.json'
import { INavItem, } from "@/types"
import { trimSlug } from '@/helpers'
const ExplorePopularScripture: React.FC<{

    scriptureSlug: string
}> = ({ scriptureSlug }) => {
    const [mostUsedScriptures, setPopularScriptures] = React.useState<INavItem[]>([])


    React.useEffect(() => {

        fetch(`/page-data/${trimSlug(scriptureSlug)}/page-data.json`)
            .then(res => res.json())
            .then(res => {
                const mostUsedScriptures: INavItem[] = res.result.pageContext.mostPopular
                setPopularScriptures(mostUsedScriptures)
            })
            .catch(error => console.log(error))

    }, [scriptureSlug])

    return (
        <div className="pt-6 pb-8">
            <SectionTitleDesktopAndMobile
                name={ac_strings.byScripture}
                to={scriptureSlug}

            />
            <div className="hidden sm:grid grid-cols-4 lg:grid-cols-6 gap-2 px-4">
                {mostUsedScriptures.map(s => {
                    return (
                        <Link to={s.to}>
                            < OutlineScriptureChapter>
                                {s.name}
                            </ OutlineScriptureChapter>
                        </Link>
                    )
                })}
            </div>
            <XScrollCustomSize
                childeClassName=""
                items={mostUsedScriptures.map(s => {
                    return (
                        <Link to={s.to}>
                            < OutlineScriptureChapter>
                                {s.name}
                            </ OutlineScriptureChapter>
                        </Link>
                    )
                })}
            />
        </div>
    )
}

export default ExplorePopularScripture
