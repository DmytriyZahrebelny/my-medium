import React from 'react';
import TextField from '../../components/FormControls/TextField';
import ErrorsMessages from '../components/ErrorsMessages';
import { useAuthHooks } from '../useAuthHooks';
import '../auth.sass';

const SignUp: React.FC = () => {
	const { errorsMesages, signUpForm } = useAuthHooks();
	const { handleSubmit, getFieldProps, errors, touched } = signUpForm;

	return (
		<div className='sign-in'>
			<h1 className='sign-in__title'>Sign Up</h1>
			{errorsMesages ? <ErrorsMessages errors={errorsMesages} /> : null}
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					input={getFieldProps('username')}
					errors={errors}
					touched={touched}
					placeholder='User name'
				/>
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

export default SignUp;
