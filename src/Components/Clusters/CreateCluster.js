import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { serverURL } from '../../serverLink';
import { commonStyles } from "../../styles/style";

export function CreateCluster (props) {
	const commonClasses = commonStyles();
	const VMGroups = useSelector(state => state.vm_group);
	const clusters = useSelector(state => state.clusters);
	const kubernetesVersions = useSelector(state => state.kubernetesVersions);
	const [clusterName, setClusterName] = useState('');
	const [kubernetesVersionId, setkubernetesVersionId] = useState('');
	const [selectedVMGroup, setSelectedVMGroup] = useState('');
	const [numberOfMasters, setNumberOfMasters] = useState('');
	const [numberOfWorkers, setNumberOfWorkers] = useState('');
	const [errorOfSelectedVMGroup, setErrorOfSelectedVMGroup] = useState(true);
	const [availableVMGroups,setAvailableVMGroups] = useState([]);

	const handleClusterNameChange = event => setClusterName(event.target.value);
	const handleVersionOfKubesprayChange = event => setkubernetesVersionId(event.target.value);
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
				kubernetes_version_id: kubernetesVersionId,
				vm_group: selectedVMGroup.id
			})
		})
		.then(response => response.json())
	}

	useEffect(props.getVMGroups, []);
	useEffect(props.getClusters, []);
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
		<Container maxWidth="xl" className={commonClasses.container}>
			<Typography
				gutterBottom
				component="h1"
				align="center"
				fontWeight='fontWeightBold'
				className={commonClasses.lable}
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
				id="standard-select-kubernetesVersionId"
				label="Version"
				size='small'
				select
				value={kubernetesVersionId}
				onChange={handleVersionOfKubesprayChange}
				helperText="Version of kubernetes"
				fullWidth
				variant='outlined'
				margin="dense"
			>
				{kubernetesVersions.map((version, i) => (
					<MenuItem key={i} value={version.id}>
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
						className={commonClasses.margin}
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
						className={commonClasses.margin}
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
					<Link to="/clusters" className={commonClasses.links}>
						<Button variant="contained" color="primary" className={commonClasses.margin}>
							Cancel
						</Button>
					</Link>
					<Link to="/clusters" className={errorOfSelectedVMGroup ? [commonClasses.links, commonClasses.disabledLink].join(' ') : commonClasses.links} >
						<Button  variant="contained" disabled={errorOfSelectedVMGroup} color="primary" className={commonClasses.margin} onClick={createCluster}>
							Create
						</Button>
					</Link>
				</div>
			</Grid>
		</Container>
	)
}
