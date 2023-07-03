import { FormSubmitButton } from '@/components/Button';
import { InputCheckbox, InputText, InputTextArea } from '@/components/Input';
import Snackbar from '@/components/Snackbar';
import { validateEmail } from '@/helpers/index-js';
import ac_strings from '@/strings/ac_strings.js';
import endpoints from '@/strings/static/endpoints';
import React from 'react';

const siteUrl = process.env.SITE_URL;
const contactFormTo = process.env.CONTACT_FROM_TO;

interface IContactFrom {
	name: string;
	email: string;
	location: string;
	subject: string;
	message: string;
	from?: string;
	to?: string;
	honey?: string;
	consent?: boolean;
}

const initialFields = {
	name: '',
	honey: '',
	email: '',
	location: '',
	subject: '',
	message: ''
};

const requiredFields: Record<string, boolean> = {
	name: false,
	email: false,
	message: false
};


const ContactForm = () => {
	const [fields, setFields] = React.useState<IContactFrom>(initialFields);
	const [errors, setErrors] = React.useState(requiredFields);
	const [success, setSuccess] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState<undefined | string>(undefined);
	const [canSent, setCanSet] = React.useState(false);
	const validate = () => {
		const result = { ...errors };
		let pass = true;
		for (const field in result) {
			if ((fields[field as keyof IContactFrom] as string).trim() === '') {
				result[field] = true;
				pass = false;
			} else if (field === 'email') {
				if (!validateEmail(fields[field])) {
					result[field] = true;
					pass = false;
				} else {
					result[field] = false;
				}
			} else {
				result[field] = false;
			}
		}

		setCanSet(pass);
		setErrors(result);
		return pass;
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (fields.honey !== '') return;

		if (validate()) {
			const data: IContactFrom = { from: ac_strings.site_title, ...fields };
			if (siteUrl) {
				data.from = siteUrl.replace('https://', '');
			}

			if (contactFormTo) {
				data.to = contactFormTo;
			}

			/*     const dataLayer = (window as any).dataLayer = (window as any).dataLayer || []; */

			fetch(endpoints.contact_form_api, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer FNuU0lnQkiERUe6jTdVDuSowc61VEX'
				},
				body: JSON.stringify(data)
			})
				.then((result: any) => {
					if (result.data && result.data.errorMessage) {
						throw new Error(result.errorMessage);
					} else {
						setSuccess(true);
					}

					setFields(initialFields);
				})
				.catch(error => {
					/*            dataLayer.push({
                               event: 'ac.gtm_track_form_error',
                               label: 'Contact',
                               message: error.message
                           }) */
					setErrorMessage(`${ac_strings.error_something_went_wrong}. ${error.message}`);
				});
		}
	};

	const handleChange = (e: any, field: string) => {
		validate();

		if (field === 'consent') {
			setFields({
				...fields,
				[field]: !fields.consent
			});
		} else {
			setFields({
				...fields,
				[field]: e.target.value
			});
		}
	};

	return (
		<div className="pb-8 sm:py-4">
			{errorMessage !== undefined && <Snackbar text={errorMessage} error />}
			{success === true && <Snackbar text={ac_strings.contact_sent} />}
			<form className="w-full flex" onSubmit={handleSubmit}>
				<div className="w-1/2 pr-2">
					<InputText
						label={ac_strings.full_name}
						type="text"
						name="name"
						placeholder="John Doe"
						required
						value={fields.name}
						error={errors.name ? ac_strings.error_required : undefined}
						onChange={e => handleChange(e, 'name')}
					/>
				</div>
				<div className="w-1/2">
					<InputText
						label={ac_strings.location}
						type="text"
						name="location"
						placeholder="City | Country"
						value={fields.location}
						error={errors.location}
						onChange={e => handleChange(e, 'location')}
					/>
				</div>
			</form>
			<input type="hidden" name="form-name" value="contact" />
			<InputText
				label={ac_strings.email}
				type="email"
				name="email"
				placeholder="example@email.com"
				required
				value={fields.email}
				error={errors.email ? ac_strings.error_required : undefined}
				onChange={e => handleChange(e, 'email')}
			/>
			<InputText
				label={ac_strings.subject}
				type="text"
				name="subject"
				placeholder="Topic or reason for contact"
				value={fields.subject}
				error={errors.subject ? ac_strings.error_required : undefined}
				onChange={e => handleChange(e, 'subject')}
			/>
			<InputTextArea
				label={ac_strings.message}
				required
				name="message"
				value={fields.message}
				error={errors.message}
				onChange={e => handleChange(e, 'message')}
			/>

			<InputCheckbox
				className="text-gray-600"
				value={fields.consent === true}
				label={ac_strings.consent_contact}
				onChange={e => {
					handleChange(e, 'consent');
				}}
			/>
			<div className="flex flex-col justify-center w-full text-sm sm:text-base">
				<div className="flex justify-center py-4">
					<a
						className="underline text-ac-secondary"
						href={`${ac_strings.slug_privacy_policy}` || '/'}
						target="_blank"
						rel="noreferrer"
					>
						{ac_strings.consent_read_policy}
					</a>
				</div>
				<div className="flex justify-center">
					<FormSubmitButton disabled={!fields.consent || canSent} onClick={handleSubmit} />
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
