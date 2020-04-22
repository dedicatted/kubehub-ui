import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TableOfVMTypes } from './TableOfVMTypes';
import { CreateVMType } from './CreateVMType';
import { serverURL } from '../../serverLink';
import { addVMTypes } from '../../Actions/VMTypesActions';
import auth from '../../auth';

export function VMTypes() {
	const dispatch = useDispatch();
	let { path } = useRouteMatch();

	const getVMTypes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => response.json())
		.then(data => dispatch(addVMTypes(data.template_list)))
		.catch((error) => console.log(error));
	};

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
