import React from 'react';
import { Divider, Grid, Button } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';
import { DescriptionTypography } from '../VMGroup/DescriptionTypography';
import { addCloud } from '../../Actions/CloudActions';
import { useDispatch } from 'react-redux';


export function ValidateAndCreateCloud (props) {
	const commonClasses = commonStyles();
	const dispatch = useDispatch();

	const createCloud = () => {
		if(props.CPType === 'Proxmox') {
			fetch(`${serverURL}/api/cloud_providers/add`, {
				method: "POST",
				body: JSON.stringify({
					cp_type: props.CPType,
					name: props.name,
					api_endpoint: props.apiEndpoint,
					password: props.password,
					shared_storage_name: props.sharedStorageName
				}),
				headers: {
					'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
				},
			})
			.then(response => {
				if(response.status === 401) {
					auth.refreshToken(createCloud);
					Promise.reject();
				} else {
					return response.json()
				}
			})
			.catch(error => console.error(error));
			dispatch(addCloud(props.CPType, props.name, props.apiEndpoint, props.password));
			setTimeout(props.getClouds,100);
		} else if(props.CPType === 'VirtualBox') {
			fetch(`${serverURL}/api/virtualbox/cloud-provider/add`, {
				method: "POST",
				body: JSON.stringify({
					cp_type: props.CPType,
					name: props.name,
					api_endpoint: props.apiEndpoint,
					password: props.password,
					image_folder: props.virtualBoxImageFolder,
					machine_folder: props.virtualBoxMachineFolder
				}),
				headers: {
					'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
				},
			})
			.then(response => {
				if(response.status === 401) {
					auth.refreshToken(createCloud);
					Promise.reject();
				} else {
					return response.json()
				}
			})
			.catch(error => console.error(error));
			dispatch(addCloud(props.CPType, props.name, props.apiEndpoint, props.password));
			setTimeout(props.getClouds,100);
		}

	};

	return (
		<React.Fragment>
			<DescriptionTypography>{`Cloud Name: ${props.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`CP type: ${props.CPType}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`API-Endpoint: ${props.apiEndpoint}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Password: ${props.password}`}</DescriptionTypography>
			<Divider />
			{
				props.CPType === 'Proxmox'
				? (
					<DescriptionTypography>{`Shared storage node: ${props.sharedStorageName}`}</DescriptionTypography>
					)
				: props.CPType === 'VirtualBox'
					? (
						<React.Fragment>
							<DescriptionTypography>{`VirtualBox image folder: ${props.virtualBoxImageFolder}`}</DescriptionTypography>
							<Divider />
							<DescriptionTypography>{`VirtualBox machine folder: ${props.virtualBoxMachineFolder}`}</DescriptionTypography>
						</React.Fragment>
					)
					: null
			}
			<Divider />
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Button color="primary" className={commonClasses.margin} onClick={() => {
					props.setActiveStep(prevState => --prevState)
				}}>
					Back
				</Button>
				<Link to='/clouds' className={commonClasses.links}>
					<Button color="primary" className={commonClasses.margin} onClick={createCloud}>
						Create
					</Button>
				</Link>
			</Grid>
		</React.Fragment>
	)
}
