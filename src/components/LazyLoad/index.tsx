import * as React from 'react';
import LazyLoad from 'react-lazyload';

interface ICustomLazyLoad {
	height?: number;
	offset?: number;
}
const CustomLazyLoad: React.FC<ICustomLazyLoad> = ({ height, offset, children }) => {
	return (
		<LazyLoad height={height ? height : 50} offset={offset ? offset : 100}>
			{children}
		</LazyLoad>
	);
};

export default CustomLazyLoad;
