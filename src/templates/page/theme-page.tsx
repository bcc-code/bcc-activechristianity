import Link from '@/components/CustomLink';
import CustomizedPageComponent from '@/components/CustomizedPageComponent';
import MetaTag from '@/components/Meta';
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem';
import ac_strings from '@/strings/ac_strings.js';
import { INavItem } from '@/types';
import { graphql } from 'gatsby';
import * as React from 'react';

const CustomizedPage: React.FC<ICustomizedPage> = ({ pageContext, data }) => {
	const { breadcrumb, pagePath } = pageContext;
	const { flexibleContent, title, slug } = data.ac.page;
	const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent);

	return (
		<div className="pt-8 sm:pt-0">
			<MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={pagePath} />

			<CustomizedPageComponent items={componentConfig} slug={pagePath} title={title} />
			<div className="w-full flex justify-center py-6">
				<Link
					to={`${ac_strings.slug_topic}/${slug}`}
					className="bg-ac-slate-dark px-4 py-2 rounded text-white text-lg"
				>
					More on this topic
				</Link>
			</div>
		</div>
	);
};

export default CustomizedPage;

interface ICustomizedPage {
	path: string;
	data: {
		ac: {
			page: {
				pagePath: string;
				flexibleContent: string;
				slug: string;
				title: string;
			};
		};
	};
	pageContext: {
		pagePath: string;
		title: string;
		breadcrumb: INavItem[];
	};
}

export const pageQuery = graphql`
	query getThemepage($id: ID) {
		ac {
			page(id: $id) {
				title
				slug
				flexibleContent
			}
		}
	}
`;
