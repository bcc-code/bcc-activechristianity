import * as React from 'react'
import Link from '@/components/CustomLink'
import { INavItem } from '@/types'
import { FacebookIcon } from '@/components/Icons/SocialMedia'
export interface IQuoteBlock {
    author: INavItem
    url: string
    quote: string
    title: string
}

const QuoteBlock: React.FC<IQuoteBlock> = ({ quote, url, author }) => {
    return (
        <div className=" sm:mt-8 md:mt-12 lg:mt-16 sm:8 px-4 border rounded-xxl sm:rounded-xl relative">
            <div className="md:py-10 py-12 flex flex-col justify-center sm:leading-9 md:leading-10 lg:leading-11 items-center ">
                <div className="max-w-tablet text-center mb-4 font-serif font-light md:text-lg lg:text-xl ">
                    {quote}</div>
                <div className="text-center">
                    — Testimony from {author.name}, in <Link to={`/${url}`}>{url}</Link>
                </div>
            </div>
            <div className="absolute w-full flex justify-center align-center " style={{ bottom: "-20px" }}>
                <div className="px-1 py-2 bg-white flex">
                    <FacebookIcon />
                </div>

            </div>
        </div>
    )
}

export default QuoteBlock