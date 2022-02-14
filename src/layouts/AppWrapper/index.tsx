import LazyLoad from '@/components/LazyLoad';
import NewsLetter from '@/layout-parts/Banner/NewsLetter';
import TopDesktop from '@/layout-parts/Nav/TopDesktop';
import { socialLoginlocalStorageKey } from '@/layout-parts/SignInSignUp/Main';
import CookieConsent from '@/layouts/AppWrapper/CookeConsent';
import Infobar from '@/layouts/AppWrapper/Infobar';
import checkUser from '@/state/reducer/checkUser';
import menus from '@/strings/generated/menus.json';
import loadable from '@loadable/component';
import { LazyMotion, domAnimation } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';
import InstagramIcon from '@/images/instagram-color.svg';
import Breadcrumb from './Breadcrumb';
import './Layout.css';

const Footer = loadable(() => import('@/layout-parts/Footer'));

const MediaPlayerNew = loadable(() => import('@/components/MediaPlayerNew/GlobalAudioPlayer'));

const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'));

const { menusItems } = menus;

export interface IDrawerNav {
	isSideNavOpen: boolean;
	setSideNavOpen: (status: boolean) => void;
}

const App: React.FC<{ pageContext: { title?: string; slug?: string } }> = props => {
	const { children } = props;
	const localStorageKey = 'ac.loggedIn';
	const dispatch = useDispatch();

	React.useEffect(() => {
		const redirectedFromSocialPlatform = localStorage.getItem(socialLoginlocalStorageKey);
		const loggedIn = localStorage.getItem(localStorageKey);
		if (loggedIn === 'true' || redirectedFromSocialPlatform === 'true') {
			checkUser(dispatch);
		}
	}, []);

	return (
		<LazyMotion features={domAnimation}>
			<Infobar key={shortid()} showDuration={7000} />
			<CookieConsent key={shortid()} />
			<SignInSignUpModal key={shortid()} />
			{/* <MediaPlayer key={shortid()} /> */}
			<MediaPlayerNew key={shortid()} />
			<TopDesktop key={shortid()} explorePage={menusItems.explore} />

			<div className="relative layout-children" key={shortid()}>
				<Breadcrumb key={shortid()} />
				{children}
			</div>

			{/* 			<div className="relative z-20 standard-max-w px-4 flex justify-center py-18">
				<a className="text-ac-secondary flex px-4 " href={'https://www.instagram.com/activechristianity/'}>
					<img className="w-12 h-12" src={InstagramIcon} />
					<div className="px-4">
						<p className="font-extrabold text-center text-4-7xl">Follow Us on Instagram</p>
						<span className="">@activechristianity</span>
					</div>
				</a>
			</div> */}
			<LazyLoad>
				<NewsLetter />
				{/*                 <ExclusiveContent /> */}
				<Footer />
			</LazyLoad>
		</LazyMotion>
	);
};

export default App;
