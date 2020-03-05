import { useEffect } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuthStore } from '../../store/AuthStore/AuthStore';
import { useArticlesStore } from '../../store/ArticlesStore/ArticlesStore';
import { useCommentsStore } from '../../store/CommentsStore/CommentsStore';
import { IMatchParams } from './interfaces';

export const useArticlePageHooks = (slug: string = '') => {
	const { comments, createCommentsAction, deleteCommentsAction } = useCommentsStore();
	const { articles, getArticlesAction } = useArticlesStore();
	const { user, token } = useAuthStore();
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
	}, [number, articles]);

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
