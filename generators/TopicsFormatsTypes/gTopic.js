const _ = require('lodash');
const path = require('path');

const topicRecommendTemplate = 'src/templates/recommend/topic-recommend.tsx';
const ac_strings = require('../../src/strings/ac_strings');
module.exports = async function generateTopic(data) {
	const { actions, contextPosts, node: topic, breadcrumb } = data;
	const { createPage } = actions;

	if (topic && topic.noOfPosts) {
		const total = topic.noOfPosts;
		const hasRecommendPage = total > 10;
		const topicFormat = [];

		// create recommend
		const pagePath = `${ac_strings.slug_topic}/${topic.slug}`;
		console.log(`creating topic recommendation' ${pagePath}`);

		if (hasRecommendPage) {
			return createPage({
				path: pagePath,
				component: path.resolve(topicRecommendTemplate),
				context: {
					pagePath,
					pageType: 'topic',
					id: topic.id,
					title: topic.name,
					slug: topic.slug,
					formats: topicFormat,
					image: topic.image,
					breadcrumb,
					...contextPosts,
					posts: contextPosts.latestPosts
				}
			});
		}
	} else {
		console.log('something went wrong');
		console.log(topic);
	}
};
