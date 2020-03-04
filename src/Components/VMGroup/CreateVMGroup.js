import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getCloudId } from '../../Actions/CloudActions';
import { serverURL } from '../Dashboard';

const useStyles = makeStyles(theme => ({
	dialogWidth: {
		width: '552px'
	}

}));

export function CreateVMGroup (props) {
	const classes = useStyles();
	const [name, setName] = React.useState('');
	const [CP_type, setCP_type] = React.useState('');
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [template, setTemplate] = React.useState('');
	const [templateVMID, setTemplateVMID] = React.useState();
	const cloudId = useSelector(state => state.cloudId);

	const handleCreateVmGroupWindowClose = () => {
		props.setCreateVmGroupWindowOpen(false);
	};
	const handleCP_typeChange = event => {
		setCP_type(event.target.value);
		for (let i = 0; i < props.clouds.length; i++) {
			if(props.clouds[i].cp_type === event.target.value) {
				props.dispatch(getCloudId(props.clouds,i));
			}
		}
	};
	const handleNameChange = event => {
		setName(event.target.value);
	};
	const handleNumberOfNodes = event => {
		setNumberOfNodes(event.target.value);
	};
	const handleTemplate = event => {
		setTemplate(event.target.value);
		console.log(event.target.value);
		for (let i = 0; i <= props.templates.length; i++) {
			console.log(props.templates[i]);
			if (props.templates[i].name === event.target.value) {
				setTemplateVMID(props.templates[i].id);
				break;
			}
		}
		console.log(templateVMID);
	};
	const createVM_group = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/add`, {
			method: 'POST',
			body: JSON.stringify({
				cloud_provider_id: cloudId,
				template_id: templateVMID,
				number_of_nodes: numberOfNodes,
				node: 'pve-01',
				name: name
			})
		})
		.then(props.refreshVMGroupData()) // !! After sending the request
		.then(response => {
			props.refreshVMGroupData();
			console.log(response);

		}) // !! After receiving a response
		props.setCreateVmGroupWindowOpen(false);
	};

	return (
		<Dialog open={props.createVmGroupWindowOpen} onClose={handleCreateVmGroupWindowClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Create virtual machine group</DialogTitle>
			<DialogContent className={classes.dialogWidth}>
				<TextField
					id="standard-select-CP_type"
					select
					label="Type of clouds"
					value={CP_type}
					onChange={handleCP_typeChange}
					helperText="Please select your cloud"
					fullWidth
				>
				{props.clouds.map(cloud => (
					<MenuItem key={cloud.id} value={cloud.cp_type}>
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
					/>

					<TextField
						margin="dense"
						id="number_of_nodes"
						label="Number of nodes"
						fullWidth
						value={numberOfNodes}
						onChange={handleNumberOfNodes}
					/>
					<TextField
						margin="dense"
						id="template"
						label="Template"
						value={template}
						onChange={handleTemplate}
						select
						fullWidth
					>
					{props.templates.map(template => (
						<MenuItem key={template.id} value={template.name}>
							{template.name}
						</MenuItem>
					))}
					</TextField>
				</DialogContent>
			<DialogActions>
				<Button onClick={handleCreateVmGroupWindowClose} color="primary">
					Cancel
				</Button>
				<Button color="primary" onClick={createVM_group}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
