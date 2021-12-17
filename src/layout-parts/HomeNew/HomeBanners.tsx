import * as React from 'react';
import { navigate } from 'gatsby';
import shortid from 'shortid';
import { SearchIcon } from '@/components/Icons/MUI/navIcons';
import ac_strings from '@/strings/ac_strings.js';
import { INavItem } from '@/types';
import Link from '@/components/CustomLink';
export const HomeTop: React.FC<{ links: INavItem[]; title: string; content: string }> = ({ links, title, content }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [searchTerm, setSearchTerm] = React.useState('');
	const handleFocus = () => {
		if (inputRef && inputRef.current) {
			inputRef.current.focus();
		}
	};
	const onChange = (e: any) => {
		setSearchTerm(e.target.value);
	};
	const onClick = () => {
		navigate(`/${ac_strings.slug_explore}?search=${searchTerm}`);
	};
	return (
		<div
			className="relative w-full overflow-hidden"
			style={{
				backgroundImage: `url('https://cdn.activechristianity.org/image/upload/c_thumb,h_600,w_1200,g_center/v1631326710/en/qzypxqrznmwzwrsvt2a1.jpg')`,
				backgroundSize: 'cover',
				backgroundPosition: '75%'
			}}
		>
			<div className="z-20 relative standard-max-w py-18 lg:py-36">
				<div className={`px-4 w-auto md:w-7/12 text-white`}>
					{/* 	<div className="text-sm lg:text-base uppercase text-white mb-8 ">{label}</div> */}
					<h2 className="text-2xl md:text-4xl  lg:text-5xl pb-4 sm:pb-8 md:pb-12 leading-relaxed font-extrabold">
						{title}
					</h2>
					<div
						className="text-base sm:text-lg md:text-2xl pb-12"
						dangerouslySetInnerHTML={{ __html: content }}
					/>

					<ul className="text-sm sm:text-base md:text-lg grid grid-cols-2">
						{links.map(item => {
							return (
								<li className="pb-2" key={shortid()}>
									<Link to={item.to}>{item.name}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="md:w-7/12 mt-4 mx-4 flex flex-auto">
					<div
						className={`flex-1 flex border bg-white rounded-l-lg  sm:rounded-l-full items-center pl-2 sm:pl-4 overflow-hidden `}
						onClick={handleFocus}
						onKeyDown={handleFocus}
						role="application"
					>
						<input
							className="pl-2 flex-grow text-sm sm:text-base placeholder-ac-slate-dark h-8 sm:h-12"
							type="text"
							placeholder={'Search'}
							ref={inputRef}
							onChange={onChange}
							onKeyDown={onChange}
							value={searchTerm}
						/>
					</div>
					<button
						onClick={onClick}
						onKeyDown={onClick}
						className="bg-ac-slate-dark text-white rounded-r-lg  sm:rounded-r-full px-2 sm:px-4 "
					>
						<SearchIcon customSize="6" />
					</button>
				</div>
			</div>
			<div className={`z-10 absolute inset-0`} style={{ background: '#020203', opacity: '0.3' }}></div>
			{/* 		<div className="absolute inset-0">
			<LazysizesFeaturedImage {...image} className="h-full w-auto sm:w-full sm:h-auto" />
		</div> */}
		</div>
	);
};
