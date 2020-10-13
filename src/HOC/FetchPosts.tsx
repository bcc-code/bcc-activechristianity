import * as React from "react"
import { IPostItem, } from '@/types'
import { useSelector } from "react-redux";
import { RowPlaceholder, ListPlaceholder, OneTopImgPost } from '@/layout-parts/Loader/PlaceHolders'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'

interface IFetchPost {
    slugs: string[],
    layout: "row" | "list" | "one",
    render: (data: { posts: IPostItem[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ slugs, render, layout }) => {
    const [posts, setPosts] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetchLocalPostsFromSlugs(slugs)
            .then(res => {
                setLoading(false)
                if (res) {
                    setPosts(res)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [slugs])
    const getPlaceholder = {
        row: RowPlaceholder,
        list: ListPlaceholder,
        one: OneTopImgPost
    }

    const CustomPlacehoder = getPlaceholder[layout]
    return (

        <CustomPlacehoder
            loading={loading}
        >
            {render({ posts })}
        </CustomPlacehoder>
    )

}

export default FetchPosts