import * as React from 'react';
import Lazysizes from '@/components/Images/LazysizesImage'
import { IImage } from '@/types';
interface IEbookCover {
    title: string
    image: IImage
    full?: boolean
}
export const EbookHardCover: React.SFC<IEbookCover & { className: string }> = ({ title, image, full, className }) => (
    <div className={className}>
        <div className="absolute h-full w-2" style={{ left: "-3px", background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.56) 50%, rgba(255, 255, 255, 0) 100%)" }} ></div>
        <div className={`absolute h-full w-2 ${full ? '' : 'hidden'} sm:block`} style={{ left: "5px", background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.56) 50%, rgba(255, 255, 255, 0) 100%)" }} ></div>
        <Lazysizes
            {...image}
            className=""
        />
    </div>
)
const Ebook: React.SFC<IEbookCover> = (props) => {
    const { full } = props
    return (
        <div className=" flex flex-col items-center">
            <EbookHardCover
                className={`z-10 relative rounded ${full ? 'w-28' : 'w-16 sm:w-20 '} md:w-24 lg:w-28`}
                {...props}
            />
            <div className={`${full ? '' : 'hidden'} md:block md:w-40 lg:w-40 -mt-2 relative`} >
                <svg className="absolute" style={{ left: full ? "3rem" : "1.6rem" }} width="27" height="7" viewBox="0 0 27 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.745453 0.436523L26.2727 6.32744V0.436523H0.745453Z" fill="#D4D4D4" />
                </svg>

                <svg className="w-full" height="13" viewBox="0 0 216 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7455 0.436523L0 12.2184H216L202.255 0.436523H13.7455Z" fill="url(#paint0_linear)" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="108" y1="0.436523" x2="108" y2="12.2184" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAEAEA" />
                            <stop offset="1" stop-color="white" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="absolute w-full" style={{ top: full ? "12px" : "10px" }} height="12" viewBox="0 0 216 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.21875V12.0006H216V0.21875H0Z" fill="#EAEAEA" />
                </svg>
            </div>
        </div>
    )
}

export default Ebook