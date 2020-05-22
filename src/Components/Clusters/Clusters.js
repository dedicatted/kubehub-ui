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
import auth from '../Auth/auth';
import { addTemplates } from '../../Actions/TemplateActions';
import { addImages } from '../../Actions/ImageActions';
import { showClouds } from '../../Actions/CloudActions';

export function Clusters ()	 {
	let { path } = useRouteMatch();
	const dispatch = useDispatch();
	const clusters = useSelector(state => state.clusters)

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
			} else {
				return response.json()
			}
		})
		.then(data => data.cloud_provider_list)
		.then(data => dispatch(showClouds(data)))
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
	const getClusters = useCallback(() => {
		fetch(`${serverURL}/cluster/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getClusters);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(data => data.kubernetes_cluster_list)
		.then(data => dispatch(showClusters(data)))
		.catch(error => console.error(error))
	}, [dispatch])
	const getKubernetesVersions = () => {
		fetch(`${serverURL}/kubernetes/version/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getKubernetesVersions);
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(data => data.kubernetes_version_list)
		.then(kubernetes_version_list => dispatch(addKubernetesVersions(kubernetes_version_list)))
		.catch(error => console.error(error))
	}
	const getTemplates = () => {
		fetch(`${serverURL}/api/proxmox/template/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getTemplates);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(data => dispatch(addTemplates(data.template_list)))
		.catch(error => console.log(error))
	};
	const getImages = () => {
		fetch(`${serverURL}/api/proxmox/vm/os-image/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getImages);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(data => dispatch(addImages(data.os_image_list)))
		.catch(error => console.log(error))
	}

	useEffect(getKubernetesVersions, []);
	useEffect(getTemplates, []);
	useEffect(getImages, []);
	useEffect(getClouds, []);

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
