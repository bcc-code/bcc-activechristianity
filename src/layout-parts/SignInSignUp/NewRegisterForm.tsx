import { InputText } from '@/components/Input';
import Snackbar from '@/components/Snackbar';
import { initiateRegister, setLogInError } from '@/state/action/authAction';
import { loggedInErrorSelector } from '@/state/selectors/user';
import ac_strings from '@/strings/ac_strings.js';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	password: yup
		.string()
		.required('Please Enter your password')
		.test('len', 'Must be 6 characters or more', val => val !== undefined && val.length > 5),
	/*         .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ), */
	passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

function RegisterForm() {
	const dispatch = useDispatch();
	const loggedInError = useSelector(loggedInErrorSelector);
	const defaultValues = {
		email: '',
		password: '',
		passwordConfirmation: ''
	};
	const { control, formState, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;
	function onSubmit(model: any) {
		const { email, password, remember } = model;
		if (isValid) {
			const toSend = {
				email,
				password,
				remember
			};
			dispatch(initiateRegister(toSend));
		}
	}
	React.useEffect(() => {
		return () => {
			dispatch(setLogInError(''));
		};
	}, []);

	return (
		<div className="flex-1 flex flex-col items-center justify-center max-w-mobile sm:max-w-tablet w-full h-full ">
			{loggedInError && (
				<div className="px-4 w-full">
					<Snackbar text={loggedInError} error />
				</div>
			)}
			<form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="lex flex-col pb-4 px-4 text-sm">
					<Controller
						key="email"
						name="email"
						control={control}
						render={({ field }) => {
							return (
								<InputText
									error={errors?.email?.message}
									label={ac_strings.email}
									hideLabel
									{...field}
								/>
							);
						}}
					/>
					<Controller
						key="password"
						name="password"
						control={control}
						render={({ field }) => {
							return (
								<InputText
									error={errors?.password?.message}
									type="password"
									label={ac_strings.password}
									hideLabel
									{...field}
								/>
							);
						}}
					/>
					<Controller
						key="passwordConfirmation"
						name="passwordConfirmation"
						control={control}
						render={({ field }) => {
							return (
								<InputText
									error={errors?.passwordConfirmation?.message}
									type="password"
									label={ac_strings.confirm_password}
									hideLabel
									{...field}
								/>
							);
						}}
					/>
					<div className="text-xs sm:text-sm text-gray-500 leading-normal pb-4 px-2">
						{ac_strings.consent_register}
					</div>
					<button
						className={`w-full sm:w-auto sm:text-base px-4 py-2 sm:py-4 mt-4 sm:px-12 rounded-lg font-semibold  ${
							!isValid ? 'bg-gray-400' : 'bg-blue-600 border-blue-600'
						} text-white text-lg  hover:bg-blue-400`}
						type="submit"
						key="registerbutton"
					>
						{ac_strings.register}
					</button>
				</div>
			</form>
		</div>
	);
}

export default RegisterForm;
