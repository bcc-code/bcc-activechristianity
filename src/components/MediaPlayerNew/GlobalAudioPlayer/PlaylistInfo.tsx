import { FetchOnePost } from '@/HOC/FetchPosts';
import { DescriptionIcon, VolumeUpRoundedIcon, KeyboardArrowDownIcon } from '@/components/Icons/MUI/mediaPlayerIcons';
import SquareImage from '@/components/Images/Image1to1Rounded';
import Title from '@/components/PostElements/TextSizeWClamp';
import Bookmark from '@/components/PostElements/ToggleBookmark';
import ac_strings from '@/strings/ac_strings.js';
import { IMedia } from '@/types';
import React from 'react';
import shortid from 'shortid';

interface IProps {
	track: IMedia;
	queue: IMedia[];
	handlePlaylistItemClick: (index: number) => void;
	collaps: () => void;
}
const PlaylistInfo: React.FC<IProps> = ({ track, queue, handlePlaylistItemClick, collaps }) => {
	return (
		<div className="flex flex-col px-4 py-2 text-ac-slate-light flex-1 max-w-tablet mx-auto w-full">
			<div className="absolute right-0 top-0 flex">
				<div className="flex justify-center items-center py-2 pr-4 uppercase text-xs" onClick={collaps}>
					<KeyboardArrowDownIcon customSize="6" />
				</div>
			</div>
			{track.path && (
				<FetchOnePost
					slug={track.path}
					render={({ post }) => {
						return post ? (
							<div className="flex">
								<div className="w-36">
									<SquareImage {...post.image} rounded />
								</div>
								{/*  <Post {...post} /> */}
								<div className="px-4">
									{track.audio && (
										<Title
											key="text-xl-3xl-4xl"
											rawText={track.audio?.title}
											className="font-semibold"
										/>
									)}
									<div className="grid grid-cols-2 gap-4">
										<a
											target="_blank"
											href={track.path}
											className="flex items-center"
											rel="noreferrer"
										>
											<DescriptionIcon customSize="5" className="fill-slate-light" />
											<span className="py-2 px-4 text-xs sm:text-sm">{ac_strings.read}</span>
										</a>
										<button>
											<Bookmark id={post.id} color="slate-light" size="5" />
											{ac_strings.bookmark}
										</button>
									</div>
								</div>
							</div>
						) : (
							<div></div>
						);
					}}
				/>
			)}
			<h2 className="py-2 font-semibold sm:mt-4 sm:mb-2 sm:text-xl">Playing Next</h2>
			<div className="text-xs overflow-y-scroll relative flex-1">
				<div className="absolute inset-0 overflow-y-scroll">
					{queue.map((p, i) => {
						return (
							<button
								className="flex pl-2 pr-4 py-2 items-center h-12"
								key={shortid()}
								onClick={() => {
									handlePlaylistItemClick(i);
								}}
							>
								<div className="mr-4">
									<VolumeUpRoundedIcon customSize="4" className="fill-slate-light" />
								</div>
								<span className="text-left text-sm sm:text-base text-ac-slate-light clamp2">
									{p.audio?.title}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PlaylistInfo;
