import XScrollCustomSize from '@/components/HorizontalScroll/BaseCustomSize';
import { ITopic } from '@/types';
import * as React from 'react';
import shortid from 'shortid';
import SquareCard from '@/components/Cards/BgImgTopicCard';
const TopicRowAndHorizontalScroll: React.FC<{ topics: ITopic[] }> = ({ topics }) => {
	return (
		<>
			<div className="hidden sm:grid sm:grid-cols-4 gap-4 px-4 sm:px-0 ">
				{topics.map(card =>
					card.image ? (
						<div className="pb-square w-full relative">
							<div className="absolute inset-0">
								<SquareCard
									key={shortid()}
									to={card.slug}
									image={card.image}
									name={card.name}
									fontClass={`${card.name.length > 20 ? 'text-sm' : 'text-base'} sm:text-lg`}
								/>
							</div>
						</div>
					) : null
				)}
			</div>
			<XScrollCustomSize
				childeClassName=""
				items={topics.map(({ name, slug, image }) => {
					return (
						<div className="flex flex-col items-center" key={shortid()}>
							<div style={{ height: '138px', width: '138px' }}>
								<SquareCard name={name} to={slug} image={image} rounded="rounded-xxl" />
							</div>
						</div>
					);
				})}
			/>
		</>
	);
};

export default TopicRowAndHorizontalScroll;
