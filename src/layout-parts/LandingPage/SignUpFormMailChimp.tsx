import React from 'react'
import { InputText } from '@/components/Input'

const CustomForm: React.FC<{ status: 'error' | 'success' | 'sending' | null, message: string | Error | null, onValidated: (data: { EMAIL: string }) => void }> = ({ status, message, onValidated }) => {
    const [email, setEmail] = React.useState('')
    const submit = () => {

        const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: 'ac.gtm_track_landingpage',
            label: 'Submit email'
        })

        return email &&
            email.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email
            });
    }
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    return (
        <div className="w-full">

            {status === "sending" && <div>Sending...</div>}
            {status === "error" && (
                <div
                    className="text-red-600"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    className="rounded p-2 bg-info-bar"

                >
                    Thank you for subscribing!
                    You will receive an email shortly.
                </div>
            )}
            <InputText
                label={'Email'}
                value={email}
                type="email"
                onChange={handleEmailChange}
            />
            <div className="leading-normal text-sm text-gray-500 pb-4">
                By continuing, you consent to receiving email updates from ActiveChristianity.
            </div>
            <div>
                <button className="bg-d4primary text-white font-bold rounded p-4 sm:p-6 sm:text-lg" onClick={submit}>
                    Send me more details
                </button>
            </div>

        </div>
    );
};

export default CustomForm