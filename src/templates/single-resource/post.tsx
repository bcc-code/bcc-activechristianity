import MetaTag from '@/components/Meta';
import { IMediaTypes } from '@/layouts/PostLayoutUpdate';
import PostLayout from '@/layouts/PostLayoutUpdate';
import { INavItem, IPostRes, IPostItem, ITopicPostSlugs } from '@/types';
import { graphql } from 'gatsby';
import React from 'react';

const Post: React.FC<IPostProp> = props => {
	const { pageContext, data } = props;
	const postRes = data.acNodePost;

	const {
		normalized: post,
		tranlsatedUrl,
		mediaTypes,
		authorsPosts,
		topicPosts,
		formatPosts,
		allInterestedPosts,
		breadcrumb
	} = pageContext;
	const { title, excerpt, date, topics, types, image } = post;
	const { content, contentAdBannerSlot, meta, seo, updated_at } = postRes;

	const seoTitle = seo && seo.title ? seo.title : title;
	return (
		<div>
			<MetaTag
				title={seoTitle}
				type="article"
				meta={{
					description: seo && seo.desc ? seo.desc : excerpt,
					date,
					topics,
					types,
					imageUrl: image.src
				}}
				translatedUrls={tranlsatedUrl}
				breadcrumb={breadcrumb}
				path={props.path}
			/>
			<PostLayout
				{...post}
				contentAdBannerSlot={contentAdBannerSlot}
				updated_at={updated_at}
				seoTitle={seoTitle}
				tranlsatedUrl={tranlsatedUrl}
				content={content}
				authorsPosts={authorsPosts}
				topicPosts={topicPosts}
				allInterestedPosts={allInterestedPosts}
				mediaTypes={mediaTypes}
				credits={meta ? meta.credits : undefined}
				formatPosts={formatPosts}
			/>
		</div>
	);
};

export default Post;

interface IPostProp {
	path: string;
	data: {
		acNodePost: IPostRes;
	};
	pageContext: {
		breadcrumb: INavItem[];
		normalized: IPostItem;
		allInterestedPosts: string[];
		topicPosts: ITopicPostSlugs[];
		authorsPosts: ITopicPostSlugs[];
		formatPosts: ITopicPostSlugs[];
		tranlsatedUrl: INavItem[];
		mediaTypes: IMediaTypes;
		//ITopicPostItems
	};
}

export const pageQuery = graphql`
	fragment PostMain on ac_node_post {
		id: acId
		title
		slug

		excerpt
		image {
			src
			srcset
			dataUri
			colors
		}
		readtime
		track {
			url
			title
			duration
			post {
				title
				slug
			}
			playlists {
				slug
				title
			}
		}

		authors {
			name
			slug
			id
			pivot {
				as
			}
		}
		topics {
			name
			slug
			id
			group {
				id
				name
				slug
			}
		}
		published
		likes
		views
		seo {
			desc
			title
		}
		meta {
			credits
			url
		}
	}

	query PostById($id: String!) {
		acNodePost(id: { eq: $id }) {
			content
			contentAdBannerSlot
			glossary {
				slug
				id
				content
				word
			}
			updated_at
			seo {
				desc
				title
			}
			meta {
				credits
				url
			}
		}
	}
`;
