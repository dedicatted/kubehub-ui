import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { TableOfUsers } from './TableOfUsers';
import { AddUser } from './AddUser';

export function UsersManagement() {
	let { path } = useRouteMatch();

	return(
		<Switch>
			<Route exact path={path}>
				<TableOfUsers />
			</Route>
			<Route path={`${path}/add_user`}>
				<AddUser />
			</Route>
		</Switch>
	)
}
