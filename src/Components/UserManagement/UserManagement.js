import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { UserData } from './UserData';
import { PasswordPage } from './PasswordPage';

export function UserManagement() {
	let { path } = useRouteMatch();

	return (
		<Switch>
			<Route path={`${path}/password`}>
				<PasswordPage />
			</Route>
			<Route exact path={path}>
				<UserData />
			</Route>
			<Route path={`${path}/name`}>
				{/* <PasswordPage /> */}
			</Route>
			<Route path={`${path}/photo`}>
				{/* <PasswordPage /> */}
			</Route>
			<Route path={`${path}/email`}>
				{/* <PasswordPage /> */}
			</Route>
		</Switch>
	)
}
