import Link from '@/components/CustomLink';
import { ToggleBookmarkIconOnly } from '@/components/PostElements/TopicToggleFollow';
import { getRandomArray } from '@/helpers/normalizers';
import { followedTopicsSelector, loggedInSelector } from '@/state/selectors/user';
import ac_strings from '@/strings/ac_strings.js';
import { ITopic } from '@/types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

const TopicItem: React.FC<ITopic> = ({ name, slug, id }) => {
	return (
		<div className="flex bg-white text-ac-slate-dark mt-4 mr-4 text-lg font-bold">
			<Link className="p-2" to={`${ac_strings.slug_topic}/${slug}`}>
				{name}
			</Link>
			<ToggleBookmarkIconOnly id={id} />
		</div>
	);
};

const TopicsForYou: React.FC<{ featured: ITopic[] }> = ({ featured }) => {
	const followedTopics = useSelector(followedTopicsSelector);
	const loggedIn = useSelector(loggedInSelector);

	let list = [...getRandomArray(featured, 6)];
	if (loggedIn === 'success') {
		const filtered = featured.filter(t => {
			const find = followedTopics.find(ft => `${ft.id}` === `${t.id}`);

			return find === undefined;
		});
		list = filtered;
	}

	return (
		<div className="col-start-1 col-end-5 overflow-hidden flex flex-col bg-ac-slate-dark p-10 text-white rounded-lg">
			<div className="sm:w-9/12 ">
				<h6 className="font-semibold sm:text-2xl md:text-3xl mb-6">{ac_strings.topics_for_you}</h6>
				<div className="flex flex-wrap">
					{featured.map(topic => (
						<TopicItem {...topic} key={shortid()} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TopicsForYou;
