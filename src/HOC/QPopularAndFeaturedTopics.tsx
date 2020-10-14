import React from 'react';
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import { StaticQuery, graphql } from "gatsby";
import { FetchTopics } from '@/HOC/FetchTopicFormatType'
import { ITopic, ITopicPostSlugs } from '@/types'

interface QProps {
    excludeFollowed?: boolean
    render: (data: { topics: ITopic[] }) => JSX.Element
}

const QPopularAndFeaturedTopics: React.FC<QProps> = ({ render, excludeFollowed }) => {
    return (
        <StaticQuery query={query}
            render={(props: IQuery) => {
                const featuredSlugs = props.ac.featuredTopics.map(f => f.slug)
                const popularSlugs = props.ac.popularTopics.map(f => f.slug)
                const topicsSlugs = [...new Set([...featuredSlugs, ...popularSlugs])]
                console.log(topicsSlugs)
                return (
                    <FetchTopics
                        topics={topicsSlugs}
                        layout="list"
                        render={({ topics }) => {

                            /*                             if (excludeFollowed) {
                                                            topics = topics.filter(item => {
                                                                const find = followedTopics.find(t => `${t.id}` === `${item.id}`)
                                                                return find === undefined
                                                            })
                                                        } */
                            return (
                                <div>
                                    {render({ topics })}
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