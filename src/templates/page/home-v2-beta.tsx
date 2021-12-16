import * as React from 'react';
import { graphql } from 'gatsby';
import MetaTag from '@/components/Meta';
import { openSignInModal } from '@/state/action';
import { useSelector, useDispatch } from 'react-redux';
import { loggedInSelector } from '@/state/selectors/user';
import Link from '@/components/CustomLink';
import ac_strings from '@/strings/ac_strings.js';
import { IPostRes, ITopic, IImage } from '@/types';
import { HomeTop } from '@/layout-parts/HomeNew/HomeBanners';
import SectionWrapperSmall from '@/layout-parts/HomeNew/SectionWrapperSmall';
import shortid from 'shortid';
import { IPageCompTypes } from '@/components/CustomizedPageComponent/BlockWrapper';
import SimpleBgCardList from '@/layout-parts/HomeNew/SimpleBgCardList';
import CardListPosts from '@/layout-parts/HomeNew/CardListPost';
import Image1To1 from '@/components/Images/Image1to1Rounded';
import Gallery from '@/components/CustomizedPageComponent/Gallery';
import InstagramIcon from '@/images/instagram-color.svg';

const HomePageNew: React.FC<IHomeProps> = props => {
	const { pageContext, path } = props;
	const dispatch = useDispatch();
	const loggedIn = useSelector(loggedInSelector);
	const handleSignUp = () => {
		dispatch(openSignInModal('signInOptions'));
	};

	const { loggedInOrder, notLoggedInOrder, restSectionsOrder, sectionMap } = pageContext;

	const allSections =
		loggedIn === 'success' ? [...loggedInOrder, ...restSectionsOrder] : [...notLoggedInOrder, ...restSectionsOrder];
	return (
		<div>
			<MetaTag
				path={path}
				title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
				type="website"
				translatedUrls={[]}
				breadcrumb={[]}
			/>
			{loggedIn === 'notLoggedIn' && (
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
			)}

			{allSections.map((id, n) => {
				const item = sectionMap[id];
				let theme = 'dark';
				if (n % 2 != 0) {
					theme = 'secondary';
				} else if (n % 4 === 0) {
					theme = 'light';
				}
				switch (id) {
					case 'hero':
						console.log(item);
						return <HomeTop {...item} />;
					case '108':
						console.log(item.content.content);
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{
									name: 'Learn more',
									to: item.slug
								}}
							>
								<p
									className="text-sm sm:text-base md:text-lg"
									dangerouslySetInnerHTML={{ __html: item.content.content }}
								/>
							</SectionWrapperSmall>
						);
					case '109':
						return (
							<SimpleBgCardList
								title={item.title}
								theme={theme}
								items={item.content}
								cta={{ name: 'All Bible studies', to: ac_strings.slug_theme }}
							/>
						);
					case 'featured':
						return (
							<CardListPosts
								cta={{ name: 'All posts', to: item.slug }}
								title={item.title}
								posts={item.content}
								theme={theme}
							/>
						);
					case 'latest':
						return (
							<CardListPosts
								cta={{ name: 'All posts', to: ac_strings.slug_latest }}
								title={item.title}
								posts={item.content}
								theme={theme}
							/>
						);
					case '110':
						return (
							<SimpleBgCardList
								title={item.title}
								theme={theme}
								items={item.content.map(item => ({ ...item, slug: `series/${item.slug}` }))}
								/* bgImg={TestimonyBg} */
								cta={{ name: 'All Testimonies', to: item.slug }}
							/>
						);
					case '111':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{ name: 'All playlists', to: ac_strings.playlist }}
							>
								<div className="mx-auto standard-max-w w-full grid grid-cols-2 md:grid-cols-4 gap-3">
									{item.content.map(p => {
										return (
											<Link to={`${ac_strings.slug_playlist}/${p.slug}`} key={shortid()}>
												<Image1To1 className="rounded-lg" {...p.image} />
											</Link>
										);
										// return <BibleStudyItemCard {...item} label="Playlist" />;
									})}
								</div>
							</SectionWrapperSmall>
						);

					case '112':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{ name: 'All playlists', to: ac_strings.playlist }}
							>
								<div className="mx-auto standard-max-w w-full grid grid-cols-2 md:grid-cols-4 gap-3">
									{item.content.map(p => {
										return (
											<Link to={`${ac_strings.slug_playlist}/${p.slug}`} key={shortid()}>
												<Image1To1 className="rounded-lg" {...p.image} />
											</Link>
										);
										// return <BibleStudyItemCard {...item} label="Playlist" />;
									})}
								</div>
							</SectionWrapperSmall>
						);
					case '113':
						return <CardListPosts title={item.title} posts={item.content} theme={theme} />;
					case '114':
						return (
							<SimpleBgCardList
								title={item.title}
								items={item.content.map(item => ({ ...item, slug: `series/${item.slug}` }))}
								theme={theme}
							/>
						);
					case '115':
						return (
							<CardListPosts bgImg={item.image} title={item.title} posts={item.content} theme={theme} />
						);
					case '116':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{ name: 'All wallpapers', to: item.slug }}
							>
								<Gallery data={item.content} />
							</SectionWrapperSmall>
						);
					case '117':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{ name: 'All playlists', to: ac_strings.playlist }}
							>
								<div className="mx-auto standard-max-w w-full grid grid-cols-2 md:grid-cols-4 gap-3">
									{item.content.map(p => {
										return (
											<Link to={`${ac_strings.slug_playlist}/${p.slug}`} key={shortid()}>
												<Image1To1 className="rounded-lg" {...p.image} />
											</Link>
										);
										// return <BibleStudyItemCard {...item} label="Playlist" />;
									})}
								</div>
							</SectionWrapperSmall>
						);
				}
			})}

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
		loggedInOrder: string[];
		notLoggedInOrder: string[];
		restSectionsOrder: string[];
		sectionMap: {
			id: string;
			title: string;
			content: any;
			image: IImage;
		};
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
