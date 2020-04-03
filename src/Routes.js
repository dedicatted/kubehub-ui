import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Clouds } from './Components/Clouds/Clouds';
import { VMGroup } from './Components/VMGroup/VMGroup'
import { Clusters } from './Components/Clusters/Clusters';
import { VMTypes } from './Components/VMTypes/VMTypes';
export const Routes = (
	<Switch>
		<Route exact path="/" render={() => <h1>Dashboard</h1>} />
		<Route path="/vm_group" component={VMGroup}/>
		<Route path='/clouds' component={Clouds} />
		<Route path='/clusters' component={Clusters} />
		<Route path='/vm_types' component={VMTypes} />
	</Switch>
);
