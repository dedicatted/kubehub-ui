import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, Grid } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { serverURL } from '../../serverLink';
import { commonStyles } from "../../styles/style";
import auth from '../Auth/auth';

export default function DeleteVMGroup (props) {
	const commonClasses = commonStyles();
	const [nameOfVMGroup, setNameOfVMGroup] = useState('');
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);

	const handledeleteVMGroupWindowClose = () => props.setDeleteVMGroupWindow(false);
	const handleNameOfVMGroupChange = event => {
		setNameOfVMGroup(event.target.value);
		event.target.value === props.selectedVMGroup.name
			? setDeleteButtonDisabled(false)
			: setDeleteButtonDisabled(true);
	};
	const DeleteVMGroup = (selectedVMGroup) => {
		fetch(`${serverURL}/api/proxmox/vm/group/remove`, {
			method: 'POST',
			body: JSON.stringify({
				vm_group_id: selectedVMGroup.id
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(DeleteVMGroup(selectedVMGroup)); // ! Need to test--------------
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(props.getVMGroups()) // !! After receiving a response
		.catch(error => console.error(error))
		setTimeout(props.getVMGroups(),100) // !! After sending a request
		handledeleteVMGroupWindowClose();
		setDeleteButtonDisabled(true);
		setNameOfVMGroup('');
	}


	return (
		<Dialog open={props.deleteVMGroupWindow} onClose={handledeleteVMGroupWindowClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Do you really want to delete {props.selectedVMGroup.name}? </DialogTitle>
			<DialogContent>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
				>
					<TextField
						label="Name of VM group"
						value={nameOfVMGroup}
						onChange={handleNameOfVMGroupChange}
						helperText="Enter the name of the machine group you want to delete"
						className={commonClasses.nameTextField}
					>
					</TextField>
					<CopyToClipboard text={props.selectedVMGroup.name}>
						<Button variant="contained" color="primary" size="small" >Copy name</Button>
					</CopyToClipboard>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={handledeleteVMGroupWindowClose}>
					Cancel
				</Button>
				<Button color="primary" disabled={deleteButtonDisabled} onClick={() => {DeleteVMGroup(props.selectedVMGroup)}}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}
