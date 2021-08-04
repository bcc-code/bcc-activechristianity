import ac_strings from '@/strings/ac_strings.js';
import * as React from 'react';

import SideNavWrapper from './SideNavWrapper';

const SideMobile: React.FC<{
	isSideNavOpen: boolean;
	close: () => void;
	back: () => void;
}> = ({ isSideNavOpen, close, back }) => {
	return (
		<SideNavWrapper
			title={ac_strings.change_password}
			isSideNavOpen={isSideNavOpen}
			back={back}
			className="flex flex-col "
		>
			<div className="mx-auto flex-1 flex flex-col font-roboto items-center justify-center font-semibold">
				<div>
					<div>
						<label htmlFor="">{ac_strings.password}</label>
						<input type="text" name="" id="" />
					</div>
					<div>
						<label htmlFor="">{ac_strings.confirm_password}</label>
						<input type="text" name="" id="" />
					</div>
					<div>
						<button>{ac_strings.submit}</button>
						<button>{ac_strings.cancel}</button>
					</div>
				</div>
			</div>
		</SideNavWrapper>
	);
};

export default React.memo(SideMobile);
