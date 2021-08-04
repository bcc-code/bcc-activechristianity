import { FetchPostsFromSlugs } from '@/HOC/FetchPosts';
import PostRow2Col from '@/components/List/PostRow2Col';
import PostRow3Col from '@/components/List/PostRow3Col';
import PostRow4Col from '@/components/List/PostRow4Col';
import RightImgPostItem from '@/components/PostItemCards/RightImg';
import React from 'react';

import { IPostItems } from './BlockWrapper';
import HeaderPost from './FeaturedBannerTop';

const PostItems: React.FC<IPostItems> = ({ data }) => {
	const slugs = data.map(p => p.slug);
	return (
		<FetchPostsFromSlugs
			slugs={slugs}
			layout="list"
			render={({ posts }) => {
				if (posts.length === 1) {
					return (
						<HeaderPost
							{...posts[0]}
							videoUrl={
								posts[0].media && posts[0].media.video && posts[0].media.video.src
									? posts[0].media.video.src
									: null
							}
						/>
					);
				} else if (posts.length === 2) {
					return <PostRow2Col posts={posts} />;
				} else if (posts.length === 3) {
					return <PostRow3Col posts={posts} />;
				} else if (posts.length === 4) {
					return (
						<>
							<div className="hidden sm:block">
								<PostRow4Col posts={posts} />
							</div>
							<div className="sm:hidden">
								{posts.map((p, k) => {
									return <RightImgPostItem {...p} key={k} />;
								})}
							</div>
						</>
					);
				} else {
					return (
						<>
							{posts.map((p, k) => {
								return <RightImgPostItem {...p} key={k} />;
							})}
						</>
					);
				}
			}}
		/>
	);
};

export default PostItems;
