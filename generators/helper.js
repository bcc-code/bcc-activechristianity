const ac_strings = require('../src/strings/ac_strings.js');
const hasPlaylist = process.env.LISTEN_SECTION === 'all';
const hasWallpaper = process.env.WALLPAPER_SECTION === 'true';
module.exports = {
	categorySorted: () => {
		const toReturn = [
			{
				id: 108206,
				keyname: 'edification'
			},
			{
				id: 345,
				keyname: 'testimony'
			},
			{
				id: 108212,
				keyname: 'animation'
			}
		];
		if (hasPlaylist) {
			const playlistUri = `https://cdn.activechristianity.org/image/upload/c_thumb,h_600,w_600,g_center/v1627475704/en/bljke6pnvdxx0dfdh8fo.png`;

			toReturn.push({
				id: 'playlist',
				keyname: 'playlist',
				name: ac_strings.playlist,
				slug: ac_strings.slug_playlist,
				image: {
					src: playlistUri,
					dataUri: playlistUri,
					srcset: playlistUri
				}
			});
		} else {
			toReturn.push({
				id: 108204,
				keyname: 'song'
			});
		}

		if (hasWallpaper) {
			const wallpaperUri = `https://cdn.activechristianity.org/image/upload/v1627453124/en/mbaxjijzrhiyndq52mww.jpg`;
			toReturn.push({
				id: 'wallpaper',
				keyname: 'wallpaper',
				name: ac_strings.wallpapers,
				slug: ac_strings.wallpaper_slug,
				image: {
					src: wallpaperUri,
					dataUri: wallpaperUri,
					srcset: wallpaperUri
				}
			});
		}
		toReturn.push(
			{
				id: 108201,
				keyname: 'commentary'
			},
			{
				id: 108204,
				keyname: 'song'
			},
			{
				id: 1503,
				keyname: 'question'
			},
			{
				id: 36170,
				keyname: 'message'
			},
			{
				id: 108211,
				keyname: 'interview'
			}
		);

		return toReturn;
	}
};
