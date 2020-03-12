import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store/createStore';

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

export const useNewPostHooks = () => {
	const history = useHistory();
	const { articlesStore } = useStore();
	const { articleId, addNewPostAction } = articlesStore;

	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			title: '',
			description: '',
			body: '',
		},
		validate,
		onSubmit: values => {
			addNewPostAction(values);
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
