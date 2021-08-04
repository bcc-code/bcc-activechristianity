import { IImage } from '@/types';
import * as React from 'react';

import LazysizesFeaturedImage from './LazysizesImage';

interface IProps {
	image: IImage;
	imageClassName?: string;
	roundedTop?: boolean;
	alt?: string;
}

const TwoToOneImage: React.FC<IProps> = ({ image, imageClassName, roundedTop }) => {
	return (
		<div
			className={`pointer-events-none relative w-full pb-16/9 overflow-hidden ${
				roundedTop ? 'rounded-t-lg' : 'rounded-lg'
			}`}
		>
			<LazysizesFeaturedImage
				{...image}
				className={`w-full max-w-full absolute h-auto bg-center bg-cover ${
					imageClassName ? imageClassName : ''
				}`}
			/>
		</div>
	);
};

export default TwoToOneImage;
