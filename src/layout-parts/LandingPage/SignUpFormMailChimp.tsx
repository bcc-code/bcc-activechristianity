import React from 'react'
import { InputText } from '@/components/Input'

const CustomForm: React.FC<{ status: 'error' | 'success' | 'sending' | null, message: string | Error | null, onValidated: (data: { EMAIL: string }) => void }> = ({ status, message, onValidated }) => {
    const [email, setEmail] = React.useState('')
    const submit = () =>
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email
        });
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    return (
        <div className="w-full">
            <div className="leading-normal text-sm">
                By continuing, you consent to receiving email updates from ActiveChristianity.
            </div>
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

            <div>
                <button className="bg-white text-d4primary font-bold rounded px-4 py-2" onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CustomForm