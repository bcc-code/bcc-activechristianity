const path = require('path');
const { postQuery, topicQuery } = require('gatsby-source-ac/helpers');
//const {topicQuery} = require('gatsby-source-ac/helpers')

const { normalizePostRes } = require('../src/helpers/normalizers');
const { groupAll } = require('../src/strings/static/topic-ids');
const { categorySorted } = require('./helper');

const query = `{
    allAcNodeSetting {
        nodes {
            popular_posts {
                ${postQuery}
            }
            featured_posts {
                ${postQuery}
            }
        }
    }

	ac {


        featuredTopics:topics(featured:true) {
        	${topicQuery}
        }
        formats:topics(group_id:${groupAll.format}){
            ${topicQuery}
        }
    }

}`;

// featuredTopics

// featuredTheme
// search
// featured posts
// playlists
// videos
//Wallpapers
// Bibleverse series
// Banner what we believe
// categories
//Banners - Sunday school, Bible X, Bookshop
module.exports = function generatePages(actions, graphql) {
	const { createPage } = actions;
	return graphql(query).then(async result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		} else {
			const { allAcNodeSetting, ac } = result.data;
			const featuredPosts = allAcNodeSetting.nodes[0].featured_posts
				.filter(item => item.slug !== 'dummy-content')
				.map(item => normalizePostRes(item));

			const categoryOrder = categorySorted();
			let formats = [];
			categoryOrder.forEach(element => {
				const find = ac.formats.find(item => `${item.id}` === `${element.id}`);
				if (find) {
					formats.push(find);
				} else {
					formats.push(element);
				}
			});

			formats = formats.filter(item => item && item.image);
			createPage({
				path: `/v2`,
				component: path.resolve('./src/templates/page/home-v2-beta.tsx'),
				context: {
					featuredPosts,
					formats,
					featuredTopics: ac.featuredTopics
				}
			});
		}
	});
};
