import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import { Dashboard } from './Components/Dashboard';
import * as serviceWorker from './serviceWorker';
import { allReducers } from './Reducers/AllReducers'
import SignIn from './Components/SignIn';
import { PrivatRoute } from './Components/PrivatRoute';
import { ForgotPassword } from './Components/ForgotPassword'

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function Index() {
	return (
		<Provider store={store}>
		<Router>
			<Switch>
				<Route  path="/sign_in" component={SignIn} />
				<PrivatRoute exact path='/' component={Dashboard} />
				<PrivatRoute path='*' component={Dashboard} />
				<Route path='forgot_password' component={ForgotPassword} />
			</Switch>
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
