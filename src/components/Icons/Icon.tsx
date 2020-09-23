import * as Icons from '@material-ui/icons';
import * as React from 'react';

interface IIconProps {
    name: string
    size?: string
    color?: "primary" | "secondary" | "slate-dark" | "slate-light"
}
const IconWrapper: React.FC<IIconProps> = ({ name, size, color }) => {

    const Icon = Icons.FavoriteBorder
    const style: any = {}
    if (size) {
        style.fontSize = `${sizeMap[size]}rem`
    }

    if (color) {
        style.color = `${colorMap[color]}`
    }
    return (
        <Icon
            style={style}

        />
    )
}

export default IconWrapper
const colorMap = {
    "primary": "#FFAE0C",
    "secondary": "#4A75D1",
    "slate-dark": "#384156",
    "slate-light": "9CA6BE"
}
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