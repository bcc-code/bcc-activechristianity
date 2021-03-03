import React from 'react'

import { EbookHardCover } from '@/components/Ebook/EbookItem'
import EbookDownload from '@/components/Ebook/EbookDownload'
import MetaTag from '@/components/Meta'

import { normalizeAvailableLanguages, } from '@/helpers/normalizers'
import { getImage } from '@/helpers/imageHelpers'
import { INavItem, IEbook } from '@/types'
import { PostLabel } from '@/components/PostElements'
import { PostH1 } from '@/components/Headers'
import ac_strings from '@/strings/ac_strings.js'

const Ebook: React.FC<IEbook> = (ebook) => {

    const {
        content,
        title,
        image,
        excerpt,
        authors,
        langs,
        sources,
        slug
        /*     previews,
            related */

    } = ebook
    const id = ""
    const imageUrl = getImage(title, "640x320", image)
    let languageOptions: INavItem[] = []

    if (Array.isArray(langs) && langs.length > 0) {

        languageOptions = normalizeAvailableLanguages(langs, false)
    }
    const ebookDownload = (
        <EbookDownload
            title={title}
            id={id}
            languageOptions={languageOptions}
            previewImages={[]}
        />
    )

    const desktopCover = (
        <div className="w-48 relative flex flex-col">
            <div className="rounded-xl w-full h-auto border border-gray-300 hover:shadow-md max-w-lg overflow-hidden" >
                <img src={imageUrl.src} alt={title} />
            </div>

        </div>
    )
    /* 
        const contributors = <PostMetaWLabel authors={normalizeAuthors(authors)} /> */

    const pageSlug = `${ac_strings.slug_ebook}/${slug}`
    return (
        <article className="overflow-scroll px-4">
            <div className="flex flex-col sm:flex-row">
                <div className=" w-full lg:w-4/12 py-4 flex pl  -4">
                    {desktopCover}
                </div>
                <div className="flex-1">
                    <PostLabel text={ac_strings["e-book"]} />
                    <PostH1 title={title} />
                    <div className="border-b w-1/6 my-8 border-ac-gray"></div>

                    <p className="text-ac-slate-dark-dark text-lg font-medium leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />
                    {ebookDownload}
                </div>

            </div>
        </article >
    )
}

export default Ebook


