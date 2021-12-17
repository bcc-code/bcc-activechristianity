import { IIconProps } from '@/types';
import * as React from 'react';

import SVGWrap from './Base';

export const HomeIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
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

export const MenuIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
		</SVGWrap>
	);
};

export const LaunchIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
		</SVGWrap>
	);
};

export const KeyboardArrowRightIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
		</SVGWrap>
	);
};

export const HeadsetIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" opacity=".1" />
			<path d="M12 1a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 00-9-9z" />
		</SVGWrap>
	);
};

export const ExploreIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
		</SVGWrap>
	);
};

export const BookIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M17.5 14.33C18.29 14.33 19.13 14.41 20 14.57V16.07C19.38 15.91 18.54 15.83 17.5 15.83C15.6 15.83 14.11 16.16 13 16.82V15.13C14.17 14.6 15.67 14.33 17.5 14.33M13 12.46C14.29 11.93 15.79 11.67 17.5 11.67C18.29 11.67 19.13 11.74 20 11.9V13.4C19.38 13.24 18.54 13.16 17.5 13.16C15.6 13.16 14.11 13.5 13 14.15M17.5 10.5C15.6 10.5 14.11 10.82 13 11.5V9.84C14.23 9.28 15.73 9 17.5 9C18.29 9 19.13 9.08 20 9.23V10.78C19.26 10.59 18.41 10.5 17.5 10.5M21 18.5V7C19.96 6.67 18.79 6.5 17.5 6.5C15.45 6.5 13.62 7 12 8V19.5C13.62 18.5 15.45 18 17.5 18C18.69 18 19.86 18.16 21 18.5M17.5 4.5C19.85 4.5 21.69 5 23 6V20.56C23 20.68 22.95 20.8 22.84 20.91C22.73 21 22.61 21.08 22.5 21.08C22.39 21.08 22.31 21.06 22.25 21.03C20.97 20.34 19.38 20 17.5 20C15.45 20 13.62 20.5 12 21.5C10.66 20.5 8.83 20 6.5 20C4.84 20 3.25 20.36 1.75 21.07C1.72 21.08 1.68 21.08 1.63 21.1C1.59 21.11 1.55 21.12 1.5 21.12C1.39 21.12 1.27 21.08 1.16 21C1.05 20.89 1 20.78 1 20.65V6C2.34 5 4.18 4.5 6.5 4.5C8.83 4.5 10.66 5 12 6C13.34 5 15.17 4.5 17.5 4.5Z" />
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

export const LocalOfferIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
		</SVGWrap>
	);
};

export const BookmarksIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z" />
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

export const SearchIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
		</SVGWrap>
	);
};

export const CloseIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
		</SVGWrap>
	);
};
