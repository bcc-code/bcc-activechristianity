import StaggerChildrenMotion from '@/components/Motion/StaggerChildren';
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem';
import Wallpaper from '@/components/QuoteImage';
import React from 'react';
import ac_strings from '@/strings/ac_strings';
import { IGallery } from '../BlockWrapper';
import WallpaperModal from './Modal';

const Gallery: React.FC<IGallery> = ({ data }) => {
	const allImages = data;

	const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null);
	const [isOpen, setIsOpen] = React.useState(false);

	const swipeViewArray = allImages.map(({ image }) => ({
		image,
		color: image.colors && image.colors[0],
		size: image.size.height / image.size.width === 1 ? 'square' : 'landscape'
	}));

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div className="">
			{/* 		<h2 className="pb-4 font-roboto rounded uppercase p-1 text-xxs  opacity-75">
				{ac_strings.wallpaper_title}
			</h2> */}
			<StaggerChildrenMotion
				className={`grid grid-cols-2 ${allImages.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
					} gap-4 w-full pb-6`}
			>
				<WallpaperModal
					swipeViewArray={swipeViewArray}
					handleClose={handleClose}
					isOpen={isOpen}
					startIndex={activeWallpaperIndex}
				/>
				{allImages.length === 2 ? <div /> : null}
				{allImages.map(({ image }, k) => {
					const size = image.size.height / image.size.width === 1 ? 'square' : 'landscape';
					const color = image.colors && image.colors[0];
					return (
						<StaggerChildrenItemMotion
							key={k}
							onClick={() => {
								setActiveWallpaperIndex(k);
								setIsOpen(true);
							}}
						>
							<Wallpaper image={image} size={size} color={color} alt={image.alt} />
						</StaggerChildrenItemMotion>
					);
				})}
			</StaggerChildrenMotion>
		</div>
	);
};

export default Gallery;
