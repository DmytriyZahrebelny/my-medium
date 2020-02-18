import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/Auth/AuthStore';
import { RootState } from '../../store/configureStore';

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
	const dispatch = useDispatch();
	const history = useHistory();
	const errorsMesages: string[] | null = useSelector((state: RootState) => state.authStore.errorsMesages);
	const signUpForm = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validate: signUpValidate,
		onSubmit: async values => {
			history.push('/');
			dispatch(actions.signUpAsyncAction(values));
		},
	});

	const signInForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: signInValidate,
		onSubmit: values => {
			history.push('/');
			dispatch(actions.signInAsyncAction(values));
		},
	});

	return {
		errorsMesages,
		signUpForm,
		signInForm,
	};
};
