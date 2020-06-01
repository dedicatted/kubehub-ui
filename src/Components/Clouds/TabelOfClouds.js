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
import auth from '../Auth/auth';

export function TableOfClouds (props) {
	let {url} = useRouteMatch();
	const VMGroup = useSelector(state => state.vm_group);
	const commonClasses = commonStyles();

	const getVMGroups = () => {
		fetch(`${serverURL}/api/kubehub/vm/group/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getVMGroups);
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(data => data.vm_group_list)
		.then(data => props.dispatch(showVMGroup(data)))
		.catch(error => console.log(error));
	};
	const checkActiveVMGroup = (cloudProviderId) => { // Checks if there are groups of virtual machines created on the selected cloud provider
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
	const deleteCloudData = (cloud) => {
		for(let i = 0; i <= props.clouds.length; i++) {
			if(props.clouds[i].id === cloud.id) {
				fetch(`${serverURL}/api/kubehub/cloud-provider/remove`,{
					method: 'POST',
					body: JSON.stringify({
						cloud_provider_id: cloud.id,
						cp_type: cloud.cp_type
					}),
					headers: {
						"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
					}
				})
				.then(response => {
					if(response.status === 401) {
						auth.refreshToken(deleteCloud);
						Promise.reject()
					} else {
						return response.json()
					}
				})
				.then(() => props.dispatch(deleteCloud(i)))
				.then(() => props.getClouds())
				.catch(error => console.error(error))
				break;
			}
		}
	};

	useEffect(getVMGroups, [])

	return (
		<Container maxWidth="xl" className={commonClasses.container}>
			<Link to={`${url}/create_cloud`} className={commonClasses.links}>
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
										{checkActiveVMGroup(cloud.id)
											? ( <Tooltip title='You cannot delete this cloud provider, because you have groups of virtual machines that are based on this cloud provider'>
													<span>
														<IconButton aria-label="delete" disabled={checkActiveVMGroup(cloud.id)}>
															<DeleteIcon />
														</IconButton>
													</span>
												</Tooltip> )
											: ( <IconButton aria-label="delete" onClick={() => {deleteCloudData(cloud)}} className={commonClasses.deleteIcon}>
													<DeleteIcon />
												</IconButton> )
										}
										<Link to={`${url}/edit_cloud`}>
											<IconButton onClick={() => {props.setEditableData(i)}} className={commonClasses.editIcon}>
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
