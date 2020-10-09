import React from 'react';
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import { StaticQuery, graphql } from "gatsby";
import FetchTopicWithPostItems from '@/HOC/FetchFullTopicWithPostSlugs'
import { ITopic, ITopicPostSlugs } from '@/types'
import TS from '@/strings'
interface QProps {
    excludeFollowed?: boolean
    render: (data: { topicPostItems: ITopicPostSlugs[] }) => JSX.Element
}

const QPopularAndFeaturedTopics: React.FC<QProps> = ({ render, excludeFollowed }) => {
    const { followedTopics, auth } = useSelector((state: IRootState) => ({ followedTopics: state.userLibrary.followedTopics, auth: state.auth }))

    return (
        <StaticQuery query={query}
            render={(props: IQuery) => {
                const featuredSlugs = props.ac.featuredTopics.map(f => `${TS.slug_topic}/${f.slug}`)
                const popularSlugs = props.ac.popularTopics.map(f => `${TS.slug_topic}/${f.slug}`)
                const topics = [...new Set([...featuredSlugs, ...popularSlugs])]
                return (
                    <FetchTopicWithPostItems
                        topics={topics}
                        layout="list"
                        render={({ topicPostItems }) => {
                            let topics = topicPostItems
                            if (excludeFollowed) {
                                topics = topics.filter(item => {
                                    const find = followedTopics.find(t => `${t.id}` === `${item.id}`)
                                    return find === undefined
                                })
                            }
                            return (
                                <div>
                                    {render({ topicPostItems: topics })}
                                </div>
                            )
                        }}
                    />
                )
            }}
        />
    )
}
export default QPopularAndFeaturedTopics

interface IQuery {
    ac: {
        featuredTopics: {
            slug: string
        }[]
        popularTopics: {
            slug: string
        }[]
    }
}
const query = graphql`
  query QFeaturedAndPopularTopics {
  ac {
    popularTopics {
    slug
  }
  featuredTopics:topics(featured:true) {
    slug
      }
  }
}
`