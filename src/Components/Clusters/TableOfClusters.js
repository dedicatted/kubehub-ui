import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';

export function TableOfClusters (props) {
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
								<TableCell align="center">{VMGroups.find(VMGroup => VMGroup.id === cluster.vm_group_id).name}</TableCell>
								<TableCell align="center">
									<IconButton aria-label="delete">
										<DeleteIcon />
									</IconButton>
									<IconButton>
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
