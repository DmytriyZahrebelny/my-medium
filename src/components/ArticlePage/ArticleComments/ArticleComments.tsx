import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Icon from '../../components/Icon';
import { ICommentData, ICommentsProps } from '../interfaces';
import { useArticlePageHooks } from '../useArticlePageHooks';
import './articleComments.sass';

const ArticleComments: React.FC<ICommentsProps> = ({ slug }) => {
	const { user, comments, onDeleteCommentClick, getCommentsAction } = useArticlePageHooks(slug);

	useEffect(() => {
		getCommentsAction(slug);
	}, [slug, getCommentsAction]);

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

export default observer(ArticleComments);
