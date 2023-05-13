const path = require('path');
const { topicQuery } = require('gatsby-source-ac/helpers');
const exploreTemplate = 'src/templates/page/explore.tsx';
const ac_strings = require('../src/strings/ac_strings.js');
const { groupAll, formatsIds, typeIds } = require('../src/strings/static/topic-ids.js');

/* SETUP */
//108206

const query = `{
  ac {
    popularTopicsSlugs:popularTopics {
        slug
        id
    }
    featuredTopics:topics(featured:true) {
        ${topicQuery}
    }
    formatTopics:topics(group_id:${groupAll.format}){
        ${topicQuery}
    }
    typeTopics:topics(group_id:${groupAll.type}){
        ${topicQuery}
    }
    edification:topic(id:108206){
        name
        slug
        posts(isFeatured:true){
          slug
        }
     }
    questions:topic(id:1503){
        name
        slug
        posts(isFeatured:true){
          slug
        }
     }
      
    songs:topic(id:108204){
        name
        slug
        posts(isFeatured:true){
          slug
        }
      }
      
    featuredVideos:topic(id:108198){
        name
        slug
        posts(isFeatured:true){
          slug
        }
      }
  }
}`;

module.exports = function generateTopics(actions, graphql) {
	const { createPage } = actions;

	return graphql(query)
		.then(async result => {
			if (result.errors) {
				result.errors.forEach(e => console.error(e.toString()));
				return Promise.reject(result.errors);
			} else {
				const acData = result.data.ac;
				const {
					popularTopicsSlugs,
					featuredTopics,
					formatTopics,
					typeTopics,
					questions,
					songs,
					featuredVideos,
					edification
				} = acData;
				const explorePage = {
					title: ac_strings.explore,
					slug: ac_strings.slug_explore
				};

				const popularTopicsRes = await graphql(`{
                    ac {
                        popularTopics: topics(ids:[${(popularTopicsSlugs ?? []).map(t => t.id).join(',')}]) {
                            ${topicQuery}
                        } 
                    }
                }`);

				const formats = [];
				const recommendFormats = [];
				const sortTopicsMap = {
					types: {},
					formats: {}
				};

				formatTopics.forEach(f => {
					if (formatsIds[f.id]) {
						formats.push(f);
						if (['animation', 'testimony', 'interview'].includes(formatsIds[f.id].keyname)) {
							recommendFormats.push(f);
						}
						sortTopicsMap.formats[f.name] = true;
					}
				});

				typeTopics.forEach(t => {
					if (typeIds[t.id]) {
						sortTopicsMap.types[t.name] = true;
					}
				});
				const topicsPosts = topic => {
					return {
						id: topic.id,
						name: topic.name,
						slug: topic.slug,
						posts: topic.posts ? topic.posts.map(p => p.slug) : []
					};
				};
				const { popularTopics } = popularTopicsRes.data.ac;
				const pagePath = explorePage.slug;
				const contextExplore = {
					pagePath,
					title: explorePage.title,
					slug: explorePage.slug,
					popularTopics,
					featuredTopics,
					recommendFormats: recommendFormats,
					allFormats: formats,
					sortTopicsMap
				};

				if (process.env.LANG_CODE === 'en') {
					contextExplore['questions'] = topicsPosts(questions);
					contextExplore['songs'] = topicsPosts(songs);
					contextExplore['featuredVideos'] = topicsPosts(featuredVideos);
					contextExplore['edification'] = topicsPosts(edification);
				}

				createPage({
					path: pagePath,
					component: path.resolve(exploreTemplate),
					context: contextExplore
				});
			}
		})
		.catch(error => [console.log(error)]);
};
