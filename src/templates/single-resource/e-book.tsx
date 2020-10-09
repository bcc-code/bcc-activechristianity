import React from 'react'

import { EbookHardCover } from '@/components/Ebook/EbookItem'
import EbookDownload from '@/components/Ebook/EbookDownload'
import Content from '@/components/Content'
import ExclusiveContent from '@/layout-parts/Banner/ExclusiveContent'
import MetaTag from '@/components/Meta'
import { MobileHeaderBackground, MobilePostMain, DesktopPostMain } from '@/layout-parts/PostSections'

import PostMetaWLabel from '@/components/PostMeta/PostMeta'

import { normalizeAuthors } from '@/helpers'
import { getImage } from '@/helpers/imageHelpers'
import { INavItem, IEbook } from '@/types'

import languages from '@/strings/languages.json'
import ac_strings from '@/strings/ac_strings.json'

interface IProps {
    path: string
    location: {
        pathname: string
    }
    pageContext: {
        breadcrumb: INavItem[]
        ebook: IEbook
    }
}

const Ebook: React.FC<IProps> = ({ pageContext: { breadcrumb, ebook }, path }) => {


    const {
        id,
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

    const imageUrl = getImage(title, "640x320", image)
    let languageOptions: INavItem[] = []

    if (Array.isArray(sources) && sources.length > 0) {



        languages.forEach(item => {
            const find = sources.find(lang => lang === item.locale)
            if (find) {
                languageOptions.push({ to: `https://ac2.day4.live/ebooks/${id}/download/${find}`, name: item.lang })
            }
        })
    }
    const ebookDownload = (
        <EbookDownload
            title={title}
            id={id}
            languageOptions={languageOptions}
            previewImages={[]}
        />
    )
    const mobileCover = (
        <div className="flex flex-col items-center justify-center">
            <EbookHardCover
                image={image}
                title={title}
                className={"z-10 relative rounded w-4/12"}
            />
            {ebookDownload}
        </div>
    )

    const desktopCover = (
        <div className="pr-8 relative flex flex-col">
            <div className="rounded-xl w-full h-auto border border-gray-300 hover:shadow-md max-w-lg overflow-hidden" >
                <img src={imageUrl.src} alt={title} />
            </div>
            {ebookDownload}
        </div>
    )

    const contributors = <PostMetaWLabel authors={normalizeAuthors(authors)} />

    const pageSlug = `${ac_strings.slug_ebook}/${slug}`
    return (
        <article className="overflow-scroll">
            <MetaTag
                path={path}
                title={title}
                type="article"
                meta={{
                    description: excerpt,
                    imageUrl: imageUrl.src
                }}
                translatedUrls={langs}
                breadcrumb={breadcrumb}
            />
            <MobileHeaderBackground imgUrl={imageUrl.src}>
                {mobileCover}
            </MobileHeaderBackground>
            <MobilePostMain
                id={id}
                title={title}
                excerpt={excerpt || ''}
                height={280}
                shareSlug={pageSlug}
            >
                <div className="flex items-center border-b border-gray-400 pb-6">
                    {contributors}
                </div>
                <div className="mt-6">
                    <Content content={content} />
                </div>
            </MobilePostMain>
            <DesktopPostMain
                id={id}
                title={title}
                excerpt={excerpt || ''}
                shareSlug={pageSlug}
                headerLeft={desktopCover}
                headerMeta={contributors}
            >
                <div className="mt-6">
                    <Content content={content} />
                </div>
                {/* {relatedEbooks} */}
            </DesktopPostMain>
            <ExclusiveContent />
        </article >
    )
}

export default Ebook


