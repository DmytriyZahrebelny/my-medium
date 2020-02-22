import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import Articles from './components/Articles/Articles';
import ArticlePage from './components/ArticlePage/ArticlePage';
import NewPost from './components/NewPost/NewPost';
import SettingsPage from './components/SettingsPage/SettingsPage';
import * as authAction from './store/Auth/AuthStore';
import * as articlesAction from './store/Articles/ArticlesStore';
import { RootState } from './store/configureStore';

const App: React.FC = () => {
	const dispatch = useDispatch();
	const token: string | null = useSelector((state: RootState) => state.authStore.token);

	useEffect(() => {
		dispatch(authAction.loginAsyncAction());
		dispatch(articlesAction.allArticlesAsyncAction());
	}, [dispatch]);

	return (
		<>
			<Header />
			{!token ? (
				<Switch>
					<Route exact path={['/', '/posts']} component={Articles} />
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					<Route path='/posts/:id' component={ArticlePage} />
				</Switch>
			) : (
				<Switch>
					<Route exact path={['/', '/posts']} component={Articles} />
					<Route path='/posts/:id' component={ArticlePage} />
					<Route path='/new-post' component={NewPost} />
					<Route psth='/settings' component={SettingsPage} />
				</Switch>
			)}
		</>
	);
};

export default App;
