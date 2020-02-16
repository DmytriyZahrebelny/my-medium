import React from 'react';
import { useFormik } from 'formik';
import TextField from '../components/FormControls/TextField';
import TextareaField from '../components/FormControls/TextareaField';
import './newPost.sass';

const validate = (value: any) => {
	const errors: any = {};

	if (!value.title) {
		errors.title = 'required';
	}

	if (!value.description) {
		errors.description = 'required';
	}

	if (!value.textarea) {
		errors.textarea = 'required';
	}

	return errors;
};

const NewPost: React.FC = () => {
	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			title: '',
			description: '',
			textarea: '',
		},
		validate,
		onSubmit: values => {
			console.log(values);
		},
	});

	return (
		<div className='new-post'>
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					input={getFieldProps('title')}
					errors={errors}
					touched={touched}
					placeholder='Article Title'
				/>
				<TextField
					type='text'
					input={getFieldProps('description')}
					errors={errors}
					touched={touched}
					placeholder='What`s this article about'
				/>
				<div className='new-post__textarea'>
					<TextareaField
						input={getFieldProps('textarea')}
						errors={errors}
						touched={touched}
						placeholder='Write your article'
					/>
				</div>
				<button className='new-post__btn' type='submit'>
					Publish Article
				</button>
			</form>
		</div>
	);
};

export default NewPost;
