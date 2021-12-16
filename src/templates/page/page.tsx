import CustomizedPageComponent from '@/components/CustomizedPageComponent';
import { PostH1 } from '@/components/Headers';
import MetaTag from '@/components/Meta';
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem';
import { INavItem, IPage } from '@/types';
import * as React from 'react';

const Page: React.FC<IAboutProps> = ({ pageContext }) => {
	const { title, flexibleContent, pagePath } = pageContext;
	const customLayout: IPageCompTypes[] = JSON.parse(flexibleContent);

	//CustomizedLayoutProps
	return (
		<div>
			<MetaTag type="article" title={title} path={pagePath} breadcrumb={[]} />

			<div className="max-w-tablet mx-auto px-4 pt-16">
				<PostH1 title={title} />
				<CustomizedPageComponent items={customLayout} />
			</div>
		</div>
	);
};
export default Page;

interface IAboutProps {
	pageContext: IPage & {
		breadcrumb: INavItem[];
	};
	path: string;
}
