import { IImage } from '@/types';
import * as React from 'react';

import LazysizesFeaturedImage from './LazysizesImage';

const RoundedImage: React.FC<IImage> = props => {
	return (
		<LazysizesFeaturedImage
			{...props}
			className=" w-full h-full inset-0 object-cover g-image rounded-full overflow-hidden p-1"
		/>
	);
};

export default RoundedImage;
