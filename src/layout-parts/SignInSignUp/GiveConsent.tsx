import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import { InputCheckbox } from '@/components/Input'

import ac_strings from '@/strings/ac_strings.js'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
import { IRootState } from '@/state/types'
import { initiateConsentNotify } from '@/state/action/authAction'
const initialFieldState = {
    consentReceiveEmail: false,
    consent: false
}

const initialErrorState = {
    consentReceiveEmail: '',
    consent: '',
}

type IFieldName = 'consent' | 'consentReceiveEmail'
const SignUpForm = () => {
    const dispatch = useDispatch()
    const [fields, setFields] = React.useState(initialFieldState)
    const [errors, setErrors] = React.useState(initialErrorState)

    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));

    /*     React.useEffect(() => {
            validate()
        }, [fields]); */
    const validate = () => {
        const errorsFound = {
            ...initialErrorState
        }
        let pass = true;

        setErrors(errorsFound)
        return pass
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (validate()) {
            dispatch(initiateConsentNotify({
                receivedEmail: fields.consentReceiveEmail,
                consent: fields.consent
            }))

        }
    }

    const handleChange = (e: any, field: IFieldName) => {
        const result = { ...fields }

        if (field === 'consentReceiveEmail') {
            result.consentReceiveEmail = !fields.consentReceiveEmail;
            setFields(result)
        } else if (field === 'consent') {
            result.consent = !fields.consent;
            setFields(result)
        }
        validate()
    }


    return (
        <div
            className="flex-1 flex flex-col items-center justify-center w-full h-full "
        >
            <div className="flex flex-col justify-center bg-ac-primary py-12 px-4 rounded-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{ac_strings.signin_options_sub_title}</h5>
                <span className="text-sm">{ac_strings.message_to_existing_user_after_reset_password_content}</span>
            </div>
            <form action="" className="w-full px-4 py-6" onSubmit={handleSubmit}>
                {authInfo.errorMessage && (
                    <Snackbar
                        text={authInfo.errorMessage}
                        error
                    />
                )}

                <InputCheckbox
                    label={ac_strings.consent_signup_email_checkbox_first}
                    onChange={(e) => {
                        handleChange(e, 'consent')
                    }}
                    value={fields.consent}
                    error={errors.consent}
                />
                <InputCheckbox
                    label={ac_strings.consent_signup_email_receive}
                    onChange={(e) => {
                        handleChange(e, 'consentReceiveEmail')
                    }}
                    value={fields.consentReceiveEmail}
                    error={errors.consentReceiveEmail}
                />


                <div className="flex flex-col justify-center w-full text-sm sm:text-base">
                    <div className="flex justify-center">
                        <FormSubmitButton
                            disabled={!fields.consent}
                            loading={false}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </form>

        </div>

    )
}

export default SignUpForm