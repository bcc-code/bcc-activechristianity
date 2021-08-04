// https://github.com/souporserious/react-media-player
import { setCurrentMedia, addTracks, setAutoPlay } from '@/state/action';
import { isAutoPlaySelector, currentMediaSelector, playlistSelector } from '@/state/selectors/other';
import { IMedia } from '@/types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../style/madia-player.css';
import Controller from './Controller';
import PlaylistInfo from './PlaylistInfo';

const mod = (num: number, max: number) => ((num % max) + max) % max;
const ACMediaPlayer: React.FC = () => {
	const dispatch = useDispatch();
	const currentMedia = useSelector(currentMediaSelector);
	const queue = useSelector(playlistSelector);
	const [fullScreenInfo, setFullScreenInfo] = React.useState(false);

	const [history, setHistory] = React.useState<IMedia[]>([]);

	React.useEffect(() => {
		const findIndex = history.findIndex(h => h.path === currentMedia.path);
		let toUpdatePlaylist = [...history.slice(-10)];
		if (findIndex > -1) {
			toUpdatePlaylist = [...history.slice(0, findIndex), ...history.slice(findIndex + 1), currentMedia];
		} else {
			toUpdatePlaylist.push(currentMedia);
		}

		setHistory(toUpdatePlaylist);
	}, [currentMedia]);

	const handleCloseClickButton = () => {
		dispatch(setCurrentMedia({ path: undefined }));
	};

	const onPrevTrack = () => {
		if (history.length > 1) {
			dispatch(setCurrentMedia(history[history.length - 2]));
			setHistory(history.slice(0, history.length - 2));
			dispatch(addTracks([currentMedia, ...queue]));
		}
	};
	const onNextTrack = () => {
		if (queue.length > 0) {
			dispatch(setCurrentMedia(queue[0]));
			const toUpdatePlaylist = queue.slice(1);
			dispatch(addTracks(toUpdatePlaylist));
		}
	};
	const handlePlaylistItemClick = (index: number) => {
		dispatch(setAutoPlay(true));
		dispatch(setCurrentMedia(queue[index]));
		const toUpdatePlaylist = queue.slice(index + 1);
		dispatch(addTracks(toUpdatePlaylist));
	};

	return currentMedia.audio ? (
		<div
			className={`fixed pb-14 sm:pb-0 bottom-0 right-0 left-0 mp--bottom ${fullScreenInfo ? 'top-0' : ''}`}
			style={{ zIndex: 550 }}
		>
			<div
				className={`w-full flex  ${
					fullScreenInfo ? 'h-full bg-mp-background pt-6' : 'bg-white sm:bg-ac-slate-lighter'
				}`}
			>
				<div className="w-full h-full flex flex-col">
					{fullScreenInfo && (
						<PlaylistInfo
							collaps={() => setFullScreenInfo(!fullScreenInfo)}
							handlePlaylistItemClick={handlePlaylistItemClick}
							track={currentMedia}
							queue={queue}
						/>
					)}
					<Controller
						fullScreenInfo={fullScreenInfo}
						setFullScreenInfo={setFullScreenInfo}
						track={currentMedia.audio}
						onNextTrack={onNextTrack}
						onPrevTrack={onPrevTrack}
					/>
				</div>
			</div>
		</div>
	) : null;
};

export default React.memo(ACMediaPlayer);
