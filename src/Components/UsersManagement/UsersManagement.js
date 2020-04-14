import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { TableOfUsers } from './TableOfUsers';

export function UsersManagement() {
	let { path } = useRouteMatch();

	return(
		<Switch>
			<Route exact path={path}>
				<TableOfUsers />
			</Route>
		</Switch>
	)
}
