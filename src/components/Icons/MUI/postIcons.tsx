import { IIconProps } from '@/types';
import * as React from 'react';

import SVGWrap from './Base';

export const AccessTimeIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
			<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
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

export const DescriptionIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
		</SVGWrap>
	);
};

export const EqualizerIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" />
		</SVGWrap>
	);
};

export const PlayArrowRoundedIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M8 5v14l11-7z" />
		</SVGWrap>
	);
};

export const PlayCircleOutlineIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path fill="none" d="M0 0h24v24H0z" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5l7-4.5-7-4.5v9z" />
		</SVGWrap>
	);
};

export const VisibilityIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
		</SVGWrap>
	);
};

export const ShareOutlinedIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
		</SVGWrap>
	);
};

export const PublishIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
		</SVGWrap>
	);
};
