import React from 'react';
import { useFormik } from 'formik';
import TextField from '../../components/FormControls/TextField';
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
	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: values => console.log(JSON.stringify(values)),
	});
	return (
		<div className='sign-in'>
			<h1 className='sign-in__title'>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<TextField input={getFieldProps('email')} errors={errors} touched={touched} placeholder='Email' />
				<TextField input={getFieldProps('password')} errors={errors} touched={touched} placeholder='Password' />
				<button className='sign-in__button'>Sign in</button>
			</form>
		</div>
	);
};

export default Signin;
