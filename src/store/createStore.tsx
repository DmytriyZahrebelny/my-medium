import { createContext, useContext } from 'react';
import { RootStore } from './RootStore';

export const createStore = () => RootStore.create();

const MSTContext: any = createContext(null);

export const { Provider } = MSTContext;

export function useStore(mapStateToProps: any = null) {
	const store: object | null = useContext(MSTContext);

	if (typeof mapStateToProps === 'function') {
		return mapStateToProps(store);
	}

	return store;
}
