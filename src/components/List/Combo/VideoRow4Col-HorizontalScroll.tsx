import { SectionTitleDesktopAndMobile } from '@/components/Headers';
import HSCardListVideo from '@/components/HorizontalScroll/HSCardListVideo';
import { IPostItem } from '@/types';
import * as React from 'react';

const Row2ColAndHorizontalScroll: React.FC<{ name: string; slug?: string; posts: IPostItem[] }> = ({
	slug: to,
	name,
	posts
}) => {
	return (
		<div>
			<SectionTitleDesktopAndMobile name={name} to={to} />

			<HSCardListVideo posts={posts} />
		</div>
	);
};

export default Row2ColAndHorizontalScroll;
