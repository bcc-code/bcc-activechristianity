import * as React from 'react'

import {
    PinterestShareButton,
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,
    PinterestIcon

} from "react-share";


interface IProps {
    imageUrl: string
    shareUrl: string
    text?: string
    title?: string
    placement?: 'top' | 'right'
    offSetBottom?: number
}


const ShareIconPopper: React.FC<IProps> = ({ shareUrl, placement, text, title, imageUrl }) => {
    console.log(title)
    const options = { shareUrl: process.env.SITE_URL + '/' + shareUrl }
    const IconProps = {
        size: 40,
        iconFillColor: 'var(--slate-dark)',
        bgStyle: { fill: "none" }
    }

    const shareContent = title
    return (
        <>
            <div className="flex p-2 text-ac-slate-dark justify-center order-2 sm:order-1">
                <PinterestShareButton url={shareUrl} media={imageUrl}>
                    <PinterestIcon {...IconProps} />
                </PinterestShareButton>

                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                >
                    <FacebookIcon {...IconProps} />
                </FacebookShareButton>
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
                    body={title}
                >
                    <EmailIcon {...IconProps} />
                </EmailShareButton>
            </div>

        </>
    );
};

export default ShareIconPopper