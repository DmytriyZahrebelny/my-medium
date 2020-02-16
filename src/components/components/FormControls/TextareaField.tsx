import React from 'react';
import './textareaField.sass';

interface ITextFieldProps {
	input: any;
	errors: any;
	touched: any;
	className?: string;
	placeholder?: string;
}

const TextareaField: React.FC<ITextFieldProps> = ({
	input,
	errors,
	touched,
	placeholder,
	className = 'textarea-field',
}) => {
	console.log(input);
	console.log(touched[input.name]);
	return (
		<div className={className}>
			<textarea {...input} placeholder={placeholder} />
			{errors[input.name] && touched[input.name] ? <div>{errors[input.name]}</div> : null}
		</div>
	);
};

export default TextareaField;
