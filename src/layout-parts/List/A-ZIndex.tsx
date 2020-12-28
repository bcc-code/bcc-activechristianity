import React from 'react'
import { ITopicNavItem } from '@/types'
import Link from '@/components/CustomLink'
import { chunkArray } from '@/helpers'
import { ToggleBookmarkIconOnly } from '@/components/PostElements/TopicToggleFollow.tsx'
interface ILinkGroup {
    name: string
    items: ITopicNavItem[]
}
interface IProps {
    groups: ILinkGroup[]
}
//const regex = new RegExp(keyword, "i")

const TaxonomyIndex: React.FC<IProps> = ({ groups }) => {
    const getOrderedItems = () => {

        let desktopFlexItemArray: JSX.Element[] = []

        groups.map(({ name, items }) => {

            desktopFlexItemArray.push(
                <div className="font-bold border-t uppercase"
                >
                    {name}
                </div>)



            items.sort((a, b) => a.name.localeCompare(b.name)).map(t => {

                desktopFlexItemArray.push(
                    <div className="flex justify-between items-center">
                        <Link className="block text-xs" to={`/${t.to}`}>{t.name}</Link>
                        <ToggleBookmarkIconOnly id={t.id} />

                    </div>
                )

                return null

            })

        })

        return desktopFlexItemArray
    }


    const desktopFlexItem = getOrderedItems()
    const mobileFlexItem = groups.map(item => ({ title: item.name, topic: chunkArray(item.items, 4) }))
    return (
        <div className="w-full">
            <div className="hidden sm:block staggered-boxes standard-max-w-px">
                {desktopFlexItem}
            </div>
            <div className="flex flex-col sm:hidden pt-4">
                {mobileFlexItem.map((item, k) => (
                    <div className="mb-4" key={k}>
                        <h4 className="px-4 py-4 font-bold uppercase">{item.title}</h4>
                        <div className="flex overflow-scroll ">
                            {item.topic.map((subGroups, i) => {
                                return (
                                    <div key={i} className="w-10/12 flex flex-col ml-4 text-sm min-w-5/12 sm:w-5/12">
                                        {subGroups.map((t, j) => (
                                            <div className="flex justify-between items-center" key={j}>
                                                <Link className="block p-2 pr-8 text-xs" to={`/${t.to}`}>{t.name}</Link>
                                                <ToggleBookmarkIconOnly id={t.id} />

                                            </div>


                                        ))}
                                    </div>)
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TaxonomyIndex