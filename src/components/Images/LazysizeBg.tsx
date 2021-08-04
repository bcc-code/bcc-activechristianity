import Lazysizes from '@/components/Images/LazysizesImage';
import Read from '@/templates/recommend/read-recommend';
import { IImage } from '@/types';
import * as React from 'react';

interface IState {
	isFullWidth: boolean;
}
class LazysizesImg extends React.Component<IImage, IState> {
	refElem: any;
	constructor(props: IImage) {
		super(props);
		this.refElem = React.createRef();
		this.state = { isFullWidth: false };
	}

	render() {
		return (
			<div ref={this.refElem} className="absolute inset-0">
				<Lazysizes
					{...this.props}
					className={`z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full h-auto`}
				/>
			</div>
		);
	}
}

const LazySizeImageBg: React.FC<IImage> = image => {
	const [isFullWidth, setIsFullWidth] = React.useState<null | boolean>(null);
	const refElem = React.useRef<HTMLDivElement | null>(null);
	React.useEffect(() => {
		if (refElem.current) {
			const height = refElem.current.clientHeight;
			const width = refElem.current.clientWidth;

			setIsFullWidth(height / width <= 0.7);
		}
	}, [refElem.current]);
	return (
		<div ref={refElem} className="absolute inset-0">
			<Lazysizes
				{...image}
				className={`z-0 absolute inset-0 overflow-hidden bg-center bg-cover ${
					isFullWidth ? 'w-full h-auto' : 'h-full w-auto'
				}`}
			/>
		</div>
	);
};

export default LazysizesImg;
