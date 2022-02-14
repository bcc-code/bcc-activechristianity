import * as React from 'react';
import { LayoutH1Wide } from '@/components/Headers';
import { graphql } from 'gatsby';
import MetaTag from '@/components/Meta';
import { ITranslations } from '@/types';
import shortid from 'shortid';
import BgImgCard, { IBgImgCard } from '@/layout-parts/HomeNew/BgImgTwoToOneCard';
import ac_strings from '@/strings/ac_strings';
import { FetchLatestSeries } from '@/HOC/FetchLatest';
const Series: React.FC<IDummy> = props => {
	const { title, pagePath } = props.pageContext;
	const translatedUrls: ITranslations[] = [];
	const { series } = props.data.ac;
	return (
		<div className="max-w-tablet mx-auto pt-6">
			<MetaTag title={title} translatedUrls={translatedUrls} type="page" breadcrumb={[]} path={pagePath} />
			<LayoutH1Wide title={title} />
			<div className="mx-auto standard-max-w w-full sm:grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 pb-4">
				{series.map(item => {
					console.log(item);
					const updated = { ...item, slug: `${ac_strings.slug_series}/${item.slug}` };
					/* return <BibleStudyItemCard {...item} label="Bible Study" start />; */
					return <BgImgCard smallText key={shortid()} {...updated} />;
				})}
			</div>
		</div>
	);
};

export default Series;

interface IDummy {
	path: string;

	pageContext: {
		title: string;
	};
}

export const pageQuery = graphql`
	query AllSeries {
		ac {
			series {
				title
				slug
				image {
					src
					srcset
					dataUri
				}
				excerpt
			}
		}
	}
`;
