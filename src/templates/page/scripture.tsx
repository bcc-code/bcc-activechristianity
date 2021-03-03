import React from 'react'
import Link from '@/components/CustomLink'
import { CSSTransition } from 'react-transition-group'
import MetaTag from '@/components/Meta'
// components
import ResourceLayout from "@/layouts/ResourceLayout"
import PlaceHolder from '@/components/Loader/ScripturePlaceholder'
import { OutlineScriptureChapter } from '@/components/Button'
// Type
import { INavItem, IBibleBook, IBible, } from '@/types'
import ac_strings from '@/strings/ac_strings.js'

interface IBibleNavProps {
    path: string

    pageContext: {
        title: string
        breadcrumb: INavItem[]
        bible: IBible
    }

}

interface IAvailableChapter {
    v: number
    a: boolean
    bookId: string
}

interface IActiveBook extends IBibleBook {
    availableChapters?: IAvailableChapter[]
}

const BibleNav: React.FC<IBibleNavProps> = (props) => {
    const { pageContext: { breadcrumb, title, bible }, path } = props

    const [activeBook, setActiveBook] = React.useState<undefined | IActiveBook>(undefined)
    const [activeBookOrder, setActiveBookOrder] = React.useState<undefined | number>(undefined)

    const handleSelectActiveBook = (e: any, book: IBibleBook) => {
        if (activeBook && activeBook.availableChapters && book.no === activeBook.no) {
            setActiveBook(undefined)
            setActiveBookOrder(undefined)
        } else {

            const all: IAvailableChapter[] = []
            for (let v = 1; v <= book.total; v++) {
                all.push({

                    v,
                    a: book.chapters.indexOf(v) > -1,
                    bookId: book.id
                })
            }
            const order = (book.no % 2 ? book.no + 1 : book.no)
            setActiveBook({ ...book, availableChapters: all })
            setActiveBookOrder(order)
        }
    }


    const result = (
        <div className="w-full rounded-lg  flex flex-wrap justify-start">
            {activeBook && activeBook.availableChapters && activeBook.availableChapters.map((chpt) => {

                return (
                    chpt.a ?
                        (
                            <Link
                                to={`${path}-result?bookId=${chpt.bookId}&ch=${chpt.v}&bookName=${activeBook.name}`}
                                className={`w-8 text-center py-1 text-ac-secondary font-semibold`}
                                key={chpt.v}
                            >
                                {chpt.v}
                            </Link>
                        )
                        :
                        <button
                            className="w-8 text-center py-1 text-ac-gray font-light"
                            key={chpt.v}

                        >
                            {chpt.v}
                        </button>
                )
            }
            )}

        </div>
    )

    return (
        <ResourceLayout title={title}>
            <MetaTag
                title={title}
                type="page"
                path={path}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
            />

            <div className="standard-max-w-px flex flex-wrap pb-24 flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 pr-2 sm:pl-0">
                    <div className="flex flex-wrap  ">
                        <div
                            className="flex w-full items-center justify-between pt-4 pb-2 text-lg border-b border-gray-300 mb-4 sticky top-0 bg-white"
                        >
                            <h2 className="font-roboto">{ac_strings.old_testimony}</h2>

                        </div>
                        <PlaceHolder loading={bible.old.length === 0}>
                            {bible && bible.old.map((book, i) => {
                                return (
                                    <div
                                        key={book.no}
                                        className="w-1/2 sm:1/4 md:1/6 py-2 inline-block pr-2 cursor-pointer"
                                        style={{ order: book.no }}
                                        onClick={(e) => { handleSelectActiveBook(e, book) }}

                                    >
                                        <OutlineScriptureChapter
                                            active={activeBook && activeBook.name === book.name}


                                        >
                                            {book.name}
                                        </OutlineScriptureChapter>
                                    </div>
                                )
                            })}

                            <div style={{ order: activeBookOrder }} className="w-full">
                                {result}
                            </div>

                        </PlaceHolder>
                    </div>

                </div>

                <div className="w-full sm:w-1/2  pl-2 pr-4">
                    <div className="flex flex-wrap">
                        <div
                            className="flex w-full items-center justify-between pt-4 pb-2 text-lg border-b border-gray-300 mb-4 bg-white"
                            style={{ order: bible.old.length }}
                        >
                            <h2 className="font-roboto">{ac_strings.new_testimony}</h2>
                        </div>
                        <PlaceHolder loading={bible.old.length === 0}>
                            {bible && bible.new.map((book, i) => {
                                return (
                                    <div
                                        key={book.no}
                                        className="w-1/2 sm:1/4 md:1/6 py-2 inline-block pr-2 cursor-pointer"
                                        style={{ order: book.no }}
                                        onClick={(e) => { handleSelectActiveBook(e, book) }}
                                    >
                                        <OutlineScriptureChapter
                                            active={activeBook && activeBook.name === book.name}


                                        >
                                            {book.name}
                                        </OutlineScriptureChapter>
                                    </div>
                                )
                            })}
                            <CSSTransition
                                timeout={500}
                                classNames="fade"
                                style={{ order: activeBookOrder }}
                                in={activeBookOrder !== undefined && activeBookOrder > bible.old.length}
                                unmountOnExit
                            >
                                {result}
                            </CSSTransition>
                        </PlaceHolder>
                    </div>
                </div>


            </div>
        </ResourceLayout>
    )
}

export default BibleNav

