import RightImg from '@/components/PostItemCards/RightImg';
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs';
import { ITopicPostItems } from '@/types';
import * as React from 'react';

interface IProps {
	tabs: ITopicPostItems[];
}
const NewForYou: React.FC<IProps> = ({ tabs }) => {
	return (
		<ScrollNavTabs
			tabs={tabs.map(tab => ({
				name: tab.name,
				to: tab.slug,
				content: (
					<div className="bg-white flex flex-col items-center sm:max-w-sm">
						{tab.posts.slice(0, 3).map(item => (
							<div className="py-2 w-full" key={item.slug}>
								<RightImg {...item} />
							</div>
						))}
					</div>
				)
			}))}
		/>
	);
};

export default NewForYou;
