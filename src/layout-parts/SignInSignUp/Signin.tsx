import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from '@/state/action'

import { initiateLogIn } from '@/state/action/authAction'
import { InputText, InputCheckbox } from '@/components/Input'
import ac_strings from '@/strings/ac_strings.js'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
import { IRootState } from '@/state/types'
import Cookies from 'js-cookie'
import { validateEmail } from '@/helpers'

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
    const cookieName = 'ac.signin.reset_password_reminder'
    const userReminderOption = Cookies.get(cookieName);

    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));
    const [fields, setFields] = React.useState(initialFieldsState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [showReminder, setShowReminder] = React.useState(userReminderOption !== "true")
    const dispatch = useDispatch()
    const validate = () => {
        const fieldNames: IFormFieldType[] = ['email', 'password'];
        const result = { ...errors }
        let pass = true;

        for (let field of fieldNames) {
            if (field === "email") {
                if (!validateEmail(fields[field])) {
                    result[field] = true
                    pass = false
                } else {
                    result[field] = false
                }
            } else if (fields[field].trim() === '') {
                result[field] = true
                pass = false
            } else {
                result[field] = false
            }

        }
        setErrors(result)
        return pass;
    }
    const setNotShowReminder = () => {
        setShowReminder(false)
        Cookies.set(cookieName, 'true')
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
            className="flex-1 flex flex-col items-center justify-center max-w-mobile sm:max-w-tablet w-full h-full "
        >
            <div className="flex flex-col justify-center bg-ac-primary py-4 px-4 rounded-top-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{ac_strings.signin_options_email}</h5>
            </div>
            {showReminder ? (
                <div className="w-full px-4 py-2">
                    <div className={`rounded  w-full bg-blue-500 text-white py-4 px-2 my-4 flex flex-col`}>
                        <h2 className="pb-4 leading-normal">{ac_strings.message_to_existing_user_first_time_title}</h2>
                        <p className="text-sm leading-normal">{ac_strings.message_to_existing_user_first_time_main}</p>
                        <div className="flex justify-center text-xs">
                            <button
                                className="p-2 border border-white rounded font-semibold my-4"
                                onClick={handleForgotPassword}
                                onKeyDown={handleForgotPassword}

                            >
                                {ac_strings.message_to_existing_user_first_time_cta}
                            </button>
                        </div>
                        <div className="flex justify-center text-xs " onClick={setNotShowReminder}>
                            {ac_strings.continue_to_sign_in}
                            {/*                             <button
                                className="text-xs bg-white text-blue-500 rounded p-2"
                                onClick={() => {
                                    setShowReminder(false)
                                }}
                            >
                                {ac_strings.signin_options_email}
                            </button> */}
                        </div>
                    </div>
                </div>

            ) : (
                    <div className="w-full px-4">
                        {authInfo.errorMessage && (
                            <Snackbar
                                text={authInfo.errorMessage}
                                error
                            />
                        )}

                        <form action="" className="w-full" onSubmit={handleSubmit}>
                            <InputText
                                label={ac_strings.email}
                                type='text'
                                value={fields.email}
                                onChange={(e) => {
                                    handleChange(e, 'email')
                                }}
                                error={errors.email ? ac_strings.error_required : undefined}
                            />
                            <InputText
                                label={ac_strings.password}
                                type='password'
                                value={fields.password}
                                onChange={(e) => {
                                    handleChange(e, 'password')
                                }}
                                error={errors.password ? ac_strings.error_required : undefined}
                            />
                            <InputCheckbox
                                label={ac_strings.remember_me}
                                onChange={(e) => {
                                    handleChange(e, 'keepSignedIn')
                                }}
                                value={fields.keepSignedIn}
                            />

                            <div className="flex justify-center">
                                <FormSubmitButton
                                    disabled={false}
                                    loading={authInfo.loggedIn === "loading"}
                                    onClick={handleSubmit}
                                />
                            </div>
                            <div className="text-sm flex flex-col py-4">
                                <button
                                    className="text-blue-500 font-semibold mb-4"
                                    onClick={handleSigninOpionts}
                                    onKeyDown={handleSigninOpionts}
                                >
                                    {ac_strings.allSigninOptions}
                                </button>
                                <button className="text-ac-slate-light"

                                    onClick={handleForgotPassword}
                                    onKeyDown={handleForgotPassword}
                                >
                                    {ac_strings.message_to_existing_user_first_time_cta}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

        </div>

    )
}

export default SignInForm