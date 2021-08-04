import Content from '@/components/Content';
import { PostH1 } from '@/components/Headers';
import MetaTag from '@/components/Meta';
import { INavItem, IGlossary } from '@/types';
import React from 'react';

const Glossary: React.FC<IGlossaryProps> = ({ pageContext, path }) => {
	const { title, glossary, breadcrumb } = pageContext;
	if (title) {
		return (
			<div className="relativeh-full pt-4 max-w-tablet m-auto px-4">
				<MetaTag
					path={path}
					title={title}
					type="article"
					translatedUrls={[]}
					breadcrumb={[...breadcrumb, { name: title, to: path }]}
				/>
				<PostH1 title={title} />
				<div className="border-b w-1/6 my-8 border-ac-gray"></div>
				<Content content={glossary.content} title={title} slug={path} />
			</div>
		);
	} else {
		return null;
	}
};

export default Glossary;
interface IGlossaryProps {
	path: string;
	pageContext: {
		title: string;
		slug: string;
		glossary: IGlossary;
		breadcrumb: INavItem[];
	};
}
