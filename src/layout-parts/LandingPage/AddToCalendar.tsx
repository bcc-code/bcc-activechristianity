import React from 'react'
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _helpers2 = _interopRequireDefault(_helpers);
var helpers = new _helpers2.default();

interface IEvent {
    title: string
    description: string
    location?: string
    startTime: string
    endTime: string
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
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else {
            window.open(url, "_blank");
        }
    }
    return (
        <div>
            {calenderPlatform.map(
                listItem => {
                    var currentItem = Object.keys(listItem)[0];
                    var currentLabel = listItem[currentItem]
                    return (
                        <li>
                            <a
                                target="_blank"
                                href={helpers.buildUrl(event, currentItem, isCrappyIE)}
                                onClick={handleDropdownLinkClick}
                            >
                                {currentLabel}
                            </a>
                        </li>
                    )
                }
            )}
        </div>
    )
}

export default AddToCalender