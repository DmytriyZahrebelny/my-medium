import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../components/FormControls/TextField';
import TextareaField from '../components/FormControls/TextareaField';
import { RootState } from '../../store/configureStore';
import * as actions from '../../store/Auth/AuthStore';
import './settingsPage.sass';

interface IUserData {
	image: string;
	username: string;
	bio: string | null;
	email: string;
	password: string;
}

const validate = (value: any) => {
	const errors: any = {};

	if (!value.username) {
		errors.username = 'required';
	}

	if (!value.email) {
		errors.email = 'required';
	}

	return errors;
};

const SettingsPage: React.FC = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state: RootState) => state.authStore.user);

	const getNewUserData = ({ image, username, bio, email, password }: IUserData) => {
		return password === ''
			? { image, username, bio, email }
			: { image, username, bio, email, password };
	};

	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			image: '',
			username: userData?.username,
			bio: '',
			email: userData?.email,
			password: '',
		},
		validate,
		onSubmit: ({ image, username = '', bio, email = '', password }) => {
			const newUserData: IUserData = {
				image,
				username,
				bio: bio || null,
				email,
				password,
			};
			dispatch(actions.updateUserDataAsyncAction(getNewUserData(newUserData)));
		},
	});

	return (
		<div className='settings'>
			<h1 className='settings__title'>Your Settings</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					input={getFieldProps('image')}
					errors={errors}
					touched={touched}
					placeholder='URL of profile picture'
					required={false}
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
						input={getFieldProps('bio')}
						errors={errors}
						touched={touched}
						placeholder='Short bio about you'
						required={false}
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
					required={false}
				/>
				<button className='settings__btn' type='submit'>
					Update Settings
				</button>
			</form>
		</div>
	);
};

export default SettingsPage;
