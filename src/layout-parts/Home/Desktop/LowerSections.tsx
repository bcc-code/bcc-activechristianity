import { Button } from '@/components/Button';
import LazyLoad from '@/components/LazyLoad';
import Bookshop from '@/layout-parts/Banner/BookShop';
import TopicsForYouSection from '@/layout-parts/Home/Desktop/TopicsForYou';
import FollowUs from '@/layout-parts/Home/FollowUs';
import PostListSection from '@/layout-parts/Home/PostListSection';
import ac_strings from '@/strings/ac_strings.js';
import { ITopic, IPostItem, ITopicPostItems } from '@/types';
import React from 'react';

interface IHomeLowerSection {
	lists: ITopicPostItems[];
	newPostsForYou: ITopic[];
	topicsForYou: ITopic[];
	popularPosts: IPostItem[];
}
const HomeLowerSections: React.FC<IHomeLowerSection> = ({ lists, popularPosts, topicsForYou }) => {
	return (
		<div className="grid grid-cols-4 gap-4 md:gap-6 pt-6">
			<div className="col-start-1 col-end-3 lg:col-end-4">
				{lists.slice(0, 4).map((slot, i) => {
					return (
						slot && (
							<div key={i} className={`div${1 + i} mt-4 mx-4 sm:mr-10 sm:ml-0`}>
								<LazyLoad>
									<PostListSection {...slot} />
								</LazyLoad>
							</div>
						)
					);
				})}
			</div>
			<div className="col-start-3 lg:col-start-4 col-end-5 bg-gray-200 sm:bg-transparent py-6 overflow-hidden hidden sm:block">
				<FollowUs />
				<Bookshop />
			</div>
			<TopicsForYouSection featured={topicsForYou} />
		</div>
	);
};

export default React.memo(HomeLowerSections);
