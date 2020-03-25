import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress, Tooltip, Container, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ReplayIcon from '@material-ui/icons/Replay';
import { serverURL } from '../../serverLink';
import { Link, useRouteMatch } from 'react-router-dom';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { commonStyles } from "../../styles/style";


export function TableOfClusters (props) {
	const classes = commonStyles();
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
		<Container maxWidth="xl" className={classes.container}>
			<Link to={`${url}/create_cluster`} className={classes.links}>
				<Button variant="contained" color='primary'>Create cluster</Button>
			</Link>
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
											? <CircularProgress className={classes.errorColor}/>
											: cluster.status === "deploying"
												? <CircularProgress />
												: cluster.status ==="running"
													? <CheckCircleOutlineIcon className={classes.successColor} />
													: cluster.status === "error"
														? <ErrorOutlineIcon className={classes.errorColor} />
														: cluster.status
									}</TableCell>
									<TableCell align="center">
										<Tooltip title="Restart deploy">
											<IconButton onClick={() => {reloadCluster(cluster.id)}} className={classes.startIcon}>
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
													localStorage.setItem("selectedCluster", JSON.stringify(cluster));
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
		</Container>
	)
}
