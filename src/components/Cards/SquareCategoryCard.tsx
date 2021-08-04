import Link from '@/components/CustomLink';
import SquareImages from '@/components/Images/Image1to1Rounded';
import { IImage } from '@/types';
import * as React from 'react';

export interface ISimpleSolidCard {
	title: string;
	to: string;
	className?: string;
	image: IImage;
}
const SimpleSolidCard: React.FC<ISimpleSolidCard> = ({ title, to, className, image }) => {
	return (
		<Link to={to} className="flex flex-col shadow rounded-lg overflow-hidden">
			<SquareImages className="rounded-t-lg" {...image} />
			<div className="font-roboto font-semi text-center py-2 px-2">{title}</div>
		</Link>
	);
};

export default SimpleSolidCard;
