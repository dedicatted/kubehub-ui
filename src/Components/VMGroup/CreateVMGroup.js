import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, Typography, Grid, Stepper, Step, StepLabel, Card, makeStyles, InputAdornment, ListSubheader, Divider } from '@material-ui/core';
import { serverURL } from '../../serverLink';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style";
import auth from '../Auth/auth';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	typography: {
		padding: theme.spacing(1)
	},
	card: {
		padding: theme.spacing(4),
		"&:hover" : {
			boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
			cursor: 'pointer'
		}
	},
	boder: {
		border: '2px solid #3f51b5',
	}
}))

export function CreateVMGroup (props) {
	const commonClasses = commonStyles();
	const classes = useStyles();
	const [name, setName] = React.useState('');
	const [CPType, setCPType] = React.useState();
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [VMType, setVMType] = React.useState('');
	const [imageOrTemplate, setImageOrTemplate] = useState('');
	const [diskSize, setDiskSize] = useState('')
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = ['Select cloud provider', 'Set config of virtual machine group', 'Create virtual machine group'];
	const clouds = useSelector(state => state.clouds);
	const templates = useSelector(state => state.templates);
	const images = useSelector(state => state.images);

	const handleCPTypeChange = cloud => {
		setCPType(cloud);
	};
	const handleNameChange = event => setName(event.target.value);
	const handleImageOrTemplateChange = event => setImageOrTemplate(event.target.value);
	const handleNumberOfNodes = event => setNumberOfNodes(event.target.value);
	const handleVMType = event => setVMType(event.target.value);
	const handleDiskSizeChange = event => setDiskSize(event.target.value);

	const createVMGroup = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/add`, {
			method: 'POST',
			body: JSON.stringify(
				imageOrTemplate.template
					? {
						cloud_provider_id: CPType.id,
						number_of_nodes: numberOfNodes,
						name: name,
						cores: VMType.vCPU,
						sockets: 1,
						memory: VMType.memory * 1024,
						boot_disk: diskSize,
						disk_type: "scsi0",
						template_id: imageOrTemplate.id
					}
					: {
						cloud_provider_id: CPType.id,
						number_of_nodes: numberOfNodes,
						name: name,
						cores: VMType.vCPU,
						sockets: 1,
						memory: VMType.memory * 1024,
						boot_disk: diskSize,
						disk_type: "scsi0",
						os_image_id: imageOrTemplate.id
					}
			),
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
			<Container maxWidth="xl" className={commonClasses.container}>
				<Stepper activeStep={activeStep}>{
					steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))
				}</Stepper>
				{
					activeStep === 0
						? (
							<Grid
								className={classes.root}
								container
								spacing={5}
								justify={
									clouds.length
										? null
										: 'center'
								}
								alignItems={
									clouds.length
										? null
										: 'center'
								}
							>
								{
									clouds.length
										? (
											clouds.map((cloud, i) => (
												<Grid key={i} item xs={3}>
													<Card key={i} className={classes.card} onClick={() => {
														handleCPTypeChange(cloud);
														setActiveStep(prevState => ++prevState)
													}}>
														<Typography variant='body1' align='center'>{cloud.name}</Typography>
														<Typography variant='body2' align='center'>{cloud.cp_type}</Typography>
													</Card>
												</Grid>
											))
										)
										: (
											<Typography style={{paddingTop: '15%'}}>You have no clouds :(</Typography>
										)
								}
							</Grid>
						) : activeStep === 1
							? (
								<React.Fragment>
									<TextField
										value={name}
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
										value={imageOrTemplate}
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
										value={numberOfNodes}
										onChange={handleNumberOfNodes}
										variant="outlined"
										size="small"
									/>
									<TextField
										margin="dense"
										id="VMType"
										label="VM type"
										value={VMType}
										onChange={handleVMType}
										select
										fullWidth
										variant="outlined"
										size="small"
									>
										{props.VMTypes.map(VMType => (
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
										value={diskSize}
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
											setActiveStep(prevState => --prevState)
										}}>
											Back
										</Button>
										<Button color="primary" className={commonClasses.margin} onClick={() => {
											setActiveStep(prevState => ++prevState)
										}}>
											Next
										</Button>
									</Grid>
								</React.Fragment>
							) : activeStep === 2
									? (
										<React.Fragment>
											<Typography variant='body1' className={classes.typography}>{`Name: ${name}`}</Typography>
											<Divider />
											<Typography variant='body1' className={classes.typography}>{`Cloud provider: ${CPType.name}`}</Typography>
											<Divider />
											<Typography variant='body1' className={classes.typography}>{
												imageOrTemplate.template
													? `Template: ${imageOrTemplate.name}`
													: `Image: ${imageOrTemplate.name}`
											}</Typography>
											<Divider />
											<Typography variant='body1' className={classes.typography}>{`Number of nodes: ${numberOfNodes}`}</Typography>
											<Divider />
											<Typography variant='body1' className={classes.typography}>{`vCPU: ${VMType.vCPU} Cores`}</Typography>
											<Divider />
											<Typography variant='body1' className={classes.typography}>{`RAM: ${VMType.memory} GB`}</Typography>
											<Divider />
											<Typography variant='body1' className={classes.typography}>{`Disk size: ${diskSize} GB`}</Typography>
											<Grid
												container
												direction="row"
												justify="flex-end"
												alignItems="center"
											>
												<Button color="primary" className={commonClasses.margin} onClick={() => {
													setActiveStep(prevState => --prevState)
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
									: null

				}
			</Container>
		</React.Fragment>
	);
};
