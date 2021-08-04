import Link from '@/components/CustomLink';
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI/arrowIcons';
import * as React from 'react';

const TitleLink: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
	return (
		<Link to={slug} className="py-2 text-ac-secondary flex border-b justify-between w-full">
			<div>{title}</div>
			<div className="flex items-center">
				<KeyboardArrowRightIcon />
			</div>
		</Link>
	);
};

export default TitleLink;
