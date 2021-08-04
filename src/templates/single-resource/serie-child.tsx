import MetaTag from '@/components/Meta';
import SeriesPostLayout from '@/layouts/SeriesPostLayout';
import { INavItem, IPostRes } from '@/types';
import { graphql } from 'gatsby';
import React from 'react';

const SeriesChild: React.FC<IProps> = props => {
	const {
		pageContext: { postId, breadcrumb, parent, sections },
		data: {
			ac: { post }
		},
		path
	} = props;
	if (!post) {
		return null;
	} else {
		const { title, excerpt, langs } = post;
		const all = sections ? sections.map(s => s) : [];
		const index = all.findIndex(i => i.to === post.slug);
		const nextPage = index + 1 < all.length ? all[index + 1] : undefined;
		const prevPage = index - 1 >= 0 ? all[index - 1] : undefined;
		const pageInfo = { currentPage: index, nextPage, prevPage };

		return (
			<div>
				<MetaTag
					path={path}
					title={title}
					type="article"
					breadcrumb={breadcrumb}
					meta={{
						description: excerpt
					}}
					translatedUrls={langs}
				/>
				<SeriesPostLayout title={parent.name} sections={sections} post={post} pageInfo={pageInfo} />
			</div>
		);
	}
};

export default SeriesChild;

interface IProps {
	path: string;
	data: {
		ac: {
			post: IPostRes;
		};
	};
	pageContext: {
		postId: number;
		parent: INavItem;
		breadcrumb: INavItem[];
		sections: INavItem[];
	};
	location: {
		pathname: string;
	};
}

/* export const pageQuery = graphql`


`
 */
