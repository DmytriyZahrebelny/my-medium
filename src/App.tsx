import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import Articles from './components/Articles/Articles';
import * as authAction from './store/Auth/AuthStore';
import * as articlesAction from './store/Articles/ArticlesStore';

const App: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(authAction.loginAsyncAction());
		dispatch(articlesAction.allArticlesAsyncAction());
	});

	return (
		<div>
			<Header />
			<Switch>
				<Route path='/signin' component={SignIn} />
				<Route path='/signup' component={SignUp} />
			</Switch>
			<Articles />
		</div>
	);
};

export default App;
