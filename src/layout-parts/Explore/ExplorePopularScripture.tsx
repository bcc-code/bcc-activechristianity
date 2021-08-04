import { OutlineScriptureChapter } from '@/components/Button';
import Link from '@/components/CustomLink';
import { SectionTitleDesktopAndMobile } from '@/components/Headers';
import ac_strings from '@/strings/ac_strings.js';
import * as React from 'react';

const ExplorePopularScripture: React.FC<{
	isMobile: boolean;
}> = ({ isMobile }) => {
	return (
		<div className="pt-6">
			<SectionTitleDesktopAndMobile name={ac_strings.by_scripture} to={`${ac_strings.slug_scripture}`} />
			<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 px-4">
				{popularScriptures.slice(0, isMobile ? 4 : 8).map((s, i) => {
					return (
						<Link
							key={i}
							to={`${ac_strings.slug_scripture}-result?bookId=${s.bookId}&ch=${s.chapter}&bookName=${s.bookName}`}
						>
							<OutlineScriptureChapter>
								{s.bookName} {s.chapter}
							</OutlineScriptureChapter>
						</Link>
					);
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
	);
};

export default ExplorePopularScripture;

const popularScriptures = [
	{ bookName: 'Romans', bookId: 'romans', chapter: 8, count: 121 },
	{ bookName: 'Hebrews', bookId: 'hebrews', chapter: 4, count: 61 },
	{ bookName: 'Philippians', bookId: 'philippians', chapter: 2, count: 57 },
	{ bookName: '2 Peter', bookId: '2-peter', chapter: 1, count: 52 },
	{ bookName: 'James', bookId: 'james', chapter: 1, count: 50 },
	{ bookName: 'Romans', bookId: 'romans', chapter: 6, count: 49 },
	{ bookName: 'Galatians', bookId: 'galatians', chapter: 5, count: 47 },
	{ bookName: 'Matthew', bookId: 'matthew', chapter: 5, count: 44 },
	{ bookName: 'Hebrews', bookId: 'hebrews', chapter: 2, count: 44 },
	{ bookName: 'Colossians', bookId: 'colossians', chapter: 3, count: 41 }
];
