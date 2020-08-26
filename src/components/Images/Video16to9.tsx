
import * as React from 'react';


interface IVideoHeader {
    className: string
    src: string
}
const VideoHeader: React.FC<IVideoHeader> = (props) => {

    const { src, className } = props

    return (
        <div className={`embed-responsive embed-responsive-16by9 ${className}`}>
            <iframe

                src={src}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            >

            </iframe>
        </div>
    )
}

export default VideoHeader