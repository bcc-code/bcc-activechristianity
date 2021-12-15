import * as React from 'react';
import { graphql } from 'gatsby';
import MetaTag from '@/components/Meta';
import { openSignInModal } from '@/state/action';
import { useSelector, useDispatch } from 'react-redux';
import { loggedInSelector } from '@/state/selectors/user';
import Link from '@/components/CustomLink';
import { navigate } from 'gatsby';
import ac_strings from '@/strings/ac_strings.js';
import { IPostRes, ITopic } from '@/types';
import { HomeTop } from '@/layout-parts/HomeNew/HomeBanners';
import SectionWrapperSmall from '@/layout-parts/HomeNew/SectionWrapperSmall';
import shortid from 'shortid';
import { IPageCompTypes } from '@/components/CustomizedPageComponent/BlockWrapper';
import SimpleBgCardList from '@/layout-parts/HomeNew/SimpleBgCardList';
import CardListPosts from '@/layout-parts/HomeNew/CardListPost';
import Image1To1 from '@/components/Images/Image1to1Rounded';
import Gallery from '@/components/CustomizedPageComponent/Gallery';
import MessageBg from '@/layout-parts/HomeNew/message-demo-background.jpeg';
import InstagramIcon from '@/images/instagram-color.svg';
const HomePageNew: React.FC<IHomeProps> = props => {
	const { pageContext, path, data } = props;
	const dispatch = useDispatch();
	const handleSignUp = () => {
		dispatch(openSignInModal('signInOptions'));
	};
	const { featuredPosts, formats } = pageContext;
	const { flexibleContent } = data.ac.page;
	const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent);
	const bibleStudies = componentConfig[1].data.map(item => ({
		...item,
		slug: `${item.slug}`
	}));
	const testimonies = componentConfig[7].data.map(item => ({
		...item,
		slug: `/series/${item.slug}`
	}));
	const playlists = componentConfig[3].data.map(item => ({
		...item,
		slug: `${ac_strings.slug_playlist}/${item.slug}`
	}));
	const loggedIn = useSelector(loggedInSelector);
	const animations = componentConfig[4].data;
	const pillars = componentConfig[9].data.map(item => ({
		...item,
		slug: `/series/${item.slug}`
	}));
	const messages = componentConfig[13].data;
	const wallpapers = componentConfig[15];

	if (loggedIn === 'success') {
		navigate('/');
		return <div />;
	} else
		return (
			<div>
				<MetaTag
					path={path}
					title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
					type="website"
					translatedUrls={[]}
					breadcrumb={[]}
				/>
				<div className="text-sm text-blue-500 text-bold bg-blue-100">
					<div className="standard-max-w p-4 ">
						{' '}
						Returning users?{' '}
						<span className="font-bold" onClick={handleSignUp}>
							{' '}
							Login
						</span>{' '}
						or Skip to posts
					</div>
				</div>
				<HomeTop />
				<SectionWrapperSmall
					title="Abouts Us"
					theme="secondary"
					cta={{
						name: 'Learn more',
						to: '/about-us'
					}}
				>
					<p className="text-sm sm:text-base md:text-lg">
						ActiveChristianity.org by Brunstad Christian Church explores how God’s Word challenges and
						empowers us to live 100% according to His will, so we no longer need to fall in sin, but can
						come to a life of victory and transformation.
					</p>
				</SectionWrapperSmall>
				<SimpleBgCardList
					title="Bible Studies"
					theme="dark"
					items={bibleStudies}
					cta={{ name: 'All Bible studies', to: '/theme' }}
				/>
				<CardListPosts
					cta={{ name: 'All posts', to: '/latest' }}
					title={'Featured Posts'}
					posts={featuredPosts}
					theme="primary"
				/>
				<SimpleBgCardList
					title="Testimonies"
					theme="dark"
					items={testimonies}
					/* bgImg={TestimonyBg} */
					cta={{ name: 'All Testimonies', to: '/testimonies' }}
				/>
				<SectionWrapperSmall title="Playlists" theme="grey" cta={{ name: 'All playlists', to: '/playlist' }}>
					<div className="mx-auto standard-max-w w-full grid grid-cols-2 md:grid-cols-4 gap-3">
						{playlists.map(item => {
							return (
								<Link to={item.slug} key={shortid()}>
									<Image1To1 className="rounded-lg" {...item.image} />
								</Link>
							);
							// return <BibleStudyItemCard {...item} label="Playlist" />;
						})}
					</div>
				</SectionWrapperSmall>
				<CardListPosts title={'Bible Words Examplained (Animation)'} posts={animations} theme="light" />
				<SimpleBgCardList title="From the pillars" items={pillars} />
				<CardListPosts bgImg={MessageBg} title={'Messages'} posts={messages} theme="light" />
				<SectionWrapperSmall title="Wallpapers" theme="dark" cta={{ name: 'All wallpapers', to: '/wallpaper' }}>
					<Gallery {...wallpapers} />
				</SectionWrapperSmall>
				<div className="relative z-20 standard-max-w px-4 flex justify-center py-18">
					<a className="text-ac-secondary flex px-4 " href={'https://www.instagram.com/activechristianity/'}>
						<img className="w-12 h-12" src={InstagramIcon} />
						<div className="px-4">
							<p className="font-extrabold text-center text-4-7xl">Follow Us on Instagram</p>
							<span className="">@activechristianity</span>
						</div>
					</a>
				</div>
			</div>
		);
};

export default HomePageNew;

interface IHomeProps {
	path: string;
	pageContext: {
		featuredPosts: IPostRes[];
		formats: ITopic[];
	};
	data: any;
}

export const pageQuery = graphql`
	query homeV2 {
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
