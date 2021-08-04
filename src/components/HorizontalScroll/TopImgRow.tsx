import TopImgPost from '@/components/PostItemCards/TopImg';
import { IPostItem } from '@/types';
import React from 'react';
import shortid from 'shortid';

import XScroll from './BaseCustomSize';
import './horizontal-scroll.css';

const FeatureSection: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
	return (
		<XScroll
			childeClassName="w-7/12 min-w-7/12"
			items={posts.map((item, i) =>
				item ? <TopImgPost {...item} key={shortid()} noExcerpt showType /> : <div />
			)}
		/>
	);
};

export default FeatureSection;
