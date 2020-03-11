import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Container, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { serverURL } from '../Dashboard';


const useStyles = makeStyles(theme => ({
	margin: {
	  marginRight: theme.spacing(1),
	},
	lable: {
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	links: {
		color: 'black',
		textDecoration: 'none'
	},
	disabledLink: {
		pointerEvents: 'none'
	}
  }));

export function CreateCluster (props) {
	const testVersions = [
		{value: 'v.1'},
		{value: 'v.2'},
		{value: 'v.3'}
	]

	const classes = useStyles();
	const VMGroup = useSelector(state => state.vm_group);
	const [clusterName, setClusterName] = useState('');
	const [versionOfKubernetes, setVersionOfKubernetes] = useState('');
	const [selectedVMGroup, setSelectedVMGroup] = useState('');
	const [numberOfMasters, setNumberOfMasters] = useState('');
	const [numberOfWorkers, setNumberOfWorkers] = useState('');
	const [errorOfSelectedVMGroup, setErrorOfSelectedVMGroup] = useState(false);

	const handleClusterNameChange = event => setClusterName(event.target.value);
	const handleVersionOfKubesprayChange = event => setVersionOfKubernetes(event.target.value);
	const handleVMGroupChange = event => {
		setSelectedVMGroup(event.target.value);
		props.clusters.find(cluster => event.target.value.id === cluster.vm_group)
			? setErrorOfSelectedVMGroup(true)
			: setErrorOfSelectedVMGroup(false);
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
	}
	useEffect(props.refreshVMGroupData, []);
	useEffect(props.refreshClustersData, []);

	return (
		<Container maxWidth='xl' aria-labelledby="form-dialog-title">
			<Typography
				gutterBottom
				component="h1"
				align='center'
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
				{testVersions.map((version, i) => (
					<MenuItem key={i} value={version.value}>
						{version.value}
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
				helperText={errorOfSelectedVMGroup ? ("A cluster with this group already exists. ") : ("Select a virtual machines group")}
				fullWidth
				variant='outlined'
				margin="dense"
				error={errorOfSelectedVMGroup}
			>
				{VMGroup.map(VMGroupItem => (
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
