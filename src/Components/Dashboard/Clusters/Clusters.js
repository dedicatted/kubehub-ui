import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { CreateCluster } from './CreateCluster';
import { serverURL } from '../Dashboard';
import { useDispatch } from 'react-redux';
import { showVMGroup } from '../../../Actions/VMGroupActions';

export function Clusters () {
	const dispatch = useDispatch();
	const [clusterCreateWindow,setClusterCreateWindow] = useState(false)
	const handleClusterCreateWindowOpen = () => {
		setClusterCreateWindow(true);
	};
	const refreshVMGroupData = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => dispatch(showVMGroup(data)));
	};
	return(
		<div>
			<Button variant="contained" color='primary' onClick={handleClusterCreateWindowOpen}>Create cluster</Button>
			<CreateCluster
				clusterCreateWindow={clusterCreateWindow}
				setClusterCreateWindow={setClusterCreateWindow}
				refreshVMGroupData={refreshVMGroupData}
			/>
		</div>
	)
}
