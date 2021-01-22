import React from 'react'
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _helpers2 = _interopRequireDefault(_helpers);
var helpers = new _helpers2.default();

const icons = {
    "apple": (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="white" />
            <path fill-rule="evenodd" clipRule="evenodd" d="M28.2754 23.2303C28.1637 23.5535 28.0469 23.862 27.9226 24.1579C27.6194 24.857 27.2614 25.5004 26.8465 26.0911C26.2822 26.8976 25.8189 27.4557 25.4619 27.7652C24.9091 28.2738 24.3164 28.5349 23.6814 28.5486C23.2255 28.5486 22.6769 28.4191 22.0368 28.1569C21.3955 27.8947 20.8059 27.7652 20.2668 27.7652C19.7014 27.7652 19.0949 27.8947 18.4463 28.1569C17.7966 28.4191 17.2733 28.557 16.8732 28.5696C16.2646 28.596 15.6581 28.3285 15.0527 27.7652C14.6663 27.4283 14.183 26.8502 13.6039 26.0321C12.9826 25.1582 12.472 24.1442 12.0719 22.9881C11.6433 21.7404 11.4285 20.5316 11.4285 19.3618C11.4285 18.0214 11.7181 16.8653 12.2982 15.8966C12.7542 15.1185 13.3606 14.5047 14.1198 14.054C14.879 13.6034 15.6992 13.3738 16.5826 13.3591C17.0659 13.3591 17.6998 13.5086 18.4873 13.8024C19.2728 14.0972 19.7772 14.2467 19.9983 14.2467C20.1636 14.2467 20.7238 14.0719 21.6735 13.7234C22.5717 13.4001 23.3298 13.2664 23.951 13.3191C25.6336 13.4549 26.8971 14.1182 27.7384 15.3133C26.2337 16.2251 25.4893 17.5023 25.5041 19.1407C25.5177 20.4168 25.98 21.4792 26.8897 22.3226C27.3025 22.7133 27.7636 23.0155 28.2754 23.2303ZM24.0428 8.57153C24.0564 8.70526 24.0628 8.83898 24.0628 8.97165C24.0628 9.97193 23.6974 10.9059 22.9698 11.7703C22.0906 12.798 21.0272 13.3918 19.8742 13.2981C19.8595 13.1781 19.8511 13.0517 19.8511 12.9191C19.8511 11.9588 20.2691 10.9311 21.0114 10.0909C21.382 9.66553 21.8537 9.31174 22.4244 9.02956C22.9951 8.75158 23.5352 8.59786 24.0428 8.57153Z" fill="black" />
        </svg>
    ),
    "google": (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white" />
            <g clip-path="url(#clip0)">
                <path d="M31.125 20.4999C31.125 19.5749 31.051 18.8999 30.8907 18.2H20.4719V22.3749H26.5875C26.4643 23.4124 25.7985 24.9749 24.3188 26.0249L24.2981 26.1646L27.5923 28.7518L27.8206 28.7749C29.9166 26.8124 31.125 23.9249 31.125 20.4999Z" fill="#4285F4" />
                <path d="M20.4712 31.4999C23.4673 31.4999 25.9826 30.4998 27.8198 28.7749L24.3181 26.0248C23.381 26.6873 22.1234 27.1498 20.4712 27.1498C17.5367 27.1498 15.046 25.1874 14.1582 22.4749L14.0281 22.4861L10.6027 25.1736L10.5579 25.2998C12.3827 28.9748 16.131 31.4999 20.4712 31.4999Z" fill="#34A853" />
                <path d="M14.1589 22.475C13.9246 21.775 13.7891 21.025 13.7891 20.25C13.7891 19.475 13.9246 18.725 14.1466 18.025L14.1404 17.8759L10.672 15.1453L10.5586 15.2C9.80648 16.725 9.37492 18.4375 9.37492 20.25C9.37492 22.0625 9.80648 23.775 10.5586 25.3L14.1589 22.475Z" fill="#FBBC05" />
                <path d="M20.4712 13.35C22.5549 13.35 23.9605 14.2625 24.762 15.025L27.8938 11.925C25.9704 10.1125 23.4673 9 20.4712 9C16.131 9 12.3827 11.525 10.5579 15.1999L14.1459 18.025C15.046 15.3125 17.5367 13.35 20.4712 13.35Z" fill="#EB4335" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="22.5" height="22.5" fill="white" transform="translate(9 9)" />
                </clipPath>
            </defs>
        </svg>
    ),
    "outlook": (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20Z" fill="white" />
            <path d="M23.3333 13.3333V18.2427L24.9342 19.323C24.9764 19.3362 25.0679 19.3371 25.1101 19.323L32 14.3447C32 13.7556 31.4872 13.3333 31.1978 13.3333H23.3333Z" fill="#0072C6" />
            <path d="M23.3342 19.5952L24.7949 20.6276C25.0007 20.7833 25.2487 20.6276 25.2487 20.6276C25.0016 20.7833 32 16 32 16V24.6617C32 25.6046 31.4134 26 30.7539 26H23.3333V19.5952H23.3342Z" fill="#0072C6" />
            <path d="M15.7012 17.3333C15.1807 17.3333 14.766 17.5784 14.4598 18.0679C14.1536 18.5574 14 19.2054 14 20.0119C14 20.8304 14.1536 21.4775 14.4598 21.9531C14.766 22.4297 15.1678 22.6666 15.6644 22.6666C16.1766 22.6666 16.583 22.4352 16.8828 21.9725C17.1825 21.5098 17.3333 20.8673 17.3333 20.046C17.3333 19.1897 17.188 18.5233 16.8966 18.0467C16.6051 17.5711 16.2069 17.3333 15.7012 17.3333Z" fill="#0072C6" />
            <path fill-rule="evenodd" clipRule="evenodd" d="M8.66667 29.0704V10.7042L22.6667 8V32L8.66667 29.0704ZM15.72 24.1587C16.672 24.1587 17.4433 23.7693 18.0349 22.9922C18.6265 22.2152 18.9228 21.1912 18.9219 19.9211C18.9219 18.6853 18.6365 17.6902 18.0656 16.9348C17.4957 16.1794 16.7478 15.8026 15.8238 15.8026C14.8456 15.8026 14.0598 16.1974 13.4664 16.9862C12.873 17.7749 12.5767 18.8079 12.5767 20.0852C12.5767 21.2949 12.8694 22.2756 13.4529 23.0292C14.0372 23.7819 14.7923 24.1587 15.72 24.1587Z" fill="#0072C6" />
        </svg>

    )

}
interface IEvent {
    title: string
    description: string
    location?: string
    startTime: Date
    endTime: Date
}
const AddToCalender: React.FC<{ event: IEvent }> = ({ event }) => {

    const calenderPlatform = [{ apple: "Apple Calendar" }, { google: "Google" }, { outlook: "Outlook" }]
    var isCrappyIE = false;
    if (typeof window !== "undefined" && window.navigator.msSaveOrOpenBlob && window.Blob) {
        isCrappyIE = true;
    }
    function handleDropdownLinkClick(e: any) {
        e.preventDefault();
        var url = e.currentTarget.getAttribute("href");
        const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: 'ac.gtm_track_landingpage',
            label: 'Submit add to calender',
            data: url
        })

        if (!helpers.isMobile() && (url.startsWith("data") || url.startsWith("BEGIN"))) {
            var filename = "download.ics";
            var blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

            if (isCrappyIE) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                /****************************************************************
                // many browsers do not properly support downloading data URIs
                // (even with "download" attribute in use) so this solution
                // ensures the event will download cross-browser
                ****************************************************************/
                if (typeof document !== undefined) {
                    var link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.setAttribute("download", filename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        } else {
            window.open(url, "_blank");
        }
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            {calenderPlatform.map(
                listItem => {
                    var currentItem = Object.keys(listItem)[0];
                    var currentLabel = icons[currentItem]
                    const href = helpers.buildUrl(event, currentItem, isCrappyIE, "https://brunstadchristianchurch.online.church")
                    return (
                        <a
                            target="_blank"
                            href={href}
                            onClick={handleDropdownLinkClick}
                        >

                            {currentLabel}
                        </a>
                    )
                }
            )}
        </div>
    )
}

export default AddToCalender