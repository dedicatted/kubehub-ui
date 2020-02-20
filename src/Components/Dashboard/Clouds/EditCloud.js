import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField  } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { editCloud } from '../../../Actions/CloudActions';




export function EditCloud (props) {
	const clouds = useSelector(state => state.clouds);
	const dispatch = useDispatch();

	const editCloudData = () => {
		dispatch(editCloud(props.editCP_type, props.editName, props.editCloudIndex));
		fetch('http://192.168.84.189:8080/api/cloud_providers/edit',{
			method: 'POST',
			body: JSON.stringify({
				id: clouds[props.editCloudIndex].id,
				name: props.editName
			})
		})
		props.setEditCloudWindowOpen(false);
	}
	const handleEditNameChange = event => {
		props.setEditName(event.target.value);
	};

	return(
		<Dialog open={props.editCloudWindowOpen} onClose={props.handleEditWindowClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit cloud</DialogTitle>
			<DialogContent>
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
