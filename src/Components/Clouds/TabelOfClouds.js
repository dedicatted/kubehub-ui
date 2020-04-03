import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Container, Button  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCloud } from '../../Actions/CloudActions';
import { serverURL } from '../../serverLink';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showVMGroup } from '../../Actions/VMGroupActions';
import { commonStyles } from "../../styles/style";
import AddIcon from '@material-ui/icons/Add';

export function TableOfClouds (props) {
	let {url} = useRouteMatch();
	const VMGroup = useSelector(state => state.vm_group);
	const classes = commonStyles();

	const refreshVMGroupData = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => props.dispatch(showVMGroup(data)))
	};
	const checkVMGroup = (cloudProviderId) => {
		let isVMGroupUse;
		if (VMGroup.length) {
			for (let i = 0; i < VMGroup.length; i++) {
				if (VMGroup[i].vms[0].cloud_provider === cloudProviderId) {
					isVMGroupUse = true;
					break;
				} else {
					isVMGroupUse = false;
				}
			}
		}
		return isVMGroupUse;
	}
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
		<Container maxWidth="xl" className={classes.container}>
			<Link to={`${url}/create_cloud`} className={classes.links}>
				<Button
					color="primary"
					startIcon={<AddIcon />}
				>
					Add cloud
				</Button>
			</Link>
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
										{checkVMGroup(cloud.id)
											? ( <Tooltip title='You cannot delete this cloud provider, because you have groups of virtual machines that are based on this cloud provider'>
													<span>
														<IconButton aria-label="delete" disabled={checkVMGroup(cloud.id)}>
															<DeleteIcon />
														</IconButton>
													</span>
												</Tooltip> )
											: ( <IconButton aria-label="delete" onClick={() => {deleteCloudData(cloud.id)}} className={classes.deleteIcon}>
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
		</Container>
	);
};
