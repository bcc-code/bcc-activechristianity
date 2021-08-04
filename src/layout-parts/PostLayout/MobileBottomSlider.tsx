import { FetchOnePost } from '@/HOC/FetchPosts';
import Link from '@/components/CustomLink';
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow';
import SquareRightImg from '@/components/PostItemCards/SquareRightImg';
import { ITopicPostSlugs } from '@/types';
import loadable from '@loadable/component';
import React, { Profiler } from 'react';
// requires a loader
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface IPostProps {
	topicPosts?: ITopicPostSlugs[];
	authorsPosts?: ITopicPostSlugs[];
	formatPosts?: ITopicPostSlugs[];
	isPlayingMedia: boolean;
}

const MobileBottomSlider: React.FC<IPostProps> = ({ topicPosts, isPlayingMedia, formatPosts }) => {
	const [close, setClose] = React.useState(false);
	const slides: React.ReactChild[] = [];
	if (formatPosts) {
		formatPosts.map(item => {
			item.posts.map(slug => {
				slides.push(
					<FetchOnePost
						slug={slug}
						render={({ post }) => {
							return post ? (
								<div className="bg-d4athens pb-4" style={{ height: 80 }}>
									<SquareRightImg {...post} />
								</div>
							) : (
								<div />
							);
						}}
					/>
				);
			});
		});
	}

	if (topicPosts) {
		topicPosts.map(item => {
			slides.push(
				<div style={{ height: 80 }} className="bg-d4athens pb-4">
					{/* 
            <p >{topicPosts[0].name}</p> */}
					<div className="p-2">
						<h5 className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2 w-full text-left">
							More from this topic
						</h5>
						<div className="justify-between flex items-center">
							<Link to={topicPosts[0].slug} className="font-roboto text-lg">
								{topicPosts[0].name}
							</Link>
							<ToggleFollowOutlineBtn id={topicPosts[0].id} />
						</div>
					</div>
				</div>
			);
			item.posts.map(slug => {
				slides.push(
					<FetchOnePost
						slug={slug}
						render={({ post }) => {
							return post ? (
								<div className="bg-d4athens pb-4" style={{ height: 80 }}>
									<SquareRightImg {...post} />
								</div>
							) : (
								<div />
							);
						}}
					/>
				);
			});
		});
	}

	return (
		<div
			className={`sm:hidden fixed bottom-0 w-full`}
			style={{ zIndex: 60, marginBottom: !!isPlayingMedia ? '116px' : '64px' }}
		>
			<Carousel
				showThumbs={false}
				showStatus={false}
				showArrows={false}
				autoPlay
				infiniteLoop
				className="h-20"
				showIndicators={false}
				interval={10 * 1000}
			>
				{slides}
			</Carousel>
		</div>
	);
};

export default MobileBottomSlider;
