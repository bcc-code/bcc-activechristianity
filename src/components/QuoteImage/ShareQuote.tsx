import * as React from 'react'

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


interface IProps {

    shareUrl: string
    text?: string
    title?: string
    placement?: 'top' | 'right'
    offSetBottom?: number
}


const ShareIconPopper: React.FC<IProps> = ({ shareUrl, placement, text, title, offSetBottom }) => {

    const options = { shareUrl: window ? window.location.href : process.env.SITE_URL + '/' }
    const IconProps = {
        size: 40,
        iconFillColor: 'var(--slate-dark)',
        bgStyle: { fill: "none" }
    }

    const shareContent = `Title: ${title} - Quote: "${text}"`
    return (
        <>
            <div className="flex p-2 text-ac-slate-dark justify-center order-2 sm:order-1">
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

        </>
    );
};

export default ShareIconPopper