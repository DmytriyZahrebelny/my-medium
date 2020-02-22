import React from 'react';
import { IErrorsProp } from '../../Auth/interfaces';
import './errorsMessages.sass';

const ErrorsMessages: React.FC<IErrorsProp> = ({ errors }) => (
	<ul className='sign-in__auth-error'>
		{errors.map((err: string) => (
			<li key={err}>{err}</li>
		))}
	</ul>
);

export default ErrorsMessages;
