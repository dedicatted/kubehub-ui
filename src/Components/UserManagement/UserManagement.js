import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { UserData } from './UserData';
import { PasswordPage } from './PasswordPage';
import { EmailPage } from './EmailPage';
import { UserNamePage } from './UserNamePage';
import { PhotoPage } from './PhotoPage';

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
				<UserNamePage />
			</Route>
			<Route path={`${path}/photo`}>
				<PhotoPage />
			</Route>
			<Route path={`${path}/email`}>
				<EmailPage />
			</Route>
		</Switch>
	)
}
