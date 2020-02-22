import React from 'react';
import { useFormik } from 'formik';
import TextField from '../components/FormControls/TextField';
import TextareaField from '../components/FormControls/TextareaField';
import './settingsPage.sass';

const validate = (value: any) => {
	const errors: any = {};

	if (!value.imgUrl) {
		errors.imgUrl = 'required';
	}

	if (!value.username) {
		errors.username = 'required';
	}

	if (!value.aboutYou) {
		errors.aboutYou = 'required';
	}

	if (!value.email) {
		errors.email = 'required';
	}

	if (!value.password) {
		errors.password = 'required';
	}

	return errors;
};

const SettingsPage = () => {
	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			imgUrl: '',
			username: '',
			aboutYou: '',
			email: '',
			password: '',
		},
		validate,
		onSubmit: values => {
			console.log(values);
		},
	});

	return (
		<div className='settings'>
			<h1 className='settings__title'>Your Settings</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					input={getFieldProps('imgUrl')}
					errors={errors}
					touched={touched}
					placeholder='URL of profile picture'
				/>
				<TextField
					type='text'
					input={getFieldProps('username')}
					errors={errors}
					touched={touched}
					placeholder='username'
				/>
				<div className='settings__textarea'>
					<TextareaField
						input={getFieldProps('aboutYou')}
						errors={errors}
						touched={touched}
						placeholder='Short bio about you'
					/>
				</div>
				<TextField
					type='email'
					input={getFieldProps('email')}
					errors={errors}
					touched={touched}
					placeholder='email'
				/>
				<TextField
					type='password'
					input={getFieldProps('password')}
					errors={errors}
					touched={touched}
					placeholder='password'
				/>
				<button className='settings__btn' type='submit'>
					Update Settings
				</button>
			</form>
		</div>
	);
};

export default SettingsPage;
