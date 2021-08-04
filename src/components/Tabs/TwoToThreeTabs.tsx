import { ITab } from '@/types';
import * as React from 'react';
import { useSwipeable } from 'react-swipeable';

import './scrollNavTabs.css';

interface IProps {
	tabs: ITab[];
}

const TwoToThreeTabs: React.FC<IProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = React.useState<number>(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};
	const nextIndex = (activeTab + 1) % tabs.length;
	const lastIndex = activeTab - 1 < 0 ? tabs.length - 1 : activeTab - 1;

	const handlers = useSwipeable({
		onSwipedLeft: () => setActiveTab(nextIndex),
		onSwipedRight: () => setActiveTab(lastIndex),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true
	});
	return (
		<div className="relative  mt-8 pb-2">
			<span className="flex items-center mb-6 relative">
				{tabs.map((item, i) => {
					return (
						<button
							className={`w-1/2 font-semibold py-1 ${
								activeTab === i ? 'text-white' : ''
							} mr-4 focus:outline-none`}
							onClick={() => {
								handleTabClick(i);
							}}
							key={i}
						>
							{item.name}
						</button>
					);
				})}

				<span
					className="absolute top-0 bottom-0 rounded-full block bg-ac-slate-dark text-white ac-tab-marker"
					style={{ left: `${activeTab * (100 / tabs.length)}%`, width: `${100 / tabs.length}%` }}
				/>
			</span>
			<div className="ac-tab-card-wrapper overflow-hidden" {...handlers}>
				{tabs.map((tab, i) => {
					let postClassName = '';
					if (i === activeTab) {
						postClassName = 'current';
					} else if (i > activeTab) {
						postClassName = 'next';
					} else if (i < activeTab) {
						postClassName = 'prev';
					}

					return (
						<div key={i} className={`ac-tab-${postClassName} ac-tab-card `}>
							{tab.content}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TwoToThreeTabs;
