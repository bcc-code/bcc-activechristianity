import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from '@/state/action'

import { initiateLogIn } from '@/state/action/authAction'
import { InputText, InputCheckbox } from '@/components/Input'
import ac_strings from '@/strings/ac_strings.js'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
import { loggedInSelector, loggedInErrorSelector } from '@/state/selectors/user'
import { validateEmail } from '@/helpers/index-js'

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
    const localStorageKey = 'ac.signin.reset_password_reminder'
    const userReminderOption = typeof window !== "undefined" ? localStorage.getItem(localStorageKey) : "false"
    const loggedIn = useSelector(loggedInSelector)
    const loggedInError = useSelector(loggedInErrorSelector)
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
        localStorage.setItem(localStorageKey, "true")
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
            <div className="w-full px-4">
                {loggedInError && (
                    <Snackbar
                        text={loggedInError}
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
                        hideLabel
                        error={errors.email ? ac_strings.error_required : undefined}
                    />
                    <InputText
                        label={ac_strings.password}
                        type='password'
                        value={fields.password}
                        onChange={(e) => {
                            handleChange(e, 'password')
                        }}
                        hideLabel
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
                            loading={loggedIn === "loading"}
                            onClick={handleSubmit}
                        />
                    </div>
                    <div className="text-sm flex flex-col py-4">
                        <button className="text-ac-slate-light"

                            onClick={handleForgotPassword}
                            onKeyDown={handleForgotPassword}
                        >
                            {ac_strings.reset_password}
                        </button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default SignInForm