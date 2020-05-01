import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	mt2: {
		marginTop: theme.spacing(2)
	},
}));

export default function EditUserName (props) {
	const [username, setUsername] = useState(props.user.username);
	const classes = useStyles();

	const handleChangeUsername = event => setUsername(event.target.valuer);

	return (
		<Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Change Username</DialogTitle>
			<DialogContent>
				<TextField
					label="Username"
					value={username}
					onChange={handleChangeUsername}
					fullWidth
					className={classes.mt2}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={props.handleClose}>
					Cancel
				</Button>
				<Button color="primary">
					Done
				</Button>
			</DialogActions>
		</Dialog>
	)
}
