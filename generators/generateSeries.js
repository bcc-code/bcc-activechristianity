const _ = require('lodash');
const path = require('path');
const ac_strings = require('../src/strings/ac_strings.js');
const template = 'src/templates/single-resource/serie.tsx';
const query = `
    {
    ac {
      series {
        title
        slug
        image {
          src
          dataUri
          srcset
        }
        posts {
          title
          excerpt
          slug
        }
      }
    }
  }
`;

module.exports = function generateSeries(actions, graphql) {
	const { createPage } = actions;

	return graphql(query)
		.then(result => {
			if (result.errors) {
				result.errors.forEach(e => console.error(e.toString()));
				return Promise.reject(result.errors);
			}

			const series = result.data.ac.series;

			const seriesPage = {
				name: ac_strings.series,
				to: ac_strings.slug_series
			};
			_.each(series, node => {
				const basePath = `/${ac_strings.slug_series}/${node.slug}`;
				console.log(basePath);
				createPage({
					path: basePath,
					component: path.resolve(template),
					context: {
						pagePath: basePath,
						breadcrumb: [
							seriesPage,
							{
								name: node.title,
								to: basePath
							}
						],
						...node
					}
				});
			});
		})
		.catch(err => {
			console.log(query);
			console.log(err);
		});
};
