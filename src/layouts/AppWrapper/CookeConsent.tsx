
import React, { Profiler } from 'react'
import ac_strings from '@/strings/ac_strings.js'
import { navigate } from 'gatsby'


export default () => {
    const localStorageKey = 'ac.giveConsent'

    const [showConsent, setShowConsent] = React.useState(false)
    React.useEffect(() => {
        const gaveConsent = localStorage.getItem(localStorageKey)
        if (gaveConsent !== "true") {
            setShowConsent(true)
        }

    }, [])
    const setNotIsInfoBarOpen = () => {
        localStorage.setItem(localStorageKey, "true")
        setShowConsent(false)
    }
    const onLinkClick = () => {
        navigate(ac_strings.slug_cookie_policy)
    }
    return showConsent ? (
        <div className="fixed bottom-0 w-full bg-ac-slate-dark text-ac-slate-lighter p-4" style={{ zIndex: 650 }}>
            <div className="standard-max-w">
                <div className="text-xs">
                    {ac_strings.consent_general_main}
                    <button
                        className="underline pt-2"
                        onClick={onLinkClick}
                    >
                        {ac_strings.consent_general_link}
                    </button>
                </div>
                <button
                    className="text-sm bg-ac-primary px-4 inline-block rounded-full py-1 mt-2"
                    onClick={setNotIsInfoBarOpen}
                >
                    {ac_strings.consent_general_accept}
                </button>
            </div>

        </div>
    ) : null
}
