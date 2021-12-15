import { FetchPostsFromSlugs } from '@/HOC/FetchPosts';
import Link from '@/components/CustomLink';
import Image1To1 from '@/components/Images/Image1to1Rounded';
import Image2To1 from '@/components/Images/Image2To1';
import MetaTag from '@/components/Meta';
import { AuthorLink } from '@/components/PostElements';
import Bookmark from '@/components/PostElements/ToggleBookmark';
import { normalizePostRes, getRandomArray } from '@/helpers/normalizers';
import bgImgBibleStudy from '@/images/demo-image/Take-up-your-cross.jpg';
import onlineServer16to9 from '@/images/landingPage/online-church.jpg';
// Helpers
import { HomeTop } from '@/layout-parts/Home/HomeBanners';
import ac_strings from '@/strings/ac_strings.js';

// Type
import { IPostRes, ITopicPostItems, IPostItem, IImage } from '@/types';
import { graphql } from 'gatsby';
import * as React from 'react';

const IndexPage: React.FC<IHomeProps> = props => {
	const { pageContext, path, data } = props;
	const [editorsPickFormat, setEditorsPickFormat] = React.useState<'ed' | 'so' | 'po' | 'audio' | 'ani'>('so');
	const [testimonies, setTestimonies] = React.useState<string>('victory-over-sin-testimony-collection');
	const {
		featuredPosts: featuredPosts,
		popularTopics: popularTopicsAll,
		popularPosts: popularPostsAll,
		latestPosts
	} = pageContext;

	const latestPostAsTopic = {
		id: '',
		name: ac_strings.latest,
		slug: ac_strings.slug_latest
	};

	const randomFeatured = getRandomArray(featuredPosts, featuredPosts.length);
	const seriesMaps: any = {};
	const playlistMaps: any = {};
	data.ac.series.map(item => {
		seriesMaps[item.slug] = item;
	});

	data.ac.playlists.map(item => {
		playlistMaps[item.slug] = item;
	});

	const dataFormat = {
		featuredFormats: [
			{
				key: 'ed',
				name: 'Edification',
				slug: '/edification',
				id: '1',
				posts: latestPosts
			},
			{
				key: 'ani',
				name: 'Animation',
				slug: '/animation',
				id: '2',
				posts: latestPosts
			},
			{
				key: 'po',
				name: 'Podcast',
				slug: '/podcast',
				id: '1',
				posts: latestPosts
			},
			{
				key: 'so',
				name: 'Songs',
				slug: '/songs',
				id: '1',
				posts: latestPosts
			},
			{
				key: 'audio',
				name: 'Topical Playlists',
				slug: '/playlist',
				id: '1',
				posts: latestPosts
			}
		]
	};

	return (
		<div>
			<MetaTag
				path={path}
				title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
				type="website"
				translatedUrls={[]}
				breadcrumb={[]}
			/>
			{/* 			<HomeTop
				label="Bible Study"
				bgImg={bgImgBibleStudy}
				title={'Take up your cross'}
				body="What does it mean for a disciple"
				cta={{
					text: 'Start now',
					path: '/preview?type=page&id=78'
				}}
			/> */}
			<SectionWrapperSmall title="Featured Bible Studies" grey>
				<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
					{bibleStudies.map(item => {
						return <BibleStudyItemCard {...item} label="Bible Study" start />;
					})}
				</div>
			</SectionWrapperSmall>
			{/*       <CardListPosts
        title={ac_strings.featured}
        posts={featuredPosts.map(item => normalizePostRes(item))}
      /> */}

			<div>
				<SectionWrapper title="Editor's pick">
					<div className="flex justify-center" style={{ paddingBottom: '26px', fontWeight: 700 }}>
						{dataFormat.featuredFormats.map(item => {
							return (
								<div
									onClick={() => setEditorsPickFormat(item.key)}
									style={{
										color: '#828282',
										fontSize: '20px',
										marginLeft: '20px',
										marginRight: '20px'
									}}
								>
									{item.name}
								</div>
							);
						})}
					</div>
					{editorsPickFormat === 'ed' && (
						<FetchPostsFromSlugs
							layout="row"
							slugs={editorsPickEdification}
							render={({ posts }) => {
								return (
									<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
										{posts.map(post => {
											return <PostItemCard {...post} />;
										})}
									</div>
								);
							}}
						/>
					)}
					{editorsPickFormat === 'so' && (
						<div className="mx-auto standard-max-w w-full grid grid-cols-5 gap-3">
							{songPlaylists.map(item => {
								const playlist = playlistMaps[item];
								return (
									<BibleStudyItemCard
										title={playlist.title}
										slug={playlist.slug}
										image={playlist.image}
										label="Playlist"
									/>
								);
							})}
						</div>
					)}

					{editorsPickFormat === 'audio' && (
						<div className="mx-auto standard-max-w w-full grid grid-cols-5 gap-3">
							{topicalPlaylsits.map(item => {
								const playlist = playlistMaps[item];
								return (
									<BibleStudyItemCard
										title={playlist.title}
										slug={playlist.slug}
										image={playlist.image}
										label="Playlist"
									/>
								);
							})}
						</div>
					)}

					{editorsPickFormat === 'po' && (
						<div className="mx-auto standard-max-w w-full grid grid-cols-5 gap-3">
							{podcastPlaylists.map(item => {
								const playlist = playlistMaps[item];
								return (
									<BibleStudyItemCard
										title={playlist.title}
										slug={playlist.slug}
										image={playlist.image}
										label="Playlist"
									/>
								);
							})}
						</div>
					)}

					{editorsPickFormat === 'ani' && (
						<FetchPostsFromSlugs
							layout="row"
							slugs={animationPosts}
							render={({ posts }) => {
								return (
									<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
										{posts.map(post => {
											return <PostItemCard {...post} />;
										})}
									</div>
								);
							}}
						/>
					)}
					<div>{ }</div>
					{/*        {articlesFromPillarsCollections.map(item => {
              const serie = seriesMaps[item]
              return (
                <BibleStudyItemCard
                  title={serie.title}
                  slug={serie.slug}
                  image={serie.image}
                  label="Collection"
                />
              )
            })}   <div className="flex justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
            <button className=" border-2 rounded border-d4slate-dark font-bold" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>View All Podcast</button>

          </div> */}
				</SectionWrapper>
				<HomeTop
					darkbg
					label="Online Meeting: Join us live this sunday"
					bgImg={onlineServer16to9}
					title={'Crucified with Christ'}
					body="Learn about a life in overcoming sin – in Jesus’ footsteps!"
					cta={{
						text: 'Sign up',
						path: '/preview?type=page&id=78'
					}}
				/>
				<SectionWrapper title="Testimonies">
					<div className="flex justify-center" style={{ paddingBottom: '26px', fontWeight: 700 }}>
						{testimoniesCollections.map(item => {
							const serie = seriesMaps[item];
							return (
								<div
									onClick={() => {
										setTestimonies(item);
									}}
									style={{
										color: '#828282',
										fontSize: '20px',
										marginLeft: '20px',
										marginRight: '20px'
									}}
								>
									{serie.title.replace('- testimony collection', '')}
								</div>
							);
						})}
					</div>

					<FetchPostsFromSlugs
						layout="row"
						slugs={seriesMaps[testimonies].posts.slice(0, 4).map(i => i.slug)}
						render={({ posts }) => {
							return (
								<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
									{posts.map(post => {
										return <PostItemCard {...post} />;
									})}
								</div>
							);
						}}
					/>

					{/*       <PostItemCard {...item} />    <div className="flex justify-center" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
            <button className=" border-2 rounded border-d4slate-dark font-bold" style={{ padding: "12px 25px 12px 25px", fontSize: "21px" }}>View All Podcast</button>

          </div> */}
				</SectionWrapper>

				<SectionWrapperSmall title="Articles by Our Pillars" grey>
					<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
						{articlesFromPillarsCollections.map(item => {
							const serie = seriesMaps[item];
							return (
								<BibleStudyItemCard
									title={serie.title}
									slug={`/series/${serie.slug}`}
									image={serie.image}
									label="Collection"
								/>
							);
						})}
					</div>
				</SectionWrapperSmall>
			</div>

			<div>
				<div
					className="standard-max-w px-4 flex flex-col justify-center"
					style={{ paddingTop: '70px', paddingBottom: '70px' }}
				>
					<h2 className="text-center" style={{ fontSize: '42px', fontWeight: 'bold', paddingBottom: '32px' }}>
						Latest
					</h2>
					<div></div>
					<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
						{latestPosts.slice(0, 4).map(itemRes => {
							const item = normalizePostRes(itemRes);
							return <PostItemCard {...item} />;
						})}
					</div>
				</div>
			</div>
			<div style={{ background: '#f4f4f4' }}>
				<div className="standard-max-w px-4 flex flex-col justify-center" style={{ paddingTop: '70px' }}>
					<h2 className="text-center" style={{ fontSize: '42px', fontWeight: 'bold', paddingBottom: '32px' }}>
						Explore Topics
					</h2>
					<div></div>
					<div className="mx-auto standard-max-w w-full">
						<div className=" grid grid-cols-6 gap-3">
							{popularTopicsAll.static.slice(0, 6).map(item => {
								return (
									<div>
										{item.image && <Image1To1 {...item.image} />}
										<h3 style={{ fontSize: '20px' }}>{item.name}</h3>
									</div>
								);
							})}
						</div>
						<div className="flex justify-center" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
							<button
								className=" border-2 rounded border-d4slate-dark font-bold"
								style={{ padding: '12px 25px 12px 25px', fontSize: '21px' }}
							>
								View All Podcast
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gray-300">
				<div className="standard-max-w" style={{ minHeight: '455px', paddingTop: '122px' }}>
					<div className="px-6 w-7/12">
						<h2 style={{ fontSize: '56px', fontWeight: 'bold', paddingBottom: '51px' }}>
							Bookmark Posts, Follow Topics
						</h2>
						<button
							className="text-d4slate-dark"
							style={{
								background: '#fff',
								padding: '16px 25px 16px 25px',
								borderRadius: '7px',
								fontSize: '18px'
							}}
						>
							Read More
						</button>
						<p style={{ paddingTop: '20px', paddingBottom: '51px' }}>
							Already have an account? Log in here
						</p>
					</div>
				</div>
			</div>
			<div className="mx-auto standard-max-w w-full" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
				<h2 className="text-center" style={{ fontSize: '42px', fontWeight: 'bold', paddingBottom: '32px' }}>
					All Categories
				</h2>
			</div>
		</div>
	);
};

export default IndexPage;

const SectionWrapper: React.FC<{ title: string }> = ({ title, children }) => {
	return (
		<div
			className="standard-max-w px-4 flex flex-col justify-center"
			style={{ paddingTop: '70px', paddingBottom: '70px' }}
		>
			<h2 className="text-center" style={{ fontSize: '42px', fontWeight: 'bold', paddingBottom: '26px' }}>
				{title}
			</h2>
			{children}
		</div>
	);
};

const BibleStudyItemCard: React.FC<{
	image: IImage;
	title: string;
	slug: string;
	excerpt?: string;
	start?: boolean;
	label: string;
	squareImge?: boolean;
}> = item => {
	return (
		<Link to={item.slug} className="flex flex-col shadow rounded-lg overflow-hidden">
			{item.label === 'Playlist' ? (
				<Image1To1 className="rounded-t-lg" {...item.image} />
			) : (
				<Image2To1 className="rounded-t-lg" image={item.image} />
			)}
			<div style={{ overflow: 'hidden', padding: '25px 14px 14px 14px', backgroundColor: '#fff' }}>
				<div style={{ paddingBottom: '20px' }}>
					<div
						className="uppercase font-bold"
						style={{ fontSize: '12px', color: '#828282', paddingBottom: '5px' }}
					>
						{item.label}
					</div>
					<h3
						className="leading-normal"
						style={{
							fontSize: '18px',
							paddingBottom: '18px',
							fontWeight: 800,
							display: '-webkit-box',
							textOverflow: 'ellipsis',
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden'
						}}
					>
						{item.title}
					</h3>
					<span
						className="leading-normal"
						style={{
							fontSize: '14px',
							color: '#4F4F4F',
							WebkitLineClamp: 2,
							display: '-webkit-box',
							textOverflow: 'ellipsis',
							height: '42px',
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden'
						}}
					>
						{item.excerpt}
					</span>
				</div>

				{item.start && <button className="bg-ac-secondary rounded px-4 py-2 text-white">Start</button>}
			</div>
		</Link>
	);
};

const PostItemCard: React.FC<IPostItem> = item => {
	return (
		<div className="flex flex-col shadow rounded-lg overflow-hidden">
			<Image2To1 className="rounded-t-lg" image={item.image} />
			<div style={{ overflow: 'hidden', padding: '25px 14px 14px 14px', backgroundColor: '#fff' }}>
				<div
					className="uppercase font-bold"
					style={{ fontSize: '12px', color: '#828282', paddingBottom: '5px' }}
				>
					{item.reading_time?.minutes ? item.reading_time?.minutes : '2 mins read'}
				</div>
				<div style={{ paddingBottom: '20px' }}>
					<h3
						className="leading-normal"
						style={{
							fontSize: '18px',
							paddingBottom: '18px',
							fontWeight: 800,
							WebkitLineClamp: 3,
							display: '-webkit-box',
							textOverflow: 'ellipsis',
							height: '81px',
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden'
						}}
					>
						{item.title}
					</h3>
					<span
						className="leading-normal"
						style={{
							fontSize: '14px',
							color: '#4F4F4F',
							WebkitLineClamp: 2,
							display: '-webkit-box',
							textOverflow: 'ellipsis',
							height: '42px',
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden'
						}}
					>
						{item.excerpt}
					</span>
				</div>
				<div className="w-full flex justify-between items-center text-d4slate-dark">
					<div style={{ fontSize: '12px' }}>{item.authors && <AuthorLink authorGroups={item.authors} />}</div>
					<Bookmark id={item.id} color="slate-dark" />
				</div>
			</div>
		</div>
	);
};

interface IHomeProps {
	path: string;
	pageContext: {
		featuredPosts: IPostRes[];
	};
}

export const CardListPosts: React.FC<{ posts: IPostItem[]; title: string }> = ({ posts, title }) => {
	return (
		<SectionWrapperSmall title={title}>
			<div className="mx-auto standard-max-w w-full grid grid-cols-4 gap-3">
				{posts.map(item => {
					return <PostItemCard {...item} />;
				})}
			</div>
		</SectionWrapperSmall>
	);
};
export const SectionWrapperSmall: React.FC<{ title: string; grey?: boolean }> = ({ title, children, grey }) => {
	return (
		<div style={{ background: grey ? '#f4f4f4' : '#fff' }}>
			<div className="standard-max-w px-4 flex flex-col justify-center py-18">
				<h2 className="text-center font-bold text-4-7xl pb-8">{title}</h2>
				{children}
			</div>
		</div>
	);
};

export const pageQuery = graphql`
	query homeBeta {
		ac {
			page(id: "106") {
				flexibleContent
			}
		}
	}
`;
