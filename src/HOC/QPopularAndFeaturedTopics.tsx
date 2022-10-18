import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType';
import { filterTopics } from '@/helpers/normalizers';
import { ITopic } from '@/types';
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

interface QProps {
	excludeFollowed?: boolean;
	render: (data: { topics: ITopic[] }) => JSX.Element;
}

const QPopularAndFeaturedTopics: React.FC<QProps> = ({ render, excludeFollowed }) => {
	return (
		<StaticQuery
			query={query}
			render={(props: IQuery) => {
				const { featuredTopics, popularTopics } = props.ac;
				const topicsSlugs = filterTopics({ topics: [featuredTopics, popularTopics], returnSlugs: true });
				return (
					<FetchTopicPostItems
						topics={topicsSlugs}
						layout="list"
						render={({ topics }) => {
							return <div>{render({ topics })}</div>;
						}}
					/>
				);
			}}
		/>
	);
};
export default QPopularAndFeaturedTopics;

interface IQuery {
	ac: {
		featuredTopics: ITopic[];
		popularTopics: ITopic[];
	};
}
const query = graphql`
	query QFeaturedAndPopularTopics {
		ac {
			popularTopics {
				slug
				id
			}
			featuredTopics: topics(featured: true) {
				slug
				id
			}
		}
	}
`;
