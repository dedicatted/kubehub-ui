import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { serverURL } from '../../serverLink';
import { commonStyles } from "../../styles/style";

export function CreateCluster (props) {
	const classes = commonStyles();
	const VMGroups = useSelector(state => state.vm_group);
	const clusters = useSelector(state => state.clusters);
	const [kubernetesVersions, setKubernetesVersions] = useState([])
	const [clusterName, setClusterName] = useState('');
	const [versionOfKubernetes, setVersionOfKubernetes] = useState('');
	const [selectedVMGroup, setSelectedVMGroup] = useState('');
	const [numberOfMasters, setNumberOfMasters] = useState('');
	const [numberOfWorkers, setNumberOfWorkers] = useState('');
	const [errorOfSelectedVMGroup, setErrorOfSelectedVMGroup] = useState(true);
	const [availableVMGroups,setAvailableVMGroups] = useState([]);

	const handleClusterNameChange = event => setClusterName(event.target.value);
	const handleVersionOfKubesprayChange = event => setVersionOfKubernetes(event.target.value);
	const handleVMGroupChange = event => {
		setSelectedVMGroup(event.target.value);
		event.target.value
			? setErrorOfSelectedVMGroup(false)
			: setErrorOfSelectedVMGroup(true);
	};
	const handlenumberOfMasters = event => setNumberOfMasters(event.target.value);
	const handlesetNumberOfWorkers = event => setNumberOfWorkers(event.target.value);
	const createCluster = () => {
		fetch(`${serverURL}/cluster/add`, {
			method: 'POST',
			body: JSON.stringify({
				name: clusterName,
				k8s_version: versionOfKubernetes,
				vm_group: selectedVMGroup.id
			})
		})
		.then(response => response.json())
	}
	const getKubernetesVersions = () => {
		fetch(`${serverURL}/kubernetes/version/list`)
		.then(response => response.json())
		.then(data => data.kubernetes_version_list)
		.then(kubernetes_version_list => setKubernetesVersions(kubernetes_version_list))
		.then(console.log(getKubernetesVersions))
	}
	useEffect(getKubernetesVersions, []);
	useEffect(props.refreshVMGroupData, []);
	useEffect(props.refreshClustersData, []);
	useEffect(() => {
		setAvailableVMGroups([]);
		let arrOfClustersVMGroupId = [];
		for(let i = 0; i < clusters.length; i++) {
			arrOfClustersVMGroupId.push(clusters[i].vm_group);
		}
		for(let j = 0; j < VMGroups.length; j++) {
			if(!(arrOfClustersVMGroupId.includes(VMGroups[j].id)) && VMGroups[j].status === "running") {
				setAvailableVMGroups(oldArray => [...oldArray, VMGroups[j]]);
			}
		}
	}, [clusters, VMGroups])

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Typography
				gutterBottom
				component="h1"
				align="center"
				fontWeight='fontWeightBold'
				className={classes.lable}
			>
				Create cluster
			</Typography>
			<TextField
				id="standard-clusterName"
				label="Name"
				size='small'
				value={clusterName}
				onChange={handleClusterNameChange}
				helperText="Name of cluster"
				fullWidth
				variant='outlined'
				/>
			<TextField
				id="standard-select-versionOfKubernetes"
				label="Version"
				size='small'
				select
				value={versionOfKubernetes}
				onChange={handleVersionOfKubesprayChange}
				helperText="Version of kubernetes"
				fullWidth
				variant='outlined'
				margin="dense"
			>
				{kubernetesVersions.map((version, i) => (
					<MenuItem key={i} value={version.version}>
						{version.version}
					</MenuItem>
				))}
			</ TextField>
			<TextField
				id="standard-select-VMGroup"
				label="VM group"
				size='small'
				select
				value={selectedVMGroup}
				onChange={handleVMGroupChange}
				helperText={("Select a virtual machines group")}
				fullWidth
				variant='outlined'
				margin="dense"
			>
				{availableVMGroups.map(VMGroupItem => (
					<MenuItem key={VMGroupItem.id} value={VMGroupItem}>
						{VMGroupItem.name}
					</MenuItem>
				))}
			</ TextField>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
			>
				<div>
					<TextField
						id="standard-select-numberOfMasters"
						label="Number of masters"
						size='small'
						select
						value={numberOfMasters}
						disabled={errorOfSelectedVMGroup}
						onChange={handlenumberOfMasters}
						helperText="Select number of masters"
						variant='outlined'
						margin="dense"
						className={classes.margin}
					>
						{selectedVMGroup
							? (selectedVMGroup.vms.map((vm, i) => {
								i = i - numberOfWorkers + 1;
								if(i > 0) {
									return (
										<MenuItem key={i} value={i}>
											{i}
										</MenuItem>
									)
								}
								else{
									return null;
								}
							}))
							: null
						}
					}
					</TextField>
					<TextField
						id="standard-select-numberOfWorkers"
						label="Number of workers"
						size='small'
						select
						value={numberOfWorkers}
						disabled={errorOfSelectedVMGroup}
						onChange={handlesetNumberOfWorkers}
						helperText="Select number of workers"
						variant='outlined'
						margin="dense"
						className={classes.margin}
					>
						{selectedVMGroup
							? (selectedVMGroup.vms.map((vm, i) => {
								i = i - numberOfMasters + 1;
								if(i >= 0) {
									return (
										<MenuItem key={i} value={i}>
											{i}
										</MenuItem>
									)
								}
								else {
									return null;
								}
							}))
							: <MenuItem>No</MenuItem>
						}
					}
					</TextField>
				</ div>
				<div>
					<Link to="/clusters" className={classes.links}>
						<Button variant="contained" color="primary" className={classes.margin}>
							Cancel
						</Button>
					</Link>
					<Link to="/clusters" className={errorOfSelectedVMGroup ? [classes.links, classes.disabledLink].join(' ') : classes.links} >
						<Button  variant="contained" disabled={errorOfSelectedVMGroup} color="primary" className={classes.margin} onClick={createCluster}>
							Create
						</Button>
					</Link>
				</div>
			</Grid>
		</Container>
	)
}
