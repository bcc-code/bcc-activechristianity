import * as React from 'react'

import * as twitterSharer from "share-this/dist/sharers/twitter"
import * as facebookSharer from "share-this/dist/sharers/facebook"
import * as emailSharer from "share-this/dist/sharers/email"
import render from "share-this/src/render"
import * as popover from "share-this/src/popover"
import Icon, { IButtonColour } from "@/components/Icons/Icon"
import "./share-pop-over-scss/share-this.scss"
import "./share-popover.css"

//popoverClick
interface IProps {

    shareUrl: string
    text: string,
    label?: string
    size?: string
    color?: IButtonColour
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

        if (navigator && navigator.share) {
            navigator.share({
                title: 'WebShare API Demo',
                url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
            }).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch(console.error);
        } else {
            setActive(!active)
            document.addEventListener('click', closeOnClick);
        }

    }
    return (
        <div className="relative flex items-center font-roboto" ref={popoverEl}>
            {active && (
                <button
                    className="custom-share-this-popover"
                    onClick={handleIconClick}
                    onKeyDown={handleIconClick}
                    dangerouslySetInnerHTML={{ __html: innerHTML }}
                />
            )}
            <button
                className="flex items-center"
                onClick={handleShareClick}
                onKeyDown={handleShareClick}
            >
                <Icon name="ShareOutlined" color="slate-light" size="5" />{label && <span className="px-2 hidden sm:block text-d4slate-light text-xs">{label}</span>}
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
