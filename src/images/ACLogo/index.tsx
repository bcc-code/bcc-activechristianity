import * as React from 'react'
import loadable from '@loadable/component'

const AcLogoEn = loadable(() => import('./en_US'))

export interface ILogoStyle {
    height: string
    iconOnly?: boolean
    width?: string
}
export default (props: ILogoStyle) => {
    const { iconOnly } = props
    let lang = iconOnly ? "icon" : process.env.LANG_CODE
    console.log(lang, props)
    const langLogo = {
        "en": (
            <AcLogoEn {...props} />
        )
    }

    return langLogo[lang] ? langLogo[lang] : langLogo.en
}
