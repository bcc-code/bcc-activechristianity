import Link from '@/components/CustomLink';
import RightImg from '@/components/PostItemCards/RightImg';
import { IPostListSection } from '@/layout-parts/Home/PostListSection';
import * as React from 'react';
import { useSwipeable } from 'react-swipeable';

import './scrollNavTabs.css';

interface IProps {
	tabs: IPostListSection[];
}
const NewForYou: React.FC<IProps> = ({ tabs }) => {
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
		<div>
			<span className="px-4 flex items-center pb-6 relative">
				{tabs.map((item, i) => {
					return (
						<button
							className="w-12 h-12 p-2 rounded-full bg-white mr-4 focus:outline-none"
							onClick={() => {
								handleTabClick(i);
							}}
							key={i}
						>
							{item.header}
						</button>
					);
				})}

				<span
					className="absolute bottom-0 mb-3 ml-4 w-4 h-1 block bg-gray-600 rounded ac-tab-marker"
					style={{ left: `${activeTab * 64}px` }}
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
						<div key={i} className={`ac-tab-${postClassName} ac-tab-card px-4`}>
							<div className="bg-white flex flex-col items-center px-2 border border-gray-300 rounded-lg sm:max-w-sm cursor-pointer">
								{tab.posts.map(item => (
									<div className="py-2 w-full" key={item.slug}/>
										<RightImg {...item} />
									</div>
								))}
						</div>
						</div>
			);
				})}
		</div>
		</div >
	);
};

export default NewForYou;
