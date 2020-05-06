import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TableOfVMTypes } from './TableOfVMTypes';
import { CreateVMType } from './CreateVMType';

export function VMTypes() {
	const dispatch = useDispatch();
	let { path } = useRouteMatch();

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
