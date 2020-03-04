import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from '@material-ui/core';
import { serverURL } from '../Dashboard';
import { addCloud } from '../../Actions/CloudActions';

export default function CreateCloud (props) {
	const [CP_type, setCP_type] = React.useState('AWS');
	const [name, setName] = React.useState('');
	const [api_endpoint, setApiEndpoint] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleCreateWindowClose = () => {
		props.setCreateCloudWindowOpen(false);
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
	const createCloud = () => {
		fetch(`${serverURL}/api/cloud_providers/add`, {
			method: 'POST',
			body: JSON.stringify({
				cp_type: CP_type,
				name: name,
				api_endpoint: api_endpoint,
				password: password
			})
		})
		props.dispatch(addCloud(CP_type,name,api_endpoint,password));
		props.setCreateCloudWindowOpen(false);
		setTimeout(() =>{
			props.refreshCloudData();
		},100);
	};

	return (
		<Dialog open={props.createCloudWindowOpen} onClose={handleCreateWindowClose} aria-labelledby="form-dialog-title">
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
					{props.CP_types.map(CP_type => (
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
				<Button onClick={createCloud} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
