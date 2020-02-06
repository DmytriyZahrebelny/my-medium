import React from 'react';
import './textField.sass';

interface ITextFieldProps {
	input: any;
	errors: any;
	touched: any;
	className?: string;
	placeholder?: string;
}

const TextField: React.FC<ITextFieldProps> = ({ input, errors, touched, placeholder, className = 'text-field' }) => (
	<div className={className}>
		<input {...input} placeholder={placeholder} />
		{errors[input.name] && touched[input.name] ? <div>{errors.email}</div> : null}
	</div>
);

export default TextField;