import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Signin from './components/Auth/Signin/Signin';

const Signup = () => <div>Sign Up</div>;

const App: React.FC = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Route path='/signin' component={Signin} />
				<Route path='/signup' component={Signup} />
			</Switch>
		</div>
	);
};

export default App;
