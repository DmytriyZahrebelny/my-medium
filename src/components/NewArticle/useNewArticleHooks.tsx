import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store/configureStore';
import { IArticleId } from './interfaces';
import { addNewPostAsyncAction } from '../../store/Articles/ArticlesStore';

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

export const useNewArticleHooks = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { articleId }: IArticleId = useSelector((state: RootState) => state.articlesStore);

	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			title: '',
			description: '',
			body: '',
		},
		validate,
		onSubmit: values => {
			dispatch(addNewPostAsyncAction(values));
		},
	});

	useEffect(() => {
		if (articleId) {
			history.push(`/posts/1/${articleId}`);
		}
	}, [articleId, history]);

	return {
		handleSubmit,
		getFieldProps,
		touched,
		errors,
	};
};