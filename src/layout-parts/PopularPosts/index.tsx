import React from 'react';
import NoImgItem from '@/components/PostItemCards/NoImgItem'
import { IPostItem } from '@/types'
import shortid from 'shortid';


interface IProps {
    title: string
    small?: boolean
    posts: IPostItem[]
    playIcon?: boolean
}
const PopularPosts: React.FC<IProps> = ({ posts, title, playIcon, small }) => {
    return (

        <div className="p-4 rounded-lg w-full" style={{ backgroundImage: 'linear-gradient(#edf2f7,#fff)' }}>
            <div className="flex flex-col pb-4">
                <h6 className="font-roboto block text-lg pb-4">{title}</h6>
                <ol className="w-full">
                    {posts.map((post, i) => {
                        return (
                            <NoImgItem {...post} index={i} small={small} playIcon={playIcon} key={shortid()} />
                        )
                    })}
                </ol>
            </div>
        </div>

    )
}

export default PopularPosts