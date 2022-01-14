const path = require('path');
const { postQuery } = require('gatsby-source-ac/helpers');
//const {topicQuery} = require('gatsby-source-ac/helpers')
const ac_strings = require('../src/strings/ac_strings.js');
const { normalizePostRes } = require('../src/helpers/normalizers');

const sectionQuery = `
	{
		ac {
			homepageV2:page(id:"107"){
				title
				slug
				image {
				  src
				  srcset
				  dataUri
				}
				flexibleContent
			  }
			  homepageV2Section: pages(parent_id:"107") {
				id
				title
				slug
				image {
					src
					srcset
					dataUri
				}
				flexibleContent
			  }
		}
	}
`;
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
		latestPosts:posts(page:1,first:12){
            data {
                ${postQuery}
            }
          }
		postCountRes:posts {
			paginatorInfo {
			  total
			}
		  }
		  testimonyCountRes:topic(id:"345"){
			noOfPosts
			slug
		  }
		  playlistCountRes: playlists {
			id
		  }
		  bibleStudyCountRes: pages(parent_id:"75"){
			id
		  }
		  wallpaperCountRes:quotes {
			id
		  }
		
		  videoCountRes:topic(id:"108198"){
			noOfPosts
			slug
		  }
    }

}`;

const heroLinks = [];
module.exports = async function generatePages(actions, graphql) {
	const { createPage } = actions;
	const homeQueryRes = await graphql(query).then(async result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		} else {
			return result;
		}
	});
	const homeSectionQueryRes = await graphql(sectionQuery).then(async result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		} else {
			return result;
		}
	});

	const { allAcNodeSetting, ac } = homeQueryRes.data;
	const { homepageV2Section, homepageV2 } = homeSectionQueryRes.data.ac;
	const latestPosts = ac.latestPosts.data;
	const featuredPosts = allAcNodeSetting.nodes[0].featured_posts
		.filter(item => item.slug !== 'dummy-content')
		.map(item => normalizePostRes(item));

	const { bibleStudyCountRes, postCountRes, testimonyCountRes, playlistCountRes, videoCountRes, wallpaperCountRes } =
		ac;

	const heroContentRes = JSON.parse(homepageV2.flexibleContent);

	const homepageV2SectionsData = homepageV2Section.map(item => {
		const content = JSON.parse(item.flexibleContent);

		return {
			id: item.id,
			image: item.image ? item.image.src : null,
			title: item.title,
			content: content[0].data,
			slug: item.slug
		};
	});

	const sectionMap = {};
	homepageV2SectionsData.forEach(element => {
		sectionMap[element.id] = element;
	});

	sectionMap.featured = {
		id: 'featured',
		title: 'Featured Posts',
		content: featuredPosts,
		slug: '/'
	};

	sectionMap.latest = {
		id: 'latest',
		title: 'Latest',
		content: latestPosts,
		slug: `${ac_strings.slug_latest}`
	};

	sectionMap.hero = {
		title: homepageV2.title,
		content: heroContentRes[0].data.content,
		links: heroLinks
	};

	if (bibleStudyCountRes) {
		heroLinks.push({
			name: `${bibleStudyCountRes.length} Bible Studies`,
			to: `${ac_strings.slug_theme}`
		});
	}

	if (postCountRes) {
		heroLinks.push({
			name: `${postCountRes.paginatorInfo.total} Posts`,
			to: `${ac_strings.slug_explore}`
		});
	}

	if (testimonyCountRes) {
		heroLinks.push({
			name: `${testimonyCountRes.noOfPosts} Testimonies`,
			to: `${testimonyCountRes.slug}`
		});
	}

	if (playlistCountRes) {
		heroLinks.push({
			name: `${playlistCountRes.length} Playlists`,
			to: `${ac_strings.slug_playlist}`
		});
	}

	if (videoCountRes) {
		heroLinks.push({
			name: `${videoCountRes.noOfPosts} Videos`,
			to: `${videoCountRes.slug}`
		});
	}

	if (wallpaperCountRes) {
		heroLinks.push({
			name: `${wallpaperCountRes.length} Wallpapers`,
			to: `${ac_strings.wallpaper_slug}`
		});
	}

	return createPage({
		path: `/v2`,
		component: path.resolve('./src/templates/page/home-v2-beta.tsx'),
		context: {
			sectionMap,
			featuredPosts
		}
	});
};
