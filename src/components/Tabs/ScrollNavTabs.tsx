import { SolidDarkBgToggleActive } from '@/components/Button';
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI/arrowIcons';
import { ITab } from '@/types';
import * as React from 'react';
import { useSwipeable } from 'react-swipeable';

import './scrollNavTabs.css';

interface IProps {
	tabs: ITab[];
}

const HScrollNav: React.FC<IProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = React.useState<number>(0);
	const menuEl = React.useRef<HTMLDivElement>(null);
	const activeEl = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		moveActiveTab();
	}, [activeTab]);
	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};
	const nextIndex = (activeTab + 1) % tabs.length;
	const lastIndex = activeTab - 1 < 0 ? tabs.length - 1 : activeTab - 1;

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
	const handlers = useSwipeable({
		onSwipedLeft: () => setActiveTab(nextIndex),
		onSwipedRight: () => setActiveTab(lastIndex),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true
	});

	return (
		<div className="relative scroll-tabs-background">
			<div className="absolute right-0 z-40 pr-2" style={{ top: '50%' }}>
				<KeyboardArrowRightIcon customSize="4" className="fill-slate-dark" />
			</div>
			<div
				ref={menuEl}
				className="scroll-snap-x-container scroll-snap-x-container-start overflow-x-auto whitespace-no-wrap flex items-center relative pt-4 pb-2"
			>
				{tabs.map((item, i) => {
					return (
						<button
							className={`scroll-snap-x-child-start font-roboto ml-2`}
							onClick={() => {
								handleTabClick(i);
							}}
							key={i}
							ref={activeTab === i ? activeEl : undefined}
						>
							<SolidDarkBgToggleActive active={activeTab === i}>{item.name}</SolidDarkBgToggleActive>
						</button>
					);
				})}
				<div className="min-w-24 h-4"></div>
			</div>
			<div className="ac-tab-card-wrapper overflow-hidden" {...handlers}>
				{tabs.map((tab, i) => {
					let postClassName = '';
					if (i === activeTab) {
						postClassName = 'current';
					} else if (i > activeTab) {
						postClassName = 'next';
					} else if (i < activeTab) {
						postClassName = 'prev';
					}
					return (
						<div key={i} className={`ac-tab-${postClassName} ac-tab-card px-4`}>
							{tab.content}
						</div>
					);
				})}
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
