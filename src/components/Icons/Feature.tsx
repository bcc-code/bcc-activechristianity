import * as React from 'react';
import { IIconProps } from '@/types'
const Star: React.SFC<IIconProps> = ({ customSize, className }) => {
    let customeClassName = className ? className : `w-6 h-6`
    return (
        <svg
            className={`stroke-current ${customeClassName}`}
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7.37939 0.802236C7.30041 0.618825 7.11986 0.5 6.92017 0.5C6.72047 0.5 6.53992 0.618825 6.46094 0.802236L4.95608 4.29667L1.16765 4.64803C0.968809 4.66648 0.800008 4.80147 0.738299 4.99139C0.676589 5.18131 0.733807 5.38974 0.883834 5.52154L3.74221 8.03258L2.90569 11.7442C2.86178 11.939 2.938 12.1412 3.09956 12.2586C3.26112 12.376 3.47703 12.386 3.64873 12.284L6.92017 10.3415L10.1916 12.284C10.3633 12.386 10.5792 12.376 10.7408 12.2586C10.9023 12.1412 10.9785 11.939 10.9346 11.7442L10.0981 8.03258L12.9565 5.52154C13.1065 5.38974 13.1637 5.18131 13.102 4.99139C13.0403 4.80147 12.8715 4.66648 12.6727 4.64803L8.88425 4.29667L7.37939 0.802236Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Star