import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { UserData } from './UserData';
import { PasswordPage } from './PasswordPage';
import { EmailPage } from './EmailPage';
import { UserFullNamePage } from './UserFullNamePage';
import { PhotoPage } from './PhotoPage';
import { UsernamePage } from './Username';

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
				<UserFullNamePage />
			</Route>
			<Route path={`${path}/username`}>
				<UsernamePage />
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
