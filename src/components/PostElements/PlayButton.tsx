import PlayPlaylistFromSlug from '@/HOC/SetAndUpdatePlayingPlaylist';
import Link from '@/components/CustomLink';
import { HeadsetIcon } from '@/components/Icons/MUI/navIcons';
import {
	VolumeUpRoundedIcon,
	PlayArrowRoundedIcon,
	EqualizerIcon,
	PlayCircleOutlineIcon
} from '@/components/Icons/MUI/postIcons';
import { IMedia } from '@/types';
import React from 'react';

import PlayButtonTrack from './PlayBtnWrapperByTrackSlug';

export interface IPlayButtonProps {
	track: IMedia;
}

export interface IPostItemMediaImg {
	track: IMedia;
	slug: string;
	className?: string;
	style?: any;
}

export const PostItemMediaImg: React.FC<IPostItemMediaImg> = ({ track, slug, className, children, style }) => {
	return (
		<Link className={className} style={style} to={slug}>
			{track && (track.video || track.audio) && (
				<div id="play-button" className="absolute p-3 text-white inset-0 flex justify-center items-center z-10">
					<div className="z-20">
						{track.video ? (
							<PlayCircleOutlineIcon customSize="12" className="fill-white" />
						) : (
							<HeadsetIcon className="fill-white" customSize="12" />
						)}
					</div>
				</div>
			)}
			{children}
		</Link>
	);
};

export const PostItemPlayButton: React.FC<IPlayButtonProps> = ({ track }) => {
	if (track.audio || track.video) {
		return (
			<PlayButtonTrack track={track}>
				{track.video ? <PlayArrowRoundedIcon customSize="12" /> : <VolumeUpRoundedIcon customSize="12" />}
			</PlayButtonTrack>
		);
	} else {
		return null;
	}
};

export const PostItemPlayButtonSmall: React.FC<IPlayButtonProps> = ({ track }) => {
	if (track.audio || track.video) {
		return (
			<PlayButtonTrack track={track}>
				{track.video ? <PlayArrowRoundedIcon customSize="6" /> : <VolumeUpRoundedIcon customSize="6" />}
			</PlayButtonTrack>
		);
	} else {
		return null;
	}
};

export const PlaylistPlayButton: React.FC<{ slug: string }> = ({ slug }) => {
	return (
		<PlayPlaylistFromSlug
			slug={slug}
			clickable
			render={({ playing }) => {
				return playing ? <EqualizerIcon customSize="12" /> : <VolumeUpRoundedIcon customSize="12" />;
			}}
		/>
	);
};
