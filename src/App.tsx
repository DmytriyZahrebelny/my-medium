import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import * as action from './store/AuthStore';

const App: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action.loginAsyncAction());
	});

	return (
		<div>
			<Header />
			<Switch>
				<Route path='/signin' component={SignIn} />
				<Route path='/signup' component={SignUp} />
			</Switch>
		</div>
	);
};

export default App;
