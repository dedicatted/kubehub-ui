import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TableOfVMTypes } from './TableOfVMTypes';
import { CreateVMType } from './CreateVMType';
import { serverURL } from '../../serverLink';
import { getVMTypes } from '../../Actions/VMTypesActions';

export function VMTypes() {
	const dispatch = useDispatch();
	let { path } = useRouteMatch();

	const refreshVMTypes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`)
		.then(response => response.json())
		.then(data => dispatch(getVMTypes(data.template_list)))
	};

	useEffect(refreshVMTypes, []);

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
