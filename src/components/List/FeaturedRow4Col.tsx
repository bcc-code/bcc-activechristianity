import MotionStagger from '@/components/Motion/StaggerChildren';
import TopImgPost from '@/components/PostItemCards/TopImg';
import { IPostItem } from '@/types';
import React from 'react';

const PostRow: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
	return (
		<MotionStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 grid-h pt-8 pb-16">
			{posts.slice(0, 4).map((post, i) => {
				return (
					<div className={`div${i + 1}`} key={post.slug}>
						<TopImgPost showType {...post} />
					</div>
				);
			})}
		</MotionStagger>
	);
};

export default PostRow;
