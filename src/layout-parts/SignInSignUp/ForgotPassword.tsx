import React from 'react'
import { useDispatch } from "react-redux"

import { InputText } from '@/components/Input'
import ac_strings from '@/strings/ac_strings.js'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
const acApiModule = import('@/util/api')


const initialFieldsState = {
    email: '',
}
const initialErrorState = {
    email: false,
}


const ForgotPasswordForm: React.FC = () => {
    const [fields, setFields] = React.useState(initialFieldsState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [loading, setLoading] = React.useState(false)
    const [resError, setResError] = React.useState<string | undefined>(undefined)
    const [info, setInfo] = React.useState<string | undefined>(undefined)
    const dispatch = useDispatch()

    const validate = () => {

        const result = { ...errors }
        let pass = true;
        if (fields.email.trim() === '') {
            result.email = true
            pass = false
        } else {
            result.email = false
        }

        setErrors(result)
        return pass;
    }

    const handleChange = (e: any, fieldName: string) => {
        validate()

        setFields({
            ...fields,
            [fieldName]: e.target.value
        });
    }

    const handleSubmit = () => {
        setLoading(true)
        setResError(undefined)
        setInfo(undefined)
        if (validate()) {
            const { email } = fields
            acApiModule.then(res => {
                const api = res.default
                api.forgotPassword(email).then(res => {
                    setLoading(false)
                    if (res.forgotPassword) {
                        setInfo(ac_strings.reset_password_mail_sent)
                    } else {
                        setResError(ac_strings.error_something_went_wrong)
                    }
                }).catch(error => {
                    setResError(error.message)
                })
            })


        }
    }

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center max-w-mobile w-full h-full "
        >
            <div className="flex flex-col justify-center bg-ac-primary py-4 px-4 rounded-top-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{ac_strings.reset_password}</h5>
            </div>
            <div className="px-4 py-6">
                {resError && (
                    <Snackbar
                        text={resError}
                        error
                    />
                )}
                {info && (
                    <Snackbar
                        text={info}
                    />
                )}
                <InputText
                    label={ac_strings.email}
                    type='text'
                    value={fields.email}
                    onChange={(e) => {
                        handleChange(e, 'email')
                    }}
                    error={errors.email ? ac_strings.error_required : undefined}
                />

                <FormSubmitButton
                    loading={loading}
                    onClick={handleSubmit}
                />
            </div>

        </div>

    )
}

export default ForgotPasswordForm