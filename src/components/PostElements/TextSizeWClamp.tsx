import * as React from 'react';

import './clamp.css'

interface ItextSizeConfig {
    [key: string]: {
        s: string
        h2lines: string
        h3lines?: string
        h4lines?: string
    }
}
const textSizeConfig: ItextSizeConfig = {
    "header-post": {
        s: 'text-xl md:text-3xl lg:text-4xl',
        h2lines: 'max-h-15 md:max-h-30 lg:max-h-34',
    },
    'text-sm': {
        s: 'text-sm',
        h2lines: 'max-h-10',
        h3lines: 'max-h-16'
    },
    'text-base': {
        s: 'text-base',
        h2lines: 'max-h-12 sm:max-h-15',
        h3lines: 'max-h-20 sm:max-h-24',
        h4lines: 'max-h-24'
    }, //16px-18px
    'text-lg': {
        s: 'text-lg leading-tight',
        h2lines: 'h-14 max-h-14',
        h3lines: 'max-h-22 max-max-h-24'
    },
    'text-base-lg': {
        s: 'text-base sm:text-lg',
        h2lines: 'max-h-12 sm:max-h-18',
        h3lines: 'max-h-16 sm:max-h-22'//'max-h-20 sm:max-h-24'
    },
    'text-sm-base-lg': {
        s: 'text-sm md:text-base lg:text-lg',
        h2lines: 'max-h-12 sm:max-h-12 md:max-h-15 lg:max-h-18',
        h3lines: 'max-h-16 sm:max-h-18 md:max-h-20 lg:max-h-22'
    },
    'text-base-xl-2xl': {
        s: 'text-base md:text-xl lg:text-2xl',
        h2lines: 'max-h-12 md:max-h-15 lg:max-h-18',
    },
    'text-2xl': {
        s: 'text-2xl',
        h2lines: 'max-h-18 ',
        h3lines: 'max-h-28 '
    }, // 24px
    'text-lg-2xl': {
        s: 'text-lg sm:text-2xl leading-snug',
        h2lines: 'max-h-14 sm:max-h-18 ',
        h3lines: 'max-h-20 sm:max-h-30 '
    },
    'text-xl-3xl-4xl': {
        s: 'text-xl lg:text-3xl xl:text-4xl leading-tight', // text-2xl lg:text-4xl xl:text-5xl leading-tight'
        h2lines: 'max-h-14 sm:max-h-24 lg:max-h-34 xl:max-h-48'
    } //18px-64px
}

export interface ITextSizeWClamp {

    fontKey?: string,
    bold?: 'font-semibold' | 'font-bold',
    clamp?: 1 | 2 | 3 | 4,
    className?: string
}

export interface ITextSizeWClampProps extends ITextSizeWClamp {
    rawText: string
}

const getClass = (props: ITextSizeWClamp) => {

    const { fontKey, bold, clamp, className } = props
    let size = 'text-base sm:text-lg'
    let h = ''
    let clampClass = ''

    if (fontKey && textSizeConfig[fontKey]) {
        size = textSizeConfig[fontKey].s

        if (clamp && clamp === 1) {
            clampClass = 'truncate'
        }
        if (clamp && clamp === 2) {
            h = textSizeConfig[fontKey].h2lines
            clampClass = 'clamp2'
        }

        if (clamp && clamp === 3) {
            h = textSizeConfig[fontKey].h3lines || textSizeConfig[fontKey].h2lines
            clampClass = 'clamp3'
        }

        if (clamp && clamp === 4) {
            h = textSizeConfig[fontKey].h4lines || textSizeConfig[fontKey].h3lines || textSizeConfig[fontKey].h2lines
            clampClass = 'clamp4'
        }
    }
    let textClass = size

    if (h !== '') {
        textClass = `${textClass} ${h}`
    }

    if (clampClass !== '') {
        textClass = `${textClass} ${clampClass}`
    }

    if (bold) {
        textClass = `${textClass} ${bold}`
    }

    if (className) {
        textClass = `${textClass} ${className}`
    }

    return textClass
}

const PostTitle: React.FC<ITextSizeWClampProps> = (props) => {
    const textClass = getClass(props)
    let title = props.rawText
    if (props.rawText) {
        title = props.rawText
    } else {
        console.log('found page without title')
    }


    return (
        <h2 className={textClass}>{title}</h2>
    )
}

export default PostTitle