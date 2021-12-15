import Link from '@/components/CustomLink';
import Image2To1 from '@/components/Images/Image2To1';
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage';
import { IBannerBasic } from '@/types';
import * as React from 'react';

export const HomeTop: React.FC<IBannerBasic & { darkbg?: boolean }> = ({
	title,
	body,
	cta,
	bgImg,
	label,
	darkbg,
	image
}) => (
	<div className="relative w-full overflow-hidden">
		<div className="z-20 relative standard-max-w py-8 md:py-18 lg:py-20">
			<div className={`px-4 md:w-7/12 ${darkbg ? 'text-white' : ''}`}>
				<span className="text-sm lg:text-base uppercase text-white ">{label}</span>
				<h2 className="text-2xl md:text-4xl text-white lg:text-6xl font-bold pb-4 sm:pb-8 md:pb-12">{title}</h2>
				<Link
					className="block font-bold bg-white px-4 lg:px-8 py-2 lg:py-4 rounded-lg text-base md:text-lg text-ac-slate-dark"
					to={cta.path}
				>
					{cta.text}
				</Link>
			</div>
		</div>
		<div className={`z-10 absolute inset-0 rounded-lg`} style={{ background: '#020203', opacity: '0.3' }}></div>
		<div className="absolute inset-0">
			<LazysizesFeaturedImage {...image} className="h-full" />
		</div>
	</div>
);
