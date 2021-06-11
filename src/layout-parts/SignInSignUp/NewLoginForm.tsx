import React from 'react';
import * as yup from 'yup';
import { FormSubmitButton } from "@/components/Button"
import { openSignInModal } from '@/state/action'
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Snackbar from '@/components/Snackbar'
import { InputText, InputCheckbox } from '@/components/Input'
import { loggedInErrorSelector } from '@/state/selectors/user'
import { initiateLogIn, setLogInError } from '@/state/action/authAction'
import ac_strings from '@/strings/ac_strings.js'

const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup.string()
        .required('Please enter your password')
    /*         .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ) */
});


function LoginForm() {
    const dispatch = useDispatch()
    const loggedInError = useSelector(loggedInErrorSelector)
    const defaultValues = {
        email: '',
        password: '',
        remember: true
    };
    const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });
    const { isValid, dirtyFields, errors } = formState;

    function onSubmit(model: any) {
        const { email, password, remember } = model
        if (isValid) {
            const toSend = {
                email,
                password,
                remember
            }
            dispatch(initiateLogIn(toSend))
        }
    }

    React.useEffect(() => {
        return () => { dispatch(setLogInError('')) }
    }, [])
    const handleForgotPassword = (e: any) => {
        e.preventDefault();
        dispatch(openSignInModal("forgotPassword"))
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center max-w-mobile sm:max-w-tablet w-full h-full "
        >
            {loggedInError && (
                <div className="px-4 w-full">
                    <Snackbar
                        text={loggedInError}
                        error
                    />
                </div>
            )}
            <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="px-4">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <InputText error={errors?.email?.message} label={ac_strings.email} hideLabel {...field} />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => {
                            return (
                                <InputText error={errors?.password?.message} type="password" label={ac_strings.password} hideLabel {...field} />
                            )
                        }}
                    />
                </div>
                <div className="text-sm flex flex-col pb-4 px-4">

                    <Controller
                        name="remember"
                        control={control}
                        render={({ field }) => {
                            return (
                                <InputCheckbox
                                    error={errors?.remember}
                                    label={ac_strings.remember_me}
                                    {...field}
                                />

                            )
                        }}
                    />
                    <button className="text-ac-slate-light"
                        type="button"
                        key="forgetpassword"
                        onClick={handleForgotPassword}
                        onKeyDown={handleForgotPassword}
                    >
                        {ac_strings.reset_password}
                    </button>
                    <button
                        key="loginbutton"
                        className="flex justify-center py-1 px-4 mb-2 mt-4  text-center text-sm rounded-full font-semibold whitespace-nowrap min-w-12 mx-4 bg-ac-slate-dark text-white" type="submit">
                        {ac_strings.login}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;