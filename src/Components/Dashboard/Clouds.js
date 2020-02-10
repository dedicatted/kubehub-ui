import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux'
import { addCloud } from '../../Actions/CloudActions';
import { showClouds } from '../../Actions/CloudActions';
import { TableOfClouds } from './TabelOfClouds';
import { EditCloud } from './EditCloud'
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
	flex:{
		display: 'flex',
		justifyContent: 'space-between'
	}
}))
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
	const classes = useStyle();
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



		return (
			<div>
				<div className={classes.flex}>
					<Button variant="contained" color="primary" onClick={handleCreateWindowOpen}>Add cloud</Button>
					<Button variant="contained" color="primary" onClick={refreshCloudData}>Refresh data</Button>
				</div>
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

				<TableOfClouds
					handleEditWindowOpen={handleEditWindowOpen}
					refreshCloudData={refreshCloudData}
				/>
				{/* Edit cloud Window */}
				<EditCloud
					CP_types={CP_types}
					handleEditWindowClose={handleEditWindowClose}
					editCP_type={editCP_type}
					editName={editName}
					editCloudIndex={editCloudIndex}
					setEditCP_type={setEditCP_type}
					setEditName={setEditName}
					editCloudWindowOpen={editCloudWindowOpen}
					setEditCloudWindowOpen={setEditCloudWindowOpen}
				/>

			</div>
		);
}
