import React from 'react'

const fillColor = "#9ca6be"
interface IPlayPauseProps { border?: boolean }
const PlayPauseWrapper: React.FC<IPlayPauseProps> = ({ children, border }) => (
    <svg
        role="button"
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        className={`${border ? 'border border-d4cadet-blue rounded-lg' : ''} fill-current`}

    >
        {children}

    </svg>
)

export const PlayButton: React.FC<IPlayPauseProps> = ({ border }) => {
    return (
        <PlayPauseWrapper border={border}>
            <polygon
                key="play"
                points="14,11 26,18 14,25"
                style={{ transformOrigin: '100% 50%' }}
            />
        </PlayPauseWrapper>
    )
}


export const PauseButton: React.FC<IPlayPauseProps> = ({ border }) => {
    return (
        <PlayPauseWrapper border={border}>
            <g key="pause" style={{ transformOrigin: '0% 50%' }}>
                <rect x="12" y="11" width="4" height="14" />
                <rect x="20" y="11" width="4" height="14" />
            </g>

        </PlayPauseWrapper>
    )
}

interface IPlayPauseControlProps {
    fullScreenInfo: boolean
    handleClick: () => void
    playPause: boolean
    border: boolean
}

export const PlayPauseControl: React.FC<IPlayPauseControlProps> = ({ fullScreenInfo, handleClick, playPause, border }) => {
    return (
        <div className={`flex items-center mx-4 ${fullScreenInfo ? 'py-2 sm:py-8' : ''}`}>
            <button onClick={handleClick}>{playPause ? <PauseButton border={border} /> : <PlayButton border={border} />}</button>
        </div>
    )
}
export const Repeat: React.FC<any> = (props) => {

    const { isActive, ...rest } = props
    const fill = isActive ? '#8bb955' : fillColor
    return (
        <svg width="36px" height="36px" viewBox="0 0 36 36" {...rest}>
            {/* <circle fill="#373D3F" cx="18" cy="18" r="18" /> */}
            <path fill={fill} d="M12.5,16.5c0-1.103,0.897-2,2-2H21v2l3-3l-3-3v2h-6.5c-2.206,0-4,1.794-4,4v4h0l2-2V16.5z" />
            <path fill={fill} d="M25.5,15.5l-2,2v2c0,1.103-0.897,2-2,2H15v-2l-3,3l3,3v-2h6.5c2.206,0,4-1.794,4-4L25.5,15.5L25.5,15.5z" />
        </svg>
    )
}

interface INextTrackProps {
    onClick: () => void
    className: string
}
export const PrevTrack: React.FC<INextTrackProps> = (props) => (
    <svg width="36px" height="36px" viewBox="0 0 10 12" {...props}>
        <polygon fill={fillColor} points="10,0 2,4.8 2,0 0,0 0,12 2,12 2,7.2 10,12" />
    </svg>
)

export const NextTrack: React.FC<INextTrackProps> = (props) => (
    <svg width="36px" height="36px" viewBox="0 0 10 12" {...props}>
        <polygon fill={fillColor} points="8,0 8,4.8 0,0 0,12 8,7.2 8,12 10,12 10,0" />
    </svg>
)

export const ArrowDown: React.FC = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path fill={fillColor} d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        <path fill="none" d="M0 0h24v24H0V0z" />
    </svg>
)

export const FullScreenIcon: React.FC = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill={fillColor} d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
)

export const Playlist: React.FC<any> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path fill={fillColor} d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
    </svg>
)


