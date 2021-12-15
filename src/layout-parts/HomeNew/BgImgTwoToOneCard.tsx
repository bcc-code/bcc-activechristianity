import React from 'react';
import Link from '@/components/CustomLink';
import SquareImages from '@/components/Images/Image2To1';
import { IImage } from '@/types';

export interface IBgImgCard {
    title: string;
    slug: string;
    className?: string;
    image: IImage;
}

export const BgImgTwoToOneCard: React.FC<IBgImgCard> = ({ title, slug, image }) => {
    const overlayStyle = {
        dark: { background: '#020203', opacity: '0.3' },
        light: { background: '#9CA6BE', opacity: '0.68' },
        medium: { background: '#384156', opacity: '0.3' }
    };
    return (
        <Link to={`${slug}`} className="relative flex flex-col justify-center">
            <div className="absolute  flex flex-col z-20 px-4 text-white items-center w-full">
                {/* <div className="text-xxs pb-4">Bible Study</div> */}
                <h2
                    style={{ textShadow: '2px 2px 5px rgba(105,105,105,0.7)' }}
                    className={'text-2xl clamp3 mb-2 font-bold text-center md:text-xl'}
                >
                    {title}
                </h2>
            </div>
            <div className={`z-10 absolute inset-0 rounded-lg`} style={overlayStyle.dark}></div>
            <SquareImages className="rounded-lg" image={image} />
        </Link>
    );
};

export default BgImgTwoToOneCard;
