import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Clouds } from './Components/Dashboard/Clouds';
import { VM_group } from './Components/Dashboard/VM_group'
export const Routes = (
	<Switch>
		<Route exact path="/" render={() => <h1>Dashboard</h1>} />
		<Route path="/vm_group" component={VM_group}/>
		<Route path='/clouds' component={Clouds} />
		<Route path='/reports' render={() => <h1>Reports</h1>} />
		<Route path='/integrations' render={() => <h1>Integrations</h1>} />
		<Route path='/CurrentMonth' render={() => <h1>Current month</h1>} />
		<Route path='/LastQuarter' render={() => <h1>Last quarter</h1>} />
		<Route path='/Year-endSale' render={() => <h1>Year-end sale</h1>} />
	</Switch>
);
