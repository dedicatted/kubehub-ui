import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, makeStyles, Tooltip  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCloud } from '../../Actions/CloudActions';
import { serverURL } from '../Dashboard';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showVMGroup } from '../../Actions/VMGroupActions';

const useStyles = makeStyles(theme => ({
	DeleteIcon: {
		'&:hover' : {
			color: '#f44336'
		}
	},
	editIcon: {
		'&:hover' : {
			color: '#2196f3'
		}
	}
}))

export function TableOfClouds (props) {
	let isVMGroupUse = false;
	const VMGroup = useSelector(state => state.vm_group);
	const classes = useStyles();
	const refreshVMGroupData = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => props.dispatch(showVMGroup(data)))
	};
	const checkVMGroup = (cloudProviderId) => {
		if (VMGroup.length) {
			for (let i = 0; i < VMGroup.length; i++) {
				VMGroup[i].vms[0].cloud_provider === cloudProviderId
					? isVMGroupUse = true
					: isVMGroupUse = false
			}
		}
		return isVMGroupUse;
	}
	let {url} = useRouteMatch();
	const deleteCloudData = (index) => {
		for(let i = 0; i <= props.clouds.length; i++) {
			if(props.clouds[i].id === index) {
				fetch(`${serverURL}/api/cloud_providers/remove`,{
					method: 'POST',
					body: JSON.stringify({id: index})
				})
				.then(() => props.dispatch(deleteCloud(i)))
				.then(() => props.refreshCloudData())
				break;
			}
		}
	};
	useEffect(refreshVMGroupData, [])
	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="center">API-Endpoint</TableCell>
						<TableCell align="center">CP-Type</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.clouds.map((cloud, i) => {
						return (
							<TableRow key={i}>
								<TableCell component="th" scope="row">{cloud.name}</TableCell>
								<TableCell align="center">{cloud.api_endpoint}</TableCell>
								<TableCell align="center">{cloud.cp_type}</TableCell>
								<TableCell align="center">
									{!isVMGroupUse
										? ( <Tooltip title='You cannot delete this cloud provider, because you have groups of virtual machines that are based on this cloud provider'>
												<span>
													<IconButton aria-label="delete" disabled={checkVMGroup(cloud.id)} onClick={() => {deleteCloudData(cloud.id)}} className={classes.DeleteIcon}>
														<DeleteIcon />
													</IconButton>
												</span>
											</Tooltip> )
										: ( <IconButton aria-label="delete" disabled={checkVMGroup(cloud.id)} onClick={() => {deleteCloudData(cloud.id)}} className={classes.DeleteIcon}>
												<DeleteIcon />
											</IconButton> )
									}
									<Link to={`${url}/edit_cloud`}>
										<IconButton onClick={() => {props.handleEditWindowOpen(cloud.id)}} className={classes.editIcon}>
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
