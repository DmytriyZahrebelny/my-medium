import { types, flow, cast } from 'mobx-state-tree';
import { authApi } from '../../api/authApi';
import { settingsApi } from '../../api/settingsApi';
import { ILoginResponse, ISignIn, ISignUp } from '../AuthStore/interfaces';

const authDataModel = types.model({
	id: types.number,
	email: types.string,
	createdAt: types.string,
	updatedAt: types.string,
	username: types.string,
	bio: types.maybeNull(types.string),
	image: types.maybeNull(types.string),
	token: types.string,
});

export const AuthStore = types
	.model('AuthModal', {
		user: types.maybeNull(authDataModel),
		errorsMesages: types.maybeNull(types.array(types.string)),
		token: types.maybeNull(types.string),
		redirectTo: types.maybeNull(types.string),
	})
	.actions(store => ({
		signInAction: flow(function* signIn(data: ISignIn) {
			const response: ILoginResponse | string[] = yield authApi.signIn(data);
			if (response instanceof Array) {
				store.errorsMesages = cast(response);
			} else {
				store.user = response.user;
				store.token = response.user.token;
				store.errorsMesages = null;
				store.redirectTo = '/';
			}
		}),
		signUpAction: flow(function* signUp(data: ISignUp) {
			const response: ILoginResponse | string[] = yield authApi.signUp(data);
			if (response instanceof Array) {
				store.errorsMesages = cast(response);
			} else {
				store.user = response.user;
				store.token = response.user.token;
				store.errorsMesages = null;
				store.redirectTo = '/';
			}
		}),
		loginAction: flow(function* login() {
			try {
				const token = window.localStorage.getItem('__token');
				if (token) {
					const res = yield authApi.getViewerData(token);

					store.user = res.user;
					store.token = res.user.token;
				}
			} catch (error) {
				window.localStorage.removeItem('__token');
			}
		}),
		updateDataAction: flow(function* updateData(formData: any) {
			const response: ILoginResponse | string[] = yield settingsApi.updateUserData(
				formData,
				store.token
			);
			if (response instanceof Array) {
				store.errorsMesages = cast(response);
			} else {
				store.user = response.user;
				store.token = response.user.token;
				store.errorsMesages = null;
				store.redirectTo = '/posts';
			}
		}),
		logoutAction() {
			window.localStorage.removeItem('__token');
			store.user = null;
			store.token = null;
			store.errorsMesages = null;
			store.redirectTo = null;
		},
		clearErrorsAction() {
			store.errorsMesages = null;
		},
	}));
