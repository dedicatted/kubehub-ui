import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { showClouds, getCloudId } from '../../Actions/CloudActions';
import { getTemplates } from '../../Actions/VM_groupActions'
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export function VM_group() {
	const dispatch = useDispatch();
	const clouds = useSelector(state => state.clouds);
	const cloudId = useSelector(state => state.cloudId);
	const templates = useSelector(state => state.templates);
	const [createVmGroupWindowOpen, setCreateVmGroupWindowOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const [CP_type, setCP_type] = React.useState('');
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [template, setTemplate] = React.useState('');
	const [templateVMID, setTemplateVMID] = React.useState();
	const serverURL = 'http://192.168.84.189:8080';
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
		.then(data => console.log(data));
		setCreateVmGroupWindowOpen(false);
	}
	const refreshCloudData = () => {
		fetch(`${serverURL}/api/cloud_providers/list`)
		.then(response => response.json())
		.then(data => data.cloud_provider_list)
		.then(data => {
			setTimeout(() => {
				dispatch(showClouds(data))
			},100)
		})
	}
	const handleCreateVmGroupWindowOpen = () => {
		refreshCloudData();
		setCreateVmGroupWindowOpen(true);
	};
	const handleCreateVmGroupWindowClose = () => {
		setCreateVmGroupWindowOpen(false);
	};
	const handleCP_typeChange = event => {
		console.log(event.target.value)
		setCP_type(event.target.value);
		for (let i = 0; i < clouds.length; i++) {
			if(clouds[i].cp_type === event.target.value) {
				dispatch(getCloudId(clouds,i))
			}
		}
		fetch(`${serverURL}/api/proxmox/template/list`)
		.then(response => response)
		.then(data => data.json())
		.then(data => dispatch(getTemplates(data.template_list)))
		}
	const handleNameChange = event => {
		setName(event.target.value);
	};
	const handleNumberOfNodes = event => {
		setNumberOfNodes(event.target.value);
	}
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

	}

	return (
		<div>
			<Button variant="contained" color='primary' onClick={handleCreateVmGroupWindowOpen} >Create VM group</Button>
			<Dialog open={createVmGroupWindowOpen} onClose={handleCreateVmGroupWindowClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Create virtual machine group</DialogTitle>
				<DialogContent>
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
			{/* <TableContainer>
					<Table aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">API-Endpoint</TableCell>
							<TableCell align="right">CP-Type</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
							{clouds.map((cloud, i) => {
								console.log(clouds[i].id);
								return (
									<TableRow key={i}>
									<TableCell component="th" scope="row">{cloud.name}</TableCell>
									<TableCell align="right">{cloud.api_endpoint}</TableCell>
									<TableCell align="right">{cloud.cp_type}</TableCell>
									<TableCell align="center">
									<IconButton aria-label="delete">
										<DeleteIcon />
									</IconButton>
									<IconButton>
										<EditIcon />
									</IconButton>
									</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer> */}
		</div>
	)
}
