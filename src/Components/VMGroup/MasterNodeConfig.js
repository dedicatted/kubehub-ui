import React from 'react';
import { TextField, ListSubheader, MenuItem, InputAdornment, Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles/style';

export function MasterNodeConfig (props) {
	const VMTypes = useSelector(state => state.VMTypes);
	const templates = useSelector(state => state.templates);
	const images = useSelector(state => state.images);
	const commonClasses = commonStyles();
	const VboxImages = useSelector(state => state.VboxImages);

	const handleMasterImageOrTemplateChange= event => props.setMasterImageOrTemplate(event.target.value);
	const handleMasterVMType = event => props.setMasterVMType(event.target.value);
	const hanldeNumberOfMasterNodes = event => props.setNumberOfMasterNodes(event.target.value);

	return (
		<React.Fragment>
			{
				props.CPType.cp_type === 'VirtualBox'
					? (
						<TextField
							id="standard-select-image-or-template"
							select
							margin="dense"
							label="Image or template"
							value={props.masterImageOrTemplate}
							onChange={handleMasterImageOrTemplateChange}
							helperText="Please select image or template. If you choose a template for master nodes, you cannot use the image for worker nodes and vice versa"
							fullWidth
							variant="outlined"
							size="small"
						>
							<ListSubheader>Images</ListSubheader>
							{VboxImages.map(image => (
								<MenuItem key={image.id} value={image}>
									{image.name}
								</MenuItem>
							))}
						</TextField>
					)
					: (
						<TextField
							id="standard-select-image-or-template"
							select
							margin="dense"
							label="Image or template"
							value={props.masterImageOrTemplate}
							onChange={handleMasterImageOrTemplateChange}
							helperText="Please select image or template. If you choose a template for master nodes, you cannot use the image for worker nodes and vice versa"
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
					)
			}
			<TextField
				margin="dense"
				id="VMType"
				label="VM type"
				value={props.masterVMType}
				onChange={handleMasterVMType}
				select
				fullWidth
				variant="outlined"
				size="small"
			>
				{VMTypes.map(VMType => (
					<MenuItem key={VMType.id} value={VMType}>
						{`${VMType.name} (${VMType.cores} vcpu, ${VMType.memory} GB RAM)`}
					</MenuItem>
				))}
			</TextField>
			<TextField
				margin="dense"
				id="number-of-master-nodes"
				label="Number of Master Nodes"
				value={props.numberOfMasterNodes}
				onChange={hanldeNumberOfMasterNodes}
				type="number"
				fullWidth
				variant="outlined"
				size="small"
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
				<Button color="primary" disabled={!props.masterImageOrTemplate} className={commonClasses.margin} onClick={() => {
					props.setActiveStep(prevState => ++prevState)
				}}>
					Next
				</Button>
			</Grid>
		</React.Fragment>
	)
}
