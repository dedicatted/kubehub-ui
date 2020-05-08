import React from 'react';
import { TextField, MenuItem, InputAdornment, Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles/style';

export function WorkerNodeConfig (props) {
	const VMTypes = useSelector(state => state.VMTypes);
	const templates = useSelector(state => state.templates);
	const images = useSelector(state => state.images);
	const commonClasses = commonStyles();

	const handleWorkerImageOrTemplateChange= event => props.setWorkerImageOrTemplate(event.target.value);
	const handleWorkerVMType = event => props.setWorkerVMType(event.target.value);
	const handleWorkerDiskSizeChange = event => props.setWorkerDiskSize(event.target.value);
	const hanldeNumberOfWorkerNodes = event => props.setNumberOfWorkerNodes(event.target.value);

	return (
		<React.Fragment>
			<TextField
				id="standard-select-image-or-template"
				select
				margin="dense"
				label="Image or template"
				value={props.workerImageOrTemplate}
				onChange={handleWorkerImageOrTemplateChange}
				helperText="Please select image or template. If you choose a template for master nodes, you cannot use the image for worker nodes and vice versa"
				fullWidth
				variant="outlined"
				size="small"
			>
				{
					props.masterImageOrTemplate.template
						? (
							templates.map(template => (
									<MenuItem key={template.id} value={template}>
										{template.name}
									</MenuItem>
							))
						)
						: (
							images.map(image => (
								<MenuItem key={image.id} value={image}>
									{image.name}
								</MenuItem>
							))
						)
				}
			</TextField>
			<TextField
				margin="dense"
				id="VMType"
				label="VM type"
				value={props.workerVMType}
				onChange={handleWorkerVMType}
				select
				fullWidth
				variant="outlined"
				size="small"
			>
				{VMTypes.map(VMType => (
					<MenuItem key={VMType.id} value={VMType}>
						{`${VMType.name} (${VMType.vCPU} vcpu, ${VMType.memory} GB RAM)`}
					</MenuItem>
				))}
			</TextField>
			<TextField
				margin="dense"
				id="number-of-worker-nodes"
				label="Number of Worker Nodes"
				value={props.numberOfWorkerNodes}
				onChange={hanldeNumberOfWorkerNodes}
				type="number"
				fullWidth
				variant="outlined"
				size="small"
			/>
			<TextField
				margin="dense"
				id="disk"
				label="Disk size"
				fullWidth
				type='number'
				value={props.workerDiskSize}
				onChange={handleWorkerDiskSizeChange}
				variant="outlined"
				size="small"
				InputProps={{
					endAdornment: <InputAdornment position="start">GB</InputAdornment>,
				}}
			/>
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
				<Button color="primary" className={commonClasses.margin} onClick={() => {
					props.setActiveStep(prevState => ++prevState)
				}}>
					Next
				</Button>
			</Grid>
		</React.Fragment>
	)
}
