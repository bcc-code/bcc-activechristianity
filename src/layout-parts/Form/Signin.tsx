import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from '@/state/action'

import { initiateLogIn } from '@/state/action/authAction'
import { InputText, InputCheckbox } from '@/components/Input'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
import { IRootState } from '@/state/types'

const initialFieldsState = {
    email: '',
    password: '',
    keepSignedIn: true,
}
const initialErrorState = {
    email: false,
    password: false,
}

type IFormFieldType = 'email' | 'password'
const SignInForm: React.FC = () => {
    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));
    const [fields, setFields] = React.useState(initialFieldsState)
    const [errors, setErrors] = React.useState(initialErrorState)

    const dispatch = useDispatch()
    const validate = () => {
        const fieldNames: IFormFieldType[] = ['email', 'password'];
        const result = { ...errors }
        let pass = true;

        for (let field of fieldNames) {
            if (fields[field].trim() === '') {
                result[field] = true
                pass = false
            } else {
                result[field] = false
            }

        }
        setErrors(result)
        return pass;
    }

    const handleChange = (e: any, fieldName: string) => {
        validate()

        if (fieldName === 'keepSignedIn') {
            setFields({
                ...fields,
                keepSignedIn: !fields.keepSignedIn
            })
        } else {
            setFields({
                ...fields,
                [fieldName]: e.target.value
            });
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (validate()) {
            const { email, password, keepSignedIn } = fields

            const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
            dispatch(initiateLogIn({
                email,
                password,
                remember: keepSignedIn
            }))
        }
    }

    const handleSigninOpionts = () => {
        dispatch(openSignInModal("signInOptions"))
    }
    const handleForgotPassword = () => {
        dispatch(openSignInModal("forgotPassword"))
    }

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center max-w-mobile sm:max-w-tablet w-full h-full px-4 py-6"
        >
            <div className={`rounded  w-full bg-blue-500 text-white py-4 px-2 my-4 flex flex-col`}>
                <h2 className="text-lg sm:text-2xl pb-4">{ac_strings.message_to_existing_user_first_time_title}</h2>
                <p className="text-sm leading-normal">{ac_strings.message_to_existing_user_first_time_main}</p>
                <div className="flex justify-center text-xs">
                    <button
                        className="p-2 border border-white my-4"
                        onClick={handleForgotPassword}
                        onKeyDown={handleForgotPassword}

                    >
                        {ac_strings.message_to_existing_user_first_time_cta}
                    </button>
                </div>
                <button className="text-white text-xs">{ac_strings.message_to_existing_user_ignore}</button>
            </div>
            {authInfo.errorMessage && (
                <Snackbar
                    text={authInfo.errorMessage}
                    error
                />
            )}
            <h2 className="text-2xl pb-4">{ac_strings.signin_options_email}</h2>
            <form action="" className="w-full" onSubmit={handleSubmit}>
                <InputText
                    label={TS.email}
                    type='text'
                    value={fields.email}
                    onChange={(e) => {
                        handleChange(e, 'email')
                    }}
                    error={errors.email ? 'Required' : undefined}
                />
                <InputText
                    label={TS.password}
                    type='password'
                    value={fields.password}
                    onChange={(e) => {
                        handleChange(e, 'password')
                    }}
                    error={errors.password ? 'Required' : undefined}
                />
                <InputCheckbox
                    label={TS.remember_me}
                    onChange={(e) => {
                        handleChange(e, 'keepSignedIn')
                    }}
                    value={fields.keepSignedIn}
                />

                <FormSubmitButton

                    loading={authInfo.loggedIn === "loading"}
                    onClick={handleSubmit}
                />
                <div className="text-sm flex flex-col">
                    <button
                        className="text-blue-500 font-semibold"
                        onClick={handleSigninOpionts}
                        onKeyDown={handleSigninOpionts}
                    >
                        {ac_strings.allSigninOptions}
                    </button>
                    <button className="text-d4slate-light py-2"
                        onClick={handleForgotPassword}
                        onKeyDown={handleForgotPassword}
                    >
                        {TS.forgot_password}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default SignInForm