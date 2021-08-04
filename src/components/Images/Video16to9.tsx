import * as React from 'react';

interface IVideoHeader {
	className: string;
	src: string;
}

function getId(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return match && match[2].length === 11 ? match[2] : null;
}

const VideoHeader: React.FC<IVideoHeader> = props => {
	const { className } = props;
	const videoId = getId(props.src);
	const url = 'https://www.youtube.com/embed/' + videoId;

	return (
		<div className={`embed-responsive embed-responsive-16by9 ${className}`}>
			<iframe
				src={url}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	);
};

export default VideoHeader;
