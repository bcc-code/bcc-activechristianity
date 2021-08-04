import Link from '@/components/CustomLink';
import * as React from 'react';

interface IButton {
	className?: string;
	disabledClassName?: string;
	enabledClassName?: string;
	onClick?: (e: any) => void;
	href?: string;
	to?: string;
	disabled?: boolean;
}

const Button: React.FC<IButton> = ({
	className,
	disabledClassName,
	enabledClassName,
	onClick,
	href,
	to,
	disabled,
	children
}) => {
	if (to) {
		return (
			<Link to={to} className={`block ${className}`} onClick={onClick}>
				{children}
			</Link>
		);
	} else if (onClick) {
		return (
			<button
				className={`cursor-pointer ${className} ${
					disabled && disabledClassName ? disabledClassName : enabledClassName
				}`}
				onClick={onClick}
				onKeyDown={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		);
	} else if (href) {
		return (
			<a href={href} className={`block ${className}`}>
				{children}
			</a>
		);
	} else {
		return <div className={className}>{children}</div>;
	}
};

export default Button;
