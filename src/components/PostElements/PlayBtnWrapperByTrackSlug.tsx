import { fetchTracksFromSlug } from '@/helpers/fetchLocalData';
import { setCurrentMedia, setAutoPlay, addTracks, togglePlayMedia } from '@/state/action';
import { IMedia, ITrack } from '@/types';
import React from 'react';
import { useDispatch } from 'react-redux';

export interface IPlayButtonProps {
	track: IMedia;
	className?: string;
	style?: any;
}
const PlayButton: React.FC<IPlayButtonProps> = ({ track, children, className, style }) => {
	const dispatch = useDispatch();

	const setCurrent = (toAdd: IMedia) => {
		dispatch(togglePlayMedia());
		dispatch(setCurrentMedia(toAdd));
		dispatch(setAutoPlay(true));
	};
	const handleClick = () => {
		setCurrent(track);
		handlePlaylist();
	};

	const handlePlaylist = () => {
		if (track.audio && track.audio.playlistSlug) {
			const playlistSlug = track.audio.playlistSlug;

			return fetchTracksFromSlug(playlistSlug).then(tracks => {
				let toUpdate = [...tracks];
				if (tracks.length > 0) {
					const index = tracks.findIndex(item => item.audio?.src === track.audio?.src);
					if (index > -1) {
						toUpdate = [...tracks.slice(index), ...tracks.slice(0, index)];
					}
					dispatch(addTracks(toUpdate));
				}
			});
		}
	};
	return (
		<button className={`${className ? className : ''}`} onClick={handleClick} onKeyDown={handleClick} style={style}>
			{children}
		</button>
	);
};

export default PlayButton;
