import React from 'react';
import { commonStyles } from '../../styles/style';
import { TextField, Grid, Button } from '@material-ui/core';

export function CloudConfig(props) {
	const commonClasses = commonStyles();

	const handleNameChange = event => props.setName(event.target.value);
	const handleApiEndpointChange = event => props.setApiEndpoint(event.target.value);
	const handlePasswordChange = event => props.setPassword(event.target.value);
	const handleSharedStorageNameChange = event => props.setSharedStorageName(event.target.value);
	const handleVirtualBoxImageFolderChange = event => props.setVirtualBoxImagefolder(event.target.value);

	return (
		<React.Fragment>
			<TextField
				margin="dense"
				id="name"
				label="Name"
				value={props.name}
				onChange={handleNameChange}
				fullWidth
				variant="outlined"
				size="small"
			/>
			<TextField
				margin="dense"
				id="api-endpoint"
				label="API-Endpoint"
				value={props.apiEndpoint}
				onChange={handleApiEndpointChange}
				type="url"
				fullWidth
				variant="outlined"
				size="small"
			/>
			<TextField
				value={props.password}
				onChange={handlePasswordChange}
				type="password"
				margin="dense"
				id="password"
				label="Password"
				fullWidth
				variant="outlined"
				size="small"
			/>
			{
				props.CPType === 'Proxmox'
				? (
					<TextField
						value={props.sharedStorageName}
						onChange={handleSharedStorageNameChange}
						margin="dense"
						id="shared_storage_name"
						label="Shared storage name"
						fullWidth
						variant="outlined"
						size="small"
					/>
				)
				: props.CPType === 'VirtualBox'
					? (
						<TextField
							margin="dense"
							id="virtualbox-image-folder"
							label="VirtualBox image folder"
							value={props.virtualBoxImageFolder}
							onChange={handleVirtualBoxImageFolderChange}
							type="url"
							fullWidth
							variant="outlined"
							size="small"
						/>
					)
					: null
			}

			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Button color='primary' className={commonClasses.margin} onClick={() => props.setActiveStep(prevState => --prevState)}>
					Back
				</Button>
				<Button color='primary' className={commonClasses.margin} onClick={() => props.setActiveStep(prevState => ++prevState)}>
					Next
				</Button>
			</Grid>
		</React.Fragment>
	)
}
