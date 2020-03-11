import React from 'react';
import { observer } from 'mobx-react';
import TextField from '../../components/FormControls/TextField';
import ErrorsMessages from '../../components/ErrorsMessages/ErrorsMessages';
import { useAuthHooks } from '../useAuthHooks';
import '../auth.sass';

const SignIn: React.FC = () => {
	const { errorsMesages, signInForm } = useAuthHooks();
	const { handleSubmit, getFieldProps, errors, touched } = signInForm;

	return (
		<div className='sign-in'>
			<h1 className='sign-in__title'>Sign In</h1>
			{errorsMesages ? <ErrorsMessages errors={errorsMesages} /> : null}
			<form onSubmit={handleSubmit}>
				<TextField
					type='email'
					input={getFieldProps('email')}
					errors={errors}
					touched={touched}
					placeholder='Email'
				/>
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

export default observer(SignIn);
