import { IIconProps } from '@/types';
import * as React from 'react';

const sizeMap = {
	'0': 0,
	'1': 0.25,
	'2': 0.5,
	'3': 0.75,
	'4': 1,
	'5': 1.25,
	'6': 1.5,
	'8': 2,
	'10': 2.5,
	'12': 3,
	'14': 3.5,
	'15': 3.75,
	'16': 4,
	'18': 4.5,
	'20': 5,
	'24': 6,
	'28': 7,
	'32': 8,
	'36': 9,
	'40': 10,
	'48': 12,
	'56': 14,
	'64': 16
};

export type IButtonColour = 'primary' | 'secondary' | 'slate-dark' | 'slate-light' | 'white';

const SVGWrap: React.FC<IIconProps> = ({ customSize, className, children }) => {
	const size = customSize ? `${sizeMap[customSize]}rem` : '24';
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style={{
				height: size,
				width: size
			}}
			className={className ? className : `fill-current`}
		>
			{children}
		</svg>
	);
};

export default SVGWrap;
