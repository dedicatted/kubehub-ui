import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, makeStyles, CircularProgress, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ReplayIcon from '@material-ui/icons/Replay';
import { serverURL } from '../Dashboard';
import { Link, useRouteMatch } from 'react-router-dom';
import { clusterLog, clearClusterLog } from '../../Actions/ClusterActions';

const useStyles = makeStyles(tehme => ({
	deleteIcon: {
		'&:hover' : {
			color: '#f44336'
		}
	},
	reloadIcon: {
		'&:hover' : {
			color: '#4caf50'
		}
	},
	infoIcon: {
		'&:hover' : {
			color: '#607d8b'
		}
	},
	removingCircularProgress: {
		color: '#f44336'
	}
}));

export function TableOfClusters (props) {
	const classes = useStyles();
	const VMGroups = useSelector(state => state.vm_group);
	let {url} = useRouteMatch();

	const deleteCluster = (k8s_cluster_id) => {
		fetch(`${serverURL}/cluster/remove`, {
			method: "POST",
			body: JSON.stringify({
				k8s_cluster_id: k8s_cluster_id
			})
		})
		.then(response => response.json())
	};
	const reloadCluster = (k8s_cluster_id) => {
		fetch(`${serverURL}/kubespray/deploy/restart`, {
			method: "POST",
			body: JSON.stringify({
				k8s_cluster_id: k8s_cluster_id
			})
		})
		.then(response => response.json())
	};
	const showLogs = (cluster,lineNumber) => {
		fetch(`${serverURL}/kubespray/deploy/get/log`,{
			method: 'POST',
			body: JSON.stringify({
				kubespray_deploy_id: cluster.kubespray_deployments[cluster.kubespray_deployments.length - 1].id,
				last_line: lineNumber
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.readed_lines !== ""){
				let temporaryLog = "";
				for (let i = 0; i < data.readed_lines.length; i++) {
					temporaryLog += data.readed_lines[i] + '\n';
				}
				props.dispatch(clusterLog(temporaryLog))
			}
			if(cluster.status === "deploying") {
				setTimeout(() => {showLogs(cluster, data.last_line)}, 1000)
			}
		})
	};

	useEffect(() => {
		const interval = setInterval(() => {
			props.refreshClustersData();
		}, 4000);
		return () => clearInterval(interval);
	}, [props.refreshClustersData,props]);

	useEffect(() => {
		setTimeout(() => {
			props.refreshClustersData();
		}, 100);
		props.refreshVMGroupData();
	},[]);

	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="center">Version</TableCell>
						<TableCell align="center">VM Group</TableCell>
						<TableCell align="center">Status</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.clusters.map((cluster, i) => {
						return (
							<TableRow key={i}>
								<TableCell component="th" scope="row">{cluster.name}</TableCell>
								<TableCell align="center">{cluster.k8s_version}</TableCell>
								<TableCell align="center">{VMGroups.find(VMGroup => VMGroup.id === cluster.vm_group).name}</TableCell>
								<TableCell align="center">{
									cluster.status === "removing"
										? <CircularProgress className={classes.removingCircularProgress}/>
										: cluster.status === "deploying"
											? <CircularProgress />
											: cluster.status ==="running"
												? "Running"
												: cluster.status
								}</TableCell>
								<TableCell align="center">
									<Tooltip title="Restart deploy">
										<IconButton onClick={() => {reloadCluster(cluster.id)}} className={classes.reloadIcon}>
											<ReplayIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete cluster">
										<IconButton onClick={() => {deleteCluster(cluster.id)}} className={classes.deleteIcon}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Show logs">
										<Link to={`${url}/cluster_log`}>
											<IconButton className={classes.infoIcon} onClick={() => {
												props.dispatch(clearClusterLog());
												showLogs(cluster, 0);
											}}>
												<InfoIcon />
											</IconButton>
										</Link>
									</Tooltip>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
