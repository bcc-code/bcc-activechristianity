import Link from '@/components/CustomLink';
import Image2To1 from '@/components/Images/Image2To1';
import LazysizesImage from '@/components/Images/LazysizesImage';
import { PostItemMediaImg } from '@/components/PostElements/PlayButton';
import TextSizeTitle from '@/components/PostElements/TextSizeWClamp';
import { IPostItem } from '@/types';
import * as React from 'react';

const SimplePostRightImg: React.FC<IPostItem> = ({ media, slug, format, image, title }) => {
	return (
		<div className="text-sm flex">
			<Link to={slug} style={{ width: '160px', height: '80px' }}>
				<PostItemMediaImg className="relative flex justify-end left-vert-img " track={media} slug={slug}>
					<LazysizesImage className="" {...image} />
				</PostItemMediaImg>
			</Link>
			<div className="flex-1 p-2 text-left">
				{format && format.length > 0 && (
					<h5 className="block uppercase font-roboto text-gray-500 text-xs tracking-wider pb-2 w-full text-left">
						{format[0].name}
					</h5>
				)}
				<Link to={slug} className="text-sm">
					<TextSizeTitle rawText={title} clamp={2} fontKey="text-sm" />
				</Link>
			</div>
		</div>
	);
};

export default SimplePostRightImg;
