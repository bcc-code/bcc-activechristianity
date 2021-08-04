import React from 'react';

interface IProps {
	name?: string;
	label: string;
	value: string | number;
	onChange: (e: any) => void;
	error?: string;
	required?: boolean;
}
const InputText: React.FC<IProps> = ({ value, label, onChange, error, name, required }) => {
	return (
		<div className="my-4 w-full">
			<label htmlFor={name} className="block w-full text-sm sm:text-base pb-2">
				{label}
				{required ? <span className="text-red-600">*</span> : ''}
			</label>

			<textarea
				className={`block w-full border border-gray-500 focus:${error ? 'border-red-600' : 'border-gray-900'}`}
				value={value}
				onChange={onChange}
				name={name}
				required={required}
				rows={8}
			/>

			<div className="w-full text:mini text-red-600">{error}</div>
		</div>
	);
};

export default InputText;
