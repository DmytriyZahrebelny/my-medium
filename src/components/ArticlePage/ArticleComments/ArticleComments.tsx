import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../components/Icon';
import * as actions from '../../../store/Comments/CommentsStore';
import { RootState } from '../../../store/configureStore';
import { ICommentData, IArticleCommentsData, ICommentsProps } from '../interfaces';
import './articleComments.sass';

const ArticleComments: React.FC<ICommentsProps> = ({ slug }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.authStore.user);
	const { comments }: IArticleCommentsData = useSelector((state: RootState) => state.commentsStore);

	useEffect(() => {
		dispatch(actions.getCommentsAsyncAction(slug));
	}, [slug, dispatch]);

	const onDeleteCommentClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
		const currentElement = (evt.target as HTMLButtonElement).closest('.comments__delete');

		if (currentElement) {
			const commentId = currentElement.id;
			dispatch(actions.deleteCommentsAsyncAction(slug, commentId));
		}
	};

	if (comments.length === 0) {
		return null;
	}

	return (
		<>
			{comments.map(({ id, body, author, createdAt }: ICommentData) => (
				<div className='comments' key={id}>
					<p className='comments__text'>{body}</p>
					<div className='comments__author'>
						<img
							src={author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
							className='comments__author-img'
							alt='img'
						/>
						<span className='comments__author-name'>{author.username}</span>
						<span className='comments__created'>{new Date(createdAt).toDateString()}</span>
						{user?.username === author.username ? (
							<button className='comments__delete' onClick={onDeleteCommentClick} id={id}>
								<Icon name='trash' size={14} />
							</button>
						) : null}
					</div>
				</div>
			))}
		</>
	);
};

export default ArticleComments;
