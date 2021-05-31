import * as React from 'react';

interface ILogoProps {
    customColor?: string
    height: string | number
    width: string | number
}
const Logo: React.FC<ILogoProps> = ({ height, width, customColor }) => {
    const color = customColor ? customColor : "#FFAE0C"
    return (
        <svg style={{ height, width }} viewBox={`0 0 36 40`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3C9 1.34315 10.3431 0 12 0H14C15.6569 0 17 1.34315 17 3V5C17 6.65685 15.6569 8 14 8H12C10.3431 8 9 6.65685 9 5V3Z" fill={color} />
            <path d="M18 12C18 10.3431 19.3431 9 21 9H23C24.6569 9 26 10.3431 26 12V14C26 15.6569 24.6569 17 23 17H21C19.3431 17 18 15.6569 18 14V12Z" fill={color} />
            <path d="M9 34C9 32.3431 10.3431 31 12 31H14C15.6569 31 17 32.3431 17 34V36C17 37.6569 15.6569 39 14 39H12C10.3431 39 9 37.6569 9 36V34Z" fill={color} />
            <path d="M0 14V12C0 10.3431 1.34315 9 3 9H14C15.6569 9 17 10.3431 17 12V27C17 28.6569 15.6569 30 14 30H12C10.3431 30 9 28.6569 9 27V17H3C1.34315 17 0 15.6569 0 14Z" fill={color} />
        </svg>
    )
}

export default Logo
