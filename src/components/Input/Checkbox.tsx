import { CheckBoxIcon, CheckBoxOutlineBlankIcon } from '@/components/Icons/MUI/inputIcons';
import React from 'react';
import shortId from 'shortid';

interface IProps {
	className?: string;
	label: string;
	value: boolean;
	onChange: (e: any) => void;
	error?: string;
}
const InputCheck: React.FC<IProps> = ({ value, label, onChange, error, className }) => {
	const labalFor = shortId();
	return (
		<div className={`flex flex-col w-full overflow-hidden mb-4 ${className ? className : ''}`}>
			<label htmlFor={labalFor} className="relative w-full flex items-center">
				<div>{value ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}</div>
				<span className="py-2 pr-2">
					<input
						className="block border rounded border-gray-600 absolute w-full opacity-0 inset-0 min-h-8"
						name={labalFor}
						type="checkbox"
						checked={value}
						onChange={onChange}
					/>
				</span>
				<span className="text-xs">{label}</span>
			</label>
			<div className="w-full text:mini">{error}</div>
		</div>
	);
};

export default InputCheck;
