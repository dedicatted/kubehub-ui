import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, makeStyles, Grid } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { serverURL } from '../Dashboard';

const useStyles = makeStyles(theme => ({
	nameTextField: {
		width: '70%'
	}
}))
export default function DeleteVMGroup (props) {
	const classes = useStyles();
	const [nameOfVMGroup, setNameOfVMGroup] = useState('');
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
	const handledeleteVMGroupWindowClose = () => {
		props.setDeleteVMGroupWindow(false);
	};
	const handleNameOfVMGroupChange = event => {
		setNameOfVMGroup(event.target.value);
		if (event.target.value === props.selectedVMGroup.name) {
			setDeleteButtonDisabled(false);
		} else {
			setDeleteButtonDisabled(true);
		}
	};
	const onClickDeleteVMGroup = (selectedVMGroup) => {
		fetch(`${serverURL}/api/proxmox/vm/group/remove`, {
			method: 'POST',
			body: JSON.stringify({
				vm_group_id: selectedVMGroup.id
			})
		})
		.then(props.refreshVMGroupData()) // !! After sending the request
		.then(response => {
			props.refreshVMGroupData();
			console.log(response);
		}) // !! After receiving a response
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
						id="standard-select-CP_type"
						label="Name of VM group"
						value={nameOfVMGroup}
						onChange={handleNameOfVMGroupChange}
						helperText="Enter the name of the machine group you want to delete"
						className={classes.nameTextField}
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
				<Button color="primary" disabled={deleteButtonDisabled} onClick={() => {onClickDeleteVMGroup(props.selectedVMGroup)}}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}