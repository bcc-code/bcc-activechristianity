import Link from '@/components/CustomLink';
import * as React from 'react';

export interface ISimpleSolidCard {
	title: string;
	to: string;
	className?: string;
}
const SimpleSolidCard: React.FC<ISimpleSolidCard> = ({ title, to, className }) => {
	return (
		<Link to={to} className={`w-36 h-20 flex-shrink-0 ${className ? className : ''}`}>
			<div className="bg-ac-primary w-full h-full rounded-lg p-2 pr-6 flex items-end">
				<h1 className="text-white leading-tight text-lg font-bold content-end">{title}</h1>
			</div>
		</Link>
	);
};

export default SimpleSolidCard;
