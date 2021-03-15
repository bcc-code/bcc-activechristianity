import React from 'react'
import { useLocation } from '@reach/router';
import { getAllUrlParams } from '@/helpers/index-js'
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import { menusItems } from '@/strings/generated/menus.json'

// components

// Type
import { INavItem, IBibleBook, IBible, } from '@/types'
const acApiModule = import('@/util/api')
import PostList from '@/components/List/PostList'
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
    const { pageContext: { title }, path } = props

    const [posts, setPosts] = React.useState<string[]>([])
    const location = useLocation();
    const parsed = getAllUrlParams(location.search);
    const { bookid, ch, bookname } = parsed
    React.useEffect(() => {

        if (typeof bookid === "string" && typeof ch === "string") {
            acApiModule.then(res => {
                const acApi = res.default
                acApi.getScriptureChaptersPost(bookid, ch).then(res => {
                    console.log(res)
                    setPosts(res.biblePosts.map(item => item.slug))
                })
            })
        }
    }, [])
    return (
        <div className="mx-auto max-w-sm sm:p-0">
            <MetaTag
                title={title}
                type="page"
                path={path}
                translatedUrls={[]}
                breadcrumb={[menusItems.scripture]}
            />
            <div className={`px-4 pt-8 sm:pt-0`}>
                <PostList
                    posts={posts}
                />
            </div>
            <LayoutH1 title={`${bookname ? `${bookname} ${ch}` : title}`} />

        </div>
    )
}

export default BibleNav

