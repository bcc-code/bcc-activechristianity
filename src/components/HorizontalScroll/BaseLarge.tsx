import MotionStagger from '@/components/Motion/StaggerChildren';
import React from 'react';
import shortid from 'shortid';

import './horizontal-scroll.css';

interface IXScrollItem {
	items: JSX.Element[];
}
const FeatureSection: React.FC<IXScrollItem> = ({ items }) => {
	return (
		<MotionStagger className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full">
			{items.map((c, i) => {
				return (
					<div className="scroll-snap-x-child ml-4" style={{ width: '88%', minWidth: '88%' }} key={shortid()}>
						{c}
					</div>
				);
			})}
			<div className="min-w-4"></div>
		</MotionStagger>
	);
};

export default FeatureSection;
