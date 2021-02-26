
import * as React from 'react';
import { IPostItem } from '@/types'
import Link from '@/components/CustomLink'
import SquareImage from '@/components/Images/Image1to1Rounded'
import TextSizeTitle from '@/components/PostElements/TextSizeWClamp'
import { AuthorLink, ListenIcon } from '@/components/PostElements'
import FetchAndSetCurrentMedia from '@/HOC/SetAndUpdatePlayingMedia'
import { IPostAuthors, IMedia, IImage } from '@/types'
import { EqualizerIcon, PlayCircleOutlineIcon, AccessTimeIcon, VisibilityIcon, DescriptionIcon } from '@/components/Icons/MUI/postIcons'
import ac_strings from '@/strings/ac_strings.js'

const SimplePost: React.FC<IPostItem> = ({ slug, authors, title, image, media }) => {
    return (
        <div className="text-sm flex lg:py-2 border-b border-gray-300 last:border-b-1 pb-4" >

            <div className="flex-1 mr-4">

                <Link to={slug}>
                    <TextSizeTitle
                        rawText={title}
                        fontKey='text-base-lg'
                        clamp={3}
                        className="mb-2 text-ac-slate-dark"
                    />
                </Link>
                {authors && <div className="text-xs text-ac-slate-dark sm:text-ac-slate-light mb-2"> <AuthorLink authorGroups={authors} /></div>}
                {media.audio && (
                    <FetchAndSetCurrentMedia
                        track={media}
                        clickable
                        render={({ playing }) => {
                            return (
                                <div>
                                    {playing ? (
                                        <div className="flex items-center rounded-full pr-2">
                                            <EqualizerIcon
                                                customSize="5"
                                                className="fill-slate-light"
                                            />
                                            <span className="text-xs sm:text-sm text-white pl-2 whitespace-no-wrap">
                                                {ac_strings.playing}
                                            </span>
                                        </div>
                                    ) : (

                                            <div className="flex items-center rounded-full pr-2">
                                                <PlayCircleOutlineIcon
                                                    className="fill-slate-dark"
                                                    customSize="5"
                                                />
                                                <span className="text-xs sm:text-sm text-white pl-2 whitespace-no-wrap">
                                                    {ac_strings.listen}
                                                </span>
                                            </div>


                                        )}
                                </div>
                            )

                        }} />
                )}
            </div>
            <Link to={slug} className="h-10 w-10 lg:h-16 lg:w-16">
                <SquareImage
                    className="rounded-lg"
                    {...image}
                />
            </Link>
        </div>
    )
}

export default SimplePost