import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import * as actions from '../../../store/Comments/CommentsStore';
import { ICommentsProps } from '../interfaces';
import './commentsForm.sass';

const CommentsForm: React.FC<ICommentsProps> = ({ slug }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.authStore.user);
	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			comment: '',
		},
		onSubmit: ({ comment }) => {
			if (comment.length) {
				dispatch(actions.createCommentsAsyncAction(slug, comment));
			}
		},
	});

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
