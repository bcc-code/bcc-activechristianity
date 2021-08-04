import { CloseIcon } from '@/components/Icons/MUI/navIcons';
import * as React from 'react';

interface IButton {
	onClick?: () => void;
	href?: string;
	to?: string;
}
const CloseButton: React.FC<IButton & { className?: string; style?: any }> = ({ onClick, className, style }) => (
	<button style={style} onClick={onClick} onKeyDown={onClick} className={`${className ? className : ''}`}>
		<span className="w-5 h-5 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800 rounded-full flex items-center justify-center">
			<CloseIcon customSize="3" />
		</span>
	</button>
);

export default CloseButton;
