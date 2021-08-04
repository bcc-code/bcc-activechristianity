import Breadcrumb from '@/components/Breadcrumb';
import { IRootState } from '@/state/types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const stateSelector = (state: IRootState) => state;

export const breadcrumbSelector = createSelector(stateSelector, ({ breadcrumb }) => breadcrumb);

const BreadcrumbWrapper = () => {
	const breadcrumb = useSelector(breadcrumbSelector);
	return breadcrumb.items.length > 0 ? (
		<div className="fixed sm:relative z-50 w-full bg-white px-4 block standard-max-w ">
			<Breadcrumb {...breadcrumb} />
		</div>
	) : null;
};

export default BreadcrumbWrapper;
