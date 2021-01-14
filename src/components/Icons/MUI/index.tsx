import * as React from 'react';
import { IIconProps } from '@/types'

const sizeMap = {
    '0': 0,
    '1': 0.25,
    '2': 0.5,
    '3': 0.75,
    '4': 1,
    '5': 1.25,
    '6': 1.5,
    '8': 2,
    '10': 2.5,
    '12': 3,
    '14': 3.5,
    '15': 3.75,
    '16': 4,
    '18': 4.5,
    '20': 5,
    '24': 6,
    '28': 7,
    '32': 8,
    '36': 9,
    '40': 10,
    '48': 12,
    '56': 14,
    '64': 16,
}

export type IButtonColour = "primary" | "secondary" | "slate-dark" | "slate-light" | "white"

export const AccessTimeIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>

    )
}

export const AddIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />

        </svg>

    )
}


export const ArrowForwardIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>

    )
}


export const ArrowRightAltIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
        </svg>

    )
}


export const BookmarkIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
        </svg>

    )
}


export const BookmarkBorderIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>

    )
}


export const BookmarksIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z" />
        </svg>

    )
}


export const CachedIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 01-2.8-.7l-1.46 1.46A7.93 7.93 0 0012 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0012 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
        </svg>

    )
}

export const ChatIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
        </svg>

    )
}

export const CheckIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >

        </svg>

    )
}


export const CheckBoxIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>

    )
}


export const CheckBoxOutlineBlankIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>

    )
}


export const CloseIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >

            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>

    )
}


export const DescriptionIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />

        </svg>

    )
}


export const EmojiPeopleIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path fill="none" d="M0 0h24v24H0z" /><circle cx="12" cy="4" r="2" /><path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 6.99 6 4.75 6 2H4c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.95 14l1.41-1.41-4.47-4.48z" />
        </svg>

    )
}


export const EqualizerIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" />
        </svg>

    )
}


export const EventIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
        </svg>

    )
}

//ExpandMore
export const ExpandMoreIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>

    )
}

export const ExploreIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
        </svg>

    )
}

export const FilterListIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
        </svg>

    )
}

export const FirstPageIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" /><path d="M24 24H0V0h24v24z" fill="none" />
        </svg>

    )
}

export const FolderIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>

    )
}

export const GetAppIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>

    )
}

export const GroupAddIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
        </svg>

    )
}

export const HeadsetIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" opacity=".1" />
            <path d="M12 1a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 00-9-9z" />
        </svg>

    )
}

export const HomeIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" opacity=".1" />
            <path d="M12 1a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 00-9-9z" />

        </svg>

    )
}

export const KeyboardArrowDownIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0V0z" fill="none" /><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>

    )
}

export const KeyboardArrowLeftIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>

    )
}

export const KeyboardArrowRightIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>

    )
}

export const LastPageIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
        </svg>

    )
}

export const LaunchIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg>

    )
}

export const LocalOfferIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
        </svg>

    )
}

export const LocationOnIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
        </svg>

    )
}

export const MenuIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>

    )
}

export const MoreVertIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>

    )
}

export const PlayArrowRoundedIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M8 5v14l11-7z" />
        </svg>

    )
}

export const PlayCircleOutlineIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path fill="none" d="M0 0h24v24H0z" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5l7-4.5-7-4.5v9z" />
        </svg>

    )
}

export const PublishIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
        </svg>

    )
}

export const SearchIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>

    )
}

export const ShareOutlinedIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>

    )
}

export const VisibilityIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>

    )
}

export const VolumeUpRoundedIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z" />
        </svg>

    )
}

export const WatchLaterIcon: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${sizeMap[customSize]}rem` : "24"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            style={{
                height: size,
                width: size
            }}
            className={className ? className : `fill-current`}
        >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
        </svg>

    )
}

