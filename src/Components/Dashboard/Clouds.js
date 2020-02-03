import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector, useDispatch } from 'react-redux'
import { addCloud } from '../../Actions/CloudActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { showClouds, deleteCloud, editCloud } from '../../Actions/CloudActions';

const CP_types = [
	{
		value: 'AWS'
	},
	{
		value: 'GCP'
	},
	{
		value: 'Proxmox'
	}
];

export function Clouds () {
		const clouds = useSelector(state => state.clouds);
		const [createCloudWindowOpen, setCreateCloudWindowOpen] = React.useState(false);
		const [CP_type, setCP_type] = React.useState('AWS');
		const [name, setName] = React.useState('');
		const [api_endpoint, setApiEndpoint] = React.useState('');
		const [password, setPassword] = React.useState('');
		const [editCloudWindowOpen, setEditCloudWindowOpen] = React.useState(false);
		const [editCP_type, setEditCP_type] = React.useState('AWS');
		const [editName, setEditName] = React.useState('');
		const [editCloudIndex, seteditCloudIndex] = React.useState(0);
		const dispatch = useDispatch();
		const handleEditCP_typeChange = event => {
			setEditCP_type(event.target.value);
		};
		const handleEditNameChange = event => {
			setEditName(event.target.value);
		};
		const handleEditWindowOpen = (index) => {
			setEditCloudWindowOpen(true);
			for(let i = 0; i < clouds.length; i++) {
				if(clouds[i].id === index) {
					console.log(clouds[i]);
					setEditCP_type(clouds[i].cp_type);
					setEditName(clouds[i].name);
					seteditCloudIndex(i);
				}
			}
		}
		const handleEditWindowClose = () => {
			setEditCloudWindowOpen(false);
		}
		const handleCreateWindowOpen = () => {
			setCreateCloudWindowOpen(true);
		};
		const handleCreateWindowClose = () => {
			setCreateCloudWindowOpen(false);
		};
		const handleCP_typeChange = event => {
			setCP_type(event.target.value);
		};
		const handleNameChange = event => {
			setName(event.target.value);
		};
		const handleApiEndpointChange = event => {
			setApiEndpoint(event.target.value);
		};
		const handlePasswordChange = event => {
			setPassword(event.target.value);
		};
		const refreshCloudData = () => {
			fetch('http://192.168.84.189:8080/api/cloud_providers/list')
			.then(response => response.json())
			.then(data => data.cloud_provider_list)
			.then(data => {
				dispatch(showClouds(data))
			})
		}
		const sendCloudData = () => {
			let xhr = new XMLHttpRequest();
			xhr.open('POST','http://192.168.84.189:8080/api/cloud_providers/add');
			let data = JSON.stringify({
				cp_type: CP_type,
				name: name,
				api_endpoint: api_endpoint,
				password: password
			})
			dispatch(addCloud(CP_type,name,api_endpoint,password))
			xhr.send(data);
			setCreateCloudWindowOpen(false);
			setTimeout(() =>{
				refreshCloudData();
			},100)
		}

		const editCloudData = () => {
			console.log(editCP_type, editName, editCloudIndex,clouds);
			dispatch(editCloud(editCP_type, editName, editCloudIndex));
			fetch('http://192.168.84.189:8080/api/cloud_providers/edit',{
				method: 'POST',
				body: JSON.stringify({
					id: clouds[editCloudIndex].id,
					cp_type: editCP_type,
					name: editName
				})
			})
			setEditCloudWindowOpen(false);
		}

		const deleteCloudData = (index) => {
			for(let i = 0; i <= clouds.length; i++) {
				if(clouds[i].id === index) {
					dispatch(deleteCloud(i));
					fetch('http://192.168.84.189:8080/api/cloud_providers/remove',{
						method: 'POST',
						body: JSON.stringify({id: index})
					})
					.then(data => {
						console.log(data);
						return data;
					})
					.then(() => refreshCloudData())
					break;

				}
			}
		}

		return (
			<div>
				<Button variant="contained" color='primary' onClick={handleCreateWindowOpen}>Add cloud</Button>
				{/* Create Dialog Window */}
				<Dialog open={createCloudWindowOpen} onClose={handleCreateWindowClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Create cloud</DialogTitle>
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
							{CP_types.map(CP_type => (
								<MenuItem key={CP_type.value} value={CP_type.value}>
									{CP_type.value}
								</MenuItem>
							))}
						</TextField>
						<TextField
							margin="dense"
							id="name"
							label="Name"
							fullWidth
							value={name}
							onChange={handleNameChange}
						/>
						<TextField
							margin="dense"
							id="api-endpoint"
							label="API-Endpoint"
							value={api_endpoint}
							onChange={handleApiEndpointChange}
							type='url'
							fullWidth
						/>
						<TextField
							value={password}
							onChange={handlePasswordChange}
							type="password"
							margin="dense"
							id="password"
							label="Password"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCreateWindowClose} color="primary">
							Cancel
						</Button>
						<Button onClick={sendCloudData} color="primary">
							Create
						</Button>
					</DialogActions>
				</Dialog>
				{/* Show Clouds */}
				<TableContainer>
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
									<IconButton aria-label="delete" onClick={() => {deleteCloudData(cloud.id)}}>
										<DeleteIcon />
									</IconButton>
									<IconButton onClick={() => {handleEditWindowOpen(cloud.id)}}>
										<EditIcon />
									</IconButton>
									</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>

				{/* Edit cloud Window */}

				<Dialog open={editCloudWindowOpen} onClose={handleEditWindowClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Edit cloud</DialogTitle>
					<DialogContent>
						<TextField
							id="standard-select-CP_type"
							select
							label="Type of clouds"
							value={editCP_type}
							onChange={handleEditCP_typeChange}
							helperText="Please select your cloud"
							fullWidth
						>
							{CP_types.map(CP_type => (
								<MenuItem key={CP_type.value} value={CP_type.value}>
									{CP_type.value}
								</MenuItem>
							))}
						</TextField>
						<TextField
							margin="dense"
							id="name"
							label="Name"
							fullWidth
							value={editName}
							onChange={handleEditNameChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleEditWindowClose} color="primary">
							Cancel
						</Button>
						<Button onClick={editCloudData} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
}
