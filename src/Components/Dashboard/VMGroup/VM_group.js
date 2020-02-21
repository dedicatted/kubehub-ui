import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../../Actions/CloudActions';
import { showVMGroup, getTemplates } from '../../../Actions/VM_groupActions'
import { TableOfVMGroup } from './TableOfVMGroups';
import { makeStyles, Button } from '@material-ui/core';
import { CreateVMGroup } from './CreateVMGroup';

const useStyles = makeStyles(theme => ({
	createButtonMargin: {
		marginBottom: '20px'
	},

}))
export function VM_group() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const templates = useSelector(state => state.templates);
	const [createVmGroupWindowOpen, setCreateVmGroupWindowOpen] = React.useState(false);
	const serverURL = 'http://192.168.84.189:8080';

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
		.then(data => {
			dispatch(showVMGroup(data));
			return data;
		})
		refreshTempaltes();
	};
	const refreshTempaltes = () => {
		fetch(`${serverURL}/api/proxmox/template/list`)
		.then(response => response)
		.then(data => data.json())
		.then(data => dispatch(getTemplates(data.template_list)))
	}
	const handleCreateVmGroupWindowOpen = () => {
		refreshCloudData();
		setCreateVmGroupWindowOpen(true);
	};

	return (
		<div>
			<Button className={classes.createButtonMargin} variant="contained" color='primary' onClick={handleCreateVmGroupWindowOpen} >Create VM group</Button>
			<CreateVMGroup
				createVmGroupWindowOpen={createVmGroupWindowOpen}
				setCreateVmGroupWindowOpen={setCreateVmGroupWindowOpen}
				refreshVMGroupData={refreshVMGroupData}
			/>
			<TableOfVMGroup
				refreshVMGroupData={refreshVMGroupData}
				refreshCloudData={refreshCloudData}
				templates={templates}
			/>
		</div>
	)
}
