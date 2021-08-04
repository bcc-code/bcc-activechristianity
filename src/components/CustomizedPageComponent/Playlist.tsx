import { OutlineButton } from '@/components/Button';
import { PostH1 } from '@/components/Headers';
import ContentPlaylist from '@/components/Playlist/ContentPlaylistItem';
import { PlaylistBackground, PostLabel } from '@/components/PostElements';
import { getImage } from '@/helpers/imageHelpers';
import { normalizeTracks } from '@/helpers/normalizers';
import ac_strings from '@/strings/ac_strings.js';
import { IPlaylist, IMedia } from '@/types';
import React from 'react';

export const PostLayout: React.FC<IPlaylist> = post => {
	const { image, title, slug, tracks, excerpt } = post;
	const trackPerPage = 5;
	const [pageNr, setPageNr] = React.useState(1);
	const [items, setItems] = React.useState(normalizeTracks(tracks.slice(0, trackPerPage)));

	const total = Math.ceil(tracks.length / trackPerPage);
	const imageUrl = getImage(title, '400x400', image);
	/* const allTracks: IMedia[] = normalizeTracks(tracks) */
	const showMoreTracks = () => {
		if (pageNr < total) {
			const toAdd = normalizeTracks(tracks.slice(trackPerPage * pageNr, trackPerPage * (pageNr + 1)));
			setItems([...items, ...toAdd]);
			setPageNr(pageNr + 1);
		}
	};
	return (
		<div className="flex flex-col md:flex-row py-8 standard-max-w-px mx-auto">
			<div className=" w-full md:w-4/12 hidden md:block">
				<div className="sm:px-4 relative py-8 flex justify-center">
					<div className="w-48">
						<PlaylistBackground slug={slug} imageUrl={imageUrl} />
					</div>
				</div>
			</div>
			<div className="flex-1">
				<PostLabel text={ac_strings.playlist} />
				<PostH1 title={title} />
				<p
					className="text-ac-slate-dark-dark text-lg font-medium leading-normal"
					dangerouslySetInnerHTML={{ __html: excerpt }}
				/>
				<div className="border-b w-1/6 my-8 border-ac-gray"></div>
				<ContentPlaylist slug={slug} tracks={items} />
				{pageNr < total && (
					<div className="flex justify-center py-4">
						<OutlineButton name={'More from playlist'} onClick={showMoreTracks} />
					</div>
				)}
			</div>
		</div>
	);
};

export default PostLayout;
