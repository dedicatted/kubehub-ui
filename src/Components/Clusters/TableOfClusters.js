import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress, Tooltip, Container, Button, Checkbox, makeStyles, Fab, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ReplayIcon from '@material-ui/icons/Replay';
import { serverURL } from '../../serverLink';
import { Link, useRouteMatch } from 'react-router-dom';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { commonStyles } from "../../styles/style";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		maxWidth: "200px"
	},
	openDialog: {
		backgroundColor: "#e0e0e0"
	}
}))

export function TableOfClusters (props) {
	const commonClasses = commonStyles();
	const classes = useStyles();
	const VMGroups = useSelector(state => state.vm_group);
	const kubernetesVersions = useSelector(state => state.kubernetesVersions);
	let {url} = useRouteMatch();
	const [arrayOfDeletedClusters, setArrayOfDeletedClusters] = useState([]);
	const [DeleteMenu, setDeleteMenu] = useState(false);

	const showDeleteMenu = () => {
		setDeleteMenu(true);
	}
	const onChangeDeleteCheckbox = event => {
		if (event.target.checked) {
			setArrayOfDeletedClusters(oldArray => [...oldArray, event.target.value])
		} else if(!event.target.checked) {
			setArrayOfDeletedClusters(oldArray => oldArray.filter(item => item !== event.target.value))
		}
	}
	const hideDeleteMenu = () => {
		setDeleteMenu(false);
		setArrayOfDeletedClusters([]);
	}
	const deleteCluster = (k8s_cluster_id) => {
		fetch(`${serverURL}/cluster/remove`, {
			method: "POST",
			body: JSON.stringify({
				k8s_cluster_id: k8s_cluster_id
			})
		})
		.then(response => response.json())
		.then(props.refreshClustersData()) // !! After receiving a response
		setTimeout(props.refreshClustersData(),100) // !! After sending a request
	};
	const reloadCluster = (k8s_cluster_id) => {
		fetch(`${serverURL}/kubespray/deploy/restart`, {
			method: "POST",
			body: JSON.stringify({
				k8s_cluster_id: k8s_cluster_id
			})
		})
		.then(response => response.json())
		.then(props.refreshClustersData()) // !! After receiving a response
		setTimeout(props.refreshClustersData(),100) // !! After sending a request
	};

	const getConfig = (cluster) => {
		fetch(`${serverURL}/cluster/get/config`, {
			method: "POST",
			body: JSON.stringify({
				kubernetes_cluster_id: cluster.id
			})
		})
		.then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `${cluster.name}_config.txt`;
            document.body.appendChild(a); // we need to append the element to the dom
            a.click();
            a.remove();  //afterwards we remove the element again
        });
	}

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
		<Container maxWidth="xl" className={commonClasses.container}>
			<Link to={`${url}/create_cluster`} className={commonClasses.links}>
				<Button
					color='primary'
					startIcon={<AddIcon />}
				>
					Create cluster
				</Button>
			</Link>
			<Button
				color='primary'
				startIcon={<DeleteOutlineIcon />}
				onClick={showDeleteMenu}
				className={DeleteMenu ? classes.openDialog : null}
			>
				Delete
			</Button>

			<TableContainer>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							{DeleteMenu
								? (<TableCell></TableCell>)
								: null
							}
							<TableCell>Name</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Version</TableCell>
							<TableCell align="center">VM Group</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.clusters.map((cluster, i) => {
							return (
								<TableRow key={i}>
									{DeleteMenu
										? (<TableCell>
												<Checkbox
													value={cluster.id}
													color="primary"
													onChange={onChangeDeleteCheckbox}
												/>
											</TableCell>
										)
										: null
									}
									<TableCell component="th" scope="row">{cluster.name}</TableCell>
									<TableCell align="center">{
										cluster.status === "removing"
											? <CircularProgress className={commonClasses.errorColor}/>
											: cluster.status === "deploying"
												? <CircularProgress />
												: cluster.status ==="running"
													? <CheckCircleOutlineIcon className={commonClasses.successColor} />
													: cluster.status === "error"
														? <ErrorOutlineIcon className={commonClasses.errorColor} />
														: cluster.status
									}</TableCell>
									<TableCell align="center">{kubernetesVersions.find(kubernetes_version => kubernetes_version.id === cluster.kubernetes_version_id).version}</TableCell>
									<TableCell align="center">{VMGroups.find(VMGroup => VMGroup.id === cluster.vm_group).name}</TableCell>

									<TableCell align="center">
										<Tooltip title="Restart deploy">
											<IconButton onClick={() => {reloadCluster(cluster.id)}} className={commonClasses.startIcon}>
												<ReplayIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Get config">
											<IconButton onClick={() => {getConfig(cluster)}} className={commonClasses.orangeColor} download>
												<GetAppIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete cluster">
											<IconButton onClick={() => {deleteCluster(cluster.id)}} className={commonClasses.deleteIcon}>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Show logs">
											<Link to={`${url}/cluster_log`}>
												<IconButton className={commonClasses.infoIcon} onClick={() => {
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
				{DeleteMenu
					? (<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
						className={classes.fab}
					>
						<Fab onClick={hideDeleteMenu}><CancelIcon color="primary"/></Fab>
						<Fab><DeleteOutlineIcon color="primary"/></Fab>
					</Grid>)
					: null
				}
		</Container>

	)
}
