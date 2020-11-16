import * as React from 'react'
import Image2To1 from '@/components/Images/Image2To1'
import { IPostItem } from '@/types'
import Bookmark from '@/components/PostElements/ToggleBookmark'
import { AuthorLink } from '@/components/PostElements'

const PostItemCard: React.FC<IPostItem> = (item) => {
    return (
        <div className="flex flex-col shadow rounded-lg overflow-hidden">

            <Image2To1
                className="rounded-t-lg"
                image={item.image}
            />
            <div className="overflow-hidden bg-white p-4 pt-6">
                <div className="uppercase font-bold text-d4gray-dark text-xs pb-1">{item.reading_time?.minutes ? item.reading_time?.minutes : '2 mins read'}</div>
                <div className="pb-5">
                    <h3 className="leading-normal"
                        style={{
                            fontSize: "18px",
                            paddingBottom: "18px",
                            fontWeight: 800,
                            WebkitLineClamp: 3,
                            display: "-webkit-box",
                            textOverflow: 'ellipsis',
                            height: "81px",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}>
                        {item.title}
                    </h3>
                    <span
                        className="leading-normal"
                        style={{
                            fontSize: "14px",
                            color: "#4F4F4F",
                            WebkitLineClamp: 2,
                            display: "-webkit-box",
                            textOverflow: 'ellipsis',
                            height: "42px",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}
                    >
                        {item.excerpt}
                    </span>

                </div>
                <div className="w-full flex justify-between items-center text-d4slate-dark" >
                    <div style={{ fontSize: "12px" }}>
                        {item.authors && (
                            <AuthorLink
                                authorGroups={item.authors}
                            />
                        )}
                    </div>
                    <Bookmark id={item.id} color="slate-dark" />
                </div>

            </div>
        </div>
    )
}

export default PostItemCard