import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Clouds } from './Components/Dashboard/Clouds/Clouds';
import { VM_group } from './Components/Dashboard/VMGroup/VM_group'
export const Routes = (
	<Switch>
		<Route exact path="/" render={() => <h1>Dashboard</h1>} />
		<Route path="/vm_group" component={VM_group}/>
		<Route path='/clouds' component={Clouds} />
	</Switch>
);
