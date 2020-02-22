import React from 'react';
import './textField.sass';

interface ITextFieldProps {
	type: string;
	input: any;
	errors: any;
	touched: any;
	className?: string;
	placeholder?: string;
	required?: boolean;
}

const TextField: React.FC<ITextFieldProps> = ({
	type,
	input,
	errors,
	touched,
	placeholder,
	className = 'text-field',
	required = true,
}) => (
	<div className={className}>
		<input type={type} {...input} placeholder={placeholder} />
		{required && errors[input.name] && touched[input.name] ? <div>{errors[input.name]}</div> : null}
	</div>
);

export default TextField;
