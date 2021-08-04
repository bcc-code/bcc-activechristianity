import { SideNavItem } from '@/components/Button';
import ac_strings from '@/strings/ac_strings.js';
import { INavItem } from '@/types';
import * as React from 'react';

import SideNavWrapper from './SideNavWrapper';

const SideMobile: React.FC<{
	isSideNavOpen: boolean;
	close: () => void;
	back: () => void;
	menu: INavItem[];
}> = ({ isSideNavOpen, close, back, menu }) => {
	return (
		<SideNavWrapper
			title={ac_strings.resource}
			isSideNavOpen={isSideNavOpen}
			back={back}
			className="flex flex-col "
		>
			<div className="mx-auto flex-1 flex flex-col font-roboto items-center justify-center font-semibold">
				{menu.map((item, i) => {
					return (
						<SideNavItem key={i} to={item.to} className=" px-4 py-2" onClick={close}>
							{item.name}
						</SideNavItem>
					);
				})}
				{process.env.LANG_CODE === 'en' && (
					<SideNavItem href={ac_strings.banner_ebook_cta_url} className=" px-4 py-2" onClick={close}>
						{ac_strings.banner_ebook_bookshop || 'Bookshop'}
					</SideNavItem>
				)}
			</div>
		</SideNavWrapper>
	);
};

export default React.memo(SideMobile);
