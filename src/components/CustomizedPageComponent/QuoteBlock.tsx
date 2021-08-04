import React from 'react';

import { IQuoteBlock } from './BlockWrapper';

const QuoteBlock: React.FC<IQuoteBlock> = ({ data: { content, source } }) => {
	return (
		<div className="text-center italic rounded-lg py-6 text-ac-slate-dark">
			<span className="sm:leading-loose text-2xl font-bold pb-8 block">{content}</span>
			<span className="block">{source}</span>
		</div>
	);
};

export default QuoteBlock;
