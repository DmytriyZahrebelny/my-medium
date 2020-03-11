import { useFormik } from 'formik';
import { IUserData } from './interfaces';
import { useStore } from '../../store/createStore';

const validate = (value: any) => {
	const errors: any = {};

	if (!value.username) {
		errors.username = 'required';
	}

	if (!value.email) {
		errors.email = 'required';
	}

	return errors;
};

export const useSettingsHooks = () => {
	const { auth } = useStore();
	const { user, errorsMesages, updateDataAction } = auth;

	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues: {
			image: '',
			username: user?.username,
			bio: '',
			email: user?.email,
			password: '',
		},
		validate,
		onSubmit: (values: IUserData) => {
			const getNewUserData = ({ password, ...rest }: IUserData) => {
				return password === '' ? { ...rest } : { ...rest, password };
			};

			updateDataAction(getNewUserData(values));
		},
	});

	return {
		errorsMesages,
		handleSubmit,
		getFieldProps,
		touched,
		errors,
	};
};
