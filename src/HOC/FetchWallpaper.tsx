import { IQuote } from '@/types';
import * as React from 'react';

export const fetchWallpaperById = (id: string | number) => {
	return fetch(`/page-data/wallpaper/${id}/page-data.json`)
		.then(res => res.json())
		.then(async res => {
			if (res.result && res.result && res.result.data) {
				return res.result.data.ac.quote;
			}
			return null;
		})
		.catch(error => {
			console.log(error);
		});
};

interface IFetchOnePost {
	id: string | number;
	render: (data: { wallpaper: IQuote | null; loading: boolean }) => JSX.Element;
}

const FetchOneWallpaper: React.FC<IFetchOnePost> = ({ id, render }) => {
	const [wallpaper, setWallpaper] = React.useState<IQuote | null>(null);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		let isSubscribed = true;
		if (isSubscribed) {
			setLoading(true);
			fetchWallpaperById(id)
				.then(res => {
					if (isSubscribed) {
						setLoading(false);
						if (res) {
							setWallpaper(res);
						}
					}
				})
				.catch(error => {
					if (isSubscribed) {
						setLoading(false);
					}
				});
		}

		return () => {
			isSubscribed = false;
		};
	}, [id]);

	return <div>{render({ wallpaper, loading })}</div>;
};

export default FetchOneWallpaper;
