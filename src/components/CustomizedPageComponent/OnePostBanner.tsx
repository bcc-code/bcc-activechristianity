import { fetchPlaylistFromSlug, fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData';
import { IPostItem, IPlaylist } from '@/types';
import * as React from 'react';

import { IPageFeaturedPost, IModifiedFields } from './BlockWrapper';
import FeaturedBannerTop from './FeaturedBannerTop';
import Playlist from './Playlist';

const OnePostBanner: React.FC<IPageFeaturedPost & { withBg?: boolean }> = props => {
	const { type, slug, sub, title } = props;
	const [loadedPost, setLoadedPost] = React.useState<IPostItem | undefined>(undefined);
	const [loadedPlaylist, setLoadedPlaylist] = React.useState<IPlaylist | undefined>(undefined);

	React.useEffect(() => {
		setPost();
	}, [slug]);

	const setPost = () => {
		const modified: IModifiedFields = {};
		if (title && title.trim() !== '') {
			modified['title'] = title;
		}

		if (sub && sub.trim() !== '') {
			modified.exceprt = sub;
		}

		/*         if (image) {
                    modified.image = image
                } */
		if (type === 'playlist') {
			fetchPlaylistFromSlug(slug).then(res => {
				if (res) {
					const toAdd = { ...res, ...modified };
					setLoadedPlaylist(toAdd);
				}
			});
		} else if (type == 'post') {
			fetchOneLocalPostFromSlug(slug).then(res => {
				if (res) {
					const toAdd = { ...res, ...modified };
					setLoadedPost(toAdd);
				}
			});
		}
	};

	if (loadedPost) {
		return (
			<FeaturedBannerTop
				{...loadedPost}
				videoUrl={loadedPost && loadedPost.media && loadedPost.media.video ? loadedPost.media.video.src : null}
			/>
		);
	} else if (loadedPlaylist) {
		return <Playlist {...loadedPlaylist} />;
	} else {
		return null;
	}
};

export default OnePostBanner;
