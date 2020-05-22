import React from 'react';
import { Divider, Grid, Button } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';
import { DescriptionTypography } from './DescriptionTypography';


export function ValidateAndCreateVMGroup (props) {
	const commonClasses = commonStyles();
	// ! TO DO
	const choosingRightBody = () => {
		let body = {
			cloud_provider_id: props.CPType.id,
			number_of_nodes: props.numberOfMasterNodes,
			name: props.name,
			cores: props.VMType.vCPU,
			memory: props.VMType.memory,
			boot_disk: props.diskSize,
		};
		if(props.masterImageOrTemplate.template) {
			body.template_id = props.masterImageOrTemplate.id;
		} else {
			body.os_image_id = props.masterImageOrTemplate.id;
		}
		return body;
	}
	// ! TO DO
	const createVMGroup = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/add`, {
			method: 'POST',
			body: JSON.stringify(choosingRightBody()),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(createVMGroup);
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(props.getVMGroups()) // !! After receiving a response
		.catch(error => console.error(error))
		setTimeout(props.getVMGroups(),100) // !! After sending a request
	};
	return (
		<React.Fragment>
			<DescriptionTypography>{`Name: ${props.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Cloud provider: ${props.CPType.name}`}</DescriptionTypography>
			<DescriptionTypography>{`Master ${
				props.masterImageOrTemplate.template
					? 'Template:'
					: 'Image:'
			} ${props.masterImageOrTemplate.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master VMType Name: ${props.masterVMType.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master vCPU: ${props.masterVMType.vCPU} Cores`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master RAM: ${props.masterVMType.memory} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master Disk size: ${props.masterDiskSize} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker ${
				props.workerImageOrTemplate.template
					? 'Template:'
					: 'Image:'
			} ${props.workerImageOrTemplate.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker VMType Name: ${props.workerVMType.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker vCPU: ${props.workerVMType.vCPU} Cores`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker RAM: ${props.workerVMType.memory} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker Disk size: ${props.workerDiskSize} GB`}</DescriptionTypography>
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
				<Link to='/vm_group' className={commonClasses.links}>
					<Button color="primary" className={commonClasses.margin} onClick={createVMGroup}>
						Create
					</Button>
				</Link>
			</Grid>
		</React.Fragment>
	)
}
