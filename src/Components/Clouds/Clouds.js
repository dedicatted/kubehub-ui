import React, { useEffect } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds } from '../../Actions/CloudActions';
import { TableOfClouds } from './TabelOfClouds';
import { EditCloud } from './EditCloud';
import { serverURL } from '../../serverLink';
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
	let { path } = useRouteMatch();
	const clouds = useSelector(state => state.clouds);
	const [editableName, setEditableName] = React.useState('');
	const [editableCloudIndex, setEditableCloudIndex] = React.useState(0);
	const dispatch = useDispatch();

	const setEditableData = (cloudProviderIndex) => {
		let selectedCloud = clouds.find((cloud, i) => i === cloudProviderIndex);
		setEditableName(selectedCloud.name);
		setEditableCloudIndex(cloudProviderIndex)
	};
	const getClouds = () => {
		fetch(`${serverURL}/api/cloud_providers/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => response.json())
		.then(data => data.cloud_provider_list)
		.then(data => dispatch(showClouds(data)))
	};

	useEffect(getClouds, []);

	return (
		<Switch>
			<Route exact path={path}>
				<TableOfClouds
					setEditableData={setEditableData}
					getClouds={getClouds}
					dispatch={dispatch}
					clouds={clouds}
				/>
			</Route>
			<Route path={`${path}/create_cloud`}>
				<CreateCloud
					getClouds={getClouds}
					CP_types={CP_types}
					dispatch={dispatch}
				/>
			</Route>
			<Route path={`${path}/edit_cloud`}>
				<EditCloud
					CP_types={CP_types}
					editableName={editableName}
					editableCloudIndex={editableCloudIndex}
					setEditableName={setEditableName}
					clouds={clouds}
					dispatch={dispatch}
				/>
			</Route>
		</Switch>
	);
};
