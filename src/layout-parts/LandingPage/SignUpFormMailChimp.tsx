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
            {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && (
                <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    style={{ color: "green" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            <InputText
                label={'Email'}
                value={email}
                type="email"
                onChange={handleEmailChange}
            />
            <div>
                By continuing, you consent to receiving email updates from ActiveChristianity.
            </div>
            <div>
                <button className="bg-d4slate-dark text-white rounded px-2 py-2" onClick={submit}>
                    Submit
                     </button>
            </div>
        </div>
    );
};

export default CustomForm