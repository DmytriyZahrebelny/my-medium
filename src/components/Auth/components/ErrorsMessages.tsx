import React from 'react';
import './errorsMessages.sass';

interface IErrorsProp {
	errors: string[];
}

const ErrorsMessages: React.FC<IErrorsProp> = ({ errors }) => {
	return (
		<ul className='sign-in__auth-error'>
			{errors.map((err: string) => (
				<li>{err}</li>
			))}
		</ul>
	);
};

export default ErrorsMessages;
