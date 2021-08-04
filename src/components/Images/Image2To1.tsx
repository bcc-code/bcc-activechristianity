import { IImage } from '@/types';
import * as React from 'react';

import LazysizesFeaturedImage from './LazysizesImage';

interface IProps {
	className?: string;
	image: IImage;
	imageClassName?: string;
	rounded?: boolean;
	alt?: string;
}

const TwoToOneImage: React.FC<IProps> = ({ image, imageClassName, rounded, alt, className }) => {
	return (
		<div
			className={`pointer-events-none relative w-full pb-half overflow-hidden ${rounded ? 'rounded-lg' : ''} ${
				className ? className : ''
			}`}
		>
			<LazysizesFeaturedImage
				{...image}
				alt={alt ? alt : ''}
				className={`w-full max-w-full absolute h-auto bg-center bg-cover ${
					imageClassName ? imageClassName : ''
				}`}
			/>
		</div>
	);
};

export default TwoToOneImage;
