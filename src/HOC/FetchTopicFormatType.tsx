import { getPlaceholder } from '@/components/Loader/PlaceHolders';
import { fetchPostsFromTopics, fetchPostslistFromArchivePage } from '@/helpers/fetchLocalData';
import ac_strings from '@/strings/ac_strings.js';
import { ITopic, ITopicPostItems, IPostItem } from '@/types';
import * as React from 'react';

interface IFetchTopicsWithPosts {
	topics: ITopic[];
	layout: 'row' | 'list';
	render: (data: { topicPostItems: ITopicPostItems[] }) => JSX.Element;
}

export const FetchTopicPostItems: React.FC<IFetchTopicsWithPosts> = ({ topics, render, layout }) => {
	const [topicPostItems, setTopicPostItems] = React.useState<ITopicPostItems[]>([]);
	const [loading, setLoading] = React.useState(true);
	const CustomPlaceholder = getPlaceholder[layout];

	React.useEffect(() => {
		setLoading(true);

		fetchPostsFromTopics(topics)
			.then(res => {
				if (res) {
					setLoading(false);
					setTopicPostItems(res);
				} else {
					throw Error('No posts found');
				}
			})
			.catch(error => {
				setLoading(false);
				console.log(error);
			});
	}, [topics]);

	return <CustomPlaceholder loading={loading}>{render({ topicPostItems })}</CustomPlaceholder>;
};

export const FetchAuthorPosts: React.FC<{
	slug: string;
	render: (data: { posts: IPostItem[]; loading: boolean }) => JSX.Element;
}> = ({ slug, render }) => {
	const [posts, setPosts] = React.useState<IPostItem[]>([]);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		setLoading(true);
		const isSubscribed = true;
		fetchPostslistFromArchivePage(`${ac_strings.slug_ac_author}/${slug}`).then(res => {
			if (isSubscribed) {
				setLoading(false);
				if (res) {
					setPosts(res);
				}
			}
		});
	}, []);

	return <div>{render({ posts, loading })}</div>;
};
