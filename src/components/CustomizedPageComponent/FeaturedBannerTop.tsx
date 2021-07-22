import * as React from 'react';
import Link from '@/components/CustomLink'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import VideoHeader from '@/components/Images/Video16to9'
import { IPostItem } from '@/types'
import MotionAppear from '@/components/Motion/AppareY'
const HeaderPost: React.FC<IPostItem & { videoUrl: string | null, bgImg?: string }> = (props) => {

    const { format, image, title, excerpt, types, slug, videoUrl, bgImg } = props
    const darkbg = true
    return (
        <MotionAppear
            className="w-full z-10 sm:pt-16 px-4 bg-ac-slate-dark"
        >
            <div className="standard-max-w grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-12 relative " style={{ minHeight: "500px", paddingTop: "72px" }}>
                <Link to={`/${slug}`} className="md:col-start-1 md:col-end-8 relative pb-6">
                    {videoUrl !== null ? (

                        <VideoHeader
                            src={videoUrl}
                            className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                        />

                    ) : (
                        <div className="m-0 relative w-full pb-square sm:pb-half">
                            <LazysizesFeaturedImage

                                {...image}
                                className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl object-cover g-image"
                            />
                        </div>
                    )
                    }
                </Link>
                <div className="md:col-start-8 md:col-end-13 md:ml-5 flex flex-col justify-center pt-0 px-4 text-white">
                    <span className="uppercase">{format && format[0] ? format[0].name : null}</span>
                    <h2 className="text-6xl font-bold pb-12 leading-snug">{title}</h2>
                    <p className="text-2xl pb-12">{excerpt}</p>
                    {/*                     <Link
                        className="font-bold bg-white px-8 py-4 rounded-lg text-lg text-ac-slate-dark"
                        to={slug}
                    >
                        {types && types[0] ? types[0].name : 'Learn more'}
                    </Link>
 */}
                </div>
            </div>
        </MotionAppear>
    )
}

export default HeaderPost