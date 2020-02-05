import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header/Header';

const Signin = () => <div>Sign In</div>;
const Signup = () => <div>Sign Up</div>;

const App: React.FC = () => (
	<div>
		<Header />
		<Switch>
			<Route path='/signin' component={Signin} />
			<Route path='/signup' component={Signup} />
		</Switch>
	</div>
);

export default App;
