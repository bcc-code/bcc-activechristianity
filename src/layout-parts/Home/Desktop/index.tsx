import RightImgWDes from '@/components/PostItemCards/RightImg';
import ShowMore from '@/layout-parts/ShowMorePosts';
import ac_strings from '@/strings/ac_strings.js';
import { IPostItem, ITopicPostItems, ITopic } from '@/types';
import React from 'react';
import shortid from 'shortid';

import Categories from './Categories';
import FeatureSectionDesktop from './FeatureSectionDesktop';
import LowerSections from './LowerSections';

interface IHomeMobileProps {
	mixed: IPostItem[] | null;
	latest: IPostItem[];
	popular: IPostItem[];
	formats: ITopic[];
	popularTopicsAll: {
		static: ITopicPostItems[];
		dynamic: ITopicPostItems[];
	};
}
const HomeDesktop: React.FC<IHomeMobileProps> = ({ mixed, latest, popular, popularTopicsAll, formats }) => {
	const latestPostAsTopic = {
		id: '',
		name: ac_strings.latest,
		slug: ac_strings.slug_latest
	};

	return (
		<div className="hiddem sm:block">
			<div className="px-4">
				<FeatureSectionDesktop featuredPosts={mixed} />
				<Categories formats={formats} />

				<LowerSections
					lists={popularTopicsAll.static}
					newPostsForYou={[]}
					topicsForYou={popularTopicsAll.static}
					popularPosts={popular}
				/>
				<div className="grid grid-cols-4 gap-4 md:gap-6 sm:px-4">
					<div className="col-start-1 col-end-3 lg:col-end-4">
						{latest.map((item, i) => {
							return (
								<div className={`mt-6 sm:mt-8 mx-4 sm:mr-10 sm:ml-0 div-post`} key={shortid()}>
									<RightImgWDes key={i} {...item} />
								</div>
							);
						})}
						<ShowMore slug={latestPostAsTopic.slug} startNr={2} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeDesktop;
