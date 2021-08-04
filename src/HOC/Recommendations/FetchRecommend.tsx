import { FetchOnePost } from '@/HOC/FetchPosts';
import { OutlineButton } from '@/components/Button';
import RightImg from '@/components/PostItemCards/RightImg';
import { getRandomArray, filterTopics } from '@/helpers/normalizers';
import ac_strings from '@/strings/ac_strings.js';
import { ITopic } from '@/types';
import * as React from 'react';

const acApiModule = import('@/util/api');

interface IFetchPost {
	topics?: ITopic[];
}

const RecommendedForYou: React.FC<IFetchPost> = ({ topics }) => {
	const [posts, setPosts] = React.useState<string[]>([]);
	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const postsPerPage = 12;
	const [isFetchingMore, setIsFetchingMore] = React.useState(true);
	React.useEffect(() => {
		acApiModule.then(res => {
			const api = res.default;
			api.recommended().then(res => {
				const recommendSlugs = res.recommended;
				const allTopics = filterTopics({ topics: [res.popularTopics, res.featuredTopics], returnSlugs: true });
				const randomTopics = getRandomArray(allTopics, 6);
				setIsFetchingMore(true);
				Promise.all(
					randomTopics.map(t => {
						const url = `/${ac_strings.slug_topic}/${t}/1`;
						return fetch(`/page-data/${url}/page-data.json`)
							.then(res => res.json())
							.then(res => {
								if (res.result && res.result && res.result.pageContext.posts) {
									const posts: string[] = res.result.pageContext.posts.filter(
										p => typeof p === 'string'
									);
									return getRandomArray(posts, 4);
								}
								return undefined;
							})
							.catch(error => {
								console.log(error);
							});
					})
				).then(async postArrays => {
					const allPostSlugs: string[] = recommendSlugs
						? recommendSlugs.map(p => p.slug).filter(p => typeof p === 'string')
						: [];
					postArrays.forEach(array => {
						if (array) {
							allPostSlugs.push(...array);
						}
					});
					const randomPostSlugs = getRandomArray(allPostSlugs, allPostSlugs.length);
					setIsFetchingMore(false);
					setPosts(randomPostSlugs);
				});
			});
		});
	}, []);

	const lastPage = Math.ceil(posts.length / postsPerPage);
	const handlePageChange = () => {
		let scrollTop = 0;
		if (typeof window !== 'undefined') {
			scrollTop = window.pageYOffset;
		}

		if (pageNumber < lastPage) {
			setPageNumber(pageNumber + 1);
			setTimeout(() => {
				window.scrollTo({
					top: scrollTop
				});
			}, 200);
		}
	};

	const end = pageNumber * postsPerPage;
	return (
		<div className="px-4">
			{posts.slice(0, end).map(p => {
				return p ? (
					<FetchOnePost
						slug={p}
						render={({ post }) => {
							if (post) {
								return <RightImg {...post} />;
							} else {
								return <></>;
							}
						}}
					/>
				) : (
					<div></div>
				);
				/* return */
				// return
			})}
			<div className="flex justify-center py-4">
				<OutlineButton
					name={isFetchingMore ? ac_strings.loading : ac_strings.show_more}
					onClick={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default RecommendedForYou;
