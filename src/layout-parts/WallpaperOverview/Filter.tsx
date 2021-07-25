import React, { useState } from 'react'
import { FilterListIcon } from '@/components/Icons/MUI/inputIcons'
import { CloseIcon } from '@/components/Icons/MUI/arrowIcons'
import Modal from 'react-modal';
import Link from '@/components/CustomLink'
import ac_strings from '@/strings/ac_strings.js'

const Filter: React.FC<any> = ({ byTopics, byFeaturedAuthors, byColors, slug }) => {
    const [toggleFilter, setToggleFilter] = useState(false)
    return (
        <>
            <Modal
                isOpen={toggleFilter}
                className="inset-0 h-screen w-screen flex  flex-col overflow-scroll  px-4"
                style={{
                    overlay: {
                        backgroundColor: 'white',
                        zIndex: 700,
                        transition: `background-color 1000ms linear`
                    }
                }}
            >
                <button className="p-4 absolute right-0 top-0" onClick={() => setToggleFilter(false)}><CloseIcon /></button>
                <h3 className="text-sm pb-2 mt-4">{ac_strings.colors}</h3>
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
                <h3 className="text-sm pb-2 mt-4">{ac_strings.authors}</h3>
                <div className="flex flex-wrap">
                    {byFeaturedAuthors.map(t => {
                        ({ name: t.name, nr: t.nrOfQuotes, to: `${slug}/${t.slug}` })
                        return (
                            <Link to={`${slug}/${t.slug}`} className={`mr-2 py-1 px-2 my-1 text-xs  bg-white flex justify-between items-center rounded-lg bg-ac-slate-lighter whitespace-nowrap`}>
                                <span>{t.name}</span>
                                <span>({t.nrOfQuotes})</span>
                            </Link>
                        )
                    })}
                </div>
                <h3 className="text-sm pb-2 mt-4">{ac_strings.topics}</h3>
                <div className="flex flex-wrap">
                    {byTopics.map(t => {
                        ({ name: t.name, nr: t.nrOfQuotes, to: `${slug}/${t.slug}` })
                        return (
                            <Link to={`${slug}/${t.slug}`} className={`mr-2 py-1 px-2 my-1 text-xs  bg-white flex justify-between items-center rounded-lg bg-ac-slate-lighter whitespace-nowrap`}>
                                <span>{t.name}</span>
                                <span>({t.nrOfQuotes})</span>
                            </Link>
                        )
                    })}
                </div>
            </Modal>
            <div className="-mx-4 py-4 sm:hidden">
                <div className="px-4">
                    <div className="grid grid-cols-2 gap-2 ">

                        {byFeaturedAuthors.slice(0, 3).map(t => {
                            return (
                                <Link key={t.slug} className="text-sm font-medium border rounded-lg p-2 flex items-center justify-center text-center" to={`${slug}/${t.slug}`}>{t.slug === "the-bible" ? "Bible verse wallpapers" : `${t.name}`}</Link>)
                        })}
                        {byTopics.slice(0, 3).map(t => {
                            return (
                                <Link key={t.slug} className="text-sm font-medium border rounded-lg p-2 flex items-center justify-center text-center" to={`${slug}/${t.slug}`}>{t.name}</Link>)
                        })}

                    </div>
                    <button
                        onClick={() => { setToggleFilter(true) }}
                        className="mt-4 flex py-1 px-2 justify-center items-center rounded-lg bg-ac-slate-lighter"
                    >
                        <FilterListIcon />
                        <span className="text-sm italic px-4">{ac_strings.all_filter}</span>
                    </button>
                </div>
            </div>
            <div className="hidden sm:block py-6">

                <div className="pb-4 w-full flex">
                    <h3 className="font-semibold pb-4 py-1 w-32 min-w-20">{ac_strings.topics}</h3>

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
                    <h3 className="font-semibold pb-4 py-1 w-32 min-w-20">{ac_strings.authors}</h3>
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
                    <h3 className="font-semibold pb-4 py-1 w-32 min-w-20">{ac_strings.colors}</h3>
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