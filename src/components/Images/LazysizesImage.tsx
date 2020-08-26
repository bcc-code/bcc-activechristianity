
import * as React from 'react';
import { IImage } from '@/types'
import 'lazysizes';

interface ILazysizes extends IImage {
    className: string
}
const LazysizesFeaturedImage: React.FC<ILazysizes> = (props) => {

    const { src, srcset, dataUri, alt, className } = props
    return (
        <img
            className={`lazyload ${className}`}
            data-sizes="auto"
            data-src={dataUri || src}
            data-srcset={srcset || src}
        />
    )
}

export default LazysizesFeaturedImage