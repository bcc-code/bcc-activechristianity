const host = typeof window !== 'undefined' ? location.host : `${process.env.SITE_URL}` || '';
const rawHost = host.replace(RegExp('(https?://|/.*)', 'g'), '');

export default function (url: string) {
	const newUrl = url.replace(/\/$/, '').replace(RegExp(`https?:\/\/${rawHost}\/?`, 'g'), '/');
	return newUrl;
}
