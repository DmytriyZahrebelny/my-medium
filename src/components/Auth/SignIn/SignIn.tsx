import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TextField from '../../components/FormControls/TextField';
import ErrorsMessages from '../components/ErrorsMessages';
import * as actions from '../../../store/AuthStore';
import { RootState } from '../../../store/configureStore';
import '../auth.sass';

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

const SignIn: React.FC = () => {
	const dispatch = useDispatch();
	const errorsMesages: string[] | null = useSelector((state: RootState) => state.authStore.errorsMesages);
	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: values => {
			dispatch(actions.signInAsyncAction(values));
		},
	});

	return (
		<div className='sign-in'>
			<h1 className='sign-in__title'>Sign In</h1>
			{errorsMesages ? <ErrorsMessages errors={errorsMesages} /> : null}
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

export default SignIn;
