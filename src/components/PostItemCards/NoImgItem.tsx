import Link from '@/components/CustomLink';
import { ReadingTimingAuthor } from '@/components/PostElements';
import { PostItemPlayButtonSmall } from '@/components/PostElements/PlayButton';
import PostTitle from '@/components/PostElements/TextSizeWClamp';
import ac_strings from '@/strings/ac_strings.js';
import { IPostItem } from '@/types';
import * as React from 'react';

interface ITopImgPost {
	small?: boolean;
	playIcon?: boolean;
	index: number;
}

const TopImgPost: React.FC<IPostItem & ITopImgPost> = props => {
	const { slug, title, duration, small, media, views, authors, playIcon, index } = props;
	return (
		<div className="flex" key={slug}>
			<div className="flex items-center">
				<div className="bg-white w-8 h-8 flex justify-center items-center mt-1" style={{ borderRadius: 9999 }}>
					<div className="mx-4 text-gray-300 ">
						{!small && (media.audio || media.video) ? (
							<PostItemPlayButtonSmall track={media} />
						) : (
							<div className="-mt-1 mx-4">{index + 1}</div>
						)}
					</div>
				</div>
			</div>

			<Link to={slug} className="flex-1 ml-4 my-2">
				{small ? (
					<h2 className="text-sm font-semibold">{title}</h2>
				) : (
					<PostTitle rawText={title} fontKey="text-base-lg" />
				)}

				{media.audio && !small && (
					<span>
						<ReadingTimingAuthor authors={[]} duration={duration?.listen} />
					</span>
				)}
				<div className="text-ac-slate-light text-xs py-2">
					{views} {ac_strings.views}
				</div>
				{playIcon && <ReadingTimingAuthor duration={duration?.listen} authors={authors} />}
			</Link>
		</div>
	);
};

export default TopImgPost;
