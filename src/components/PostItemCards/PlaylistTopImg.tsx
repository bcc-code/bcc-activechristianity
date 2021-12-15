import Link from '@/components/CustomLink';
import SquareImage from '@/components/Images/Image1to1Rounded';
import TextSizeTitle from '@/components/PostElements/TextSizeWClamp';
import ac_strings from '@/strings/ac_strings.js';
import { IPlaylist, IPlaylistType } from '@/types';
import * as React from 'react';

const PlaylistTopImg: React.FC<IPlaylist> = ({ slug, image, title, excerpt, type }) => {
	//'AUDIO_POSTS' | 'SONGS' | 'PODCAST' | 'MIXED'
	/*     {
			name: ac_strings.all,
			list: playlists
		},
    
		{
			name: ac_strings.audio_posts,
			list: audio
		},
		{
			name: ac_strings.songs,
			list: songs
		},
		{
			name: ac_strings.podcast,
			list: podcasts
		} */
	const typeMap = {
		AUDIO_POSTS: ac_strings.audio_posts,
		PODCAST: ac_strings.podcast,
		SONGS: ac_strings.songs,
		MIXED: 'mixed'
	};
	return (
		<Link to={`${slug}`} className="flex flex-col">
			<SquareImage {...image} rounded />
			{type && <div className="text-xxs pt-4">{typeMap[type]}</div>}
			<TextSizeTitle
				rawText={title}
				fontKey={'text-lg-2xl'} //fontKey: 'text-lg-2xl',
				clamp={3}
				className="mb-2 text-ac-slate-dark"
			/>
			{/*             <TextSizeTitle {...{
                rawText: excerpt,
                fontKey: "text-sm",
                clamp: 2,
                className: "mb-4 leading-tight text-gray-600"

            }} /> */}
		</Link>
	);
};

export default PlaylistTopImg;
