import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './components/Header/Header';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
// import ArticlesList from './components/ArticlesList/ArticlesList';
// import ArticlePage from './components/ArticlePage/ArticlePage';
// import NewPost from './components/NewPost/NewPost';
// import SettingsPage from './components/SettingsPage/SettingsPage';
// import { useAuthStore } from './store/AuthStore/AuthStore';
import { useStore } from './store/createStore';

const App: React.FC = () => {
	const history = useHistory();
	const { auth } = useStore();
	const { token, redirectTo, loginAction } = auth;

	useEffect(() => {
		loginAction();
	}, [token, loginAction]);

	useEffect(() => {
		if (redirectTo) {
			history.push(redirectTo);
		}
	}, [redirectTo, history]);

	return (
		<>
			<Header />
			{!false ? (
				<Switch>
					{/* <Route exact path={['/', '/posts']} component={ArticlesList} />
					<Route exact path='/bytag/:tag' component={ArticlesList} /> */}
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					{/* <Route path='/posts/:number/:id' component={ArticlePage} /> */}
				</Switch>
			) : (
				<Switch>
					{/* <Route exact path={['/', '/posts']} component={ArticlesList} />
					<Route exact path='/bytag/:tag' component={ArticlesList} />
					<Route path='/posts/:number/:id' component={ArticlePage} />
					<Route path='/new-post' component={NewPost} />
					<Route psth='/settings' component={SettingsPage} /> */}
				</Switch>
			)}
		</>
	);
};

export default App;
