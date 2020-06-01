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
			name: props.name,
			cloud_provider_id: props.CPType.id,
			master: {
				number_of_nodes: props.numberOfMasterNodes,
				cores: props.masterVMType.cores,
				memory: props.masterVMType.memory,
				boot_disk: props.masterVMType.boot_disk,
			},
			worker: {
				number_of_nodes: props.numberOfWorkerNodes,
				cores: props.workerVMType.cores,
				memory: props.workerVMType.memory,
				boot_disk: props.workerVMType.boot_disk,
			},
		}
		if(props.masterImageOrTemplate.template) {
			body.master.template = props.masterImageOrTemplate.id;
			body.worker.template = props.workerImageOrTemplate.id;
		} else if (props.CPType.cp_type === 'VirtualBox') {
			console.log('vbox_os_image')
			body.master.vbox_os_image = props.masterImageOrTemplate.id;
			body.worker.vbox_os_image = props.workerImageOrTemplate.id;
		} else {
			body.master.os_image = props.masterImageOrTemplate.id;
			body.worker.os_image = props.workerImageOrTemplate.id;
		}

		return body;
	}
	// ! TO DO
	const createVMGroup = () => {
		let requestUrl = ''
		console.log(props.CPType.cp_type);
		if(props.CPType.cp_type === 'Proxmox') {
			requestUrl = '/api/proxmox/vm/group/add';
		} else if(props.CPType.cp_type === 'VirtualBox') {
			requestUrl = '/api/virtualbox/vmg/add';
		}
		console.log(`${serverURL}${requestUrl}`)
		fetch(`${serverURL}${requestUrl}`, {
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
			} ${props.masterImageOrTemplate.name }`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master VMType Name: ${props.masterVMType.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master vCPU: ${props.masterVMType.cores} Cores`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master RAM: ${props.masterVMType.memory} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Master Disk size: ${props.masterVMType.boot_disk} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker ${
				props.workerImageOrTemplate.template
					? 'Template:'
					: 'Image:'
			} ${props.workerImageOrTemplate.name}`} </DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker VMType Name: ${props.workerVMType.name}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker vCPU: ${props.workerVMType.cores} Cores`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker RAM: ${props.workerVMType.memory} GB`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Worker Disk size: ${props.masterVMType.boot_disk} GB`}</DescriptionTypography>
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
