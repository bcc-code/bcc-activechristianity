import React from 'react'
import { graphql } from "gatsby"

import FeaturedCard from '@/components/PostItem/FeaturedCard'
import { LayoutH1Wide } from '@/components/Headers'
import MetaTag from '@/components/Meta'

import ac_strings from '@/strings/ac_strings.json'

import { ebookResToPost } from '@/helpers'
import { INavItem, IEbook } from '@/types'


const EbookOverview: React.FC<IProps> = (props) => {

    const { data, pageContext, path } = props
    const { ac: { ebooks } } = data
    if (!ebooks) {
        return null
    } else {
        const { slug, title } = pageContext
        return (
            <div>
                <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={pageContext.breadcrumb} path={path} />
                <LayoutH1Wide title={title} />
                <div className="grid-2-4col grid-h70 standard-max-w-px">
                    {
                        ebooks.map((ebook) => {
                            const { slug } = ebook;
                            const pageSlug = `/${ac_strings.slug_ebook}/${slug}`

                            return (
                                <div className="div-content">
                                    <FeaturedCard
                                        {...ebookResToPost(ebook)}
                                        slug={pageSlug}
                                        likes={99}
                                        type="ebook"
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default EbookOverview

export const pageQuery = graphql`

  query EbookAll{
    ac {
        ebooks {
          title
          authors {
            name
            slug
            pivot {
              as
            }
          }
          image {
            src
            srcset
            alt
            dataUri
          }
          slug
        }
    }
  }
`

interface IProps {
    data: {
        ac: {
            ebooks: IEbook[]
        }
    }
    location: {
        pathname: string
    }

    pageContext: {
        title: string
        slug: string
        breadcrumb: INavItem[]
    }
    path: string

}