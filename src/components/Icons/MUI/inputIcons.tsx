


import * as React from 'react';
import { IIconProps } from '@/types'
import SVGWrap from './Base'

export const CheckBoxIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </SVGWrap>

    )
}

export const CheckBoxOutlineBlankIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />

        </SVGWrap>

    )
}

export const FilterListIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
        </SVGWrap>

    )
}

export const ExpandMoreIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </SVGWrap>

    )
}