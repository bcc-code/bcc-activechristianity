import { IImage } from '@/types';
import * as React from 'react';

import LazysizesFeaturedImage from './LazysizesImage';

const SquareRoundedImage: React.FC<IImage & { className?: string; rounded?: boolean }> = props => {
	return (
		<div className="relative w-full pb-square sm:pb-wide">
			<LazysizesFeaturedImage
				{...props}
				className={`${props.className ? props.className : ''} ${
					props.rounded ? 'rounded-lg' : ''
				} absolute w-full h-full inset-0 object-cover g-image`}
			/>
		</div>
	);
};

export default SquareRoundedImage;
