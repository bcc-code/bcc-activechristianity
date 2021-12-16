import Link from '@/components/CustomLink';
import Image1To1 from '@/components/Images/Image1to1Rounded';
import {
	MobileHeaderBackground,
	MobilePostMain,
	DesktopPostMain,
	ShareSection
} from '@/layout-parts/PostLayout/PostSections';
import * as React from 'react';

const Series: React.FC<IDummy> = props => {
	const series = props.pageContext;
	const id = '';

	const body = (
		<div className="flex flex-col pb-12">
			{series.posts.map((p, i) => {
				return (
					<li
						key={i}
						className="w-full px-1 py-2 cursor-pointer flex flex-col sm:flex-row text-sm md:text-base border-b last:border-b-0 hover:bg-gray-100"
					>
						<Link to={`${p.slug}`} className="text-left">
							{i + 1}. {p.title}
						</Link>
					</li>
				);
			})}
		</div>
	);
	return (
		<article className="overflow-scroll">
			<MobileHeaderBackground imgUrl={series.src}>
				<div className="flex flex-col items-center w-full" style={{ transform: 'translateY(0px)' }}>
					<div className="w-7/12"></div>
				</div>
			</MobileHeaderBackground>
			<MobilePostMain id={''} height={300} title={series.title} excerpt={''} shareSlug={series.slug}>
				{body}
			</MobilePostMain>
			<DesktopPostMain
				id={id}
				title={series.title}
				excerpt={''}
				shareSlug={''}
				headerLeft={
					<div className="pr-8 relative">
						<Image1To1 {...series.image} className="rounded-lg" />
					</div>
				}
				headerMeta={<div className="flex text-ac-slate-dark">{body}</div>}
			></DesktopPostMain>
			{/*             <div className="relative">
            <ExclusiveContent />
        </div> */}
		</article>
	);
};

export default Series;

interface IDummy {
	path: string;

	pageContext: {
		title: string;
	};
}
