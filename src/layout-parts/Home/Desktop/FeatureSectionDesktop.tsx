import { FetchLatestPlaylists, FetchLatestPodcast } from '@/HOC/FetchLatest';
import FeaturedCard from '@/components/PostItemCards/FeaturedCard';
import TopImg from '@/components/PostItemCards/TopImg';
import { playlistToPost, getRandomArray } from '@/helpers/normalizers';
import ac_strings from '@/strings/ac_strings.js';
import { IPostItem } from '@/types';
import React from 'react';
import shortid from 'shortid';

const FeatureSection: React.FC<{ featuredPosts: IPostItem[] | null }> = ({ featuredPosts }) => {
	const hasPlaylist = process.env.LISTEN_SECTION === 'all';
	const hasPodcast = process.env.LISTEN_SECTION === 'all' || process.env.LISTEN_SECTION === 'podcast_only';

	return (
		<div>
			<h3 className="relative mt-8 mb-2 sm:mb-8 pb-2 text-d4dark text-base sm:border-b">
				<div className="flex items-center ">
					<span className="">{ac_strings.featured}</span>
				</div>
			</h3>
			<div className="my-4 grid gap-4 sm:gap-6 md:gap-6 grid-cols-4">
				{hasPodcast ? (
					<FetchLatestPodcast
						key={shortid()}
						layout="one"
						render={({ podcastEps }) => <FeaturedCard {...podcastEps[0]} type="podcast" key={shortid()} />}
					/>
				) : (
					featuredPosts && featuredPosts[2] && <TopImg {...featuredPosts[2]} />
				)}
				{hasPlaylist ? (
					<FetchLatestPlaylists
						layout="one"
						key={shortid()}
						render={({ playlists }) => {
							const random = getRandomArray(playlists, 1);
							const post = random.length ? random[0] : undefined;
							return post ? (
								<FeaturedCard {...playlistToPost(post)} type="playlist" key={shortid()} />
							) : (
								<div></div>
							);
						}}
					/>
				) : (
					featuredPosts && featuredPosts[3] && <TopImg {...featuredPosts[3]} key={shortid()} />
				)}
				{featuredPosts && featuredPosts[0] && <TopImg {...featuredPosts[0]} key={shortid()} />}
				{featuredPosts && featuredPosts[1] && <TopImg {...featuredPosts[1]} key={shortid()} />}
			</div>
		</div>
	);
};

export default FeatureSection;
