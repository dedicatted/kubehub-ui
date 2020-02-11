import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { editCloud } from '../../Actions/CloudActions';




export function EditCloud (props) {
	const clouds = useSelector(state => state.clouds);
	const dispatch = useDispatch();

	const editCloudData = () => {
		// console.log(editCP_type, editName, editCloudIndex,clouds);
		dispatch(editCloud(props.editCP_type, props.editName, props.editCloudIndex));
		fetch('http://192.168.84.189:8080/api/cloud_providers/edit',{
			method: 'POST',
			body: JSON.stringify({
				id: clouds[props.editCloudIndex].id,
				cp_type: props.editCP_type,
				name: props.editName
			})
		})
		props.setEditCloudWindowOpen(false);
	}
	const handleEditCP_typeChange = event => {
		props.setEditCP_type(event.target.value);
	};
	const handleEditNameChange = event => {
		props.setEditName(event.target.value);
	};

	return(
		<Dialog open={props.editCloudWindowOpen} onClose={props.handleEditWindowClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit cloud</DialogTitle>
			<DialogContent>
				<TextField
					id="standard-select-CP_type"
					select
					label="Type of clouds"
					value={props.editCP_type}
					onChange={handleEditCP_typeChange}
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
					value={props.editName}
					onChange={handleEditNameChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleEditWindowClose} color="primary">
					Cancel
				</Button>
				<Button onClick={editCloudData} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}
