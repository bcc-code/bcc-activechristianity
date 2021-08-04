import StaggerChildrenMotion from '@/components/Motion/StaggerChildren';
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem';
import React from 'react';
import shortid from 'shortid';

import './horizontal-scroll.css';

interface IXScrollItem {
	items: JSX.Element[];
}

const FeatureSection: React.FC<IXScrollItem> = ({ items }) => {
	return (
		<StaggerChildrenMotion className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full">
			{items.map((c, i) => {
				return (
					<StaggerChildrenItemMotion className="scroll-snap-x-child w-8/12 min-w-8/12 ml-4" key={shortid()}>
						{c}
					</StaggerChildrenItemMotion>
				);
			})}
			<div className="min-w-4"></div>
		</StaggerChildrenMotion>
	);
};

export default FeatureSection;
