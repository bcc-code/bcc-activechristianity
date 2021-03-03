import * as React from 'react';
import { IIconProps } from '@/types'
import SVGWrap from './Base'

export const AddIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </SVGWrap>

    )
}


export const BookmarkIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </SVGWrap>

    )
}


export const BookmarkBorderIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
        </SVGWrap>

    )
}
export const CheckIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </SVGWrap>

    )
}


export const CachedIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0z" fill="none" /><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 01-2.8-.7l-1.46 1.46A7.93 7.93 0 0012 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0012 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
        </SVGWrap>

    )
}


export const LocalOfferIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
        </SVGWrap>

    )
}


