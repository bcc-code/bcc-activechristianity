import React from 'react'
import XScrollCustomSize from './BaseCustomSize'
import FollowTopic from '@/components/Cards/FollowTopic'
import { useSelector, } from 'react-redux'

import './horizontal-scroll.css';
import { ITopic } from '@/types'
import shortid from 'shortid'

import { loggedInSelector, followedTopicsSelector } from '@/state/selectors/user'

const FeatureSection: React.FC<{ featured: ITopic[] }> = ({ featured }) => {
    const loggedIn = useSelector(loggedInSelector)
    const followedTopics = useSelector(followedTopicsSelector)
    let list = [...featured]
    if (loggedIn === "success") {
        const filtered = featured.filter(t => {
            const find = followedTopics.find(ft => `${ft.id}` === `${t.id}`)

            return find === undefined
        })
        list = filtered
    }
    return (
        <div>
            <XScrollCustomSize
                childeClassName=""
                items={list.map((topic) => (
                    <FollowTopic {...topic} key={shortid()} />
                ))}
            />
            {/*             <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                {processTopics.map(({ name, image, slug, id }) => (
                    <div className="flex flex-col items-center">
                        <ImgBgTopicCard name={name} image={image} to={`${ac_strings.slug_topic}/${slug}`} />
                        <SlateDarkFollowButton
                            id={id}

                        />

                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default FeatureSection