import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../Actions/CloudActions';
import { showVMGroup } from '../../Actions/VMGroupActions';
import { addVMTypes } from '../../Actions/VMTypesActions';
import { TableOfVMGroup } from './TableOfVMGroups';
import { CreateVMGroup } from './CreateVMGroup';
import { serverURL } from '../../serverLink';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import auth from '../Auth/auth';


export function VMGroup() {
	const dispatch = useDispatch();
	const VMTypes = useSelector(state => state.VMTypes);
	const clouds = useSelector(state => state.clouds);
	let { path } = useRouteMatch();

	const getClouds = () => {
		fetch(`${serverURL}/api/cloud_providers/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getClouds);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(data => data.cloud_provider_list)
		.then(data => {
			setTimeout(() => {
				dispatch(showClouds(data))
			},100)
		})
		.catch(error => console.error(error))
	};
	const getVMGroups = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getVMGroups);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(data => data.vm_group_list)
		.then(data => dispatch(showVMGroup(data)))
		.catch(error => console.error(error))
	};
	const getVMTypes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getVMTypes);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(data => dispatch(addVMTypes(data.template_list)))
		.catch(error => console.log(error))
	};

	useEffect(getVMTypes, []);
	useEffect(getClouds, []);

	return (
		<Switch>
			<Route exact path={path}>
				<TableOfVMGroup
					getVMGroups={getVMGroups}
					getClouds={getClouds}
					VMTypes={VMTypes}
					clouds={clouds}
					dispatch={dispatch}
				/>
			</Route>
			<Route path={`${path}/create_vm_group`}>
				<CreateVMGroup
					getVMGroups={getVMGroups}
					dispatch={dispatch}
					VMTypes={VMTypes}
					clouds={clouds}
				/>
			</Route>
		</Switch>
	);
};
