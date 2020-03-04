import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Grid, Container, Typography, makeStyles, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { clearFields } from '../Dashboard';

const useStyles = makeStyles(theme => ({
	margin: {
	  margin: theme.spacing(1),
	},
	lable: {
		fontWeight: "bold",
		textTransform: "uppercase"
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
	const [countOfMasters, setCountOfMasters] = useState('');
	const [countOfWorkers, setCountOfWorkers] = useState('');
	const [countersDisabled, setCountersDisabled] = useState(true);
	const handleClusterCreateWindowClose = () => {
		// props.setClusterCreateWindow(false);
		setCountersDisabled(true);
		clearFields(setClusterName, setVersionOfKubernetes, setSelectedVMGroup, setCountOfMasters, setCountOfWorkers);
	};
	const handleClusterNameChange = event => setClusterName(event.target.value);
	const handleVersionOfKubesprayChange = event => setVersionOfKubernetes(event.target.value);
	const handleVMGroupChange = event => {
		setSelectedVMGroup(event.target.value);
		clearFields(setCountOfMasters, setCountOfWorkers);
		setCountersDisabled(false);
	};
	const handleCountOfMasters = event => setCountOfMasters(event.target.value);
	const handleSetCountOfWorkers = event => setCountOfWorkers(event.target.value);
	useEffect(props.refreshVMGroupData, [props]);
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
				helperText="Select a virtual machines group"
				fullWidth
				variant='outlined'
				margin="dense"
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
				justify="space-evenly"
				alignItems="center"
			>
				<TextField
					id="standard-select-countOfMasters"
					label="Count of masters"
					size='small'
					select
					value={countOfMasters}
					disabled={countersDisabled}
					onChange={handleCountOfMasters}
					helperText="Select count of masters"
					variant='outlined'
					margin="dense"
				>
					{selectedVMGroup
						? (selectedVMGroup.vms.map((vm, i) => {
							i = i - countOfWorkers + 1;
							if(i > 0) {
								return (
									<MenuItem key={i} value={i}>
										{i}
									</MenuItem>
								)
							}
						}))
						: null
					}
				}
				</TextField>
				<TextField
					id="standard-select-countOfWorkers"
					label="Count of workers"
					size='small'
					select
					value={countOfWorkers}
					disabled={countersDisabled}
					onChange={handleSetCountOfWorkers}
					helperText="Select count of workers"
					variant='outlined'
					margin="dense"
				>
					{selectedVMGroup
						? (selectedVMGroup.vms.map((vm, i) => {
							i = i - countOfMasters + 1;
							if(i >= 0) {
								return (
									<MenuItem key={i} value={i}>
										{i}
									</MenuItem>
								)
							}
						}))
						: <MenuItem>No</MenuItem>
					}
				}
				</TextField>
			</Grid>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Button className={classes.margin} variant="contained" color="primary">
					Cancel
				</Button>
				<Button  variant="contained" color="primary">
					Create
				</Button>
			</Grid>

		</Container>
	)
}
