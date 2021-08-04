import Link from '@/components/CustomLink';
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage';
import VideoHeader from '@/components/Images/Video16to9';
import { DesktopFeaturedPlaceholder } from '@/components/Loader/PlaceHolders';
import MotionAppear from '@/components/Motion/AppareY';
import { ReadingTimingAuthor, PostLabel } from '@/components/PostElements';
import TextSizeWClamp from '@/components/PostElements/TextSizeWClamp';
import Bookmark from '@/components/PostElements/ToggleBookmark';
import FeaturedPost from '@/components/PostItemCards/FeaturedPost';
import PostMeta from '@/components/PostMeta/PostMeta';
import { fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData';
import { IPostItem } from '@/types';
import * as React from 'react';

const HeaderPost: React.FC<{ mixed: IPostItem[] | null }> = ({ mixed }) => {
	/* const {  muted } = palette; */
	const [post, setPost] = React.useState<null | IPostItem>(null);
	const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
	React.useEffect(() => {
		if (mixed) {
			const firstPost = mixed[0];
			setPost(firstPost);
			fetchOneLocalPostFromSlug(firstPost.slug).then(res => {
				if (res && res.media && res.media.video) {
					setVideoUrl(res.media.video.src);
				}
			});
		}
	}, [mixed]);

	if (post) {
		return <FeaturedPost {...post} videoUrl={videoUrl} />;
	} else {
		return <DesktopFeaturedPlaceholder />;
	}
};

export default HeaderPost;
