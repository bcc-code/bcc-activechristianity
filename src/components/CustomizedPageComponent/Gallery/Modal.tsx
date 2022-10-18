import FetchWallpaper from '@/HOC/FetchWallpaper';
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons';
import WallpaperModalContent from '@/components/QuoteImage/QuoteModalContent';
import { IGalleryImage, IQuote } from '@/types';
import * as React from 'react';
import Modal from 'react-modal';
import SwipeableViews from 'react-swipeable-views-react-18-fix';

interface IWallpaperModal {
	startIndex?: number;
	isOpen: boolean;
	handleClose: (e: any) => void;
	swipeViewArray: ISwipeViewContent[];
}
interface ISwipeViewContent {
	id?: string | number;
	image?: IGalleryImage;
	wallpaper?: IQuote;
	color: number[];
	size: string;
}
const mod = (index: number, max: number) => ((index % max) + max) % max;

const WallpaperModal: React.FC<IWallpaperModal> = ({ isOpen, handleClose, swipeViewArray, startIndex }) => {
	const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState<any>(null);
	React.useEffect(() => {
		setActiveWallpaperIndex(startIndex);
	}, [startIndex]);
	const modalBackground = () => {
		if (swipeViewArray[activeWallpaperIndex]) {
			const { color } = swipeViewArray[activeWallpaperIndex];
			return `rgba(${color[0]}, ${color[1]}, ${color[2]}`;
		}
		return 'rgba(0, 0, 0, 0.5)';
	};

	const handleIndexChange = (direction: number) => {
		const newIndex = mod(activeWallpaperIndex + direction, swipeViewArray.length);
		const newNesIndex = mod(newIndex + direction, swipeViewArray.length);
		setActiveWallpaperIndex(newIndex);
		if (typeof swipeViewArray[newNesIndex].wallpaper === 'undefined') {
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			className="inset-0 h-screen w-screen px-2 flex justify-center items-center overflow-scroll"
			style={{
				overlay: {
					backgroundColor: modalBackground(),
					zIndex: 700,
					transition: `background-color 1000ms linear`
				}
			}}
		>
			<div
				className="absolute top-0 right-0 left-0 z-10 text-white w-full flex justify-end"
				style={{ background: 'linear-gradient( to top, transparent, rgba(0, 0, 0, 0.5) )' }}
			>
				<button className="p-2" onClick={handleClose}>
					<CloseIcon />
				</button>
			</div>
			<div className="h-full w-full pt-10 overflow-scroll relative ">
				<div className="absolute bottom-1/2 right-0 left-0 z-10 text-white w-full flex p-2 justify-between">
					<button
						className=""
						onClick={() => {
							handleIndexChange(-1);
						}}
					>
						<KeyboardArrowLeftIcon />
					</button>
					<button
						className=""
						onClick={() => {
							handleIndexChange(1);
						}}
					>
						<KeyboardArrowRightIcon />
					</button>
				</div>
				<SwipeableViews onChangeIndex={handleIndexChange} index={activeWallpaperIndex}>
					{swipeViewArray.map((w, i) => {
						const isActive =
							activeWallpaperIndex === i ||
							activeWallpaperIndex + 1 === i ||
							activeWallpaperIndex - 1 === i;
						return w.image || w.wallpaper ? (
							<WallpaperModalContent key={i} isActive={isActive} {...w} />
						) : w.id ? (
							<FetchWallpaper
								id={w.id}
								render={({ wallpaper }) => {
									return (
										<WallpaperModalContent
											key={i}
											isActive={isActive}
											{...w}
											wallpaper={wallpaper}
										/>
									);
								}}
							/>
						) : null;
					})}
				</SwipeableViews>
			</div>
		</Modal>
	);
};

export default WallpaperModal;
