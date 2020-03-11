import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from './store/createStore';
import App from './App';
import './index.sass';

const store = createStore();

ReactDOM.render(
	<BrowserRouter>
		<Provider value={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
