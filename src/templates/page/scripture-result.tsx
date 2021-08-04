import { LayoutH1 } from '@/components/Headers';
import PostList from '@/components/List/PostList';
import MetaTag from '@/components/Meta';
import { getAllUrlParams } from '@/helpers/index-js';
import menus from '@/strings/generated/menus.json';
// components
// Type
import { INavItem, IBibleBook, IBible } from '@/types';
import { useLocation } from '@reach/router';
import React from 'react';

const { menusItems } = menus;

const acApiModule = import('@/util/api');

interface IBibleNavProps {
	path: string;
	pageContext: {
		pagePath: string;
		title: string;
		breadcrumb: INavItem[];
		bible: IBible;
	};
}

interface IAvailableChapter {
	v: number;
	a: boolean;
	bookId: string;
}

interface IActiveBook extends IBibleBook {
	availableChapters?: IAvailableChapter[];
}

const BibleNav: React.FC<IBibleNavProps> = props => {
	const {
		pageContext: { title, pagePath }
	} = props;

	const [posts, setPosts] = React.useState<string[]>([]);
	const location = useLocation();
	const parsed = getAllUrlParams(location.search);
	const { bookid, ch, bookname } = parsed;
	React.useEffect(() => {
		if (typeof bookid === 'string' && typeof ch === 'string') {
			acApiModule.then(res => {
				const acApi = res.default;
				acApi.getScriptureChaptersPost(bookid.toLowerCase(), ch).then(res => {
					setPosts(res.biblePosts.map(item => item.slug));
				});
			});
		}
	}, []);
	return (
		<div className="mx-auto max-w-sm sm:p-0">
			<MetaTag
				title={title}
				type="page"
				path={pagePath}
				translatedUrls={[]}
				breadcrumb={[menusItems.scripture]}
			/>

			<div className={`px-4 pt-8 sm:pt-0`}>
				<LayoutH1 title={`${bookname ? `${bookname.toUpperCase()} ${ch}` : title}`} />
				<PostList posts={posts} />
			</div>
		</div>
	);
};

export default BibleNav;
