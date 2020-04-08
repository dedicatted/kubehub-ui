import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './index.css';
import { Dashboard } from './Components/Dashboard';
import * as serviceWorker from './serviceWorker';
import { allReducers } from './Reducers/AllReducers'
import SignIn from './Components/SignIn';
import Auth from "./auth"
import SignUp from './Components/SignUp';

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/sign_in" component={() => Auth.isAuthenticated ? <SignIn /> : <Redirect to="/" />} />
				<Route exact path="/" component={() => Auth.isAuthenticated ? <Dashboard /> : <Redirect to="/sign_in" />} />
				<Route exact path="/sign_up" component={SignUp} />
				<Route path="*" component={Dashboard} />
			</Switch>
			<Redirect to={Auth.isAuthenticated ? "/sign_in" : "/"}/>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
