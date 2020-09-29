import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import { initiateRegister } from '@/state/action/authAction'
import { openSignInModal } from '@/state/action'
import { InputText, InputCheckbox } from '@/components/Input'
import TS from '@/strings'

import ac_strings from '@/strings/ac_strings.json'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
import { IRootState } from '@/state/types'
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

const initialFieldState = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    keepSignedIn: false,
    consent: false
}

const initialErrorState = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    keepSignedIn: '',
    consent: '',
}

type IFieldName = 'username' | 'email' | 'password' | 'confirm' | 'consent' | 'keepSignedIn'
const SignUpForm = () => {
    const dispatch = useDispatch()
    const [fields, setFields] = React.useState(initialFieldState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [strength, setStrength] = React.useState<'white' | 'green' | 'orange' | 'red'>('white')
    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));

    React.useEffect(() => {
        validate()
    }, [fields]);
    const validate = () => {
        const errorsFound = {
            ...initialErrorState
        }
        let pass = true;
        const fieldNames: IFieldName[] = ['username', 'email', 'password', 'confirm']
        for (let field of fieldNames) {
            let value = fields[field]
            if (typeof value === 'string' && value.trim() === '') {
                errorsFound[field] = 'Required'
                pass = false
            } else {
                errorsFound[field] = ''
            }
        }

        if (fields.password.length < 6) {
            errorsFound['confirm'] = 'Password is to short'
            pass = false
        }



        if (!strongRegex.test(fields.password) && !mediumRegex.test(fields.password)) {
            setStrength('red')
            errorsFound['password'] = 'Password needs atleast a-z, A-Z, 1-9, !#$&'
            pass = false
        }

        if (fields.password !== fields.confirm) {
            errorsFound['confirm'] = TS.passwords_mismatch
            pass = false
        }
        setErrors(errorsFound)
        return pass
    }

    const handleSubmit = () => {
        if (validate()) {

            const { username, email, password, keepSignedIn } = fields

            const data = {
                name: username,
                email,
                password,
                remember: keepSignedIn
            }
            dispatch(initiateRegister(data))
        }
    }

    const handleChange = (e: any, field: IFieldName) => {
        const result = { ...fields }

        if (field === 'keepSignedIn') {
            result.keepSignedIn = !fields.keepSignedIn;
            setFields(result)
        } else if (field === 'consent') {
            result.consent = !fields.consent;
            setFields(result)
        } else {
            result[field] = e.target.value
            setFields(result)

            if (field === 'password') {
                if (strongRegex.test(result[field])) {
                    setStrength('green')
                } else if (mediumRegex.test(result[field])) {
                    setStrength('orange')
                } else {
                    setStrength('red')
                }
            }
        }
    }
    const handleSignUpOpionts = () => {
        dispatch(openSignInModal("signUpOptions"))
    }

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center w-full h-full px-4 py-6"
        >
            {authInfo.errorMessage && (
                <Snackbar
                    text={authInfo.errorMessage}
                />
            )}

            <InputText
                label={TS.username}
                value={fields["username"]}
                onChange={(e) => {
                    handleChange(e, 'username')
                }}
                error={errors.username}
            />
            <InputText
                label={TS.email}
                value={fields["email"]}
                onChange={(e) => {
                    handleChange(e, 'email')
                }}
                error={errors.email}
            />
            <InputText
                label={TS.password}
                type="password"
                value={fields.password}
                onChange={(e) => {
                    handleChange(e, 'password')
                }}
                error={errors.password}
            />

            <InputText
                label={TS.confirm_password}
                type="password"
                value={fields.confirm}
                onChange={(e) => {
                    handleChange(e, 'confirm')
                }}
                error={errors.confirm}
            />

            <InputCheckbox
                label={TS.remember_me}
                onChange={(e) => {
                    handleChange(e, 'keepSignedIn')
                }}
                value={fields.keepSignedIn}
                error={errors.keepSignedIn}
            />

            <InputCheckbox
                label={TS.consent_contact}
                onChange={(e) => {
                    handleChange(e, 'consent')
                }}
                value={fields.consent}
                error={errors.consent}
            />

            <div className="flex flex-col justify-center w-full text-sm sm:text-base">
                <div className="flex justify-center py-4">
                    <a className='underline text-d4secondary' href={`/${ac_strings.slug_privacy_policy}` || "/"} target="_blank">{TS.consent_read_policy}</a>
                </div>
                <div className="flex justify-center">
                    <FormSubmitButton
                        disabled={!fields.consent || authInfo.loggedIn === "loading"}
                        loading={authInfo.loggedIn === "loading"}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
            <div className="text-sm">
                <span
                    className="text-blue-500 font-semibold"
                    onClick={handleSignUpOpionts}
                    onKeyDown={handleSignUpOpionts}
                >
                    {ac_strings.allSignupOptions}
                </span>
            </div>
        </div>

    )
}

export default SignUpForm