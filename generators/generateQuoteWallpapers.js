const _ = require('lodash');
const path = require('path');
const template = 'src/templates/single-resource/quote-wallpaper.tsx';
const overviewTemplate = 'src/templates/page/wallpapers.tsx';
const ac_strings = require('../src/strings/ac_strings.js');
const sortQuotes = require('./wallpaper-sort');
const getQuoteQuery = `
  {
    ac {
        quotes {
            author {
              name
              slug
              id
            }
            id
            content
            source
            images {
                size {
                  width
                  height
                }
                src
                srcset
                dataUri
                colors
            }
            topics {
                name
                slug
                id
            }
      }
 
    }
  }
`;

const bibleAuthorId = '108501';
/* BUILDER */
const perPage = 12;
const createArhcivePages = ({ quotes, baseUrl, createPage, baseTitle, breadcrumb, context }) => {
	if (quotes.length > 16) {
		const totalPages = Math.ceil(quotes.length / perPage);
		for (let i = 1; i <= totalPages; i++) {
			let pagePath = i === 1 ? baseUrl : `${baseUrl}/${i}`;
			let pageTitle = i === 1 ? baseTitle : `${baseTitle} ${i}`;
			const perPageQuotes = quotes.slice((i - 1) * perPage, i * perPage);
			createPage({
				path: pagePath,
				component: path.resolve(overviewTemplate),
				context: {
					pagePath,
					...context,
					title: pageTitle,
					metaTitle: `${pageTitle} - ${ac_strings.wallpaper_title}`,
					tag: pageTitle,
					breadcrumb,
					quotes: perPageQuotes,
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
				quotes
			}
		});
	}
};

module.exports = function generateTaxonomies(actions, graphql) {
	const { createPage } = actions;

	return graphql(getQuoteQuery)
		.then(result => {
			console.log('Generating backgrounds and quotes');
			if (result.errors) {
				result.errors.forEach(e => console.error(e.toString()));
				return Promise.reject(result.errors);
			}

			if (result.data.ac && result.data.ac.quotes) {
				const allQuotes = result.data.ac.quotes
					.filter(q => q.images && q.images[0])
					.map(q => {
						const image = q.images && q.images[0];
						const color = image.colors && image.colors[0];
						const size = image.size.height / image.size.width === 1 ? 'square' : 'landscape';
						return {
							...q,
							color,
							size,
							image: q.images[0]
						};
					});

				const sortedAllQuotes = sortQuotes(allQuotes);
				const { byFeaturedAuthors, byTopics, byBrightness, byHue, sortedRgbAllQuotes } = sortedAllQuotes;
				const wallpapersPage = {
					title: ac_strings.wallpaper_title,
					slug: ac_strings.wallpaper_slug
				};

				const navParentItem = { name: wallpapersPage.title, to: wallpapersPage.slug };

				const allColors = [...byHue, ...byBrightness];

				const totalPages = Math.ceil(sortedRgbAllQuotes.length / perPage);

				const filterContext = {
					pageType: 'wallpaper-archive',
					byColors: allColors.map(item => ({ name: item.name, slug: item.name, color: item.color })),
					byBrightness: byBrightness.map(item => ({ name: item.name, slug: item.name, color: item.color })),
					byFeaturedAuthors: byFeaturedAuthors.map(item => ({
						name: item.name,
						slug: item.slug,
						nrOfQuotes: item.nrOfQuotes
					})),
					byTopics: byTopics.map(item => ({ name: item.name, slug: item.slug, nrOfQuotes: item.nrOfQuotes }))
				};
				const baseUrl = `${wallpapersPage.slug}/${ac_strings.slug_latest}`;
				for (let i = 1; i <= totalPages; i++) {
					let pagePath = i === 1 ? wallpapersPage.slug : `${baseUrl}/${i}`;
					const quotes = sortedRgbAllQuotes.slice((i - 1) * perPage, i * perPage);
					console.log(pagePath);
					createPage({
						path: pagePath,
						component: path.resolve(overviewTemplate),
						context: {
							quotes,
							pagePath,
							isHomePage: true,
							paginate: {
								totalPages,
								currentPage: i,
								baseUrl
							},
							breadcrumb: [{ name: wallpapersPage.title, to: wallpapersPage.slug }],
							...filterContext,
							...wallpapersPage
						}
					});
				}

				allColors.forEach(color => {
					const pagePath = `${wallpapersPage.slug}/${color.name}`;
					const { quotes, ...rest } = color;
					const title = `${color.name}`;
					const breadcrumb = [navParentItem, { name: color.name, to: pagePath }];
					createArhcivePages({
						baseTitle: title,
						context: { ...rest, tag: wallpapersPage.title },
						baseUrl: pagePath,
						breadcrumb,
						createPage,
						quotes
					});
				});

				byTopics.forEach(topic => {
					const pagePath = `${wallpapersPage.slug}/${topic.slug}`;
					const { quotes, ...rest } = topic;

					createArhcivePages({
						baseTitle: `${topic.name}`,
						context: { ...rest, tag: wallpapersPage.title },
						baseUrl: pagePath,
						breadcrumb: [navParentItem, { name: topic.name, to: pagePath }],
						createPage,
						quotes
					});
				});

				byFeaturedAuthors.forEach(author => {
					const pagePath = `${wallpapersPage.slug}/${author.slug}`;
					const { quotes, ...rest } = author;
					const isBibleQuote = `${author.id}` === bibleAuthorId;
					createArhcivePages({
						baseTitle: isBibleQuote
							? ac_strings.wallpaper_bible_verse
							: `${author.name} ${ac_strings.wallpaper_quote_wallpapers}`,
						context: { ...rest, tag: wallpapersPage.title },
						baseUrl: pagePath,
						breadcrumb: [navParentItem, { name: author.name, to: pagePath }],
						createPage,
						quotes
					});
				});
				allQuotes.forEach((quote, i) => {
					const pagePath = `${wallpapersPage.slug}/${quote.id}`;
					const nextIndex = i === allQuotes.length - 1 ? 0 : i + 1;
					const previousIndex = i === 0 ? allQuotes.length - 1 : i - 1;
					const isBibleQuote = quote.author && `${quote.author.id}` === bibleAuthorId;

					createPage({
						path: pagePath,
						component: path.resolve(template),
						context: {
							pagePath,
							pageType: 'wallpaper',
							quote,
							breadcrumb: [navParentItem],
							previousId: allQuotes[previousIndex].id,
							nextId: allQuotes[nextIndex].id,
							isAcArticle:
								typeof quote.source === 'string' && quote.source.toLowerCase() === 'ac articles',
							isBibleQuote,
							...quote
						}
					});
				});
			}
		})
		.catch(err => {
			console.log(getQuoteQuery);
			console.log(err);
		});
};
