import * as React from 'react'
import loadable from '@loadable/component'
const ToolTip = loadable(() => import('./'))

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
        color: "white",
        size: 40,
        bgStyle: { fill: "none" }
    }

    const shareContent = `Title: ${title} - Quote: "${text}"`
    return (
        <>
            <ToolTip

                popperContent={
                    <div
                        className="bg-ac-slate-dark text-white rounded-lg px-2 mr-4"


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
                        {/* <div className="ac-popper" ref={setArrowElement} style={{ ...styles.arrow, bottom: `-5px` }} /> */}
                    </div>
                }
            />

        </>
    );
};

export default ShareIconPopper