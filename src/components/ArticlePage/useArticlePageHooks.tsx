import { useEffect } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useCommentsStore } from '../../store/CommentsStore/CommentsStore';
import { useStore } from '../../store/createStore';
import { IMatchParams } from './interfaces';

export const useArticlePageHooks = (slug: string = '') => {
	const { articlesStore, auth } = useStore();

	const { comments, createCommentsAction, deleteCommentsAction } = useCommentsStore();
	const { articles, getArticlesAction } = articlesStore;
	const { user, token } = auth;
	const { number } = useParams();
	const { params }: IMatchParams = useRouteMatch();
	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			comment: '',
		},
		onSubmit: ({ comment }) => {
			if (comment.length) {
				createCommentsAction(slug, comment);
			}
		},
	});

	const onDeleteCommentClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
		const currentElement = (evt.target as HTMLButtonElement).closest('.comments__delete');

		if (currentElement) {
			const commentId: string = currentElement.id;
			deleteCommentsAction(slug, commentId);
		}
	};

	useEffect(() => {
		if (!articles.length) {
			getArticlesAction(Number(number) - 1);
		}
	}, [number, articles, getArticlesAction]);

	return {
		token,
		articles,
		params,
		user,
		handleSubmit,
		getFieldProps,
		comments,
		onDeleteCommentClick,
	};
};
