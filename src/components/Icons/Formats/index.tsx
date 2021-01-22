import * as React from 'react';
import { FolderIcon } from '@/components/Icons/MUI'
import { IIconProps } from '@/types'

const Animation: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <g filter="url(#filter0_d)">
                <path d="M18 0L19.82 3.64C19.9 3.8 19.78 4 19.6 4H17.62C17.24 4 16.89 3.79 16.73 3.45L15 0H13L14.82 3.64C14.9 3.8 14.78 4 14.6 4H12.62C12.24 4 11.89 3.79 11.73 3.45L10 0H8L9.82 3.64C9.9 3.8 9.78 4 9.6 4H7.62C7.24 4 6.89 3.79 6.72 3.45L5 0H4C2.9 0 2 0.9 2 2V14C2 15.1 2.9 16 4 16H20C21.1 16 22 15.1 22 14V1C22 0.45 21.55 0 21 0H18Z" fill="white" />
            </g>
            <defs>
                <filter id="filter0_d" x="0" y="0" width="24" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>

        </svg>
    )
}


const Commentary: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <g filter="url(#filter0_d)">
                <path fill-rule="evenodd" clipRule="evenodd" d="M4.90909 1H21.0909C22.1453 1 23 1.87359 23 2.95122V15.9756C23 17.0532 22.1453 18.0732 21.0909 18.0732H15.9938L13 21L10.0062 18.0732H4.90909C3.85473 18.0732 3 17.0532 3 15.9756V2.95122C3 1.87359 3.85473 1 4.90909 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 7.34146H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 11.2439H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>


        </svg>
    )
}

const Edification: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.48 11.35C13.91 7.27 8.32 7.05 9.67 1.12C9.77 0.680003 9.3 0.340003 8.92 0.570003C5.29 2.71 2.68 7 4.87 12.62C5.05 13.08 4.51 13.51 4.12 13.21C2.31 11.84 2.12 9.87 2.28 8.46C2.34 7.94 1.66 7.69 1.37 8.12C0.69 9.16 0 10.84 0 13.37C0.38 18.97 5.11 20.69 6.81 20.91C9.24 21.22 11.87 20.77 13.76 19.04C15.84 17.11 16.6 14.03 15.48 11.35ZM6.2 16.38C7.64 16.03 8.38 14.99 8.58 14.07C8.91 12.64 7.62 11.24 8.49 8.98C8.82 10.85 11.76 12.02 11.76 14.06C11.84 16.59 9.1 18.76 6.2 16.38Z" fill="white" />
                <path d="M15.48 11.35C13.91 7.27 8.32 7.05 9.67 1.12C9.77 0.680003 9.3 0.340003 8.92 0.570003C5.29 2.71 2.68 7 4.87 12.62C5.05 13.08 4.51 13.51 4.12 13.21C2.31 11.84 2.12 9.87 2.28 8.46C2.34 7.94 1.66 7.69 1.37 8.12C0.69 9.16 0 10.84 0 13.37C0.38 18.97 5.11 20.69 6.81 20.91C9.24 21.22 11.87 20.77 13.76 19.04C15.84 17.11 16.6 14.03 15.48 11.35ZM6.2 16.38C7.64 16.03 8.38 14.99 8.58 14.07C8.91 12.64 7.62 11.24 8.49 8.98C8.82 10.85 11.76 12.02 11.76 14.06C11.84 16.59 9.1 18.76 6.2 16.38Z" fill="white" />
            </svg>

        </svg>
    )
}

const Interview: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <g clip-path="url(#clip0)" filter="url(#filter0_d)">
                <path fill-rule="evenodd" clipRule="evenodd" d="M8.88886 18.6207L4.9 21L5.58477 16.9154C3.92535 15.5468 3 13.6508 3 11.5556C3 7.38274 6.67033 4 12.5 4C18.3297 4 22 7.38274 22 11.5556C22 15.7284 18.3297 19.1111 12.5 19.1111C11.1797 19.1111 9.97011 18.9376 8.88886 18.6207Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21.5556 14C22.4856 14.9235 23 16.147 23 17.4891C23 18.9335 22.4041 20.2406 21.3356 21.1841L21.7765 24L19.208 22.3597C18.5117 22.5782 17.7328 22.6978 16.8826 22.6978C13.8206 22.6978 11.6837 21.1462 11 19.013" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d" x="-2" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
                <clipPath id="clip0">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>

        </svg>
    )
}

const Playlist: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path fill-rule="evenodd" clipRule="evenodd" d="M18.5769 11C19.9152 11 21 12.1193 21 13.5V18.5C21 19.8807 19.9152 21 18.5769 21H15.7754C15.3472 21 15 20.6418 15 20.2V11.8C15 11.3582 15.3472 11 15.7754 11H18.5769Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21 15.945C21 14.3783 21 12.8264 21 11.2893C21 5.60667 16.5228 1 11 1C5.47715 1 1 5.60667 1 11.2893C1 12.8476 1 14.4179 1 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clipRule="evenodd" d="M3.42308 11H6.22462C6.65285 11 7 11.3582 7 11.8V20.2C7 20.6418 6.65285 21 6.22462 21H3.42308C2.08485 21 1 19.8807 1 18.5V13.5C1 12.1193 2.08485 11 3.42308 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const Podcast: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path d="M16 15V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 15V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21 12V8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 12V8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 19V1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const Question: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <g filter="url(#filter0_d)">
                <path d="M12 0C6.48 0 2 4.48 2 10C2 15.52 6.48 20 12 20C17.52 20 22 15.52 22 10C22 4.48 17.52 0 12 0ZM12 18C7.59 18 4 14.41 4 10C4 5.59 7.59 2 12 2C16.41 2 20 5.59 20 10C20 14.41 16.41 18 12 18ZM11 14H13V16H11V14ZM12.61 4.04C10.55 3.74 8.73 5.01 8.18 6.83C8 7.41 8.44 8 9.05 8H9.25C9.66 8 9.99 7.71 10.13 7.33C10.45 6.44 11.4 5.83 12.43 6.05C13.38 6.25 14.08 7.18 14 8.15C13.9 9.49 12.38 9.78 11.55 11.03C11.55 11.04 11.54 11.04 11.54 11.05C11.53 11.07 11.52 11.08 11.51 11.1C11.42 11.25 11.33 11.42 11.26 11.6C11.25 11.63 11.23 11.65 11.22 11.68C11.21 11.7 11.21 11.72 11.2 11.75C11.08 12.09 11 12.5 11 13H13C13 12.58 13.11 12.23 13.28 11.93C13.3 11.9 13.31 11.87 13.33 11.84C13.41 11.7 13.51 11.57 13.61 11.45C13.62 11.44 13.63 11.42 13.64 11.41C13.74 11.29 13.85 11.18 13.97 11.07C14.93 10.16 16.23 9.42 15.96 7.51C15.72 5.77 14.35 4.3 12.61 4.04Z" fill="white" />
            </g>
            <defs>
                <filter id="filter0_d" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>



        </svg>
    )
}

const Song: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path d="M4.5 21C6.433 21 8 19.433 8 17.5C8 15.567 6.433 14 4.5 14C2.567 14 1 15.567 1 17.5C1 19.433 2.567 21 4.5 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.5 19C19.433 19 21 17.433 21 15.5C21 13.567 19.433 12 17.5 12C15.567 12 14 13.567 14 15.5C14 17.433 15.567 19 17.5 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 18V3.26667L21 1V15.7333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 8L21 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const Testimony: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path d="M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z" fill="white" />
            <path d="M9 15C6.33 15 1 16.34 1 19V20C1 20.55 1.45 21 2 21H16C16.55 21 17 20.55 17 20V19C17 16.34 11.67 15 9 15ZM15.47 7.77C15.79 8.56 15.79 9.44 15.47 10.23C15.28 10.7 15.36 11.23 15.72 11.59L15.75 11.62C16.33 12.2 17.32 12.08 17.7 11.35C18.46 9.9 18.46 8.2 17.68 6.69C17.3 5.95 16.3 5.81 15.71 6.4L15.7 6.41C15.36 6.76 15.28 7.3 15.47 7.77ZM19.18 2.89C18.78 3.29 18.72 3.91 19.05 4.37C21.02 7.11 21.01 10.78 19.02 13.62C18.7 14.07 18.77 14.69 19.16 15.08L19.19 15.11C19.68 15.6 20.51 15.56 20.93 15.01C23.68 11.47 23.69 6.64 20.93 2.99C20.51 2.44 19.67 2.4 19.18 2.89Z" fill="white" />
        </svg>
    )
}



const Ebooks: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path fill-rule="evenodd" clipRule="evenodd" d="M3 20V4C3 2.89543 3.89543 2 5 2H21V18V22H5C3.89543 22 3 21.1046 3 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 8H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 12H12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

        </svg>
    )
}


export type IFormatKey = "testimony" | "question" | "message" | "commentary" | "song" | "edification" | "interview" | "animation" | "ebook" | "playlist" | "podcast"

export const categoriesMap = {
    "testimony": <Testimony customSize={20} />,
    "question": <Question customSize={20} />,
    /*     "message": <Podcast customSize={20} />, */
    "commentary": <Commentary customSize={20} />,
    "song": <Song customSize={20} />,
    "edification": <Edification customSize={20} />,
    "interview": <Interview customSize={20} />,
    "animation": <Animation customSize={20} />,
    "ebook": <Ebooks customSize={20} />,
    "playlist": <Playlist customSize={20} />,
    "podcast": <Podcast customSize={20} />,
    "fallback": <FolderIcon className="fill-white" customSize="5" />
}

export default categoriesMap