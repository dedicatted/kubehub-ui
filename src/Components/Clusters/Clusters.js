import React, { useCallback, useEffect } from 'react';
import { CreateCluster } from './CreateCluster';
import { serverURL } from '../../serverLink';
import { useDispatch, useSelector } from 'react-redux';
import { showVMGroup } from '../../Actions/VMGroupActions';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { TableOfClusters } from './TableOfClusters';
import { showClusters } from '../../Actions/ClusterActions';
import { ClusterLogs } from './ClusterLogs';
import { addKubernetesVersions } from '../../Actions/KubernetesVersionActions';

export function Clusters ()	 {
	let { path } = useRouteMatch();
	const dispatch = useDispatch();
	const clusters = useSelector(state => state.clusters)

	const getVMGroups = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => dispatch(showVMGroup(data)));
	};
	const getClusters = useCallback(() => {
		fetch(`${serverURL}/cluster/list`)
		.then(response => response.json())
		.then(data => data.kubernetes_cluster_list)
		.then(data => dispatch(showClusters(data)))
	}, [dispatch])
	const getKubernetesVersions = () => {
		fetch(`${serverURL}/kubernetes/version/list`)
		.then(response => response.json())
		.then(data => data.kubernetes_version_list)
		.then(kubernetes_version_list => dispatch(addKubernetesVersions(kubernetes_version_list)))
	}

	useEffect(getKubernetesVersions, []);

	return(
		<Switch>
			<Route path={`${path}/create_cluster`}>
				<CreateCluster
					getVMGroups={getVMGroups}
					clusters={clusters}
					getClusters={getClusters}
				/>
			</Route>
			<Route exact path={path}>
				<TableOfClusters
					clusters={clusters}
					getVMGroups={getVMGroups}
					getClusters={getClusters}
					dispatch={dispatch}
				/>
			</Route>
			<Route path={`${path}/cluster_log`}>
				<ClusterLogs
					dispatch={dispatch}
				/>
			</Route>
		</Switch>
	)
}
