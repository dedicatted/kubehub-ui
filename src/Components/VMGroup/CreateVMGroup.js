import React from 'react';
import { TextField, MenuItem, Button, Container, Typography, Grid } from '@material-ui/core';
import { serverURL } from '../../serverLink';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style";
import auth from '../Auth/auth';


export function CreateVMGroup (props) {
	const commonClasses = commonStyles();
	const [name, setName] = React.useState('');
	const [CPTypeId, setCPTypeId] = React.useState('');
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [VMTypeId, setVMTypeId] = React.useState();

	const handleCPTypeChange = event => setCPTypeId(event.target.value);
	const handleNameChange = event => setName(event.target.value);
	const handleNumberOfNodes = event => setNumberOfNodes(event.target.value);
	const handleVMType = event => setVMTypeId(event.target.value);
	const createVMGroup = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/add`, {
			method: 'POST',
			body: JSON.stringify({
				cloud_provider_id: CPTypeId,
				template_id: VMTypeId,
				number_of_nodes: numberOfNodes,
				name: name
			}),
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
		<Container maxWidth="xl" className={commonClasses.container}>
			<Typography
				gutterBottom
				component="h1"
				align="center"
				className={commonClasses.lable}
			>
				Create virtual machine group
			</Typography>
				<TextField
					id="standard-select-CP_type"
					select
					label="Cloud"
					value={CPTypeId}
					onChange={handleCPTypeChange}
					helperText="Please select your cloud"
					fullWidth
					variant="outlined"
					size="small"
				>
					{props.clouds.map(cloud => (
						<MenuItem key={cloud.id} value={cloud.id}>
							{cloud.name}
						</MenuItem>
					))}
				</TextField>
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
					margin="dense"
					id="number_of_nodes"
					label="Number of nodes"
					fullWidth
					value={numberOfNodes}
					onChange={handleNumberOfNodes}
					variant="outlined"
					size="small"
				/>
				<TextField
					margin="dense"
					id="VMType"
					label="VM type"
					value={VMTypeId}
					onChange={handleVMType}
					select
					fullWidth
					variant="outlined"
					size="small"
				>
					{props.VMTypes.map(VMType => (
						<MenuItem key={VMType.id} value={VMType.id}>
							{VMType.name}
						</MenuItem>
					))}
				</TextField>
				<Grid
					container
					direction="row"
					justify="flex-end"
					alignItems="center"
				>
					<Link to="/vm_group" className={commonClasses.links}>
						<Button variant="contained" color="primary" className={commonClasses.margin}>
							Cancel
						</Button>
					</Link>
					<Link to="/vm_group" className={commonClasses.links}>
						<Button variant="contained" onClick={createVMGroup} color="primary" className={commonClasses.margin}>
							Create
						</Button>
					</Link>
				</Grid>
		</Container>
	);
};
