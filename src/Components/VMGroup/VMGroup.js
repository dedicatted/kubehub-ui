import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../Actions/CloudActions';
import { showVMGroup, getTemplates } from '../../Actions/VMGroupActions';
import { TableOfVMGroup } from './TableOfVMGroups';
import { CreateVMGroup } from './CreateVMGroup';
import { serverURL } from '../../serverLink';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { useStyles } from "../../styles/style";


export function VMGroup() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const templates = useSelector(state => state.templates);
	const clouds = useSelector(state => state.clouds);
	let {path, url} = useRouteMatch();

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
	const refreshTempaltes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`)
		.then(response => response.json())
		.then(data => dispatch(getTemplates(data.template_list)))
	};

	useEffect(refreshTempaltes, []);
	useEffect(refreshCloudData, []);

	return (
		<Container maxWidth='xl'>
			<Switch>
				<Route exact path={path}>
					<Link to={`${url}/create_vm_group`} className={classes.links}>
						<Button variant="contained" color='primary' onClick={() => {refreshCloudData()}}>Create VM group</Button>
					</Link>
					<TableOfVMGroup
						refreshVMGroupData={refreshVMGroupData}
						refreshCloudData={refreshCloudData}
						templates={templates}
						clouds={clouds}
						dispatch={dispatch}
						refreshTempaltes={refreshTempaltes}
					/>
				</Route>
				<Route path={`${path}/create_vm_group`}>
					<CreateVMGroup
						refreshVMGroupData={refreshVMGroupData}
						dispatch={dispatch}
						templates={templates}
						clouds={clouds}
						refreshTempaltes={refreshTempaltes}
					/>
				</Route>
			</Switch>
		</Container>
	);
};
