import BottomMobile from '@/layout-parts/Nav/BottomMobile';
import TopDesktop from '@/layout-parts/Nav/TopDesktop';
import TopMobile from '@/layout-parts/Nav/TopMobile';
import CookieConsent from '@/layouts/AppWrapper/CookeConsent';
import { openSignInModal } from '@/state/action';
import { setLogout, setUser } from '@/state/action/authAction';
import { getUserLibrary } from '@/state/action/userAction';
import menus from '@/strings/generated/menus.json';
// type
import { IUser } from '@/types';
import loadable from '@loadable/component';
import { graphql } from 'gatsby';
import React, { Profiler } from 'react';
import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';

import Breadcrumb from './Breadcrumb';
import './Layout.css';

const MediaPlayer = loadable(() => import('@/components/MediaPlayerNew/GlobalAudioPlayer'));
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav'));
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'));
const Footer = loadable(() => import('@/layout-parts/Footer'));

const { menusItems } = menus;

// string

const acApiModule = import('@/util/api');

export interface IDrawerNav {
	isSideNavOpen: boolean;
	setSideNavOpen: (status: boolean) => void;
	isModalOpen?: boolean;
}

const App: React.FC<{ pageContext: { title?: string; slug?: string } }> = props => {
	const { children } = props;

	const dispatch = useDispatch();
	const [isSideNavOpen, setSideNavOpen] = React.useState(false);

	React.useEffect(() => {
		checkUser();
	}, []);

	const checkUser = () => {
		console.log('checking user');
		acApi
			.profile()
			.then((res: IUser) => {
				if (res && res.id) {
					if (res.meta && res.meta.consented) {
						dispatch(setUser(res));
						dispatch(getUserLibrary());
					} else {
						dispatch(openSignInModal('giveConsent'));
					}
				} else {
					dispatch(setLogout());
				}
			})
			.catch((err: any) => {
				console.log(err);
				dispatch(setLogout());
				console.log('handle login error');
			});
	};

	const handleSideNavOpen = (status: boolean) => {
		setSideNavOpen(status);
	};

	const NavProps = React.useMemo(() => {
		return {
			isSideNavOpen,
			setSideNavOpen: handleSideNavOpen
		};
	}, [isSideNavOpen, setSideNavOpen, handleSideNavOpen]);

	return (
		<div className="relative">
			<CookieConsent key={shortid()} />
			<SignInSignUpModal key={shortid()} />
			<MediaPlayer key={shortid()} />
			<div className="relative layout-children">
				<Helmet>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Helmet>
				<TopDesktop key={shortid()} {...NavProps} explorePage={menusItems.explore} />
				<TopMobile {...NavProps} key={shortid()} />
				{isSideNavOpen && <SideNav {...NavProps} />}
				<Breadcrumb key={shortid()} />
				{children}
				<Footer key={shortid()} />
				<BottomMobile key={shortid()} {...NavProps} />
			</div>
		</div>
	);
};

export default App;

const query = graphql`
	query LayoutQuery {
		ac {
			menus {
				id
				slug
				menuItems {
					name
					to: value
				}
			}

			allPages {
				title
				slug
				label
			}
		}
	}
`;
