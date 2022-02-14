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
import SimpleBgCardList from '@/layout-parts/HomeNew/SimpleBgCardList';
import CardListPosts from '@/layout-parts/HomeNew/CardListPost';
import Image1To1 from '@/components/Images/Image1to1Rounded';
import Gallery from '@/components/CustomizedPageComponent/Gallery';

const loggedInOrder = [
	'hero',
	'featured',
	'109'
	//rest
];

const notLoggedInOrder = ['hero', '108', '109', 'featured'];

const restSectionsOrder = ['110', '113', '118', '111', '112', '114', '115', '116', '117'];

const HomePageNew: React.FC<IHomeProps> = props => {
	const { pageContext, path } = props;
	const dispatch = useDispatch();
	const loggedIn = useSelector(loggedInSelector);
	const handleSignUp = () => {
		dispatch(openSignInModal('signInOptions'));
	};

	const { sectionMap } = pageContext;

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
						Returning user?{' '}
						<span className="font-bold" onClick={handleSignUp}>
							{' '}
							Log in here
						</span>
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
						return <HomeTop {...item} />;
					case '108':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{
									name: 'Learn more',
									to: item.slug
								}}
							>
								<div
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
								cta={{ name: 'All theme pages', to: ac_strings.slug_theme }}
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
								cta={{ name: 'All testimonies', to: item.slug }}
							/>
						);
					case '111':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{ name: 'All songs', to: ac_strings.slug_playlist }}
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
								cta={{ name: 'All audio articles', to: ac_strings.slug_playlist }}
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
						return (
							<CardListPosts
								key={id}
								title={item.title}
								posts={item.content}
								theme={theme}
								cta={{ name: 'All animated videos', to: 'watch/animation' }}
							/>
						);
					case '118':
						return (
							<CardListPosts
								key={id}
								title={item.title}
								posts={item.content}
								theme={theme}
								cta={{ name: 'All music videos', to: 'watch/songs' }}
							/>
						);
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
							<CardListPosts
								cta={{ name: 'All messages', to: 'watch/messages' }}
								bgImg={item.image}
								title={item.title}
								posts={item.content}
								theme={theme}
							/>
						);
					case '116':
						return (
							<SectionWrapperSmall
								title={item.title}
								theme={theme}
								cta={{ name: 'All wallpapers', to: ac_strings.wallpaper_slug }}
							>
								<Gallery data={item.content} />
							</SectionWrapperSmall>
						);
				}
			})}
			<div className="w-full flex justify-center py-8 border-b">
				<Link
					className="m-auto inline-block bg-ac-secondary px-8 py-3 text-lg font-bold rounded-lg text-white"
					to={ac_strings.slug_explore}
				>
					Explore
				</Link>
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
