import React from 'react'
import ScrollLinks from '@/components/Tabs/ScrollNavLinks'
import Link from '@/components/CustomLink'
const Filter: React.FC<any> = ({ byTopics, byFeaturedAuthors, byColors, slug }) => {
    return (
        <>
            <div className="-mx-4 py-4 sm:hidden">
                <h3 className="text-sm px-4 pb-2">Topics</h3>
                <ScrollLinks
                    links={byTopics.map(t => ({ name: t.name, nr: t.nrOfQuotes, to: `${slug}/${t.slug}` }))}
                    className={`py-1 px-2 my-1  bg-white flex justify-between items-center rounded-lg bg-ac-slate-lighter whitespace-nowrap`}
                />
                <h3 className="text-sm px-4 pb-2 mt-4">Authors</h3>
                <ScrollLinks
                    links={byFeaturedAuthors.map(t => ({ name: t.name, nr: t.nrOfQuotes, to: `${slug}/${t.slug}` }))}
                    className={`py-1 px-2 my-1  bg-white flex justify-between items-center rounded-lg bg-ac-slate-lighter whitespace-nowrap`}
                />
                <h3 className="text-sm px-4 pb-2 mt-4">Colors</h3>
                <div className="flex flex-wrap px-4">
                    {byColors.map(c => {
                        const color = c.color
                        const rgbaColor = `rgb(${color[0]},${color[1]},${color[2]})`
                        return (
                            <Link to={`${slug}/${c.name}`} className="block h-8 w-8 min-h-8 max-h-8 min-w-8 max-w-8 mr-4 mb-2 rounded-lg overflow-hidden" style={{ backgroundColor: rgbaColor, color: rgbaColor }}>
                                {c.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="hidden sm:block py-6">

                <div className="pb-4 w-full flex">
                    <h3 className="font-semibold pb-4 py-1 w-32 min-w-20">Topics</h3>

                    <div className="flex flex-wrap">
                        {byTopics.slice(0, 8).map(topic => {

                            return (
                                <Link
                                    to={`${slug}/${topic.slug}`}
                                    className={`py-1 px-2 mr-2 my-1  bg-white flex justify-between items-center rounded-lg bg-ac-slate-lighter`}

                                >

                                    <span className="text-sm font-medium">{topic.name}</span>
                                    <p className="text-xs opacity-75 px-2">{topic.nrOfQuotes}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="flex pb-4">
                    <h3 className="font-semibold pb-4 py-1 w-32 min-w-20">Authors</h3>
                    <div className="flex flex-wrap">
                        {byFeaturedAuthors.map(author => {

                            return (
                                <Link
                                    to={`${slug}/${author.slug}`}
                                    className={`py-1 pr-4 mr-2 my-1  bg-white flex justify-between items-center`}

                                >

                                    <span className="text-sm font-medium">{author.name}</span>
                                    <p className="text-xs opacity-75 px-2">{author.nrOfQuotes}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="flex pb-4">
                    <h3 className="font-semibold pb-4 py-1 w-32 min-w-20">Colors</h3>
                    <div className="flex flex-wrap">
                        {byColors.map(c => {
                            const color = c.color
                            const rgbaColor = `rgb(${color[0]},${color[1]},${color[2]})`
                            return (
                                <Link to={`${slug}/${c.name}`} className="block h-8 w-8 min-h-8 max-h-8 min-w-8 max-w-8 mr-4 mb-2 rounded-lg overflow-hidden" style={{ backgroundColor: rgbaColor, color: rgbaColor }}>
                                    {c.name}
                                </Link>
                            )
                        })}
                    </div>


                </div>
            </div>
        </>
    )
}

export default Filter