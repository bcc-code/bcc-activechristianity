import { UnderlineTitleLink } from '@/components/Headers';
import MotionStagger from '@/components/Motion/StaggerChildren';
import FeaturedCard from '@/components/PostItemCards/FeaturedCard';
import LeftImg from '@/components/PostItemCards/LeftImg';
import TopImg from '@/components/PostItemCards/TopImg';
import { IPostItem, INavItem } from '@/types';
import React from 'react';

import './post-multi-col-layout.css';

export interface IOnePostByType {
	type: INavItem;
	post: IPostItem;
	postThumnailType?: 'featuredCard' | 'leftImage' | 'topImage';
	position: '1' | '2' | '3' | '4' | '1-wide' | '2-wide';
	postThumbnailProps?: any;
}
interface IPostByTypeList {
	types: IOnePostByType[];
}

const OnePostByType: React.FC<IOnePostByType> = ({ type, post, postThumnailType, position, postThumbnailProps }) => {
	const getPostThumnail = () => {
		switch (postThumnailType) {
			case 'featuredCard': {
				let props: any = {
					...post
				};
				if (postThumbnailProps) {
					props = { ...props, ...postThumbnailProps };
				}
				return <FeaturedCard {...props} />;
			}
			case 'leftImage': {
				return <LeftImg {...post} />;
			}

			default: {
				return <TopImg showType {...post} />;
			}
		}
	};

	const postItem = getPostThumnail();
	return (
		<div className={`div${position}`}>
			<UnderlineTitleLink name={type.name} to={`${type.to}`} />
			<div className={`div-content ${postThumnailType === 'leftImage' ? 'hidden sm:block' : ''}`}>{postItem}</div>
		</div>
	);
};

const PostMultiColLayout: React.FC<IPostByTypeList> = ({ types }) => {
	return (
		<MotionStagger className="desktop-multi-col-layout hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-h80 mt-12">
			{types.map((item, i) => {
				return <OnePostByType {...item} key={i} />;
			})}
		</MotionStagger>
	);
};

export default PostMultiColLayout;
