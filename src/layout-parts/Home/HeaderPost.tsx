import * as React from 'react';
import Link from '@/components/CustomLink'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import VideoHeader from '@/components/Images/Video16to9'
import { IPostItem } from '@/types'
import PostMeta from '@/components/PostMeta/PostMeta'
import FeaturedPost from '@/components/PostItemCards/FeaturedPost'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import TextSizeWClamp from '@/components/PostElements/TextSizeWClamp'
import { ReadingTimingAuthor, PostLabel } from '@/components/PostElements'
import { fetchOneLocalPostFromSlug } from '@/helpers/fetchLocalData'
import { DesktopFeaturedPlaceholder } from '@/components/Loader/PlaceHolders'
import MotionAppear from '@/components/Motion/AppareY'
const HeaderPost: React.FC<{ mixed: IPostItem[] | null }> = ({ mixed }) => {
    /* const {  muted } = palette; */
    const [post, setPost] = React.useState<null | IPostItem>(null)
    const [videoUrl, setVideoUrl] = React.useState<string | null>(null)
    React.useEffect(() => {
        if (mixed) {
            const firstPost = mixed[0]
            setPost(firstPost)
            fetchOneLocalPostFromSlug(firstPost.slug).then(res => {
                if (res && res.media && res.media.video) {
                    setVideoUrl(res.media.video.src)
                }
            })
        }
    }, [mixed])

    if (post) {
        return (
            <FeaturedPost  {...post} videoUrl={videoUrl} />

        )
    } else {
        return <DesktopFeaturedPlaceholder />
    }
}

export default HeaderPost