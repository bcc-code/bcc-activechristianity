import React from 'react'
import Link from '@/components/CustomLink'
import XScrollCustomSize from './BaseCustomSize'
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import './horizontal-scroll.css';
import { ITopic } from '@/types'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import { SlateDarkFollowButton } from '@/components/PostElements/TopicToggleFollow'

import TS from '@/strings'

const FeatureSection: React.FC<{ featured: ITopic[] }> = ({ featured }) => {
    const { followedTopics } = useSelector((state: IRootState) => ({ followedTopics: state.userLibrary.followedTopics }))
    const [processTopics, setProcessTopics] = React.useState<ITopic[]>([])
    React.useEffect(() => {

        const filtered = featured.filter(t => {
            const find = followedTopics.find(ft => `${ft.id}` === `${t.id}`)

            return find === undefined
        })
        setProcessTopics(filtered)
    }, [followedTopics, featured])

    return (
        <div>
            <XScrollCustomSize
                childeClassName=""
                items={featured.map(({ name, image, slug, id }) => (
                    <div className="flex flex-col items-center">
                        <div className="min-h-36 h-36 w-24" >
                            <ImgBgTopicCard name={name} image={image} to={`${TS.slug_topic}/${slug}`} />

                        </div>
                        <SlateDarkFollowButton
                            id={id}
                        />

                    </div>
                ))}
            />
            <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                {processTopics.map(({ name, image, slug, id }) => (
                    <div className="flex flex-col items-center">
                        <ImgBgTopicCard name={name} image={image} to={`${TS.slug_topic}/${slug}`} />
                        <SlateDarkFollowButton
                            id={id}

                        />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureSection