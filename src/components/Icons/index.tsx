import * as React from 'react'
import "./icon.css"
interface IIcon {
    className?: string
    size: "xs" | "mini" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
    name: "earth" |
    "hourglass" |
    "heart" |
    "eye" |
    "chat" |
    "download" |
    "upload" |
    "email-send" |
    "email" |
    "tag" |
    "heart-1" |
    "like" |
    "share" |
    "chain" |
    "bookmark-check" |
    "bookmark" |
    "chev-right" |
    "chev-left" |
    "chev-down" |
    "chev-up" |
    "right-arrow" |
    "left-arrow" |
    "down-arrow" |
    "up-arrow" |
    "microphone" |
    "photo-camera" |
    "play-button" |
    "file" |
    "newspaper" |
    "book" |
    "user" |
    "users" |
    "quill" |
    "more" |
    "search" |
    "filter" |
    "settings" |
    "menu" |
    "cancel" |
    "instagram" |
    "facebook" |
    "twitter" |
    "linkedin" |
    "youtube" |
    "mute" |
    "volume" |
    "play" |
    "notification" |
    "clock" |
    "star" |
    "simple-download" |
    "speaker" |
    "home" |
    "listen" |
    "watch"
}

const Icon: React.FC<IIcon> = ({ size, name, className }) => {
    return (
        <div className={`ac-icon-${size} flaticon-${name} ${className ? className : ''}`}></div>
    )
}

export default Icon