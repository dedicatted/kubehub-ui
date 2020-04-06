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
import { ProtectedRoute } from './protected.route';

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path={"/sign_in"} component={SignIn} />
				<ProtectedRoute path="/" component={Dashboard} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
