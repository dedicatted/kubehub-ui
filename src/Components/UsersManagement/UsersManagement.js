import React, { useEffect } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { TableOfUsers } from './TableOfUsers';
import { AddUser } from './AddUser';
import { serverURL } from '../../serverLink';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../Actions/UsersActions';

export function UsersManagement() {
	let { path } = useRouteMatch();
	const dispatch = useDispatch();
	const getUsersData = () => {
		fetch(`${serverURL}/api/auth/account/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => response.json())
		.then(data => dispatch(getUsers(data.user_list)))
		.catch(error => console.log(error));
	}

		useEffect(getUsersData, [])

	return(
		<Switch>
			<Route exact path={path}>
				<TableOfUsers/>
			</Route>
			<Route path={`${path}/add_user`}>
				<AddUser
					getUsersData={getUsersData}
				/>
			</Route>
		</Switch>
	)
}
