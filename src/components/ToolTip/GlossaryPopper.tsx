import * as React from 'react'
import ac_strings from '@/strings/ac_strings.js'
import loadable from '@loadable/component'
const ToolTip = loadable(() => import('./'))

interface IProps {
    text?: string
    slug?: string
}


const ShareIconPopper: React.FC<IProps> = ({ text, slug }) => {


    return (
        <ToolTip
            popperContent={(
                <div>
                    {text}...
                    <a className="text-ac-secondary" target="_blank" href={`/${ac_strings.slug_glossary}/${slug}`}> {ac_strings.read_more} </a>
                </div>
            )}
        />

    );
};

export default ShareIconPopper