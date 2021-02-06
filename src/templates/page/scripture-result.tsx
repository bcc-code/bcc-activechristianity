import React from 'react'
import { useLocation } from '@reach/router';
import { getAllUrlParams } from '@/helpers'
import MetaTag from '@/components/Meta'
import { LayoutH1 } from '@/components/Headers'
import { menusItems } from '@/strings/generated/menus.json'

// components

// Type
import { INavItem, IBibleBook, IBible, } from '@/types'
const acApi = import('@/util/api')
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
    const { bookId, ch, bookName } = parsed
    React.useEffect(() => {

        if (typeof bookId === "string" && typeof ch === "string") {
            acApi.getScriptureChaptersPost(bookId, ch).then(res => {
                setPosts(res.biblePosts.map(item => item.slug))
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
            <LayoutH1 title={`${bookName ? `${bookName} ${ch}` : title}`} />
            <PostList
                posts={posts}
            />
        </div>
    )
}

export default BibleNav

