import React from 'react';
import { Divider, Grid, Button } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';
import { DescriptionTypography } from './DescriptionTypography';


export function StepValidateAndCreate (props) {
	const commonClasses = commonStyles();

	const choosingRightBody = () => {
		let body = {
			cloud_provider_id: props.CPType.id,
			number_of_nodes: props.numberOfNodes,
			name: props.name,
			cores: props.VMType.vCPU,
			sockets: 1,
			memory: props.VMType.memory * 1024,
			boot_disk: props.diskSize,
			disk_type: "scsi0",
		};
		if(props.imageOrTemplate.template) {
			body.template_id = props.imageOrTemplate.id;
		} else {
			body.os_image_id = props.imageOrTemplate.id;
		}
		return body;
	}
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
			<Divider />
			<DescriptionTypography>{
				props.imageOrTemplate.template
					? `Template: ${props.imageOrTemplate.name}`
					: `Image: ${props.imageOrTemplate.name}`
			}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Number of nodes: ${props.numberOfNodes}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`vCPU: ${props.VMType.vCPU} Cores`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`RAM: ${props.VMType.memory} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Disk size: ${props.diskSize} GB`}</DescriptionTypography>
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
