import TopImgPost from '@/components/PostItemCards/TopImg';
import { IPostItem } from '@/types';
import React from 'react';
import shortId from 'shortid';

import XScroll from './Base';

const HSCardList: React.FC<{ posts: IPostItem[] }> = ({ posts }) => {
	return (
		<XScroll
			items={posts.map(item => (
				<TopImgPost key={shortId.generate()} {...item} noExcerpt />
			))}
		/>
	);
};

export default HSCardList;
