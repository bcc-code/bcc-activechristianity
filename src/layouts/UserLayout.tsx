import { SideNavItem } from '@/components/Button';
import { confirm } from '@/components/Confirm';
import { initiateLogout } from '@/state/action/authAction';
import ac_strings from '@/strings/ac_strings.js';
import menus from '@/strings/generated/menus.json';
import { INavItem } from '@/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import StickyBox from 'react-sticky-box';

const { userMenuItems } = menus;

const AccountLayout: React.FC<{ pathname: string; userLinks: INavItem[] }> = ({ children, pathname, userLinks }) => {
	const dispatch = useDispatch();
	const [currentPageTitle, setCurrentPageTitle] = React.useState<null | string>(null);

	React.useEffect(() => {
		if (currentPageTitle === null) {
			const page = userLinks.find(item => {
				return `/${item.to}` === pathname;
			});
			if (page) {
				setCurrentPageTitle(page.name);
			}
		}
	}, [pathname]);

	const handleLogout = async () => {
		if (await confirm('Are you sure?')) {
			dispatch(initiateLogout());
		}
	};

	const title = ac_strings.title_user;

	return (
		<div className="flex relative mt-12 items-start ">
			<div className="hidden sm:flex flex-col items-center " style={{ width: '400px', minHeight: '80vh' }}>
				<StickyBox offsetTop={150}>
					<div className="flex flex-col py-8">
						{[userMenuItems.myContent, userMenuItems.history].map((item, i) => {
							return (
								<SideNavItem key={i} to={item.to}>
									{item.name}
								</SideNavItem>
							);
						})}

						<SideNavItem onClick={handleLogout} className="text-ac-slate-light">
							{ac_strings.logout}
						</SideNavItem>
					</div>
				</StickyBox>
			</div>

			<div className="relative w-full flex flex-col ">
				<div className="z-10 sm:w-tablet">{children}</div>
			</div>
		</div>
	);
};

export default AccountLayout;
