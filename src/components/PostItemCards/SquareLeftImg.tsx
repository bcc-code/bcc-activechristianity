
import * as React from 'react';
import { IPostItem } from '@/types'
import Link from '@/components/CustomLink'
import SquareImage from '@/components/Images/Image1to1Rounded'
import TextSizeTitle from '@/components/PostElements/TextSizeWClamp'
import { AuthorLink, SimpleSmallListenIcon } from '@/components/PostElements'

const SimplePost: React.FC<IPostItem & { small?: boolean }> = ({ slug, authors, title, image, media, small }) => {
    return (
        <div className="text-sm flex lg:py-2 border-b border-gray-300 last:border-b-1 py-2 sm:py-4" >
            <div className="flex-1 mr-4">
                <Link to={slug}>
                    <TextSizeTitle
                        rawText={title}
                        fontKey='text-base-lg'
                        clamp={3}
                        className="mb-2 text-ac-slate-dark"
                    />
                </Link>
                {authors && !small && <div className="text-xs text-ac-slate-dark sm:text-ac-slate-light mb-2"> <AuthorLink authorGroups={authors} /></div>}
                {media.audio && (
                    <SimpleSmallListenIcon media={media} />
                )}
            </div>
            <div className="flex items-center">
                <Link to={slug} className="h-16 w-16">
                    <SquareImage
                        className="rounded-lg"
                        {...image}
                    />
                </Link>
            </div>
        </div>
    )
}

export default SimplePost