import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, MenuItem, ButtonGroup } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { useSelector } from 'react-redux';

export function ClusterBasicConfig (props) {
	const commonClasses = commonStyles();
	const clouds = useSelector(state => state.clouds);
	const VMGroups = useSelector(state => state.vm_group);
	const clusters = useSelector(state => state.clusters);
	const [availableVMGroups,setAvailableVMGroups] = useState([]);
	const kubernetesVersions = useSelector(state => state.kubernetesVersions);

	const handleClusterNameChange = event => props.setClusterName(event.target.value);
	const handleVersionOfKubesprayChange = event => props.setkubernetesVersionId(event.target.value);
	const handleSelectedVMGroupChange = event => props.setSelectedVMGroup(event.target.value);
	const handleVMGnameChange = event => props.setVMGname(event.target.value);
	const handleCPTypeChange = event => props.setCPType(event.target.value);

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
		<React.Fragment>
			<TextField
				id="standard-clusterName"
				label="Cluster name"
				size='small'
				value={props.clusterName}
				onChange={handleClusterNameChange}
				helperText="Name of cluster"
				fullWidth
				variant='outlined'
				margin="dense"
			/>
			<TextField
				id="standard-select-kubernetesVersionId"
				label="Version"
				size='small'
				select
				value={props.kubernetesVersionId}
				onChange={handleVersionOfKubesprayChange}
				helperText="Version of kubernetes"
				fullWidth
				variant='outlined'
				margin="dense"
			>
				{kubernetesVersions.map((version, i) => (
					<MenuItem key={i} value={version}>
						{version.version}
					</MenuItem>
				))}
			</ TextField>
			<ButtonGroup color='primary'>
				<Button variant={!props.advancedConfig ? 'contained' : null} onClick={() => props.setAdvancedConfig(false)}>VM group</Button>
				<Button variant={props.advancedConfig ? 'contained' : null} onClick={() => props.setAdvancedConfig(true)}>Advanced</Button>
			</ButtonGroup>
			{props.advancedConfig
					? (
						<React.Fragment>
							<TextField
								value={props.VMGname}
								onChange={handleVMGnameChange}
								margin="dense"
								id="name"
								label="Virtual machines group name"
								fullWidth
								variant="outlined"
								size="small"
							/>
							<TextField
								id="standard-select-CP_type"
								select
								margin="dense"
								label="Cloud"
								value={props.CPType}
								onChange={handleCPTypeChange}
								helperText="Please select your cloud"
								fullWidth
								variant="outlined"
								size="small"
							>					>
								{clouds.map(cloud => (
									<MenuItem key={cloud.id} value={cloud}>
										{cloud.name}
									</MenuItem>
								))}
							</TextField>
						</React.Fragment>
					)
					: (
						<TextField
							id="standard-select-VMGroup"
							label="VM group"
							size='small'
							select
							value={props.selectedVMGroup}
							onChange={handleSelectedVMGroupChange}
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
					)}
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Button color="primary" disabled={!props.selectedVMGroup} className={commonClasses.margin} onClick={() => {
					props.advancedConfig
						? props.setActiveStep(prevState => ++prevState)
						: props.setActiveStep(props.steps.length - 1)
				}}>
					Next
				</Button>
			</Grid>
		</React.Fragment>
	)
}
