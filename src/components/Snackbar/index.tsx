import { CloseIcon } from '@/components/Icons/MUI/navIcons';
import * as React from 'react';

interface ISnackbar {
	className?: string;
	text: string;
	error?: boolean;
	onClick?: () => void;
}
const Snackbar: React.FC<ISnackbar> = ({ text, onClick, error, className }) => {
	return (
		<div
			className={`rounded ${error ? 'bg-red-500' : 'bg-blue-500'} text-white px-2 my-4 flex justify-between ${
				className ? className : ''
			}`}
		>
			<div className="text-sm py-4 ">{text}</div>
			{onClick && (
				<button onClick={onClick} className="pl-6 pr-4 py-4">
					<CloseIcon customSize="4" />
				</button>
			)}
		</div>
	);
};

export default Snackbar;
