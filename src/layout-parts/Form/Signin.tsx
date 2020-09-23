import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from '@/state/action'

import { initiateLogIn } from '@/state/action/authAction'
import { InputText, InputCheckbox } from '@/components/Input'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/layout-parts/Buttons"
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

    const handleSubmit = () => {


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

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center max-w-mobile w-full h-full px-4 py-6"
        >
            {authInfo.errorMessage && (
                <Snackbar
                    text={authInfo.errorMessage}
                />
            )}
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
            <div className="text-sm">
                <button
                    className="text-blue-500 font-semibold"
                    onClick={handleSigninOpionts}
                    onKeyDown={handleSigninOpionts}
                >
                    {ac_strings.allSigninOptions}
                </button>
            </div>
        </div>

    )
}

export default SignInForm