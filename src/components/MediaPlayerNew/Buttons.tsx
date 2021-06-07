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

export const AudioButton = () => (
    <svg width="36px" height="36px" viewBox="0 0 36 36" >
        {/* <circle fill={fillColor} cx="18" cy="18" r="18" /> */}
        <polygon fill={fillColor} points="11,14.844 11,21.442 14.202,21.442 17.656,25 17.656,11 14.074,14.844" />
        <path key="first-bar" fill={fillColor} d="M24.024,14.443c-0.607-1.028-1.441-1.807-2.236-2.326c-0.405-0.252-0.796-0.448-1.153-0.597c-0.362-0.139-0.682-0.245-0.954-0.305c-0.058-0.018-0.104-0.023-0.158-0.035v1.202c0.2,0.052,0.421,0.124,0.672,0.22c0.298,0.125,0.622,0.289,0.961,0.497c0.662,0.434,1.359,1.084,1.864,1.94c0.26,0.424,0.448,0.904,0.599,1.401c0.139,0.538,0.193,0.903,0.216,1.616c-0.017,0.421-0.075,1.029-0.216,1.506c-0.151,0.497-0.339,0.977-0.599,1.401c-0.505,0.856-1.202,1.507-1.864,1.94c-0.339,0.209-0.663,0.373-0.961,0.497c-0.268,0.102-0.489,0.174-0.672,0.221v1.201c0.054-0.012,0.1-0.018,0.158-0.035c0.272-0.06,0.592-0.166,0.954-0.305c0.358-0.149,0.748-0.346,1.153-0.597c0.795-0.519,1.629-1.298,2.236-2.326C24.639,20.534,24.994,19.273,25,18C24.994,16.727,24.639,15.466,24.024,14.443z" />
        <path key="second-bar" fill={fillColor} d="M21.733,18c0-1.518-0.91-2.819-2.211-3.402v6.804C20.824,20.818,21.733,19.518,21.733,18z" />
    </svg>
)

export const VolumeBarGroup: React.FC<any> = ({ media: { volume, muteUnmute, setVolume } }) => {
    const updateVolume = (e: any) => {
        setVolume(e.target.value / 100)
    }

    return (
        <div className="volume-bar flex">
            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 2V18L6 13H1V7H6L11 2Z" stroke="#9CA6BE" />
                <path d="M13 6.12598C14.7252 6.57002 16 8.13612 16 9.99996C16 11.8638 14.7252 13.4299 13 13.8739" stroke="#9CA6BE" />
            </svg>
            <input className="block mp--volume-seekbar" type="range" value={volume * 100} min={0} max={100} onChange={updateVolume} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.5 0.792847V1.99995V18V19.2071L10.6464 18.3535L5.79289 13.5H1H0.5V13V6.99995V6.49995H1H5.79289L10.6464 1.6464L11.5 0.792847ZM10.5 3.20706L6.35355 7.35351L6.20711 7.49995H6H1.5V12.5H6H6.20711L6.35355 12.6464L10.5 16.7928V3.20706ZM15.5 9.99991C15.5 8.36974 14.3851 6.99871 12.8754 6.61015L13.1246 5.64171C15.0654 6.14123 16.5 7.90241 16.5 9.99991C16.5 12.0974 15.0654 13.8586 13.1246 14.3581L12.8754 13.3897C14.3851 13.0011 15.5 11.6301 15.5 9.99991ZM13.8574 3.7691C16.5427 4.56828 18.5 7.05621 18.5 9.99999C18.5 12.9438 16.5427 15.4317 13.8574 16.2309L14.1426 17.1893C17.2403 16.2674 19.5 13.3983 19.5 9.99999C19.5 6.60173 17.2403 3.73256 14.1426 2.81064L13.8574 3.7691Z" fill="#9CA6BE" />
            </svg>


        </div>
    )
}

export const MuteUnmuteButton: React.FC<any> = ({ media: { volume, muteUnmute }, className }) => (
    <svg width="36px" height="36px" viewBox="0 0 36 36" className={className} onClick={muteUnmute}>
        {/* <circle fill={fillColor} cx="18" cy="18" r="18" /> */}
        <polygon fill={fillColor} points="11,14.844 11,21.442 14.202,21.442 17.656,25 17.656,11 14.074,14.844" />
        {volume >= 0.5 &&
            <path key="first-bar" fill={fillColor} d="M24.024,14.443c-0.607-1.028-1.441-1.807-2.236-2.326c-0.405-0.252-0.796-0.448-1.153-0.597c-0.362-0.139-0.682-0.245-0.954-0.305c-0.058-0.018-0.104-0.023-0.158-0.035v1.202c0.2,0.052,0.421,0.124,0.672,0.22c0.298,0.125,0.622,0.289,0.961,0.497c0.662,0.434,1.359,1.084,1.864,1.94c0.26,0.424,0.448,0.904,0.599,1.401c0.139,0.538,0.193,0.903,0.216,1.616c-0.017,0.421-0.075,1.029-0.216,1.506c-0.151,0.497-0.339,0.977-0.599,1.401c-0.505,0.856-1.202,1.507-1.864,1.94c-0.339,0.209-0.663,0.373-0.961,0.497c-0.268,0.102-0.489,0.174-0.672,0.221v1.201c0.054-0.012,0.1-0.018,0.158-0.035c0.272-0.06,0.592-0.166,0.954-0.305c0.358-0.149,0.748-0.346,1.153-0.597c0.795-0.519,1.629-1.298,2.236-2.326C24.639,20.534,24.994,19.273,25,18C24.994,16.727,24.639,15.466,24.024,14.443z" />
        }
        {volume > 0 &&
            <path key="second-bar" fill={fillColor} d="M21.733,18c0-1.518-0.91-2.819-2.211-3.402v6.804C20.824,20.818,21.733,19.518,21.733,18z" />
        }
        {volume === 0 &&
            <polygon key="mute" fill={fillColor} points="24.839,15.955 23.778,14.895 21.733,16.94 19.688,14.895 18.628,15.955 20.673,18 18.628,20.045 19.688,21.106 21.733,19.061 23.778,21.106 24.839,20.045 22.794,18 " />
        }
    </svg>
)

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


