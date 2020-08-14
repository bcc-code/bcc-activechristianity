import * as React from 'react';
import { IIconProps } from '@/types'

const TalkingBubble: React.SFC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : undefined
    const customClassName = className ? className : 'w-6 h-6';
    return (
        <svg
            className={`fill-current stroke-current ${customClassName}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path d="M5.625 13.75H6.625C6.625 13.1977 6.17728 12.75 5.625 12.75V13.75ZM5.625 18.75H4.625C4.625 19.1545 4.86864 19.5191 5.24232 19.6739C5.61599 19.8287 6.04611 19.7431 6.33211 19.4571L5.625 18.75ZM10.625 13.75V12.75C10.3598 12.75 10.1054 12.8554 9.91789 13.0429L10.625 13.75ZM15.75 0.25H4.25V2.25H15.75V0.25ZM4.625 13.75V18.75H6.625V13.75H4.625ZM6.33211 19.4571L11.3321 14.4571L9.91789 13.0429L4.91789 18.0429L6.33211 19.4571ZM10.625 14.75H15.75V12.75H10.625V14.75ZM4.25 14.75H5.625V12.75H4.25V14.75ZM0.25 4.25V7.5H2.25V4.25H0.25ZM0.25 7.5V10.75H2.25V7.5H0.25ZM19.75 10.75V7.5H17.75V10.75H19.75ZM19.75 7.5V4.25H17.75V7.5H19.75ZM4.25 12.75C3.14543 12.75 2.25 11.8546 2.25 10.75H0.25C0.25 12.9591 2.04086 14.75 4.25 14.75V12.75ZM15.75 14.75C17.9591 14.75 19.75 12.9591 19.75 10.75H17.75C17.75 11.8546 16.8546 12.75 15.75 12.75V14.75ZM4.25 0.25C2.04086 0.25 0.25 2.04086 0.25 4.25H2.25C2.25 3.14543 3.14543 2.25 4.25 2.25V0.25ZM15.75 2.25C16.8546 2.25 17.75 3.14543 17.75 4.25H19.75C19.75 2.04086 17.9591 0.25 15.75 0.25V2.25Z" />
            <path
                d="M5.625 7.5H5.6375M10 7.5H10.0125M14.375 7.5H14.3875"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}

export default TalkingBubble