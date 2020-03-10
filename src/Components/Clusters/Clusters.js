import React, { useCallback } from 'react';
import { Button, makeStyles, Container } from '@material-ui/core';
import { CreateCluster } from './CreateCluster';
import { serverURL } from '../Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { showVMGroup } from '../../Actions/VMGroupActions';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import { TableOfClusters } from './TableOfClusters';
import { showClusters } from '../../Actions/ClusterActions';

const useStyle = makeStyles({
	links: {
		color: 'black',
		textDecoration: 'none'
	}
})

export function Clusters () {
	const classes = useStyle();
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const clusters = useSelector(state => state.clusters)

	const refreshVMGroupData = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => dispatch(showVMGroup(data)));
	};
	const refreshClustersData = useCallback(() => {
		fetch(`${serverURL}/cluster/list`)
		.then(response => response.json())
		.then(data => data.kubernetes_cluster_list)
		.then(data => dispatch(showClusters(data)))
		.then(data => console.log(data))
	}, [dispatch])
	return(
		<Container maxWidth="xl">
			<Switch>
				<Route path={`${path}/create_cluster`}>
					<Container max-widht='xl'>
						<CreateCluster
							refreshVMGroupData={refreshVMGroupData}
							clusters={clusters}
							refreshClustersData={refreshClustersData}
						/>
					</Container>
				</Route>
				<Route path={path}>
					<Link to={`${url}/create_cluster`} className={classes.links}>
						<Button variant="contained" color='primary'>Create cluster</Button>
					</Link>
					<TableOfClusters
						clusters={clusters}
						refreshVMGroupData={refreshVMGroupData}
						refreshClustersData={refreshClustersData}
					/>
				</Route>
			</Switch>
		</Container>
	)
}
