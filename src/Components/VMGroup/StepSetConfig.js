import React from 'react';
import { TextField, ListSubheader, MenuItem, Grid, InputAdornment, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { commonStyles } from "../../styles/style";

export function StepSetConfig (props) {
	const VMTypes = useSelector(state => state.VMTypes);
	const templates = useSelector(state => state.templates);
	const images = useSelector(state => state.images);
	const commonClasses = commonStyles();

	const handleNameChange = event => props.setName(event.target.value);
	const handleImageOrTemplateChange = event => props.setImageOrTemplate(event.target.value);
	const handleNumberOfNodes = event => props.setNumberOfNodes(event.target.value);
	const handleVMType = event => props.setVMType(event.target.value);
	const handleDiskSizeChange = event => props.setDiskSize(event.target.value);
	return (
		<React.Fragment>
			<TextField
				value={props.name}
				onChange={handleNameChange}
				margin="dense"
				id="name"
				label="Name"
				fullWidth
				variant="outlined"
				size="small"
			/>
			<TextField
				id="standard-select-image-or-template"
				select
				margin="dense"
				label="Image or template"
				value={props.imageOrTemplate}
				onChange={handleImageOrTemplateChange}
				helperText="Please select image or template"
				fullWidth
				variant="outlined"
				size="small"
			>
				<ListSubheader>Templates</ListSubheader>
				{templates.map(template => (
						<MenuItem key={template.id} value={template}>
							{template.name}
						</MenuItem>
				))}
				<ListSubheader>Images</ListSubheader>
				{images.map(image => (
					<MenuItem key={image.id} value={image}>
						{image.name}
					</MenuItem>
				))}
			</TextField>
			<TextField
				margin="dense"
				id="number_of_nodes"
				label="Number of nodes"
				fullWidth
				type='number'
				value={props.numberOfNodes}
				onChange={handleNumberOfNodes}
				variant="outlined"
				size="small"
			/>
			<TextField
				margin="dense"
				id="VMType"
				label="VM type"
				value={props.VMType}
				onChange={handleVMType}
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
				id="disk"
				label="Disk size"
				fullWidth
				type='number'
				value={props.diskSize}
				onChange={handleDiskSizeChange}
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
