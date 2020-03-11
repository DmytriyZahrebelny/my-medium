import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useStore } from '../../store/createStore';

const signUpValidate = (value: any) => {
	const errors: any = {};

	if (!value.username) {
		errors.username = 'required';
	}

	if (!value.email) {
		errors.email = 'required';
	}

	if (!value.password) {
		errors.password = 'required';
	}

	return errors;
};

const signInValidate = (value: any) => {
	const errors: any = {};

	if (!value.email) {
		errors.email = 'required';
	}

	if (!value.password) {
		errors.password = 'required';
	}

	return errors;
};

export const useAuthHooks = () => {
	const { auth } = useStore();
	const { signInAction, signUpAction, errorsMesages, clearErrorsAction } = auth;

	useEffect(() => {
		clearErrorsAction();
	}, [clearErrorsAction]);

	const signUpForm = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validate: signUpValidate,
		onSubmit: values => {
			signUpAction(values);
		},
	});

	const signInForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: signInValidate,
		onSubmit: values => {
			signInAction(values);
		},
	});

	return {
		errorsMesages,
		signUpForm,
		signInForm,
	};
};
