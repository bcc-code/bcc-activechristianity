import { fetchTracksFromSlug } from '@/helpers/fetchLocalData';
import { setCurrentMedia, setAutoPlay, addTracks, togglePlayMedia } from '@/state/action';
import { isAutoPlaySelector, currentMediaSelector } from '@/state/selectors/other';
import { IMedia } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface IPlayButtonProps {
	track: IMedia;
	playlistTracks?: IMedia[];
	className?: string;
	style?: any;
	clickable?: boolean;
	render: (data: { playing: boolean }) => JSX.Element;
}

const PlayButton: React.FC<IPlayButtonProps> = ({ track, playlistTracks, className, style, render, clickable }) => {
	const dispatch = useDispatch();
	const currentMedia = useSelector(currentMediaSelector);
	const isPlaying = useSelector(isAutoPlaySelector);
	const setCurrent = (toAdd: IMedia) => {
		dispatch(setCurrentMedia(toAdd));
		dispatch(setAutoPlay(true));
	};
	const handleClick = () => {
		if (currentMedia.audio) {
			if (currentMedia.path === track.path) {
				dispatch(setAutoPlay(!isPlaying));
			} else {
				setCurrent(track);
				handlePlaylist();
			}
		} else {
			setCurrent(track);
			handlePlaylist();
		}
	};

	const handlePlaylist = () => {
		if (playlistTracks) {
			handleTracks(playlistTracks);
		} else if (track.audio && track.audio.playlists) {
			return Promise.all(
				track.audio.playlists.map(p => {
					return fetchTracksFromSlug(p.slug).then(tracks => {
						return tracks;
					});
				})
			).then(res => {
				let tracks: IMedia[] = [];
				res.forEach(list => {
					tracks = [...tracks, ...list];
				});
				handleTracks(tracks);
			});
			/*             return fetchTracksFromSlug(playlistSlug).then(tracks => {
                            handleTracks(tracks)
                        }) */
		}
	};

	const handleTracks = (tracks: IMedia[]) => {
		let toUpdate = [...tracks];
		if (tracks.length > 0) {
			const index = tracks.findIndex(item => item.audio?.src === track.audio?.src);
			if (index > -1) {
				toUpdate = [...tracks.slice(index + 1), ...tracks.slice(0, index)];
			}
			dispatch(addTracks(toUpdate));
		}
	};

	const props = clickable
		? {
				onClick: handleClick,
				onKeyDown: handleClick
		  }
		: {};

	return (
		<button className={`${className ? className : ''}`} {...props} style={style}>
			{render({ playing: currentMedia.path === track.path && isPlaying == true })}
		</button>
	);
};

export default PlayButton;
