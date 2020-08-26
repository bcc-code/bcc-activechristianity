import React from 'react'
import Link from '@/components/CustomLink'
/* import ResourceNav from '@/layout-parts/Nav/ResourceNav' */
import MetaTag from '@/components/Meta'

import { INavItem, INavItemCount } from "@/types"
import { UnderlineTitleLink, LayoutH1Wide, typeIcons, TitleWithIcon } from '@/layout-parts'

interface ISection {
    sectionItems: INavItemCount[]
    title: string
    titlePath?: string
}

const Section: React.FC<ISection> = ({ sectionItems, title, titlePath }) => {

    return (
        <div className="flex flex-col pb-4">

            <UnderlineTitleLink name={title} to={titlePath} />
            {sectionItems.map((item, i) => {
                return (
                    <Link className="py-2 flex w-full justify-between" to={`/${item.to}`} key={i}>
                        <span>{item.name}</span>
                        <span className="text-xs text-gray-500">{item.count}</span>
                    </Link>
                )
            })}
        </div>
    )
}



const Resource: React.FC<IResource> = (props) => {
    console.log(props)
    const { path, pageContext } = props

    const { title, resource: { general, format, ...types } } = pageContext

    const format1 = format.items.slice(0, 5)
    const format2 = format.items.slice(5)
    return (
        <div>
            <MetaTag title={title} type="page" breadcrumb={[]} />
            <LayoutH1Wide title={title} />
            <div className="standard-max-w-px pb-8">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
                    <Section sectionItems={format1} title={format.name} />
                    <Section sectionItems={format2} title={''} />
                    <Section sectionItems={general.items} title={general.name} />
                    {Object.keys(types).map(tKey => {
                        const type = types[tKey]

                        const typeLinks = type.menu.map(t => ({ ...t, name: < TitleWithIcon title={t.name} icon={typeIcons[tKey]} /> }))

                        return <Section sectionItems={typeLinks} title={type.name} />
                    })}
                </div>


            </div>
        </div>
    )
}


export default Resource


interface IResource {
    path: string

    pageContext: {
        title: string
        resource: {
            format: {
                name: string
                menu: INavItemCount[]
                items: INavItemCount[]
            }
            general: {
                name: string
                menu: INavItemCount[]
                items: INavItemCount[]
            }
            read: {
                name: string
                slug: string
                ebook?: INavItemCount
                menu: INavItemCount[]
            }
            listen?: {
                name: string
                slug: string

                menu: INavItemCount[]
            }
            watch?: {
                name: string
                slug: string
                menu: INavItemCount[]
            }
        }
    }
}