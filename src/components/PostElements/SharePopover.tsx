import * as React from 'react'

import { ShareOutlinedIcon, IButtonColour } from '@/components/Icons/MUI'
import ToolTipShare from '@/components/ToolTip/ShareIcons'

//popoverClick
interface IProps {

    shareUrl: string
    text: string,
    label?: string
    color?: IButtonColour
    size?: string
    placement?: 'top' | 'right'
}

const SharePopover: React.FC<IProps> = ({ shareUrl, text, label, color, size, placement }) => {
    const [active, setActive] = React.useState(false)

    const options = { shareUrl: process.env.SITE_URL + '/' + shareUrl }


    const popoverEl = React.useRef<HTMLDivElement>(null);
    const closeOnClick = (e: any) => {

        if (popoverEl && popoverEl.current && !popoverEl.current.contains(e.target)) {
            setActive(false)
            document.removeEventListener('click', closeOnClick);
        }
    }

    const handleShareClick = () => {

        setActive(!active)
        document.addEventListener('click', closeOnClick);

    }
    return (
        <div className="relative flex items-center font-roboto" ref={popoverEl}>
            {active && (
                <div className="absolute" style={placement === "right" ? { left: "-20px" } : { top: "-20px" }}>
                    <ToolTipShare
                        shareUrl={options.shareUrl}
                        text={text}
                        placement={placement}
                    />
                </div>
            )}
            <button
                className="flex items-center"
                onClick={handleShareClick}
                onKeyDown={handleShareClick}
            >

                <ShareOutlinedIcon
                    className={`${color ? color : "slate-light"}`}
                    customSize={size ? size : "5"}
                />{label && <span className="px-2 hidden sm:block text-xs">{label}</span>}

            </button>
        </div>

    )
}

export default SharePopover

/* export default (options, sharers, text, rawText) => {
    const refUrl = options.shareUrl || options.document.defaultView.location;

    // eslint-disable-next-line prefer-template
    return "<ul>"
            + sharers.map(sharer => `<li data-share-via="${sharer.name}">${sharer.render.call(sharer, text, rawText, refUrl)}</li>`).join("")
            + "</ul>";
}; */
