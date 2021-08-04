import StaggerChildrenMotion from '@/components/Motion/StaggerChildren';
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem';
import VideoTopImg from '@/components/PostItemCards/VideoTopImg';
import { IPostItem } from '@/types';
import React from 'react';

import XScroll from './Base';

const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
	return (
		<div>
			<StaggerChildrenMotion className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 standard-max-w-px">
				{posts.slice(0, 4).map((post, i) => {
					return (
						<StaggerChildrenItemMotion key={post.slug}>
							<VideoTopImg {...post} />
						</StaggerChildrenItemMotion>
					);
				})}
			</StaggerChildrenMotion>
			<XScroll
				items={posts.map(item => (
					<VideoTopImg key={item.slug} {...item} />
				))}
			/>
		</div>
	);
};

export default HSCardList;
