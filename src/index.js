import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './index.css';
import { Dashboard } from './Components/Dashboard';
import * as serviceWorker from './serviceWorker';
import { allReducers } from './Reducers/AllReducers'
import SignIn from './Components/SignIn';
import Auth from './auth';

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function Index() {
	const [authenticated] = useState(Auth.authenticated)

	return (
		<Provider store={store}>
		<Router>
			<Switch>
				<Route  path="/sign_in" component={SignIn} />
				<Route exact path="/" render={() => !authenticated ? <Dashboard /> : <Redirect to="/sign_in" />} />
				<Route path='*' component={Dashboard} />
			</Switch>
			<Redirect to={!authenticated ? "/sign_in" : "/"}/>
		</Router>
	</Provider>
	)
}

ReactDOM.render(
	<Index />,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
