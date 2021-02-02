import * as React from 'react';
import ac_strings from '@/strings/ac_strings.js'
import { Button } from '@/components/Button'

export default () => {
    const localStorageKey = 'ac.giveConsent'

    const [showConsent, setShowConsent] = React.useState(true)
    React.useEffect(() => {
        const gaveConsent = localStorage.getItem(localStorageKey)
        if (gaveConsent === "true") {
            setShowConsent(false)
        }

    }, [])
    const setNotIsInfoBarOpen = () => {
        localStorage.setItem(localStorageKey, "true")
        setShowConsent(false)
    }

    return showConsent ? (
        <div className="fixed bottom-0 w-full bg-ac-slate-dark text-ac-slate-lighter p-4" style={{ zIndex: 650 }}>
            <div className="standard-max-w">
                <div className="text-xs">
                    {ac_strings.consent_general_main}
                    <Button
                        className="underline pt-2"
                        to={ac_strings.slug_cookie_policy}
                    >
                        {ac_strings.consent_general_link}
                    </Button>
                </div>
                <Button
                    className="text-sm bg-ac-primary px-4 inline-block rounded-full py-1 mt-2"
                    onClick={setNotIsInfoBarOpen}
                >
                    {ac_strings.consent_general_accept}
                </Button>
            </div>

        </div>
    ) : null
}
