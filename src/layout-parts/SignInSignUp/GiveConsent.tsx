import { FormSubmitButton } from '@/components/Button';
import { InputCheckbox } from '@/components/Input';
import Snackbar from '@/components/Snackbar';
import { initiateConsentNotify } from '@/state/action/authAction';
import { loggedInErrorSelector } from '@/state/selectors/user';
import ac_strings from '@/strings/ac_strings.js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialFieldState = {
	consentReceiveEmail: false,
	consent: false
};

const initialErrorState = {
	consentReceiveEmail: '',
	consent: ''
};

type IFieldName = 'consent' | 'consentReceiveEmail';
const SignUpForm = () => {
	const dispatch = useDispatch();
	const [fields, setFields] = React.useState(initialFieldState);
	const [errors, setErrors] = React.useState(initialErrorState);

	const loggedInError = useSelector(loggedInErrorSelector);

	/*     React.useEffect(() => {
            validate()
        }, [fields]); */
	const validate = () => {
		const errorsFound = {
			...initialErrorState
		};
		const pass = true;

		setErrors(errorsFound);
		return pass;
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (validate()) {
			dispatch(
				initiateConsentNotify({
					receivedEmail: fields.consentReceiveEmail,
					consent: fields.consent
				})
			);
		}
	};

	const handleChange = (e: any, field: IFieldName) => {
		const result = { ...fields };

		if (field === 'consentReceiveEmail') {
			result.consentReceiveEmail = !fields.consentReceiveEmail;
			setFields(result);
		} else if (field === 'consent') {
			result.consent = !fields.consent;
			setFields(result);
		}
		validate();
	};

	return (
		<div className="flex-1 flex flex-col items-center justify-center w-full h-full ">
			<div className="flex flex-col justify-center bg-ac-primary py-12 px-4 rounded-lg text-white shadow w-full">
				<h5 className="font-semibold pb-2">{ac_strings.signin_sub_title}</h5>
				<span className="text-sm">{ac_strings.reset_password_review_terms}</span>
			</div>
			<form action="" className="w-full px-4 py-6" onSubmit={handleSubmit}>
				{loggedInError && <Snackbar text={loggedInError} error />}

				<InputCheckbox
					label={ac_strings.consent_signup_email_checkbox_first}
					onChange={e => {
						handleChange(e, 'consent');
					}}
					value={fields.consent}
					error={errors.consent}
				/>
				<InputCheckbox
					label={ac_strings.consent_signup_email_receive}
					onChange={e => {
						handleChange(e, 'consentReceiveEmail');
					}}
					value={fields.consentReceiveEmail}
					error={errors.consentReceiveEmail}
				/>

				<div className="flex flex-col justify-center w-full text-sm sm:text-base">
					<div className="flex justify-center">
						<FormSubmitButton disabled={!fields.consent} loading={false} onClick={handleSubmit} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
