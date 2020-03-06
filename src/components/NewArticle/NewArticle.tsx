import React from 'react';
import TextField from '../components/FormControls/TextField';
import TextareaField from '../components/FormControls/TextareaField';
import { useNewArticleHooks } from './useNewArticleHooks';
import './newArticle.sass';

const NewArticle: React.FC = () => {
	const { handleSubmit, getFieldProps, touched, errors } = useNewArticleHooks();

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

export default NewArticle;
