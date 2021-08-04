import Content from '@/components/Content';
import Tabs from '@/components/Tabs/TwoToThreeTabs';
import ac_strings from '@/strings/ac_strings.js';
import { IPostAuthors, ITab } from '@/types';
import * as React from 'react';

interface IContentPodcast {
	episodeNotes?: string;
	transcript: string;
	hosts: IPostAuthors[];
}

const ContentPodcast: React.FC<IContentPodcast> = ({ episodeNotes, transcript, hosts }) => {
	const tabs: ITab[] = [
		{
			name: ac_strings.episode_notes,
			to: '',
			content: (
				<div className="py-4">
					<Content content={transcript} />
				</div>
			)
		},
		{
			name: ac_strings.transcript,
			to: '',
			content: (
				<div className="py-4">
					<Content content={transcript} />
				</div>
			)
		}
	];

	return <Tabs tabs={tabs} />;
};

export default ContentPodcast;
