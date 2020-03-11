import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(tehme => ({
	deleteIcon: {
		'&:hover' : {
			color: '#f44336'
		}
	},
	startIcon: {
		'&:hover' : {
			color: '#4caf50'
		}
	},
	editIcon: {
		'&:hover' : {
			color: '#2196f3'
		}
	}
}));

export function TableOfClusters (props) {
	const classes = useStyles();
	const VMGroups = useSelector(state => state.vm_group);
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
	},[])

	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="center">Version</TableCell>
						<TableCell align="center">VM Group</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.clusters.map((cluster, i) => {
						return (
							<TableRow key={i}>
								<TableCell component="th" scope="row">{cluster.name}</TableCell>
								<TableCell align="center">{cluster.k8s_version}</TableCell>
								<TableCell align="center">{VMGroups.find(VMGroup => VMGroup.id === cluster.vm_group).name}</TableCell>
								<TableCell align="center">
									<IconButton className={classes.startIcon}>
										<PlayArrowIcon />
									</IconButton>
									<IconButton className={classes.deleteIcon}>
										<DeleteIcon />
									</IconButton>
									<IconButton className={classes.editIcon}>
										<EditIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
