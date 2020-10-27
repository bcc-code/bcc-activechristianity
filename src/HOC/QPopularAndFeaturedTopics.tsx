import React from 'react';
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import { StaticQuery, graphql } from "gatsby";
import { FetchTopics } from '@/HOC/FetchTopicFormatType'
import { ITopic, ITopicPostSlugs } from '@/types'
import topicFilters from '@/strings/topic-filters.json'
interface QProps {
    excludeFollowed?: boolean
    render: (data: { topics: ITopic[] }) => JSX.Element
}

const QPopularAndFeaturedTopics: React.FC<QProps> = ({ render, excludeFollowed }) => {
    return (
        <StaticQuery query={query}
            render={(props: IQuery) => {
                console.log(props)
                const filtered: string[] = []


                props.ac.featuredTopics.forEach(t => {
                    if (!topicFilters.formatIds[t.id] && !topicFilters.typeIds[t.id]) {
                        filtered.push(t.slug)
                    }
                })


                props.ac.popularTopics.forEach(t => {
                    if (!topicFilters.formatIds[t.id] && !topicFilters.typeIds[t.id]) {
                        filtered.push(t.slug)
                    }
                })
                const topicsSlugs = [...new Set([...filtered])]

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
            id: string
        }[]
        popularTopics: {
            slug: string
            id: string
        }[]
    }
}
const query = graphql`
  query QFeaturedAndPopularTopics {
  ac {
    popularTopics {
    slug
    id
  }
  featuredTopics:topics(featured:true) {
    slug
    id
      }
      
  }
}
`