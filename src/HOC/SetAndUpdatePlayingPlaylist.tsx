import { fetchTracksFromSlug } from '@/helpers/fetchLocalData';
import { setCurrentMedia, setAutoPlay, addTracks } from '@/state/action';
import { isPlaySelector, currentMediaSelector } from '@/state/selectors/other';
import { IRootState } from '@/state/types';
import { IMedia } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IPlaylistList {
	slug: string;
	className?: string;
	clickable?: boolean;
	render: (data: { playing: boolean }) => JSX.Element;
}

const PlaylistPlay: React.FC<IPlaylistList> = ({ slug, className, render, clickable }) => {
	const currentMedia = useSelector(currentMediaSelector);

	const dispatch = useDispatch();

	const setCurrent = (toAdd: IMedia) => {
		dispatch(setCurrentMedia(toAdd));
		dispatch(setAutoPlay(true));
	};

	const handleClick = () => {
		fetchTracksFromSlug(slug).then(tracks => {
			if (tracks.length > 0) {
				const tracksToAdd = tracks.map(at => {
					const atToAdd = { ...at };
					if (atToAdd.audio) {
						atToAdd.audio.playlistSlug = slug;
					}
					return atToAdd;
				});
				setCurrent(tracksToAdd[0]);
				dispatch(addTracks(tracksToAdd));
			}
		});
	};
	const props = clickable
		? {
				onClick: handleClick,
				onKeyDown: handleClick
		  }
		: {};

	return (
		<button className={`${className ? className : ''}`} {...props}>
			{render({ playing: currentMedia.audio?.playlistSlug === slug })}
		</button>
	);
};

export default PlaylistPlay;
