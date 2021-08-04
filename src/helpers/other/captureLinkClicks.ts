import { navigate } from 'gatsby';

import toInternalLink from './toInternalLink';

export default function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	const targetLink = e.target && (e.target as Element).closest('a');
	if (!targetLink || !targetLink.href) return;
	const internalUrl = toInternalLink(targetLink.href);
	if (internalUrl === targetLink.href) return;
	e.preventDefault();

	navigate(internalUrl);
}
