import { types, flow, cast } from 'mobx-state-tree';
import { authApi } from '../../api/authApi';
import { ILoginResponse, ISignIn, ISignUp } from './interfaces';

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
	.actions(self => ({
		signInAction: flow(function* signIn(data: ISignIn) {
			const response: ILoginResponse | string[] = yield authApi.signIn(data);
			if (response instanceof Array) {
				self.errorsMesages = cast(response);
			} else {
				self.user = response.user;
				self.token = response.user.token;
				self.errorsMesages = null;
				self.redirectTo = '/';
			}
		}),
		signUpAction: flow(function* signUp(data: ISignUp) {
			const response: ILoginResponse | string[] = yield authApi.signUp(data);
			if (response instanceof Array) {
				self.errorsMesages = cast(response);
			} else {
				self.user = response.user;
				self.token = response.user.token;
				self.errorsMesages = null;
				self.redirectTo = '/';
			}
		}),
		loginAction: flow(function* login() {
			try {
				const token = window.localStorage.getItem('__token');
				if (token) {
					const res = yield authApi.getViewerData(token);

					self.user = res.user;
					self.token = res.user.token;
				}
			} catch (error) {
				window.localStorage.removeItem('__token');
			}
		}),
		updateDataAction: flow(function* updateData(formData: any) {
			const response: ILoginResponse | string[] = yield authApi.updateUserData(
				formData,
				self.token
			);
			if (response instanceof Array) {
				self.errorsMesages = cast(response);
			} else {
				self.user = response.user;
				self.token = response.user.token;
				self.errorsMesages = null;
				self.redirectTo = '/posts';
			}
		}),
		logoutAction() {
			window.localStorage.removeItem('__token');
			self.user = null;
			self.token = null;
			self.errorsMesages = null;
			self.redirectTo = null;
		},
		clearErrorsAction() {
			self.errorsMesages = null;
		},
	}));
