import React from 'react';
import { TextField, MenuItem, Button, Container, Typography, Grid } from '@material-ui/core';
import { serverURL } from '../../serverLink';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style";


export function CreateVMGroup (props) {
	const classes = commonStyles();
	const [name, setName] = React.useState('');
	const [CPTypeId, setCPTypeId] = React.useState('');
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [template, setTemplate] = React.useState('');
	const [templateVMID, setTemplateVMID] = React.useState();

	const handleCPTypeChange = event => setCPTypeId(event.target.value);
	const handleNameChange = event => setName(event.target.value);
	const handleNumberOfNodes = event => setNumberOfNodes(event.target.value);
	const handleTemplate = event => {
		setTemplate(event.target.value);
		for (let i = 0; i <= props.templates.length; i++) {
			if (props.templates[i].name === event.target.value) {
				setTemplateVMID(props.templates[i].id);
				break;
			}
		}
	};
	const createVM_group = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/add`, {
			method: 'POST',
			body: JSON.stringify({
				cloud_provider_id: CPTypeId,
				template_id: templateVMID,
				number_of_nodes: numberOfNodes,
				node: 'pve-01',
				name: name
			})
		})
		.then(props.refreshVMGroupData()) // !! After receiving a response
		setTimeout(props.refreshVMGroupData(),100) // !! After sending a request
	};

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Typography
				gutterBottom
				component="h1"
				align="center"
				className={classes.lable}
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
							{cloud.cp_type}
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
					id="template"
					label="Template"
					value={template}
					onChange={handleTemplate}
					select
					fullWidth
					variant="outlined"
					size="small"
				>
					{props.templates.map(template => (
						<MenuItem key={template.id} value={template.name}>
							{template.name}
						</MenuItem>
					))}
				</TextField>
				<Grid
					container
					direction="row"
					justify="flex-end"
					alignItems="center"
				>
					<Link to="/vm_group" className={classes.links}>
						<Button variant="contained" color="primary" className={classes.margin}>
							Cancel
						</Button>
					</Link>
					<Link to="/vm_group" className={classes.links}>
						<Button variant="contained" onClick={createVM_group} color="primary" className={classes.margin}>
							Create
						</Button>
					</Link>
				</Grid>
		</Container>
	);
};
