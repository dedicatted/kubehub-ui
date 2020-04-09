import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { UserData } from './UserData';

export function UserManagement() {
	let { path } = useRouteMatch

	return (
		<Switch>
			<Route path={path} component={UserData} />
		</Switch>
	)
}
