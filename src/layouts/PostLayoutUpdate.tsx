/* const AudioPlayer */
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts';
import PostContent from '@/components/Content/PostContent';
import { PostH1 } from '@/components/Headers';
import TwoToOneImg from '@/components/Images/Image2To1';
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage';
import Row3ColAndXScroll from '@/components/List/Combo/Row3Col-HorizontalScroll';
import AudioMediaPlayer from '@/components/MediaPlayerNew/AudioBanner';
import { ReadingTimingAuthor } from '@/components/PostElements';
import { ToggleFollowWithName } from '@/components/PostElements/TopicToggleFollow';
import { debounce } from '@/helpers/index-js';
import {
	AuthorBookmarkShareSection,
	Translations,
	ShareBookmarkTopShortCuts
} from '@/layout-parts/PostLayout/PostSections';
import { currentMediaSelector } from '@/state/selectors/other';
import { loggedInSelector } from '@/state/selectors/user';
// mock data
import ac_strings from '@/strings/ac_strings.js';
// requires a loader
import { IPostItem, ITopicPostSlugs, INavItem } from '@/types';
import loadable from '@loadable/component';
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import shortid from 'shortid';
import Link from '@/components/CustomLink';

const VideoMediaPlayer = loadable(() => import('@/components/MediaPlayerNew/VideoPlayer'));
const RecommendedPosts = loadable(() => import('@/layout-parts/PostLayout/RecommendedPostsSectionUpdate'));
const DesktopRightBar = loadable(() => import('@/layout-parts/PostLayout/DesktopRightBar'));

const acApiModule = import('@/util/api');

const addScript = (url: string) => {
	const script = document.createElement('script');
	script.src = url;
	script.async = true;
	document.body.appendChild(script);
};

type IMediaType = 'audio' | 'video';

export interface IMediaTypes {
	types: IMediaType[];
	default: IMediaType | 'none';
}
interface IPostProps extends IPostItem {
	content: string;
	contentAdBannerSlot: string[];
	allInterestedPosts?: string[];
	topicPosts?: ITopicPostSlugs[];
	authorsPosts?: ITopicPostSlugs[];
	formatPosts?: ITopicPostSlugs[];
	tranlsatedUrl: INavItem[];
	credits?: string;
	seoTitle: string;
	mediaTypes: IMediaTypes;
	updated_at: string;
}

export const PostLayout: React.FC<IPostProps> = post => {
	const {
		id,
		acId,
		title,
		slug,
		excerpt,
		authors,
		image,
		topics,
		format,
		content,
		tranlsatedUrl,
		glossary,
		mediaTypes: mediaTypesDefault,
		views,
		likes,
		duration,
		media,
		credits,
		seoTitle,
		allInterestedPosts,
		authorsPosts,
		topicPosts,
		formatPosts,
		contentAdBannerSlot
	} = post;
	const [isWindowLoaded, setIsWindowLoaded] = React.useState(false);
	const [currentMediaType, setCurrentMediaType] = React.useState<IMediaType | 'none'>(mediaTypesDefault.default);
	const [showBottomSlider, setShowBottomSlider] = React.useState(false);
	const isCurrentMedia = useSelector(currentMediaSelector);
	const isLoggedIn = useSelector(loggedInSelector);
	const contentEl = React.useRef<HTMLDivElement>(null);
	const lastScroll = React.useRef(null);
	const triggeredTagger = React.useRef<null | true>(null);

	React.useEffect(() => {
		lastScroll.current = Date.now() + 5000;
		if (isLoggedIn === 'success') {
			if (id) {
				acApiModule.then(res => {
					const acApi = res.default;
					acApi.visitsPost(id).catch((err: any) => {
						console.log(err);
					});
				});
			}
		}
		const handleScroll = (e: any) => {
			if (triggeredTagger.current !== true && window.scrollY > 200) {
				if (typeof window !== 'undefined') {
					if (process.env.LANG_CODE === 'en' && typeof window.refTagger === 'undefined') {
						window.refTagger = {
							settings: {
								bibleVersion: 'NKJV',
								addLogosLink: false,
								appendIconToLibLinks: false,
								caseInsensitive: true,
								convertHyperlinks: false,
								libronixBibleVersion: 'NKJV',
								libronixLinkIcon: 'light',
								linksOpenNewWindow: false,
								tagChapters: true,
								useTooltip: true
							}
						};
						console.log('add refTagger');
						addScript('/scripts/RefTagger.js');
						triggeredTagger.current = true;
					}
				}
			}
			if (lastScroll.current < Date.now()) {
				lastScroll.current = Date.now() + 5000;
				/* if (showBottomSlider !== true) {
					setShowBottomSlider(true)
				} */
				if (isLoggedIn === 'success') {
					if (id) {
						acApiModule.then(res => {
							const api = res.default;
							api.readingPost(id).catch((err: any) => {
								console.log(err);
							});
						});
					}
				}
			}
		};
		const debounceScroll = debounce(handleScroll, 500);
		window.addEventListener('scroll', debounceScroll);
		if (process.env.LANG_CODE === 'en') {
			setTimeout(() => {
				window.refTagger && window.refTagger.tag && window.refTagger.tag();
			}, 100);
		}
		return () => {
			window.removeEventListener('scroll', debounceScroll);
		};
	}, [post.slug]);

	React.useEffect(() => {
		const handleWindowLoaded = () => {
			console.log('The page has fully loaded');
			setTimeout(() => {
				console.log('add components after window load');
				setIsWindowLoaded(true);
			}, 5 * 1000);
		};
		if (document.readyState === 'complete') {
			console.log('the page is loaded previously');
			setIsWindowLoaded(true);
		} else {
			window.addEventListener('load', handleWindowLoaded);
		}

		return () => window.removeEventListener('load', handleWindowLoaded);
	}, []);
	const defaultHeight = {
		audio: 88,
		video: typeof window !== 'undefined' ? (9 / 16) * window.innerWidth : 250,
		none: typeof window !== 'undefined' ? window.innerWidth / 2 - 30 : 135
	};

	const currentHeigt = defaultHeight[currentMediaType] + (mediaTypesDefault.types.length > 1 ? 39 : 0);
	const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

	const adBlockData = {
		title: "Helping you LIVE God's Word",
		content: '<p>Life-changing resource for those who are seeking for something more</p>',
		links: [
			{
				name: '25 Bible Studies',
				to: 'theme'
			},
			{
				name: '1181 Devotional posts',
				to: 'latest'
			},
			{
				name: '232 Testimonies',
				to: 'testimonies'
			},
			{
				name: '33 Playlists',
				to: 'playlist'
			},
			{
				name: '121 Videos',
				to: 'watch'
			},
			{
				name: '363 Wallpapers',
				to: 'wallpaper'
			}
		]
	};
	return (
		<article className="overflow-scroll sm:overflow-visible w-full relative pt-9 sm:pt-0">
			{isWindowLoaded === true && (
				<ShareBookmarkTopShortCuts
					id={id}
					text={excerpt || title}
					shareSlug={slug}
					views={views}
					likes={likes}
					isPlayingAudio={!!isCurrentMedia.audio}
				/>
			)}

			<div className="fixed sm:relative w-full z-50">
				{currentMediaType === 'video' && media.video && media.video.src && (
					<VideoMediaPlayer src={media.video.src} key={shortid()} />
				)}
				{currentMediaType === 'audio' && media.audio && (
					<AudioMediaPlayer
						media={media}
						duration={duration?.listen}
						stopScrollingTitle={!!isCurrentMedia.audio}
						key={shortid()}
					/>
				)}

				{mediaTypesDefault.types.length > 1 && (
					<div className="w-full flex justify-center pb-4  bg-mp-background sm:pt-4">
						{mediaTypesDefault.types.map((item, i) => (
							<button
								key={item}
								className={`border-ac-slate-light text-ac-slate-light px-2 py-1 border-t border-b text-xs sm:text-sm ${i === 0 ? 'rounded-l  border-l' : 'rounded-r  border-r'
									} ${currentMediaType === item ? 'bg-ac-slate-light text-ac-slate-dark' : ''}`}
								onClick={() => setCurrentMediaType(item)}
							>
								{item}
							</button>
						))}
					</div>
				)}
			</div>
			<div className="sm:hidden fixed inset-x top-0 w-full">
				{mediaTypesDefault.types.length > 0 ? (
					<div
						className="fixed bg-mp-background w-full"
						style={{ top: '96px', height: `${currentHeigt + 90}px` }}
					></div>
				) : (
					<div
						className={`fixed transition-transform background-image w-full`}
						style={{ top: '96px', backgroundSize: 'cover', height: '200px' }}
					>
						<LazysizesFeaturedImage
							style={{ objectFit: 'cover' }}
							{...image}
							alt={image.alt ? image.alt : title}
							className={`w-full bg-center bg-cover`}
						/>
					</div>
				)}
			</div>
			<div className="w-full sm:hidden relative" style={{ top: '0px', height: `${currentHeigt}px` }}></div>

			<div className="relative w-full h-full bg-white rounded-t-2xl sm:mt-12 pt-4 px-4 z-50 flex justify-center lg:justify-start standard-max-w ">
				<div className="max-w-full sm:max-w-tablet relative">
					<svg
						className="mx-auto mb-5 sm:hidden"
						width="44"
						height="5"
						viewBox="0 0 44 5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="44" height="5" rx="2.5" fill="#D4D4D4" />
					</svg>
					<PostH1 title={title} />

					<p
						className="text-ac-gray-dark mb-6 sm:mb-0 sm:font-medium sm:text-lg leading-normal"
						dangerouslySetInnerHTML={{ __html: excerpt }}
					/>
					<div className="border-b w-1/6 my-8 border-ac-gray"></div>
					<div className="pb-6 bg-white text-sm">
						<ReadingTimingAuthor duration={duration?.read} authors={authors} />
					</div>

					{currentMediaType === 'audio' && (
						<div className="block relative sm:pt-10 mb-4 sm:mb-8">
							<TwoToOneImg image={image} rounded alt={seoTitle} />
						</div>
					)}
					{currentMediaType === 'none' && (
						<div className="hidden sm:block relative sm:pt-10 mb-4 sm:mb-8">
							<TwoToOneImg image={image} rounded alt={seoTitle} />
						</div>
					)}

					<div>
						<div ref={contentEl}>
							{contentAdBannerSlot[0] && (
								<PostContent
									content={contentAdBannerSlot[0]}
									glossary={glossary}
									slug={slug}
									title={title}
								/>
							)}
							{contentAdBannerSlot.length > 1 && (
								<div className="pb-2 text-sm">Continue reading below ↓</div>
							)}
							<div className="w-full bg-ac-slate-dark min-h-64 rounded-lg py-4">
								<div className="z-20 relative standard-max-w text-white">
									<div className={`px-4 w-auto `}>
										<span className="uppercase text-sm">ActiveChristianity.org</span>
										<h2 className="text-ac-primary text-lg md:text-2xl leading-relaxed font-extrabold py-2">
											{adBlockData.title}
										</h2>
										<p
											className="text-sm pb-4 text-ac-primary"
											dangerouslySetInnerHTML={{ __html: adBlockData.content }}
										/>

										<ul className="text-base grid grid-cols-1 sm:grid-cols-2 py-4">
											{adBlockData.links.map(item => {
												return (
													<li className="pb-2" key={shortid()}>
														<Link to={item.to}>{item.name}</Link>
													</li>
												);
											})}
										</ul>
										<Link
											className="inline-block bg-ac-secondary px-8 py-3 text-lg font-bold rounded-lg"
											to="/"
										>
											Explore
										</Link>
									</div>
								</div>
							</div>
							{contentAdBannerSlot[1] &&
								contentAdBannerSlot.slice(1).map((block, i) => {
									return (
										<PostContent
											key={i}
											content={block}
											glossary={glossary}
											slug={slug}
											title={title}
										/>
									);
								})}
						</div>

						{credits && (
							<div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: credits }}></div>
						)}
						{/*  <div className="text-gray-500 text-sm uppercase py-6">Last modified: {updated_at.split(" ")[0]}</div> */}
						<div className="flex flex-wrap border-ac-gray py-6">
							{topics && topics?.map(item => <ToggleFollowWithName key={item.id} {...item} />)}
						</div>
						{isWindowLoaded === true && (
							<div className="border-b pb-6">
								<AuthorBookmarkShareSection
									id={id}
									text={excerpt || title}
									shareSlug={slug}
									views={views}
									likes={likes}
									authors={authors}
									formats={format}
								/>
							</div>
						)}
						{isWindowLoaded === true && (
							<div>
								{allInterestedPosts && (
									<LazyLoad>
										<RecommendedPosts
											postId={acId ? acId : id}
											topics={topicPosts}
											readMorePosts={allInterestedPosts}
										/>
									</LazyLoad>
								)}

								{authors && authorsPosts && (
									<LazyLoad>
										{authorsPosts.length > 0 &&
											authorsPosts.map(item => {
												return (
													<FetchPostsFromSlugs
														layout="row"
														slugs={item.posts}
														render={({ posts }) => {
															return (
																<Row3ColAndXScroll
																	className="pt-6"
																	title={`${ac_strings.more_from} ${item.name}`}
																	posts={posts}
																/>
															);
														}}
													/>
												);
											})}
									</LazyLoad>
								)}
							</div>
						)}
					</div>
					<Translations translatedUrls={tranlsatedUrl || []} />
					<div className="max-w-tablet main-content py-8 relative bg-white z-50">
						<p className="">
							<em>{ac_strings.scripture_copyright}</em>
						</p>
					</div>
				</div>
				{isWindowLoaded === true && !isMobile && (
					<DesktopRightBar topicPosts={topicPosts} authorsPosts={authorsPosts} formatPosts={formatPosts} />
				)}
			</div>
		</article>
	);
};

export default PostLayout;
