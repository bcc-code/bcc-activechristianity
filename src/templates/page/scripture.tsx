import React from 'react'
import Link from '@/components/CustomLink'
import { CSSTransition } from 'react-transition-group'
import MetaTag from '@/components/Meta'
// components
import ResourceLayout from "@/layouts/ResourceLayout"

// Type
import { IPostItem, INavItem } from '@/types'
import { IBibleBook, IBible, IApiPost } from '@/types'

// Helper
import { other as otherApi } from '@/util/sdk'
import { fetchLocalPostsFromSlugs } from '@/helpers'


interface IBibleNavProps {
    path: string

    pageContext: {
        title: string
        breadcrumb: INavItem[]
    }
}

interface IAvailableChapter {
    v: number
    a: boolean
}

interface IActiveBook extends IBibleBook {
    availableChapters?: IAvailableChapter[]
}

const BibleNav: React.FC<IBibleNavProps> = ({ pageContext: { breadcrumb, title }, path }) => {
    const [bibleIndex, setBibleIndex] = React.useState<undefined | IBible>(undefined)
    const [activeChapter, setActiveChapter] = React.useState<undefined | number>(undefined)
    const [activeBook, setActiveBook] = React.useState<undefined | IActiveBook>(undefined)
    const [activeBookOrder, setActiveBookOrder] = React.useState<undefined | number>(undefined)
    const [searchResult, setSearchResult] = React.useState<IPostItem[]>([])

    React.useEffect(() => {
        fetchBible()
    }, [])

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
        setActiveChapter(chapter.v)
        return otherApi
            .biblePosts(book.id, chapter.v)
            .then((res: IApiPost[]) => {
                const postsSlugs = res.map(i => i.slug)
                return fetchLocalPostsFromSlugs(postsSlugs)
                    .then((posts: IPostItem[]) => {
                        setSearchResult(posts)
                    })
            })
    }


    const fetchBible = () => {

        return otherApi
            .bibleState()
            .then((bibleIndex: IBible) => {
                setBibleIndex(bibleIndex)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getBody = () => {
        if (!bibleIndex) {
            return (
                <div className="standard-max-w-px">
                    Loading
                </div>
            )
        } else {
            const bible: IBible = {
                old: bibleIndex.old,
                new: bibleIndex.new
            }

            const result = (
                <div className="w-full rounded-lg bg-d4athens flex flex-wrap justify-start">
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
                            className="w-full p-2 flex flex-col"
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
                                    Clear
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
                <div className="standard-max-w-px flex flex-wrap pb-24 flex-col sm:flex-row">
                    <div className="w-full sm:w-1/2 pr-2 sm:pl-0">
                        <div className="flex flex-wrap  ">
                            <div
                                className="flex w-full items-center justify-between pt-4 pb-2 text-lg border-b border-gray-300 mb-4 sticky top-0 bg-white"
                            >
                                <h2>Old Testament</h2>

                            </div>
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
                                in={activeBookOrder !== undefined && activeBookOrder < bibleIndex.old.length}
                                unmountOnExit
                            >

                                {result}
                            </CSSTransition>
                        </div>

                    </div>

                    <div className="w-full sm:w-1/2  pl-2 pr-4">
                        <div className="flex flex-wrap">
                            <div
                                className="flex w-full items-center justify-between pt-4 pb-2 text-lg border-b border-gray-300 mb-4 bg-white"
                                style={{ order: bibleIndex.old.length }}
                            >
                                <h2>New Testament</h2>
                            </div>
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
                                in={activeBookOrder !== undefined && activeBookOrder > bibleIndex.old.length}
                                unmountOnExit
                            >
                                {result}
                            </CSSTransition>
                        </div>
                    </div>


                </div>
            )
        }
    }
    return (
        <ResourceLayout title={title}>
            <MetaTag
                title={title}
                type="page"
                path={path}
                translatedUrls={[]}
                breadcrumb={breadcrumb}
            />
            {getBody()}
        </ResourceLayout>
    )
}

export default BibleNav 