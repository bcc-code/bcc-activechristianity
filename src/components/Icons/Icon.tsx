
import Home from '@material-ui/icons/Home'
import Close from '@material-ui/icons/Close'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Visibility from '@material-ui/icons/Visibility'
import GetApp from '@material-ui/icons/GetApp'
import VolumeUpRounded from '@material-ui/icons/VolumeUpRounded'
import AccessTime from '@material-ui/icons/AccessTime'
import Description from '@material-ui/icons/Description'
import Equalizer from '@material-ui/icons/Equalizer'
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import OndemandVideo from '@material-ui/icons/OndemandVideo'
import Headset from '@material-ui/icons/Headset'
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded'
import ShareOutlined from '@material-ui/icons/ShareOutlined'
import Cached from '@material-ui/icons/Cached'
import BookmarkBorder from '@material-ui/icons/BookmarkBorder'
import Bookmark from '@material-ui/icons/Bookmark'
import Check from '@material-ui/icons/Check'
import Add from '@material-ui/icons/Add'
import Search from '@material-ui/icons/Search'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FilterList from '@material-ui/icons/FilterList'
import Menu from '@material-ui/icons/Menu'
import Launch from '@material-ui/icons/Launch'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Explore from '@material-ui/icons/Explore'
import Bookmarks from '@material-ui/icons/Bookmarks'
import Publish from '@material-ui/icons/Publish'
import LocalOffer from '@material-ui/icons/LocalOffer'
import VolumeUp from '@material-ui/icons/VolumeUp'
import MoreVert from '@material-ui/icons/MoreVert'
import Folder from '@material-ui/icons/Folder'
type IMUIIConName = "Home" |
    "Explore" |
    "Close" |
    "KeyboardArrowRight" |
    "KeyboardArrowDown" |
    "Visibility" |
    "GetApp" |
    "Description" |
    "VolumeUpRounded" |
    "AccessTime" |
    "Description" |
    "Equalizer" |
    "PlayCircleOutline" |
    "OndemandVideo" |
    "Headset" |
    "PlayArrowRounded" |
    "PlayArrowRounded" |
    "ShareOutlined" |
    "Cached" |
    "BookmarkBorder" |
    "Bookmark" |
    "Check" |
    "Add" |
    "Search" |
    "ArrowForward" |
    "ExpandMore" |
    "FilterList" |
    "Menu" |
    "Launch" |
    "KeyboardArrowLeft" |
    "Bookmarks" |
    "Publish" |
    "LocalOffer" |
    "VolumeUp" |
    "MoreVert"
"Folder"

    ;

const Icons = {
    Home,
    Close,
    KeyboardArrowRight,
    KeyboardArrowDown,
    Visibility,
    GetApp,
    Description,
    VolumeUpRounded,
    AccessTime,
    Equalizer,
    PlayCircleOutline,
    OndemandVideo,
    Headset,
    PlayArrowRounded,
    ShareOutlined,
    Cached,
    BookmarkBorder,
    Bookmark,
    Check,
    Add,
    Search,
    ArrowForward,
    ExpandMore,
    FilterList,
    Menu,
    Launch,
    KeyboardArrowLeft,
    Explore,
    Bookmarks,
    Publish,
    LocalOffer,
    VolumeUp,
    MoreVert,
    Folder
}
import * as React from 'react';

export type IButtonColour = "primary" | "secondary" | "slate-dark" | "slate-light" | "white"
interface IIconProps extends IIconStyle {
    name: IMUIIConName

}



interface IIconStyle {
    size?: string
    color?: IButtonColour
}

const getIconStyle = (props: IIconStyle) => {
    const { size, color } = props
    const style: any = {}
    if (size) {
        style.fontSize = `${sizeMap[size]}rem`
    }

    if (color) {
        style.color = `${colorMap[color]}`
    }
    return style
}
const IconWrapper: React.FC<IIconProps> = ({ name, ...rest }) => {
    const Icon = Icons[name]
    const style: any = getIconStyle(rest)

    if (Icon) {
        return (
            <Icon
                style={style}

            />
        )
    } else {
        console.log('Cannot find this Icon')
        console.log(name)
        return null
    }

}

export default IconWrapper
const colorMap = {
    "primary": "#FFAE0C",
    "secondary": "#4A75D1",
    "slate-dark": "#384156",
    "slate-light": "#9CA6BE",
    "white": "#FFF"
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