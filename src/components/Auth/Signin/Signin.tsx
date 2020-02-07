import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import TextField from '../../components/FormControls/TextField';
import { authApi } from '../authApi';
import { RootState } from '../../../store/configureStore';
import * as actions from '../../../store/AuthStore';
import './signin.sass';

const validate = (value: any) => {
	const errors: any = {};

	if (!value.email) {
		errors.email = 'required';
	}

	if (!value.password) {
		errors.password = 'required';
	}

	return errors;
};

const Signin: React.FC = () => {
	const [error, setError] = useState('');
	const authStore = useSelector((state: RootState) => state.authStore);
	const dispatch = useDispatch();
	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: async values => {
			const data: any = await authApi.signIn(values);

			if (typeof data === 'string') {
				setError(data);
			} else {
				dispatch(actions.loginAction(data));
			}
		},
	});

	console.log(authStore);

	return (
		<div className='sign-in'>
			<h1 className='sign-in__title'>Sign In</h1>
			{error ? <div className='sign-in__auth-error'>{error}</div> : null}
			<form onSubmit={handleSubmit}>
				<TextField type='email' input={getFieldProps('email')} errors={errors} touched={touched} placeholder='Email' />
				<TextField
					type='password'
					input={getFieldProps('password')}
					errors={errors}
					touched={touched}
					placeholder='Password'
				/>
				<button type='submit' className='sign-in__button'>
					Sign in
				</button>
			</form>
		</div>
	);
};

export default Signin;
