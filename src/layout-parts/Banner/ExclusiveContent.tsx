import * as React from 'react'
import PostTitle from '@/components/PostElements/TextSizeWClamp'
const Banner = () => {
    return (
        <div className="relative bg-white w-full bg-d4athens p-8 mx-auto pt-8 flex items-center" style={{ height: "360px" }}>
            <div className="standard-max-w w-full flex flex-col sm:flex-row">
                <div className="w-full xs:w-8/12">
                    <PostTitle
                        rawText={"Get Exclusive Content"}
                        bold="font-semibold"
                        fontKey="header-post"
                        clamp={3}
                        className="mb-4"
                    />
                    <div className="sm:text-text-lg">
                        <p>Exclusive access to wallpapers, ebooks</p>
                        <p>Possibilities to save posts and get customized content</p>
                    </div>
                </div>
                <div className="flex w-full xs:w-4/12 items-center justify-center py-8">
                    <button className="w-1/2 sm:text-base sm:w-auto py-2 sm:py-4 px-4 sm:px-12 mr-2 rounded-xxl font-semibold text-blue-600 text-lg border border-blue-600 hover:bg-blue-400 hover:text-white">
                        Login
                </button>
                    <button className="w-1/2 sm:text-base sm:w-auto py-2 sm:py-4 px-4 sm:px-12 rounded-xxl font-semibold bg-blue-600 text-white text-lg border border-blue-600 hover:bg-blue-400 ">
                        Register
                </button>
                </div>
            </div>
        </div>
    )
}

export default Banner