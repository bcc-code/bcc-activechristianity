import Link from '@/components/CustomLink';
import Image1To1 from '@/components/Images/Image1to1Rounded';
import Image2To1 from '@/components/Images/Image2To1';
import MetaTag from '@/components/Meta';
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem';
import { SimpleSolidCardNew } from './theme-overview';
import { normalizePostRes, getRandomArray } from '@/helpers/normalizers';
import shortid from 'shortid';
import { HScrollBaseLarge } from '@/components/HorizontalScroll';

// Helpers
import { HomeTop } from '@/layout-parts/HomeNew/HomeBanners';
import SectionWrapperSmall from '@/layout-parts/HomeNew/SectionWrapperSmall';
import CardListPosts from '@/layout-parts/HomeNew/CardListPost';
import SimpleBgCardList from '@/layout-parts/HomeNew/SimpleBgCardList';
import ac_strings from '@/strings/ac_strings.js';

// Type
import { IPostRes, IImage } from '@/types';
import { graphql } from 'gatsby';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
const mod = (index: number, max: number) => ((index % max) + max) % max;
const IndexPage: React.FC<IHomeProps> = props => {
	const { pageContext, path, data } = props;
	const { featuredPosts } = pageContext;
	const { flexibleContent, image: heroImage } = data.ac.page;

	const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent);
	const bibleStudies = componentConfig[1].data;
	const playlists = componentConfig[3].data;
	const animations = componentConfig[4].data;

	const mixedBibleStudies = getRandomArray(bibleStudies, bibleStudies.length);
	const topBibleStudy = mixedBibleStudies[0];
	console.log(componentConfig);
	const testimonies = componentConfig[7].data;
	const pillars = componentConfig[9].data;
	const messages = componentConfig[13].data;
	const aboutUs = componentConfig[14].data;
	const [activeWallpaperIndex, setActiveWallpaperIndex] = React.useState(0);
	const handleIndexChange = (direction: number) => {
		console.log(direction);
		console.log(direction === 1 ? 0 : 1);
		setActiveWallpaperIndex(direction === 1 ? 0 : 1);
	};
	console.log(activeWallpaperIndex);
	return (
		<div>
			<MetaTag
				path={path}
				title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
				type="website"
				translatedUrls={[]}
				breadcrumb={[]}
			/>
			<div className="text-blue-500 text-bold bg-blue-100">
				<div className="standard-max-w p-4 "> Returning users? Login or Skip to Posts</div>
			</div>
			<HomeTop
				key={shortid()}
				label="ActiveChristianity.org"
				image={heroImage}
				bgImg={heroImage.src}
				title={"Helping you LIVE God's Word"}
				body="Edification for seeking disciples"
				cta={{
					text: 'Explore',
					path: topBibleStudy.slug
				}}
			>
				<p className="text-sm sm:text-lg md:text-2xl pb-12">
					Life-changing resource for those who are seeking for something more{' '}
				</p>
				<ul className="text-sm sm:text-base md:text-lg grid grid-cols-2">
					<li>23 Bible Studies</li>
					<li>1,255 Posts</li>
					<li>214 Real-life Testimonies</li>
					<li>33 Playlists </li>
					<li>110 Videos</li>
					<li>350 Wallpapers</li>
				</ul>
			</HomeTop>
			<SectionWrapperSmall title="Abouts Us" theme="secondary">
				<p className="text-sm sm:text-base md:text-lg pb-12">
					ActiveChristianity.org by Brunstad Christian Church explores how God’s Word challenges and empowers
					us to live 100% according to His will, so we no longer need to fall in sin, but can come to a life
					of victory and transformation.
				</p>
			</SectionWrapperSmall>

			<SimpleBgCardList title="Bible Studies" theme="dark" items={mixedBibleStudies.slice(0, 4)} />
			<CardListPosts title={'Featured Posts'} posts={featuredPosts.map(item => normalizePostRes(item))} />
			<SimpleBgCardList title="Testimonies" theme="light" items={testimonies} />
			<SectionWrapperSmall title="Playlists" theme="light">
				<div className="mx-auto standard-max-w w-full grid grid-cols-2 md:grid-cols-4 gap-3">
					{playlists.map(item => {
						return <Image1To1 key={shortid()} className="rounded-lg" {...item.image} />;
						// return <BibleStudyItemCard {...item} label="Playlist" />;
					})}
				</div>
			</SectionWrapperSmall>

			<CardListPosts title={'Bible Words Examplained (Animation)'} posts={animations} />
			<SimpleBgCardList title="Testimonies" theme="light" items={testimonies} />
			<CardListPosts title={'Messages'} posts={messages} />
			<SimpleBgCardList title="From the pillars" items={pillars} />
		</div>
	);
};

export default IndexPage;

interface IHomeProps {
	path: string;
	pageContext: {
		featuredPosts: IPostRes[];
        formats: ITopic[];
	};
	data: any;
}

export const pageQuery = graphql`
	query homeNew {
		ac {
			page(id: "106") {
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
