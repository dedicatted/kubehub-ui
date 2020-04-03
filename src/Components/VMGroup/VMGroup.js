import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../Actions/CloudActions';
import { showVMGroup } from '../../Actions/VMGroupActions';
import { getVMTypes } from '../../Actions/VMTypesActions';
import { TableOfVMGroup } from './TableOfVMGroups';
import { CreateVMGroup } from './CreateVMGroup';
import { serverURL } from '../../serverLink';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


export function VMGroup() {
	const dispatch = useDispatch();
	const VMTypes = useSelector(state => state.VMTypes);
	const clouds = useSelector(state => state.clouds);
	let { path } = useRouteMatch();

	const refreshCloudData = () => {
		fetch(`${serverURL}/api/cloud_providers/list`)
		.then(response => response.json())
		.then(data => data.cloud_provider_list)
		.then(data => {
			setTimeout(() => {
				dispatch(showClouds(data))
			},100)
		})
	};
	const refreshVMGroupData = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => dispatch(showVMGroup(data)))
	};
	const refreshVMTypes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`)
		.then(response => response.json())
		.then(data => dispatch(getVMTypes(data.template_list)))
	};

	useEffect(refreshVMTypes, []);
	useEffect(refreshCloudData, []);

	return (
		<Switch>
			<Route exact path={path}>
				<TableOfVMGroup
					refreshVMGroupData={refreshVMGroupData}
					refreshCloudData={refreshCloudData}
					VMTypes={VMTypes}
					clouds={clouds}
					dispatch={dispatch}
				/>
			</Route>
			<Route path={`${path}/create_vm_group`}>
				<CreateVMGroup
					refreshVMGroupData={refreshVMGroupData}
					dispatch={dispatch}
					VMTypes={VMTypes}
					clouds={clouds}
				/>
			</Route>
		</Switch>
	);
};
