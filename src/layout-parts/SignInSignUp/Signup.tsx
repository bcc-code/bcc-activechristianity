import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import { initiateRegister } from '@/state/action/authAction'
import { openSignInModal } from '@/state/action'
import { InputText } from '@/components/Input'
import ac_strings from '@/strings/ac_strings.js'
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
    keepSignedIn: false
}

const initialErrorState = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    keepSignedIn: ''
}

type IFieldName = 'username' | 'email' | 'password' | 'confirm' | 'keepSignedIn'
const SignUpForm = () => {
    const dispatch = useDispatch()
    const [fields, setFields] = React.useState(initialFieldState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [touched, setTouched] = React.useState(false)
    const [strength, setStrength] = React.useState<'white' | 'green' | 'orange' | 'red'>('white')
    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));

    React.useEffect(() => {
        if (touched) {
            validate()
        }

    }, [fields]);

    const validate = () => {
        const errorsFound = {
            ...initialErrorState
        }
        let pass = true;
        const fieldNames: IFieldName[] = ['email', 'password', 'confirm']
        for (let field of fieldNames) {
            let value = fields[field]
            if (typeof value === 'string' && value.trim() === '') {
                errorsFound[field] = ac_strings.error_required
                pass = false
            } else {
                errorsFound[field] = ''
            }
        }

        if (fields.password.length < 6) {
            errorsFound['confirm'] = ac_strings.error_password_too_short
            pass = false
        }



        if (!strongRegex.test(fields.password) && !mediumRegex.test(fields.password)) {
            setStrength('red')
            errorsFound['password'] = ac_strings.error_password_specs
            pass = false
        }

        if (fields.password !== fields.confirm) {
            errorsFound['confirm'] = ac_strings.passwords_mismatch
            pass = false
        }
        setErrors(errorsFound)
        return pass
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const passValidation = validate()
        if (passValidation) {

            const { email, password } = fields

            const data = {
                email,
                password,
            }
            dispatch(initiateRegister(data))
        }
    }

    const handleChange = (e: any, field: IFieldName) => {
        if (!touched) {
            setTouched(true)
        }
        const result = { ...fields }
        validate()
        if (field === 'keepSignedIn') {
            setFields({
                ...fields,
                keepSignedIn: !fields.keepSignedIn
            })
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
            className="flex-1 flex flex-col items-center justify-center w-full h-full "
        >
            <div className="flex flex-col justify-center bg-ac-primary py-4 px-4 rounded-top-lg text-white shadow w-full">
                <h5 className="font-semibold pb-2">{ac_strings.signup_options_email}</h5>
            </div>


            <form action="" className="w-full px-4 py-6" onSubmit={handleSubmit}>
                {authInfo.errorMessage && (
                    <Snackbar
                        text={authInfo.errorMessage}
                        error
                    />
                )}
                <InputText
                    label={ac_strings.email}
                    value={fields["email"]}
                    onChange={(e) => {
                        handleChange(e, 'email')
                    }}
                    error={errors.email}
                />
                <InputText
                    label={ac_strings.password}
                    type="password"
                    value={fields.password}
                    onChange={(e) => {
                        handleChange(e, 'password')
                    }}
                    error={errors.password}
                />

                <InputText
                    label={ac_strings.confirm_password}
                    type="password"
                    value={fields.confirm}
                    onChange={(e) => {
                        handleChange(e, 'confirm')
                    }}
                    error={errors.confirm}
                />
                {/*                 <InputCheckbox
                    label={ac_strings.remember_me}
                    onChange={(e) => {
                        handleChange(e, 'keepSignedIn')
                    }}
                    value={fields.keepSignedIn}
                /> */}
                {/*                 <InputCheckbox
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
 */}
                <div className="flex flex-col justify-center w-full text-sm sm:text-base">
                    <div className="flex justify-center">
                        <FormSubmitButton
                            /*    disabled={fields.consent !== true} */
                            loading={authInfo.loggedIn === "loading"}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </form>
            <div className="text-sm mb-6">
                <span
                    className="text-blue-500 font-semibold "
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