import React from 'react'
import { graphql } from "gatsby";

import ResourceLayout from "@/layouts/ResourceLayout"
// components
import MetaTag from '@/components/Meta';
import TaxonomyIndex from '@/components/List/A-ZIndex'

//types
import { INavItem, IGlossary } from "@/types"

import ac_strings from '@/strings/ac_strings'

function compare(a: INavItem, b: INavItem) {

    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}


const GlossaryOverview: React.FC<IGlossaryOverviewProps> = ({ pageContext: { breadcrumb, title }, path, data }) => {
    const { glossary } = data.ac


    const alphabetGroupsObject: { [key: string]: INavItem[] } = {}

    glossary.map((g) => {
        const alphabet = g.word[0];
        const item = {
            name: g.word,
            to: `/${ac_strings.slug_glossary}/${g.slug}`
        }
        alphabetGroupsObject[alphabet] ? alphabetGroupsObject[alphabet].push(item) : alphabetGroupsObject[alphabet.toUpperCase()] = [item]
        return item
    })

    const nameGroups = Object.keys(alphabetGroupsObject).sort().map(alphabet => {
        return {
            name: alphabet,
            items: alphabetGroupsObject[alphabet].sort(compare)
        }
    })

    return (
        <ResourceLayout
            title={title}
        >
            <MetaTag
                title={ac_strings.glossary}
                translatedUrls={[]}
                type="page"
                breadcrumb={breadcrumb}
                path={path}
            />
            <div className="standard-max-w-px mt-8 sm:mt-16">
                <TaxonomyIndex groups={nameGroups} />
            </div>
        </ResourceLayout>
    )
}

export default GlossaryOverview

interface IGlossaryOverviewProps {
    path: string
    pageContext: {
        title: string
        breadcrumb: INavItem[]
    }
    data: {
        ac: {
            glossary: IGlossary[]
        }
    }
}

export const pageQuery = graphql`
    query allGlossaries {
        ac {
            glossary {
                word
                slug
            
            }
        }
    }
`
