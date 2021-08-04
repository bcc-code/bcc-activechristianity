import React from 'react';

interface IProps {
	loaded: number;
	played: number;
	handleSeekChange: (e: any) => void;
	className: string;
}
const Seekbar: React.FC<IProps> = ({ loaded, played, handleSeekChange, className }) => {
	return (
		<div className={`flex items-center relative flex-1 w-full text-mp-text ${className}`}>
			<progress max="100" className="mp--progress absolute my-0 mx-4 rounded" value={loaded * 100}></progress>
			<input
				type="range"
				step="any"
				value={played}
				max={0.999999}
				className="mp--seekbar mx-4 my-0"
				style={{
					backgroundSize: `${played * 100}% 100%`
				}}
				onChange={handleSeekChange}
			/>
		</div>
	);
};

export default Seekbar;
