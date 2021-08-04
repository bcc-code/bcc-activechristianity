import Link from '@/components/CustomLink';
import DesktopHeaderPost from '@/components/PostItemCards/FeaturedPost';
import Playlist from '@/components/ScrollSection/Playlist';
import { fetchEbookFromSlug, fetchPlaylistFromSlug, fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData';
import endpoints from '@/strings/static/endpoints';
import { INavItem, IImage, IEbook, IPostItem, IPlaylist } from '@/types';
import * as React from 'react';

export interface IPageFeaturedPost {
	type: 'playlist' | 'ebook' | 'post';
	id: number;
	image: IImage;
	slug: string;
	sub: string;
	title: string;
}

export interface IModifiedFields {
	exceprt?: string;
	title?: string;
	image?: IImage;
}

export interface IPageTextComp {
	type: 'text';
	data: {
		content: string;
	};
}

export interface IPageEmbedComp {
	type: 'embed';
	data: {
		url: string;
	};
}

export interface IPostItems {
	type: 'post_items';
	data: {
		author: string;
		id: number;
		image: { src: string };
		slug: string;
		sub: string;
		title: string;
		type: 'post';
	}[];
}

export interface IPageFeaturedItems {
	type: 'featured_items';
	data: IPageFeaturedPost[];
}

export interface IPagePost {
	type: 'article_banner';
	data: {
		author: string;
		id: number;
		image: IImage;
		slug: string;
		title: string;
	};
}

export type IPageCompTypes = IPagePost | IPageFeaturedItems | IPageTextComp | IPostItems | IPageEmbedComp;

const FeaturedItem: React.FC<IPageFeaturedPost & { withBg?: boolean }> = props => {
	const { type, id, image, slug, sub, title } = props;

	const [loadedEbook, setLoadedEbook] = React.useState<IEbook | undefined>(undefined);
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
		if (type === 'ebook') {
			fetchEbookFromSlug(slug).then(res => {
				if (res) {
					const toAdd = { ...res, ...modified };
					setLoadedEbook(toAdd);
				}
			});
		} else if (type === 'playlist') {
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
		const bgImg = '';
		const darkbg = true;
		return (
			<div
				style={{
					backgroundImage: `url(${
						bgImg ? bgImg : `https://source.unsplash.com//collection/9303016/1600x800`
					})`,
					backgroundSize: 'cover'
				}}
			>
				<div className="standard-max-w" style={{ minHeight: '500px', paddingTop: '72px' }}>
					<div className={`px-4 w-7/12 ${darkbg ? 'text-white' : ''}`}>
						<span className="uppercase">
							{loadedPost.format && loadedPost.format[0] ? loadedPost.format[0].name : null}
						</span>
						<h2 className="text-6xl font-bold pb-12">{loadedPost.title}</h2>
						<p className="text-2xl pb-12">{loadedPost.excerpt}</p>
						<Link
							className="font-bold bg-white px-8 py-4 rounded-lg text-lg text-ac-slate-dark"
							to={loadedPost.slug}
						>
							{loadedPost.types && loadedPost.types[0] ? loadedPost.types[0].name : 'Learn more'}
						</Link>
					</div>
				</div>
			</div>
		);
		/*         return <DesktopHeaderPost {...loadedPost} videoUrl={loadedPost && loadedPost.media && loadedPost.media.video ? loadedPost.media.video.src : null} /> */
	} else if (loadedPlaylist) {
		return <Playlist {...loadedPlaylist} />;
	} else {
		return null;
	}
};

export default FeaturedItem;
