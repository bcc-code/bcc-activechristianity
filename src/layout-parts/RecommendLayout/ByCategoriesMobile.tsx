import Link from '@/components/CustomLink';
import { PageSectionHeader } from '@/components/Headers';
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI/arrowIcons';
import { INavItem } from '@/types';
import React from 'react';

export interface ITypeCount extends INavItem {
	count?: number;
}
interface IByTaxonomies {
	types: ITypeCount[];
	title: string;
	count?: number | string;
	arrow?: boolean;
	col?: number;
	icon?: JSX.Element;
}

const ByTaxonomies: React.FC<IByTaxonomies> = ({ types, title }) => {
	return (
		<div className="bg-d4athens py-4">
			<PageSectionHeader title={title} className="pb-4" />
			<div className="standard-max-w">
				<div className="flex flex-col sm:hidden">
					{types.map(({ to, name, count }, key) => {
						return (
							<Link
								key={key}
								className="px-4 border-b w-full py-2 flex justify-between items-center pr-2"
								to={to}
							>
								<span>{name}</span>
								<KeyboardArrowRightIcon customSize="6" className="fill-slate-light" />
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ByTaxonomies;
