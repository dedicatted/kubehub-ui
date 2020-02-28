import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../../Actions/CloudActions';
import { showVMGroup, getTemplates } from '../../../Actions/VMGroupActions';
import { TableOfVMGroup } from './TableOfVMGroups';
import { CreateVMGroup } from './CreateVMGroup';
import { serverURL } from '../Dashboard';

export function VMGroup() {
	const dispatch = useDispatch();
	const templates = useSelector(state => state.templates);
	const clouds = useSelector(state => state.clouds);
	const [createVmGroupWindowOpen, setCreateVmGroupWindowOpen] = React.useState(false);

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
		refreshTempaltes();
	};
	const refreshTempaltes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`)
		.then(response => response)
		.then(data => data.json())
		.then(data => dispatch(getTemplates(data.template_list)))
	};
	const handleCreateVmGroupWindowOpen = () => {
		refreshCloudData();
		setCreateVmGroupWindowOpen(true);
	};

	return (
		<Container maxWidth='xl'>
			<Button variant="contained" color='primary' onClick={handleCreateVmGroupWindowOpen}>Create VM group</Button>
			<CreateVMGroup
				createVmGroupWindowOpen={createVmGroupWindowOpen}
				setCreateVmGroupWindowOpen={setCreateVmGroupWindowOpen}
				refreshVMGroupData={refreshVMGroupData}
				dispatch={dispatch}
				templates={templates}
				clouds={clouds}
			/>
			<TableOfVMGroup
				refreshVMGroupData={refreshVMGroupData}
				refreshCloudData={refreshCloudData}
				templates={templates}
				clouds={clouds}
				dispatch={dispatch}
			/>
		</Container>
	);
};
