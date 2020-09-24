import React from 'react'
import { graphql } from "gatsby"
import Link from '@/components/CustomLink'
import { CSSTransition } from 'react-transition-group'
import MetaTag from '@/components/Meta'
// components
import ResourceLayout from "@/layouts/ResourceLayout"
import CloseButtonRound from '@/layout-parts/Buttons/CloseButtonRound'
import PlaceHolder from '@/layout-parts/Loader/ScripturePlaceholder'
// Type
import { IPostItem, INavItem } from '@/types'
import { IBibleBook, IBible, IApiPost } from '@/types'

// Helper
/* import { other as otherApi } from '@/util/sdk' */
import acApi from '@/util/api'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.json'

interface IBibleNavProps {
    path: string

    pageContext: {
        title: string
        breadcrumb: INavItem[]
    }

    data: {
        ac: {
            bible: IBible
        }
    }
}

interface IAvailableChapter {
    v: number
    a: boolean
}

interface IActiveBook extends IBibleBook {
    availableChapters?: IAvailableChapter[]
}

const BibleNav: React.FC<IBibleNavProps> = (props) => {

    const { pageContext: { breadcrumb, title }, data: { ac: { bible } }, path } = props
    const [activeChapter, setActiveChapter] = React.useState<undefined | number>(undefined)
    const [activeBook, setActiveBook] = React.useState<undefined | IActiveBook>(undefined)
    const [activeBookOrder, setActiveBookOrder] = React.useState<undefined | number>(undefined)
    const [searchResult, setSearchResult] = React.useState<IPostItem[]>([])


    const clearSearch = () => {
        setSearchResult([])
        setActiveChapter(undefined)
    }
    const handleSelectActiveBook = (e: any, book: IBibleBook) => {

        clearSearch()
        if (activeBook && activeBook.availableChapters && book.no === activeBook.no) {
            setActiveBook(undefined)
            setActiveBookOrder(undefined)
        } else {

            const all: IAvailableChapter[] = []
            for (let v = 1; v <= book.total; v++) {
                all.push({
                    v,
                    a: book.chapters.indexOf(v) > -1
                })
            }
            const order = (book.no % 2 ? book.no + 1 : book.no)
            setActiveBook({ ...book, availableChapters: all })
            setActiveBookOrder(order)
        }
    }

    const handleSelectChapter = (book: any, chapter: any) => {
        console.log(book)
        setActiveChapter(chapter.v)
        return acApi
            .biblePosts(book.id, chapter.v)
            .then((res: { biblePosts: IApiPost[] }) => {
                console.log(res)
                const postsSlugs = res.biblePosts.map(i => i.slug)
                return fetchLocalPostsFromSlugs(postsSlugs)
                    .then((posts) => {
                        if (posts) {
                            setSearchResult(posts)

                        }
                    })
            })
    }


    const result = (
        <div className="w-full rounded-lg  flex flex-wrap justify-start">
            {activeBook && activeBook.availableChapters && activeBook.availableChapters.map((chpt) => {
                const handleClick = () => { handleSelectChapter(activeBook, chpt) }

                return (
                    chpt.a ?
                        <button
                            className={`w-8 text-center py-1 text-d4secondary font-semibold ${activeChapter === chpt.v ? "bg-gray-400" : ""}`}
                            key={chpt.v}
                            onClick={handleClick}
                            onKeyDown={handleClick}
                        >
                            {chpt.v}
                        </button>
                        :
                        <button
                            className="w-8 text-center py-1 text-d4gray font-light"
                            key={chpt.v}
                            onClick={handleClick}
                            onKeyDown={handleClick}
                        >
                            {chpt.v}
                        </button>
                )
            }
            )}

            {searchResult.length > 0 && (
                <div
                    className="w-full p-2 flex flex-col bg-d4athens"
                    style={{ order: activeBookOrder }}
                >
                    <div
                        className="w-full flex justify-end text-xs"
                    >
                        <button
                            className="p-2"
                            aria-label="close"
                            onClick={clearSearch}
                        >
                            <CloseButtonRound />
                        </button>
                    </div>
                    {searchResult.map(({ title, slug }, i) => {

                        return <Link to={slug} className="p-2 font-semibold">{title}</Link>
                    })}
                </div>
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
                                        className="w-1/2 sm:1/4 md:1/6 py-2 inline-block"
                                        style={{ order: book.no }}
                                    >
                                        <button
                                            className={`border border-d4gray hover:border-d4slate-dark rounded-lg py-1 px-2 font-semibold ${activeBook && activeBook.name === book.name ? 'bg-d4slate-dark text-white' : 'text-d4slate-dark bg-white'}`}
                                            onClick={(e) => { handleSelectActiveBook(e, book) }}
                                        >
                                            {book.name}
                                        </button>
                                    </div>
                                )
                            })}
                            <CSSTransition
                                timeout={500}
                                classNames="fade"
                                style={{ order: activeBookOrder }}
                                in={activeBookOrder !== undefined && activeBookOrder < bible.old.length}
                                unmountOnExit
                            >

                                {result}
                            </CSSTransition>
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
                                        className="w-1/2 sm:1/4 md:1/6 py-2 inline-block"
                                        style={{ order: book.no }}
                                    >
                                        <button
                                            className={`border border-d4gray hover:border-d4slate-dark rounded-lg py-1 px-2 font-semibold ${activeBook && activeBook.name === book.name ? 'bg-d4slate-dark text-white' : 'text-d4slate-dark bg-white'}`}
                                            onClick={(e) => { handleSelectActiveBook(e, book) }}
                                        >
                                            {book.name}
                                        </button>
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

export const pageQuery = graphql`
    query BiblePosts {
        ac {
            bible {
                old {
                    chapters
                    id
                    no
                    total
                    name
                }
                new {
                    chapters
                    id
                    no
                    total
                    name
                }
            }
        }
    }
`

