import * as React from 'react';
import { IIconProps } from '@/types'

const AudioIcon: React.SFC<IIconProps> = ({ className, customSize }) => {
    return (
        <svg className={`${className ? className : 'w-6 h-6'} stroke-current`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13L18 11C18 9 18 4 12 4C6 4 6 9 6 11L6 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 20V13C17.3333 13 20 12.7667 20 16.5C20 20.2333 17.3333 20 16 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 20V13C6.66667 13 4 12.7667 4 16.5C4 20.2333 6.66667 20 8 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default AudioIcon