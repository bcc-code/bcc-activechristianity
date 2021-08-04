import { IIconProps } from '@/types';
import * as React from 'react';

import SVGWrap from './Base';

export const KeyboardArrowDownIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
		</SVGWrap>
	);
};

export const KeyboardArrowLeftIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
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

export const CloseIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
		</SVGWrap>
	);
};

export const ArrowRightAltIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
		</SVGWrap>
	);
};

export const LastPageIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
		</SVGWrap>
	);
};

export const FirstPageIcon: React.FC<IIconProps> = props => {
	return (
		<SVGWrap {...props}>
			<path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
			<path d="M24 24H0V0h24v24z" fill="none" />
		</SVGWrap>
	);
};
