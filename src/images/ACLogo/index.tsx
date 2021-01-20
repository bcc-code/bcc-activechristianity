import * as React from 'react'
import loadable from '@loadable/component'

const En = loadable(() => import('./en_US'))
const DE = loadable(() => import('./DE'))
const ES = loadable(() => import('./ES'))
const FI = loadable(() => import('./FI'))
const FR = loadable(() => import('./FR'))
const HU = loadable(() => import('./HU'))
const IT = loadable(() => import('./IT'))
const NL = loadable(() => import('./NL'))
const NO = loadable(() => import('./NO'))
const PL = loadable(() => import('./PL'))
const PT = loadable(() => import('./PT'))
const RU = loadable(() => import('./RU'))
export interface ILogoStyle {
    height: string
    iconOnly?: boolean
    width?: string
}
export default (props: ILogoStyle) => {
    const { iconOnly } = props
    let lang = iconOnly ? "icon" : process.env.LANG_CODE
    const langLogo = {
        "en": (
            <En {...props} />
        ),
        "de": (
            <DE {...props} />
        ),
        "da": (
            <NO {...props} />
        ),
        "es": (
            <ES {...props} />
        ),
        "fi": (
            <FI {...props} />
        ),
        "fr": (
            <FR {...props} />
        ),
        "it": (
            <IT {...props} />
        ),
        "hu": (
            <HU {...props} />
        ),
        "nb": (
            <NO {...props} />
        ),
        "nl": (
            <NL {...props} />
        ),
        "pt": (
            <PT {...props} />
        ),
        "pl": (
            <PL {...props} />
        ),
        "ru": (
            <RU {...props} />
        ),
        "sv": (
            <NO {...props} />
        )
    }

    return langLogo[lang] ? langLogo[lang] : langLogo.en
}
