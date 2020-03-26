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
	const [stateClouds] =React.useState(clouds);
	const [editName, setEditName] = React.useState('');
	const [editCloudIndex, seteditCloudIndex] = React.useState(0);
	const dispatch = useDispatch();

	const handleEditWindowOpen = (index) => {
		for(let i = 0; i < clouds.length; i++) {
			if(clouds[i].id === index) {
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
		<Switch>
			<Route exact path={path}>
				<TableOfClouds
					handleEditWindowOpen={handleEditWindowOpen}
					refreshCloudData={refreshCloudData}
					dispatch={dispatch}
					clouds={clouds}
				/>
			</Route>
			<Route path={`${path}/create_cloud`}>
				<CreateCloud
					refreshCloudData={refreshCloudData}
					CP_types={CP_types}
					dispatch={dispatch}
				/>
			</Route>
			<Route path={`${path}/edit_cloud`}>
				<EditCloud
					CP_types={CP_types}
					editName={editName}
					editCloudIndex={editCloudIndex}
					setEditName={setEditName}
					clouds={clouds}
					dispatch={dispatch}
				/>
			</Route>
		</Switch>
	);
};
