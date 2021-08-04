import Link from '@/components/CustomLink';
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI/arrowIcons';
import { INavItem } from '@/types';
import * as React from 'react';

import './scrollNavTabs.css';

interface IProps {
	links: {
		to: string;
		name: string;
		nr?: number;
	}[];
	className: string;
}

const HScrollNav: React.FC<IProps> = ({ links, className }) => {
	const [activeTab, setActiveTab] = React.useState<number>(0);
	const menuEl = React.useRef<HTMLDivElement>(null);
	const activeEl = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		moveActiveTab();
	}, [activeTab]);

	const moveActiveTab = () => {
		if (menuEl && menuEl.current) {
			const menu = menuEl.current;
			if (activeEl.current) {
				const active = activeEl.current;
				const activeMidPoint = active.clientWidth / 2;
				const menuMidPoint = menu.clientWidth / 2;
				const activeOffset = active.offsetLeft;
				const currentLeftScroll = menu.scrollLeft;
				const distanceToMid = activeOffset - (menuMidPoint + currentLeftScroll) + activeMidPoint;
				SmoothHorizontalScrolling(menu, 200, currentLeftScroll, distanceToMid);
			}
		}
	};

	return (
		<div className="relative scroll-links-background">
			<div
				ref={menuEl}
				className="scroll-snap-x-container scroll-snap-x-container-start overflow-x-auto whitespace-no-wrap flex items-center relative pb-2"
			>
				{links.map((item, i) => {
					return (
						<Link
							className={`scroll-snap-x-child-start ml-4 ${className}`}
							to={item.to}
							key={i}
							ref={activeTab === i ? activeEl : undefined}
						>
							<span className="text-sm font-medium">{item.name}</span>
							<p className="text-xs opacity-75 px-2">{item.nr}</p>
						</Link>
					);
				})}
				<div className="min-w-24 h-4"></div>
			</div>
		</div>
	);
};

export default HScrollNav;

export function SmoothVerticalScrolling(e: any, time: number, where: string) {
	const eTop = e.getBoundingClientRect().top;
	const eAmt = eTop / 100;
	let curTime = 0;
	while (curTime <= time) {
		window.setTimeout(SVS_B, curTime, eAmt, where);
		curTime += time / 100;
	}
}

export function SVS_B(eAmt: number, where: string) {
	if (where == 'center' || where == '') window.scrollBy(0, eAmt / 2);
	if (where == 'top') window.scrollBy(0, eAmt);
}

export function SmoothHorizontalScrolling(e: any, time: number, amount: number, start: number) {
	const eAmt = amount / 100;
	let curTime = 0;
	let scrollCounter = 0;
	while (curTime <= time) {
		window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start);
		curTime += time / 100;
		scrollCounter++;
	}
}

export function SHS_B(e: any, sc: number, eAmt: number, start: number) {
	e.scrollLeft = eAmt * sc + start;
}
