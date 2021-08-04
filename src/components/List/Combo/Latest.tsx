import PostRow from '@/components/List/PostRow4Col';
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader';
import { MoreLatestLink } from '@/layout-parts/PostLayout/PostSections';
import { IPostItem } from '@/types';
import React from 'react';

interface ILatestDesktopRow {
	posts: IPostItem[];
	latestSlug: string;
	video?: boolean;
}
const LatestDesktopRow: React.FC<ILatestDesktopRow> = ({ posts, latestSlug }) => {
	return (
		<div className="bg-d4athens hidden sm:block">
			<div className="standard-max-w-px">
				<LatestSectionHeader latestSlug={latestSlug} />
				<PostRow posts={posts} />
				<MoreLatestLink latestSlug={latestSlug} />
			</div>
		</div>
	);
};

export default LatestDesktopRow;
