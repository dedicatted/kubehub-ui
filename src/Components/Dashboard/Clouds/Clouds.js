import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../../Actions/CloudActions';
import { TableOfClouds } from './TabelOfClouds';
import { EditCloud } from './EditCloud';
import { serverURL } from '../Dashboard';
import CreateCloud from './CreateCloud';

const CP_types = [
	{
		value: 'AWS'
	},
	{
		value: 'GCP'
	},
	{
		value: 'Proxmox'
	}
];

export function Clouds () {
	const clouds = useSelector(state => state.clouds);
	const [stateClouds] =React.useState(clouds);
	const [createCloudWindowOpen, setCreateCloudWindowOpen] = React.useState(false);
	const [editCloudWindowOpen, setEditCloudWindowOpen] = React.useState(false);
	const [editCP_type, setEditCP_type] = React.useState('AWS');
	const [editName, setEditName] = React.useState('');
	const [editCloudIndex, seteditCloudIndex] = React.useState(0);
	const dispatch = useDispatch();

	const handleEditWindowClose = () => {
		setEditCloudWindowOpen(false);
	};
	const handleCreateWindowOpen = () => {
		setCreateCloudWindowOpen(true);
	};
	const handleEditWindowOpen = (index) => {
		setEditCloudWindowOpen(true);
		for(let i = 0; i < clouds.length; i++) {
			if(clouds[i].id === index) {
				setEditCP_type(clouds[i].cp_type);
				setEditName(clouds[i].name);
				seteditCloudIndex(i);
			}
		}
	};
	const refreshCloudData = () => {
		fetch(`${serverURL}/api/cloud_providers/list`)
		.then(response => response.json())
		.then(data => data.cloud_provider_list)
		.then(data => dispatch(showClouds(data)))
	};
	useEffect(refreshCloudData,[stateClouds]);

	return (
		<Container maxWidth='xl'>
			<Button variant="contained" color="primary" onClick={handleCreateWindowOpen}>Add cloud</Button>
			<CreateCloud
				createCloudWindowOpen={createCloudWindowOpen}
				setCreateCloudWindowOpen={setCreateCloudWindowOpen}
				refreshCloudData={refreshCloudData}
				CP_types={CP_types}
				dispatch={dispatch}
			 />
			<TableOfClouds
				handleEditWindowOpen={handleEditWindowOpen}
				refreshCloudData={refreshCloudData}
				dispatch={dispatch}
				clouds={clouds}
			/>
			<EditCloud
				CP_types={CP_types}
				handleEditWindowClose={handleEditWindowClose}
				editCP_type={editCP_type}
				editName={editName}
				editCloudIndex={editCloudIndex}
				setEditCP_type={setEditCP_type}
				setEditName={setEditName}
				editCloudWindowOpen={editCloudWindowOpen}
				setEditCloudWindowOpen={setEditCloudWindowOpen}
				clouds={clouds}
			/>
		</Container>
	);
};
