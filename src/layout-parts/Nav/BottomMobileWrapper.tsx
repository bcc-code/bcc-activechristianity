import { INavItem } from '@/types';
import loadable from '@loadable/component';
import * as React from 'react';

export interface IMenuWithIcon extends INavItem {
	icon: {
		selected: JSX.Element;
		default: JSX.Element;
	};
}
interface IProps {
	isSideNavOpen: boolean;
}

const BottomNavMobile: React.FC<IProps> = props => {
	const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth < 640);

	React.useEffect(() => {
		setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
	}, []);

	if (isMobile) {
		const BottomMobile = loadable(() => import('./BottomMobile'));
		return <BottomMobile {...props} />;
	} else {
		return <div className="hidden"></div>;
	}
};

export default BottomNavMobile;
