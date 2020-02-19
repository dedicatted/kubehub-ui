import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getCloudId } from '../../Actions/CloudActions';
import { MenuItem, Button, makeStyles } from '@material-ui/core';
import { addVM_group } from '../../Actions/VM_groupActions';

const useStyles = makeStyles(theme => ({
	dialogWidth: {
		width: '552px'
	}

}))

export function CreateVMGroup (props) {
	const classes = useStyles();
	const serverURL = 'http://192.168.84.189:8080';
	const [name, setName] = React.useState('');
	const [CP_type, setCP_type] = React.useState('');
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [template, setTemplate] = React.useState('');
	const [templateVMID, setTemplateVMID] = React.useState();
	const dispatch = useDispatch();
	const clouds = useSelector(state => state.clouds);
	const templates = useSelector(state => state.templates);
	const cloudId = useSelector(state => state.cloudId);

	const handleCreateVmGroupWindowClose = () => {
		props.setCreateVmGroupWindowOpen(false);
	};
	const handleCP_typeChange = event => {
		console.log(event.target.value)
		setCP_type(event.target.value);
		for (let i = 0; i < clouds.length; i++) {
			if(clouds[i].cp_type === event.target.value) {
				dispatch(getCloudId(clouds,i))
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
		for (let i = 0; i <= templates.length; i++) {
			console.log(templates[i]);
			if (templates[i].name === event.target.value) {
				setTemplateVMID(templates[i].id);
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
		.then(response => response)
		.then(data => data.json())
		.then(data => {
			console.log(data);
			return data;
		})
		.then(data => dispatch(addVM_group(data.data)))
		.then(data => {
			props.refreshVMGroupData();
		})
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
				{clouds.map(cloud => (
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
					{templates.map(template => (
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
}
