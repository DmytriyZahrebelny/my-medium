import React from 'react';
import './textareaField.sass';

interface ITextFieldProps {
	input: any;
	errors: any;
	touched: any;
	className?: string;
	placeholder?: string;
	required?: boolean;
}

const TextareaField: React.FC<ITextFieldProps> = ({
	input,
	errors,
	touched,
	placeholder,
	className = 'textarea-field',
	required = true,
}) => {
	return (
		<div className={className}>
			<textarea {...input} placeholder={placeholder} />
			{required && errors[input.name] && touched[input.name] ? (
				<div>{errors[input.name]}</div>
			) : null}
		</div>
	);
};

export default TextareaField;
