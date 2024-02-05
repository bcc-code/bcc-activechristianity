const _ = require('lodash');
const path = require('path');
const ac_strings = require('../src/strings/ac_strings.js');
/* SETUP */

const query = `{
  ac {
    allPages {
      id
      title
      slug
      label
      flexibleContent
      parent {
        id
        title
        slug
      }
	  image {
			src
			srcset
			dataUri
			colors
		}
    }
  }
}`;

/* BUILDER */

module.exports = function generatePages(actions, graphql) {
	const { createPage } = actions;

	return graphql(query)
		.then(result => {
			console.log('Generating pages');
			if (result.errors) {
				result.errors.forEach(e => console.error(e.toString()));
				return Promise.reject(result.errors);
			} else {
				const pageInfo = result.data.ac.allPages;

				const aboutMain = {
					page: ac_strings.about_us,
					slug: ac_strings.slug_about
				};

				const parentIds = {
					about: {
						id: '13',
						templateName: 'about-us',
						children: []
					},
					themes: {
						id: '75',
						templateName: 'theme-page',
						children: []
					},
					pages: {
						id: '1',
						templateName: `page`,
						children: []
					}
				};
				const buildPages = [
					{
						title: ac_strings.glossary,
						slug: ac_strings.slug_glossary,
						templateName: 'glossaries'
					},
					/*  */
					{
						title: ac_strings.contact,
						slug: ac_strings.slug_contact,
						templateName: 'contact'
					}
				];
				if (process.env.LISTEN_SECTION === 'all') {
					buildPages.push({
						title: ac_strings.playlist,
						slug: ac_strings.slug_playlist,
						templateName: 'playlists'
					});
				}

				if (process.env.SERIES_SECTON === 'true') {
					buildPages.push({
						title: ac_strings.series,
						slug: ac_strings.slug_series,
						templateName: 'series'
					});
				}

				_.each(buildPages, page => {
					const pagePath = page.slug;
					createPage({
						path: pagePath,
						component: path.resolve(`./src/templates/page/${page.templateName}.tsx`),
						context: {
							pagePath,
							title: page.title,
							slug: page.slug
						}
					});
				});

				_.each(pageInfo, page => {
					if (page.parent) {
						if (`${page.parent.id}` == `${parentIds.about.id}`) {
							parentIds.about.children.push(page);
						} else if (`${page.parent.id}` == `${parentIds.themes.id}`) {
							parentIds.themes.children.push(page);
						} else if (`${page.parent.id}` == `${parentIds.pages.id}`) {
							parentIds.pages.children.push(page);
						}
					}
				});

				// pages
				_.each(parentIds.pages.children, page => {
					const pagePath = `${page.slug}`;
					let context = {
						pagePath,
						...page,
						breadcrumb: [
							{
								name: page.title,
								to: page.slug
							}
						]
					};

					createPage({
						path: pagePath,
						component: path.resolve(`./src/templates/page/${parentIds.pages.templateName}.tsx`),
						context
					});
				});

				const themePage = {
					name: ac_strings.theme_pages,
					to: ac_strings.slug_theme
				};

				// theme pages
				_.each(parentIds.themes.children, page => {
					const pagePath = `${themePage.to}/${page.slug}`;

					let context = {
						pagePath,
						...page,
						breadcrumb: [
							themePage,
							{
								name: page.title,
								to: page.slug
							}
						]
					};

					createPage({
						path: pagePath,
						component: path.resolve(`./src/templates/page/${parentIds.themes.templateName}.tsx`),
						context
					});
				});

				const perPage = 12;

				// about us
				console.log('building about');
				const pagePath = `${aboutMain.slug}`;
				createPage({
					path: pagePath,
					component: path.resolve(`src/templates/page/about-us.tsx`),
					context: {
						pagePath,
						title: aboutMain.title,
						childPages: parentIds.about.children,
						breadcrumb: []
					}
				});

				const overviewTemplate = './src/templates/page/theme-overview.tsx';

				const createThemeArhcivePages = ({ themes, baseUrl, createPage, baseTitle, breadcrumb, context }) => {
					if (themes.length > 16) {
						const totalPages = Math.ceil(themes.length / perPage);
						for (let i = 1; i <= totalPages; i++) {
							let pagePath = i === 1 ? baseUrl : `${baseUrl}/${i}`;
							let pageTitle = i === 1 ? baseTitle : `${baseTitle} ${i}`;
							const perPageQuotes = themes.slice((i - 1) * perPage, i * perPage);
							createPage({
								path: pagePath,
								component: path.resolve(overviewTemplate),
								context: {
									pagePath,
									...context,
									title: pageTitle,
									metaTitle: pageTitle,
									tag: pageTitle,
									breadcrumb,
									themes: perPageQuotes,
									paginate: {
										totalPages,
										currentPage: i,
										baseUrl
									}
								}
							});
						}
					} else {
						createPage({
							path: baseUrl,
							component: path.resolve(overviewTemplate),
							context: {
								pagePath: baseUrl,
								...context,
								title: baseTitle,
								breadcrumb,
								themes
							}
						});
					}
				};
				createThemeArhcivePages({
					themes: parentIds.themes.children,
					baseUrl: themePage.to,
					createPage,
					baseTitle: themePage.name,
					breadcrumb: [themePage],
					context: {}
				});
			}
		})
		.catch(err => {
			console.warn(query);
			console.error(err);
		});
};
