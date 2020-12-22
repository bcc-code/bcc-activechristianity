import * as React from 'react'

import { usePopper } from 'react-popper';

import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon

} from "react-share";

import './popper.css'

interface IProps {

    shareUrl: string
    text?: string
    title?: string
    placement?: 'top' | 'right'
    offSetBottom?: number
}


const ShareIconPopper: React.FC<IProps> = ({ shareUrl, placement, text, title, offSetBottom }) => {

    const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(null);
    const options = { shareUrl: window ? window.location.href : process.env.SITE_URL + '/' }


    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: placement ? placement : 'top',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    const IconProps = {
        color: "white",
        size: 40,
        bgStyle: { fill: "none" }
    }

    const shareContent = `Title: ${title} - Quote: "${text}"`
    return (
        <>
            <button type="button" ref={setReferenceElement} style={{ height: 0 }}>
            </button>

            <div
                className="bg-ac-slate-dark text-white rounded-lg px-2"
                ref={setPopperElement}
                style={styles.popper} {...attributes.popper}

            >
                <div className="flex">

                    <FacebookShareButton
                        url={shareUrl}
                        quote={text}
                    >
                        <FacebookIcon {...IconProps} />
                    </FacebookShareButton>
                    <TwitterShareButton url={options.shareUrl}>
                        <TwitterIcon {...IconProps} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={options.shareUrl}>
                        <WhatsappIcon {...IconProps} />
                    </WhatsappShareButton>
                    <TelegramShareButton
                        url={options.shareUrl}
                        title={shareContent}
                    >
                        <TelegramIcon {...IconProps} />
                    </TelegramShareButton>
                    <EmailShareButton
                        url={options.shareUrl}
                        subject={title}
                        body={text}
                    >
                        <EmailIcon {...IconProps} />
                    </EmailShareButton>
                </div>
                <div className="ac-popper" ref={setArrowElement} style={{ ...styles.arrow, bottom: `-5px` }} />
            </div>
        </>
    );
};

export default ShareIconPopper