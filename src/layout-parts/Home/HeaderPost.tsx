import * as React from 'react';
import Link from '@/components/CustomLink'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import VideoHeader from '@/components/Images/Video16to9'
import { IPostItem } from '@/types'
import PostMeta from '@/components/PostMeta/PostMeta'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import TextSizeWClamp from '@/components/PostElements/TextSizeWClamp'
import { ReadingTimingAuthor, PostLabel } from '@/components/PostElements'
import { fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData'
import shortid from 'shortid'
const HeaderPost: React.FC<IPostItem> = ({ format, duration, image, title, excerpt, authors, reading_time, id, slug, media }) => {
    /* const {  muted } = palette; */

    const [videoUrl, setVideoUrl] = React.useState<string | null>(null)
    React.useEffect(() => {
        fetchOneLocalPostFromSlug(slug).then(res => {
            if (res && res.media && res.media.video) {
                setVideoUrl(res.media.video.src)
            }
        })
    }, [slug])
    console.log(image.src)
    return (
        <div className="w-full z-10 grid grid-cols-1 md:grid-cols-8 md:gap-6 lg:gap-12 relative sm:pt-16 px-4">
            <Link to={`/${slug}`} className="md:col-start-1 md:col-end-6 relative pb-6">
                {videoUrl !== null ? (
                    <VideoHeader
                        src={videoUrl}
                        className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                    />

                ) : (
                        <div className="m-0 relative w-full pb-square sm:pb-half">
                            <LazysizesFeaturedImage
                                key={shortid()}
                                {...image}
                                className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl object-cover g-image"
                            />
                        </div>
                    )
                }

            </Link>
            <div className="md:col-start-6 md:col-end-9 md:ml-5 flex flex-col justify-center pt-0">
                <div className="flex flex-col justify-center pt-0">
                    <Link
                        to={`/${slug}`}

                    >
                        {format && format[0] && (
                            <PostLabel text={format[0].name} />
                        )}
                        <TextSizeWClamp
                            rawText={title}
                            fontKey="header-post"
                            clamp={3}
                            className="sm:py-3 py-1"

                        />
                    </Link>
                    <span className="leading-normal hidden sm:block  mt-4">{excerpt}</span>
                    {authors && (
                        <span className="text-ac-gray-dark lg:hidden sm:py-3 py-1 text-sm">
                            <PostMeta authors={authors} />
                        </span>
                    )}
                    <div className="flex items-center sm:py-3 py-1">
                        <span className="pr-2">
                            <Bookmark id={id} size={"6"} />
                        </span>
                        {reading_time && <p className="ml-1 text-sm text-ac-gray-dark lg:hidden">{reading_time.text}</p>}
                        <ReadingTimingAuthor className="w-full text-sm text-ac-gray-dark hidden lg:block" duration={duration?.listen} authors={authors} />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default HeaderPost