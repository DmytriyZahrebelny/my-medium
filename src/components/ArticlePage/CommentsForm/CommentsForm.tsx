import React from 'react';
import { ICommentsProps } from '../interfaces';
import { useArticlePageHooks } from '../useArticlePageHooks';
import './commentsForm.sass';

const CommentsForm: React.FC<ICommentsProps> = ({ slug }) => {
	const { user, handleSubmit, getFieldProps } = useArticlePageHooks(slug);

	return (
		<div className='comment-form'>
			<form onSubmit={handleSubmit}>
				<textarea
					className='comment-form__field'
					placeholder='Write a comment...'
					{...getFieldProps('comment')}
				/>
				<div className='comment-form__author'>
					<img
						src={user?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
						className='comment-form__author-img'
						alt='img'
					/>
					<span className='comment-form__author-name'>{user?.username}</span>
					<button type='submit' className='comment-form__delete'>
						Post Comment
					</button>
				</div>
			</form>
		</div>
	);
};

export default CommentsForm;
