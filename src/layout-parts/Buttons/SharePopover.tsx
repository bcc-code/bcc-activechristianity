import * as React from 'react'

import * as twitterSharer from "share-this/dist/sharers/twitter"
import * as facebookSharer from "share-this/dist/sharers/facebook"
import * as emailSharer from "share-this/dist/sharers/email"
import render from "share-this/src/render"
import * as popover from "share-this/src/popover"
import Icon from "@/components/Icons"
import "./share-pop-over-scss/share-this.scss"
import "./share-popover.css"

//popoverClick
interface IProps {
    shareUrl: string
    text: string,
    label?: string
    size?: number
}

const SharePopover: React.FC<IProps> = ({ shareUrl, text, label, size }) => {
    const [active, setActive] = React.useState(false)
    const sharers = [twitterSharer, facebookSharer, emailSharer]
    const options = { shareUrl: process.env.SITE_URL + '/' + shareUrl }
    const innerHTML = render(options, sharers, text, text)

    const popoverEl = React.useRef<HTMLDivElement>(null);
    const closeOnClick = (e: any) => {

        if (popoverEl && popoverEl.current && !popoverEl.current.contains(e.target)) {
            setActive(false)
            document.removeEventListener('click', closeOnClick);

        }
    }

    const handleIconClick = (e: any) => {
        popover.popoverClick(sharers, e)
    }

    const handleShareClick = () => {
        setActive(!active)
        document.addEventListener('click', closeOnClick);
    }
    return (
        <div className="relative text-d4gray-dark" ref={popoverEl}>
            {active && (
                <button
                    className="custom-share-this-popover"
                    onClick={handleIconClick}
                    onKeyDown={handleIconClick}
                    dangerouslySetInnerHTML={{ __html: innerHTML }}
                />
            )}
            <button
                className="flex"
                onClick={handleShareClick}
                onKeyDown={handleIconClick}
            >
                {label && <span className="px-4 uppercase hidden sm:block">{label}</span>}<Icon name="share" size="base" />
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
