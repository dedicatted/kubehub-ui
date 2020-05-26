import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TableOfVMTypes } from './TableOfVMTypes';
import { CreateVMType } from './CreateVMType';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';
import { addVMTypes } from '../../Actions/VMTypesActions';

export function VMTypes() {
	const dispatch = useDispatch();
	let { path } = useRouteMatch();
	
	const getVMTypes = () => {
		fetch(`${serverURL}/api/kubehub/vm-type/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getVMTypes);
			} else {
				return response.json()
			}
		})
		.then(data => data.vm_type_list)
		.then(vm_type_list => dispatch(addVMTypes(vm_type_list)))
		.catch(error => console.error(error));
	}

	useEffect(getVMTypes, []);

	return (
		<Switch>
			<Route exact path={path}>
				<TableOfVMTypes
					dispatch={dispatch}
				/>
			</Route>
			<Route path={`${path}/create_vm_type`}>
				<CreateVMType />
			</Route>
		</Switch>
	);
};
