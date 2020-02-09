export enum HADER_CONSTANTS {
	SHOW_USER_MENU,
	IS_SEARCH,
}

interface IHeaderState {
	showUserMenu: boolean;
	isSearch: boolean;
}

export const initialState = {
	showUserMenu: false,
	isSearch: false,
};

type Action =
	| { type: HADER_CONSTANTS.SHOW_USER_MENU; showUserMenu: boolean }
	| { type: HADER_CONSTANTS.IS_SEARCH; isSearch: boolean };

export const headerReducer = (state: IHeaderState = initialState, action: Action) => {
	switch (action.type) {
		case HADER_CONSTANTS.SHOW_USER_MENU:
			return { ...state, showUserMenu: action.showUserMenu };
		case HADER_CONSTANTS.IS_SEARCH:
			return { ...state, isSearch: action.isSearch };
		default:
			return state;
	}
};
