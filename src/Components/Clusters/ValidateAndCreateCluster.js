import React from 'react';
import { Divider, Grid, Button } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';
import { DescriptionTypography } from '../VMGroup/DescriptionTypography';


export function ValidateAndCreateCluster (props) {
	const commonClasses = commonStyles();

	const createCluster = () => {
		fetch(`${serverURL}/cluster/add`, {
			method: 'POST',
			body: JSON.stringify({
				name: props.clusterName,
				kubernetes_version_id: props.kubernetesVersionId,
				// vm_group: selectedVMGroup.id
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(createCluster);
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(props.getClusters()) // !! After receiving a response
		.catch(error => console.error(error))
		setTimeout(props.getClusters(),100) // !! After sending a request
	}

	return (
		<React.Fragment>
			<DescriptionTypography>{`Cluster Name: ${props.clusterName}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Kubernetes version: ${props.kubernetesVersionId.version}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Virtual Machine Group Name: ${
				props.selectedVMGroup.name
					? props.selectedVMGroup.name
					: props.VMGname
				}`}</DescriptionTypography>
			<Divider />
			<DescriptionTypography>{`Cloud Provider: ${
				props.selectedVMGroup.cloud_provider
					? props.selectedVMGroup.cloud_provider
					: props.CPType.name
			}`}</DescriptionTypography>
			<Divider />
			{/* TO DO */}
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
					props.advancedConfig
					? props.setActiveStep(prevState => --prevState)
					: props.setActiveStep(0)
				}}>
					Back
				</Button>
				<Link to='/vm_group' className={commonClasses.links}>
					<Button color="primary" className={commonClasses.margin} onClick={createCluster}>
						Create
					</Button>
				</Link>
			</Grid>
		</React.Fragment>
	)
}
