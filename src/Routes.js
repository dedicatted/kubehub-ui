import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Clouds } from './Components/Clouds/Clouds';
import { VMGroup } from './Components/VMGroup/VMGroup'
export const Routes = (
	<Switch>
		<Route exact path="/" render={() => <h1>Dashboard</h1>} />
		<Route path="/vm_group" component={VMGroup}/>
		<Route path="/clouds" component={Clouds} />
		<Route path="*"render={() => <div>NotFound</div>} />
	</Switch>
);
