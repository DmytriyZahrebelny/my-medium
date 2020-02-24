import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { IUserData } from './interfaces';
import * as actions from '../../store/Auth/AuthStore';

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
	const dispatch = useDispatch();
	const { user, errorsMesages } = useSelector((state: RootState) => state.authStore);

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

			dispatch(actions.updateUserDataAsyncAction(getNewUserData(values)));
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
