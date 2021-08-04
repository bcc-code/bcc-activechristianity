import Link from '@/components/CustomLink';
import { KeyboardArrowDownIcon } from '@/components/Icons/MUI/navIcons';
import * as React from 'react';

import './dropdown.css';

export interface IOption {
	label: string;
	to?: string;
	flag_code?: string;
	href?: string;
	value?: string;
}

export interface IDropdownProps {
	label: string;
	options: IOption[];
	selected: IOption | undefined;
	onChange?: (selected: IOption) => void;
	className?: string;
}
const Dropdown: React.FC<IDropdownProps> = ({ options, onChange, selected, label, className }) => {
	const [showDropdown, setShowDropdown] = React.useState(false);
	const inputEl = React.useRef<HTMLInputElement>(null);

	const closeOnClick = (e: any) => {
		if (inputEl && inputEl.current && !inputEl.current.contains(e.target)) {
			setShowDropdown(false);
			document.removeEventListener('click', closeOnClick);
		}
	};

	const handleSelect = (value: IOption) => {
		setShowDropdown(false);
		if (onChange) {
			onChange(value);
		}
		document.removeEventListener('click', closeOnClick);
	};

	const handleClick = (e: any) => {
		e.preventDefault();
		setShowDropdown(!showDropdown);
		document.addEventListener('click', closeOnClick);
	};

	return (
		<div className={`relative flex items-center ${className ? className : ''}`} ref={inputEl}>
			<button className=" w-full flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
				<span className="whitespace-no-wrap">{selected ? selected.label : label}</span>
				<span className="flex items-center mx-2">
					<KeyboardArrowDownIcon customSize="6" className="fill-slate-dark" />
				</span>
			</button>
			{showDropdown && (
				<div className={`absolute dropdown-list-content`}>
					{options.map((item, i) => {
						if (onChange) {
							return (
								<div
									className="bg-white py-2"
									key={i}
									onClick={() => handleSelect(item)}
									onKeyDown={() => handleSelect(item)}
								>
									{item.label}
								</div>
							);
						} else if (item.to) {
							return (
								<Link className="bg-white py-2 block" activeClassName="" key={i} to={item.to}>
									{item.label}
								</Link>
							);
						} else if (item.href) {
							return (
								<a className="bg-white py-2 block" key={i} href={item.href}>
									{item.label}
								</a>
							);
						} else {
							return (
								<div className="bg-white py-2 block" key={i}>
									{item.label}
								</div>
							);
						}
					})}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
