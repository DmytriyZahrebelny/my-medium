import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import TextField from '../components/FormControls/TextField';
import TextareaField from '../components/FormControls/TextareaField';
import { RootState } from '../../store/configureStore';
import { newPostApi } from './newPostApi';
import './newPost.sass';

const validate = (value: any) => {
	const errors: any = {};

	if (!value.title) {
		errors.title = 'required';
	}

	if (!value.description) {
		errors.description = 'required';
	}

	if (!value.body) {
		errors.body = 'required';
	}

	return errors;
};

const NewPost: React.FC = () => {
	const token: string | null = useSelector((state: RootState) => state.authStore.token);
	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			title: '',
			description: '',
			body: '',
		},
		validate,
		onSubmit: async values => {
			const response = await newPostApi.createPost(values, token);

			console.log(response);
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
						input={getFieldProps('body')}
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
