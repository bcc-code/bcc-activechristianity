import * as React from 'react';
import { IIconProps } from '@/types'
import SVGWrap from './Base'


//ExpandMore
export const ExpandMoreIcon: React.FC<IIconProps> = (props) => {

    return (
        <SVGWrap {...props}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
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