import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { RootState } from '../../store/configureStore';
import { useAuthStore } from '../../store/AuthStore/AuthStore';
import { IAllArticlesData, IMatchParams, IArticleCommentsData, IUserData } from './interfaces';
import * as actions from '../../store/Comments/CommentsStore';

export const useArticlePageHooks = (slug: string = '') => {
	const dispatch = useDispatch();
	const { number } = useParams();
	const { user, token }: IUserData = useAuthStore();
	const { articles }: IAllArticlesData = useSelector((state: RootState) => state.articlesStore);
	const { comments }: IArticleCommentsData = useSelector((state: RootState) => state.commentsStore);
	const { params }: IMatchParams = useRouteMatch();

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

	const onDeleteCommentClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
		const currentElement = (evt.target as HTMLButtonElement).closest('.comments__delete');

		if (currentElement) {
			const commentId: string = currentElement.id;
			dispatch(actions.deleteCommentsAsyncAction(slug, commentId));
		}
	};

	useEffect(() => {
		if (!articles.length) {
			// dispatch(articlesAction.getArticlesAsyncAction(Number(number) - 1));
		}
	}, [number, articles, dispatch]);

	return {
		token,
		articles,
		params,
		user,
		handleSubmit,
		getFieldProps,
		comments,
		onDeleteCommentClick,
		dispatch,
	};
};
