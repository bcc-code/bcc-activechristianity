import { KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons';
import React from 'react';

import PaginationShort from './dynamic-InputLeftRight';

interface IProps {
	currentPage: number;
	totalPages: number;
	onChange: (e: any) => string;
}
const StaticPagination: React.FC<IProps> = props => {
	const { currentPage, totalPages, onChange } = props;

	const getPaginationStart = () => {
		let start = 0;
		if (currentPage > 4) {
			start = totalPages - currentPage > 2 ? currentPage - 3 : currentPage - 5;
		}
		return start;
	};
	const paginationStart = getPaginationStart();
	if (totalPages > 1) {
		const pageArray = [...Array(totalPages).keys()];
		return (
			<div className="w-full sm:flex justify-center text-gray-500 font-roboto">
				<div className="hidden sm:block">
					{currentPage !== 1 && (
						<button
							className="bg-ac-slate-lighter rounded  p-2 mr-2"
							onClick={() => onChange(currentPage - 1)}
							onKeyDown={() => onChange(currentPage - 1)}
						>
							<KeyboardArrowLeftIcon />
						</button>
					)}
					{paginationStart > 5 && (
						<button
							onClick={() => onChange(1)}
							className={`${pageArray.length === currentPage ? 'bg-gray-100 font-bold' : ''} w-16 h-16 `}
						>
							{1}
						</button>
					)}
					{paginationStart > 5 && (
						<button disabled className="h-16">
							...
						</button>
					)}
					{pageArray.slice(paginationStart, paginationStart + 5).map((item, i) => {
						const index = paginationStart + i;
						return (
							<button
								key={i}
								onClick={() => onChange(index + 1)}
								className={`${
									index === currentPage - 1 ? 'bg-ac-slate-dark font-bold text-white rounded' : ''
								} w-12 h-12 `}
							>
								{index + 1}
							</button>
						);
					})}
					{pageArray.length > 5 && totalPages - currentPage > 2 && (
						<button disabled className="h-16">
							...
						</button>
					)}
					{pageArray.length > 5 && totalPages - currentPage > 2 && (
						<button
							onClick={() => onChange(pageArray.length)}
							className={`${pageArray.length === currentPage ? 'bg-gray-100 font-bold' : ''} w-16 h-16 `}
						>
							{pageArray.length}
						</button>
					)}
					{currentPage !== totalPages && (
						<button
							className="bg-ac-slate-lighter rounded  p-2"
							onChange={() => onChange(currentPage + 1)}
							onKeyDown={() => onChange(currentPage + 1)}
						>
							<KeyboardArrowRightIcon />
						</button>
					)}
				</div>
				<div className="sm:hidden flex justify-center items-center ">
					<PaginationShort {...props} />
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default StaticPagination;
