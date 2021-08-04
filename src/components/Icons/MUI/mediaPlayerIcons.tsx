import { IIconProps } from '@/types';
import * as React from 'react';

import SVGWrap from './Base';

export const MoreVertIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
		</SVGWrap>
	);
};
export const VolumeUpRoundedIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z" />
		</SVGWrap>
	);
};

export const KeyboardArrowDownIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
		</SVGWrap>
	);
};

export const DescriptionIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
		</SVGWrap>
	);
};
