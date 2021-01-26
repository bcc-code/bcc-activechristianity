

import * as React from 'react';
import Link from '@/components/CustomLink';
import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import { OutlineScriptureChapter } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.js'
import { INavItem, } from "@/types"
import { trimSlug } from '@/helpers'
const ExplorePopularScripture: React.FC<{

    scriptureSlug: string
}> = ({ scriptureSlug }) => {


    return (
        <div className="pt-6">
            <SectionTitleDesktopAndMobile
                name={ac_strings.byScripture}
                to={`${ac_strings.slug_scripture}`}

            />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 px-4">
                {popularScriptures.map((s, i) => {
                    return (
                        <Link key={i} to={`${ac_strings.slug_scripture}-result?bookId=${s.bookId}&ch=${s.chapter}&bookName=${s.bookName}`}>
                            < OutlineScriptureChapter>
                                {s.bookName} {s.chapter}
                            </ OutlineScriptureChapter>
                        </Link>
                    )
                })}
            </div>
            {/*             <XScrollCustomSize
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
            /> */}
        </div>
    )
}

export default ExplorePopularScripture

const popularScriptures = [
    { bookName: "Romans", bookId: "romans", chapter: 8, count: 121 },
    { bookName: "Hebrews", bookId: "hebrews", chapter: 4, count: 61 },
    { bookName: "Philippians", bookId: "philippians", chapter: 2, count: 57 },
    { bookName: "2 Peter", bookId: "2-peter", chapter: 1, count: 52 },
    { bookName: "James", bookId: "james", chapter: 1, count: 50 },
    { bookName: "Romans", bookId: "romans", chapter: 6, count: 49 },
    { bookName: "Galatians", bookId: "galatians", chapter: 5, count: 47 },
    { bookName: "Matthew", bookId: "matthew", chapter: 5, count: 44 },
    { bookName: "Hebrews", bookId: "hebrews", chapter: 2, count: 44 },
    { bookName: "Colossians", bookId: "colossians", chapter: 3, count: 41 }
]
