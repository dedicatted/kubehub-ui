import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Clouds } from './Components/Dashboard/Clouds';
export const Routes = (
	<Switch>
		<Route exact path="/" render={() => <h1>Dashboard</h1>} />
		<Route path='/clouds' component={Clouds} />
	</Switch>
);
